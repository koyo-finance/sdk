import { PoolDictionary, PoolBase, PoolTypes, NewPath } from '@balancer-labs/sor';
import type { edgeDict, treeEdge } from '../types/routing';
import type { KoyoSorConfig } from '../types/sor';
import { getRaisingToken } from '../utilities/lbp';
import { getNodesAndEdges, getPathInfo, pathsInfoToPaths } from '../utilities/routing';

// We build a directed graph for the boosted pools.
// Nodes are tokens and edges are triads: [pool.id, tokenIn, tokenOut].
// The current criterion for including a pool into this graph is the following:
// (a) We include every linear pool.
// (b) Among phantom pools, we include those that contain the pool token of a linear pool.
// (c) Among every pool, we include those that contain the pool token of
// a pool from the previous step.
// (d) We include connections of tokenIn and tokenOut to WETH.
// (e) When tokenIn or tokenOut are tokens offered at an LBP, we also include
// the LBPs and the connections of the corresponding raising tokens with WETH.
//
// To build the paths using boosted pools we use the following algorithm.
// Given a tokenIn and a tokenOut belonging to the graph, we want to find
// all the connecting paths inside the graph, with the properties:
// (a) They do not visit the same token twice
// (b) They do not use the same pool twice in a row (since this
// would never be optimal).
// These paths can be organized as a directed tree having tokenIn as a root.
// We build this tree by adding at each step all the possible continuations for
// each branch. When a branch reaches tokenOut, we write down the corresponding path.

export function getBoostedGraph(tokenIn: string, tokenOut: string, poolsAllDict: PoolDictionary, config: KoyoSorConfig): edgeDict {
	const wethAddress: string = config.weth.toLowerCase();
	const pools = [...Object.values(poolsAllDict)];
	const graphPoolsSet: Set<PoolBase> = new Set();
	const linearPools: PoolBase[] = [];
	const phantomPools: PoolBase[] = [];
	const relevantRaisingTokens: string[] = [];

	// Here we add all linear pools, take note of phantom pools,
	// add pools with tokenIn or tokenOut with weth,
	// add LBP pools with tokenIn or tokenOut and take note of the
	// corresponding raising tokens.
	for (const pool of pools) {
		if (pool.poolType === PoolTypes.Linear) {
			linearPools.push(pool);
			graphPoolsSet.add(pool);
		} else {
			// Here we asssume that phantom pools are exactly those that
			// are not linear and have their pool token in their tokensList.
			const tokensList = pool.tokensList.map((address) => address.toLowerCase());
			if (tokensList.includes(pool.address)) {
				phantomPools.push(pool);
			}
			// adds pools having tokenIn or tokenOut with weth
			if (tokenIn !== wethAddress && tokenOut !== wethAddress && tokensList.includes(wethAddress)) {
				if (tokensList.length <= 3 && (tokensList.includes(tokenIn) || tokensList.includes(tokenOut))) {
					graphPoolsSet.add(pool);
				}
			}
			if (config.lbpRaisingTokens) {
				const raisingTokens = config.lbpRaisingTokens.map((address) => address.toLowerCase());
				if (pool.isLBP) {
					const raisingTokenIn: string | undefined = getRaisingToken(pool, raisingTokens, tokenIn);
					if (raisingTokenIn) {
						graphPoolsSet.add(pool);
						relevantRaisingTokens.push(raisingTokenIn);
					}
					const raisingTokenOut: string | undefined = getRaisingToken(pool, raisingTokens, tokenOut);
					if (raisingTokenOut) {
						graphPoolsSet.add(pool);
						relevantRaisingTokens.push(raisingTokenOut);
					}
				}
			}
		}
	}

	if (linearPools.length === 0) return {};
	const linearPoolsAddresses = linearPools.map((pool) => pool.address);
	const secondStepPoolsSet: Set<PoolBase> = new Set();
	for (const pool of phantomPools) {
		for (const linearPoolAddress of linearPoolsAddresses) {
			if (pool.tokensList.includes(linearPoolAddress)) {
				graphPoolsSet.add(pool);
				secondStepPoolsSet.add(pool);
			}
		}
	}

	const secondStepPoolsAddresses = [...secondStepPoolsSet].map((pool) => pool.address);
	// Here we include every pool that has a pool token from the previous step
	// and pools having relevant raising tokens and WETH.
	for (const pool of pools) {
		for (const secondStepPoolAddress of secondStepPoolsAddresses) {
			if (pool.tokensList.includes(secondStepPoolAddress)) {
				graphPoolsSet.add(pool);
			}
		}
		const { tokensList } = pool;
		for (const raisingToken of relevantRaisingTokens) {
			if (tokensList.includes(raisingToken) && tokensList.includes(wethAddress) && raisingToken !== wethAddress) {
				graphPoolsSet.add(pool);
			}
		}
	}

	const graphPools: PoolBase[] = [...graphPoolsSet];
	const edgeDict = getNodesAndEdges(graphPools);
	return edgeDict;
}

export function getBoostedPaths(tokenIn: string, tokenOut: string, poolsAllDict: PoolDictionary, config: KoyoSorConfig): NewPath[] {
	const edgesFromNode = getBoostedGraph(tokenIn, tokenOut, poolsAllDict, config);
	const pathsInfo: [string[], string[]][] = [];
	const rootTreeEdge: treeEdge = {
		edge: ['', '', tokenIn],
		parentIndices: [-1, -1],
		visitedNodes: []
	};
	const treeEdges: treeEdge[][] = [[rootTreeEdge]];

	let iterate = true;
	while (iterate) {
		const n = treeEdges.length; // number of tree edge layers so far
		const newTreeEdges: treeEdge[] = [];
		// adds every possible treeEdge for each treeEdge of the previous layer
		for (let i = 0; i < treeEdges[n - 1].length; i++) {
			const treeEdge = treeEdges[n - 1][i];
			const token = treeEdge.edge[2];
			const edgesFromToken = edgesFromNode[token];
			if (!edgesFromToken) continue;
			for (const edge of edgesFromToken) {
				// skip if the node was already visited or
				// if the pool is the one from the previous edge
				if (treeEdge.visitedNodes.includes(edge[2]) || treeEdge.edge[0] === edge[0]) {
					continue;
				}
				if (edge[2] === tokenOut) {
					pathsInfo.push(getPathInfo(edge, treeEdge, treeEdges));
				}
				const newTreeEdge: treeEdge = {
					edge,
					parentIndices: [n - 1, i],
					visitedNodes: treeEdge.visitedNodes.concat(edge[1])
				};
				newTreeEdges.push(newTreeEdge);
			}
		}
		if (newTreeEdges.length === 0) {
			iterate = false;
		} else treeEdges.push(newTreeEdges);
	}

	return pathsInfoToPaths(pathsInfo, poolsAllDict);
}
