import { CellStatus } from '../core/cell';
import { Board } from '../core/board';

const { Dead, Alive } = CellStatus;

describe('Board', () => {
	it('gets the cell from specific coordinates', () => {
		const board = [
			[Dead, Dead, Dead],
			[Dead, Alive, Dead],
			[Dead, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const cellOne = game.getCellFrom(0, 0);
		const cellTwo = game.getCellFrom(1, 1);

		expect(cellOne.currentStatus()).toBe(Dead);
		expect(cellTwo.currentStatus()).toBe(Alive);
	});

	it('gets number of alive neighbors in the top row from specific coordinates', () => {
		const board = [
			[Alive, Alive, Alive],
			[Dead, Dead, Dead],
			[Dead, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 1);

		expect(numberOfAliveNeighbors).toBe(3);
	});

	it('gets number of alive neighbors in the bottom row from specific coordinates', () => {
		const board = [
			[Dead, Dead, Dead],
			[Dead, Dead, Dead],
			[Alive, Dead, Alive],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 1);

		expect(numberOfAliveNeighbors).toBe(2);
	});

	it('gets number of alive neighbors in the same row from specific coordinates', () => {
		const board = [
			[Dead, Dead, Dead],
			[Alive, Dead, Dead],
			[Dead, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 1);

		expect(numberOfAliveNeighbors).toBe(1);
	});

	it('gets number of all alive neighbors from specific coordinates', () => {
		const board = [
			[Dead, Dead, Alive],
			[Alive, Dead, Dead],
			[Dead, Alive, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 1);

		expect(numberOfAliveNeighbors).toBe(3);
	});

	it('gets number of all alive neighbors from coordinates in the first row', () => {
		const board = [
			[Dead, Alive, Dead],
			[Alive, Dead, Dead],
			[Dead, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(0, 1);

		expect(numberOfAliveNeighbors).toBe(1);
	});

	it('gets number of all alive neighbors from coordinates in the last row', () => {
		const board = [
			[Dead, Dead, Dead],
			[Dead, Dead, Alive],
			[Dead, Alive, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(2, 1);

		expect(numberOfAliveNeighbors).toBe(1);
	});

	it('gets number of all alive neighbors from coordinates in the first column', () => {
		const board = [
			[Dead, Dead, Dead],
			[Dead, Dead, Alive],
			[Dead, Alive, Alive],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 0);

		expect(numberOfAliveNeighbors).toBe(1);
	});

	it('gets number of all alive neighbors from coordinates in the last column', () => {
		const board = [
			[Dead, Dead, Alive],
			[Dead, Dead, Alive],
			[Alive, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(1, 2);

		expect(numberOfAliveNeighbors).toBe(1);
	});

	it('gets number of all alive neighbors from coordinates in a big grid', () => {
		const board = [
			[Alive, Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead, Dead],
			[Alive, Dead, Dead, Dead, Alive, Dead],
			[Dead, Dead, Alive, Alive, Alive, Alive],
			[Alive, Dead, Dead, Dead, Dead, Alive],
			[Alive, Dead, Dead, Dead, Dead, Dead],
		];
		const game = Board.createFrom(board);

		const numberOfAliveNeighbors = game.getNumberOfAliveNeighbors(3, 4);

		expect(numberOfAliveNeighbors).toBe(4);
	});

	it('yields the next state of the game', () => {
		const initialBoard = [
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Alive, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		];
		const game = Board.createFrom(initialBoard);

		const nextBoard = game.nextBoard().toCellStatus();

		expect(nextBoard).toEqual([
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Alive, Alive, Alive, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		]);
	});

	it('a board state with a block never changes', () => {
		const initialBoard = [
			[Alive, Alive, Dead, Dead, Dead],
			[Alive, Alive, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
			[Dead, Dead, Dead, Dead, Dead],
		];
		const game = Board.createFrom(initialBoard);

		const result = game.nextBoard().nextBoard().nextBoard().toCellStatus();

		expect(result).toEqual(initialBoard);
	});
});
