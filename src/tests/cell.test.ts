import { Cell, CellStatus } from '../core/cell';

describe('Cell', () => {
	it('Any live cell with fewer than two live neighbours dies', () => {
		expect(Cell.create(CellStatus.Alive).nextCell(1).currentStatus()).toBe(CellStatus.Dead);
		expect(Cell.create(CellStatus.Dead).nextCell(1).currentStatus()).toBe(CellStatus.Dead);
	});
	it('Any live cell with more than three live neighbours dies', () => {
		expect(Cell.create(CellStatus.Alive).nextCell(4).currentStatus()).toBe(CellStatus.Dead);
		expect(Cell.create(CellStatus.Dead).nextCell(4).currentStatus()).toBe(CellStatus.Dead);
	});
	it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
		expect(Cell.create(CellStatus.Alive).nextCell(2).currentStatus()).toBe(CellStatus.Alive);
		expect(Cell.create(CellStatus.Alive).nextCell(3).currentStatus()).toBe(CellStatus.Alive);
		expect(Cell.create(CellStatus.Dead).nextCell(2).currentStatus()).toBe(CellStatus.Dead);
	});
	it('Any dead cell with exactly three live neighbours becomes a live cell', () => {
		expect(Cell.create(CellStatus.Alive).nextCell(2).currentStatus()).toBe(CellStatus.Alive);
		expect(Cell.create(CellStatus.Alive).nextCell(3).currentStatus()).toBe(CellStatus.Alive);
		expect(Cell.create(CellStatus.Dead).nextCell(3).currentStatus()).toBe(CellStatus.Alive);
	});
	it('Cells with undefined initial state are not allowed', () => {
		expect(() => Cell.create(undefined).nextCell(2)).toThrow();
		expect(() => Cell.create(null).nextCell(2)).toThrow();
	});
});
