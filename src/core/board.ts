import { Cell, CellStatus } from './cell';

export class Board {
	private constructor(private cellMatrix: Cell[][]) {}

	static createFrom(statusBoard: CellStatus[][]) {
		const cellBoard = statusBoard.map((row) => row.map((cs) => Cell.create(cs)));
		return new Board(cellBoard);
	}

	static create(cellMatrix: Cell[][]) {
		return new Board(cellMatrix);
	}

	nextBoard() {
		return Board.create(
			this.cellMatrix.map((row, rowIndex) =>
				row.map((cell, colIndex) => cell.nextCell(this.getNumberOfAliveNeighbors(rowIndex, colIndex)))
			)
		);
	}

	toCellStatus() {
		return this.cellMatrix.map((row) => row.map((cell) => cell.currentStatus()));
	}

	getCellFrom(row: number, column: number) {
		return this.cellMatrix[row][column];
	}

	getNumberOfAliveNeighbors(row: number, column: number) {
		return this.getSubsetNeighboringCellsBoard(row, column)
			.reduce((previousCell, currentCell) => previousCell.concat(currentCell), [])
			.filter((cell) => cell.currentStatus() === CellStatus.Alive).length;
	}

	private getSubsetNeighboringCellsBoard(row: number, column: number) {
		return this.getCellBoardExcludingCurrentAliveCell(row, column)
			.filter((_, i) => this.filterApplicableRows(row, i))
			.map((r) => r.filter((_, i) => this.filterApplicableColumns(column, i)));
	}

	private getCellBoardExcludingCurrentAliveCell(row: number, column: number) {
		if (this.cellMatrix[row][column].currentStatus() === CellStatus.Alive) {
			return this.cellMatrix.map((r, ri) =>
				r.map((c, ci) => (ri === row && ci === column ? Cell.create(CellStatus.Dead) : c))
			);
		}
		return this.cellMatrix;
	}

	private filterApplicableRows(row: number, index: number) {
		const previousRow = row - 1;
		const nextRow = row + 1;
		return index >= previousRow && index <= nextRow;
	}

	private filterApplicableColumns(column: number, index: number) {
		const previousColumn = column - 1;
		const nextColumn = column + 1;
		return index >= previousColumn && index <= nextColumn;
	}
}
