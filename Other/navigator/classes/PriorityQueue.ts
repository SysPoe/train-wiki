export class PriorityQueue<T> {
	private elements: { element: T; priority: number }[];

	constructor() {
		this.elements = [];
	}

	enqueue(element: T, priority: number): void {
		// Binary search to enter an element in place
		let low = 0;
		let high = this.elements.length;

		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (this.elements[mid].priority < priority) {
				low = mid + 1;
			} else {
				high = mid;
			}
		}

		this.elements.splice(low, 0, { element, priority });
	}

	dequeue(): T | null {
		if (this.empty()) {
			return null;
		}
		const shifted = this.elements.shift();
		if (shifted === undefined) return null;
		return shifted.element;
	}

	empty(): boolean {
		return this.elements.length === 0;
	}
}
