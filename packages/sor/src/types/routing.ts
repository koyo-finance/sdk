export interface edgeDict {
	[node: string]: [string, string, string][];
}

export interface treeEdge {
	edge: [string, string, string];
	parentIndices: [number, number];
	visitedNodes: string[];
}
