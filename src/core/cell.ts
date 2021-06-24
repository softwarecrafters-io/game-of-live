export enum CellStatus {
	Dead,
	Alive,
}

export class Cell {
	private constructor(private status: CellStatus) {}

	static create(state: CellStatus) {
		if (state == null) {
			throw new Error('Invalid status');
		}
		return new Cell(state);
	}

	currentStatus() {
		return this.status;
	}

	nextCell(numberOfAliveNeighbors: number) {
		return Cell.create(
			this.status === CellStatus.Alive
				? this.nextStateWhenAlive(numberOfAliveNeighbors)
				: this.nextStateWhenDead(numberOfAliveNeighbors)
		);
	}

	private nextStateWhenDead(neighbors: number) {
		const shallRevive = neighbors === 3;
		if (shallRevive) {
			return CellStatus.Alive;
		}
		return CellStatus.Dead;
	}

	private nextStateWhenAlive(neighbors: number) {
		const shallStayAlive = neighbors >= 2 && neighbors <= 3;
		if (shallStayAlive) {
			return CellStatus.Alive;
		}
		return CellStatus.Dead;
	}
}
