export type RouteData = string;

export class Edge {
    /** Departure time in seconds since Jan 1, 1970 */
	departureTime: number;
    /** Arrival time in seconds since Jan 1, 1970 */
	arrivalTime: number;
    /** Edge ID */
	id: string;
	routeData: RouteData;
    /** Starting node */
	from: string;
    /** Ending node */
	to: string;

	constructor(
		departureTime: number,
		arrivalTime: number,
		id: string,
		from: string,
		to: string,
		routeData: RouteData
	) {
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
		this.id = id;
		this.from = from;
		this.to = to;
		this.routeData = routeData;
	}
}