import Board from './board';
import Cell from './../cell/cell';
//import setupMockCtx from './../mocks/setupMockCtx';


describe('Board tests', () => {
    let board;
    let cell;

    beforeEach(() => {
        board = new Board(100, 10, 50, 10);
        //    board.canvas = {width:50};
        board.canvas = {
            getContext: () => {
                return {
                    stroke: () => {},
                    fill: () => {},
                    arc: () => {},
                    fillRect: () => {},
                    beginPath: () => {},
                    strokeRect: () => {},
                    fillText: () => {},
                    clearRect: () => {}
                };
            }
        };
        //  board.ctx = setupMockCtx();
        cell = new Cell(0, 0, 0, 0);
        jest.clearAllMocks();
    });

    it('should have cells', () => {
        expect(board.cells).toBeDefined();
    });

    it('should have empty cells object', () => {
        expect(board.cells).toHaveLength(0);
    });

    it('should have function addCell', () => {
        expect(board.addCell).toBeDefined();
    });

    it('should add cell to cells if function addCell is used', () => {

        board.addCell(cell);
        expect(board.cells).toHaveLength(1);
    });
    it('should have function getCellByClick', () => {
        expect(board.getCellByClick).toBeDefined();
    });
    it('should have function newGame', () => {
        expect(board.newGame).toBeDefined();
    });
    it('should have function setTimer', () => {
        expect(board.setTimer).toBeDefined();
    });
    it('should have function setBombs', () => {
        expect(board.setBombs).toBeDefined();
    });
    it('setBombs should set bombs', () => {
        board.newGame();
        expect(board.cells.filter(c => c.isBomb)).toHaveLength(10);
    });

});