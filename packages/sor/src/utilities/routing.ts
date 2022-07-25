import type { NewPath, PoolBase, PoolDictionary, PoolPairBase, Swap } from '@balancer-labs/sor';
import { Zero } from '@ethersproject/constants';
import type { edgeDict, treeEdge } from '../types/routing';

export function getNodesAndEdges(pools: PoolBase[]): edgeDict {
	const edgesFromNode: edgeDict = {};

	for (const pool of pools) {
		const n = pool.tokensList.length;
		for (let i = 0; i < n; i++) {
			if (!edgesFromNode[pool.tokensList[i]]) edgesFromNode[pool.tokensList[i]] = [];
			for (let j = 0; j < n; j++) {
				if (i === j) continue;
				const edge: [string, string, string] = [pool.id, pool.tokensList[i], pool.tokensList[j]];
				edgesFromNode[pool.tokensList[i]].push(edge);
			}
		}
	}

	return edgesFromNode;
}

export function getPathInfo(edge: [string, string, string], treeEdge: treeEdge, treeEdges: treeEdge[][]): [string[], string[]] {
	const pathEdges: [string, string, string][] = [edge];
	pathEdges.unshift(treeEdge.edge);

	let indices = treeEdge.parentIndices;
	while (indices[0] !== -1) {
		pathEdges.unshift(treeEdges[indices[0]][indices[1]].edge);
		indices = treeEdges[indices[0]][indices[1]].parentIndices;
	}

	const pools = pathEdges.map((pathEdge) => pathEdge[0]);
	pools.splice(0, 1);
	const tokens = pathEdges.map((pathEdge) => pathEdge[2]);

	return [tokens, pools];
}

export function pathsInfoToPaths(flexBoostedPathsInfo: [string[], string[]][], poolsAllDict: PoolDictionary): NewPath[] {
	const paths: NewPath[] = [];

	for (const boostedPathInfo of flexBoostedPathsInfo) {
		const pools = boostedPathInfo[1].map((id) => poolsAllDict[id]);
		// ignore paths of length 1 and 2
		if (pools.length > 2) {
			paths.push(createPath(boostedPathInfo[0], pools));
		}
	}

	return paths;
}

// Creates a path with pools.length hops
// i.e. tokens[0]>[Pool0]>tokens[1]>[Pool1]>tokens[2]>[Pool2]>tokens[3]
export function createPath(tokens: string[], pools: PoolBase[]): NewPath {
	let tI: string;
	let tO: string;
	const swaps: Swap[] = [];
	const poolPairData: PoolPairBase[] = [];
	let id = '';

	for (let i = 0; i < pools.length; i++) {
		tI = tokens[i];
		tO = tokens[i + 1];
		const poolPair = pools[i].parsePoolPairData(tI, tO);
		poolPairData.push(poolPair);
		id += poolPair.id;

		const swap: Swap = {
			pool: pools[i].id,
			tokenIn: tI,
			tokenOut: tO,
			tokenInDecimals: poolPair.decimalsIn,
			tokenOutDecimals: poolPair.decimalsOut
		};

		swaps.push(swap);
	}

	const path: NewPath = {
		id,
		swaps,
		limitAmount: Zero,
		poolPairData,
		pools
	};

	return path;
}
