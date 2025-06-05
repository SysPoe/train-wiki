#!/usr/bin/env ts-node

import { Edge } from "./classes/Edge";
import { Node } from "./classes/Node";
import { PriorityQueue } from "./classes/PriorityQueue";

const edges: { [id: string]: Edge } = {};
const nodes: { [id: string]: Node } = {};

/**
 * Performs a modified dijkstra to find the fastest path between two nodes, starting at a certain time.
 * @param start The ID of the stating node
 * @param end The ID of the ending node
 * @param startTime The starting time in seconds since Jan 1, 1970
 */
function dijkstra(start: string, end: string, startTime: number): Edge[] {
	const pq = new PriorityQueue<string>();
	const time: { [id: string]: number } = {};
	const prev: { [id: string]: string } = {};
	const visited: { [id: string]: boolean } = {};

	visited[start] = true;
	time[start] = startTime;

	while (!pq.empty()) {
		const u = pq.dequeue();
		if (u === null || u === end) break;
		if (nodes[u] === undefined) continue;

		for (const edge of nodes[u].outbound) {
			const v = edge.to;
			if (edge.departureTime < time[u]) continue;
			const alt = edge.arrivalTime;
			if (time[v] === undefined || alt < time[v]) {
				time[v] = alt;
				prev[v] = edge.id;
				pq.enqueue(v, alt);
			}
		}
	}

	const path: Edge[] = [];
	let current = end;
	while (prev[current] !== undefined) {
		path.unshift(edges[prev[current]]);
		current = edges[prev[current]].from;
	}

	return path;
}