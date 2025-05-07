import { Edge } from "./Edge";

export type NodeData = string;

export class Node {
	nodeData: NodeData;
    /** Outbound edges */
	outbound: Edge[];
    /** Inbound edges */
	inbound: Edge[];
    /** Node ID */
	id: string;

	constructor(
		nodeData: NodeData,
		outbound: Edge[],
		inbound: Edge[],
		id: string
	) {
		this.nodeData = nodeData;
		this.outbound = outbound;
		this.inbound = inbound;
		this.id = id;
	}
}