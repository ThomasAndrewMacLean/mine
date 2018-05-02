import Cell from './cell';
import setupMockCtx from './../mocks/setupMockCtx';
//import Board from './../board/board';

describe('Cell tests', () => {
    // let board;
    let cell;
    let mockCtx;

    beforeEach(() => {
        mockCtx = setupMockCtx();

        cell = new Cell(0, 0, 0, 0);
        jest.clearAllMocks();
    });


    it('should have x', () => {
        expect(cell.x).toBeDefined();
    });
    it('should throw error is x is not set', () => {
        try {
            new Cell(undefined, 0, 0, 0);
        } catch (err) {
            expect(err.message).toBe('x is required!');
        }
    });
    it('should have y', () => {
        expect(cell.y).toBeDefined();
    });
    it('should throw error is y is not set', () => {
        try {
            new Cell(0, undefined, 0, 0);
        } catch (err) {
            expect(err.message).toBe('y is required!');
        }
    });
    it('should have width', () => {
        expect(cell.width).toBeDefined();
    });
    it('should throw error is width is not set', () => {
        try {
            new Cell(0, 0, undefined, 0);
        } catch (err) {
            expect(err.message).toBe('width is required!');
        }
    });
    it('should have height', () => {
        expect(cell.height).toBeDefined();
    });
    it('should throw error is height is not set', () => {
        try {
            new Cell(0, 0, 0, undefined);
        } catch (err) {
            expect(err.message).toBe('height is required!');
        }
    });
    it('should have isClicked', () => {
        expect(cell.isClicked).toBeDefined();
    });
    it('isClicked should be false', () => {
        expect(cell.isClicked).toBeFalsy();
    });
    it('isClicked should be true after click', () => {
        cell.click(mockCtx);
        expect(cell.isClicked).toBeTruthy();
    });
    it('click should call fillRect', () => {
        cell.click(mockCtx);
        expect(mockCtx.fillRect).toHaveBeenCalledTimes(1);
    });
    it('click should call strokeRect', () => {
        cell.click(mockCtx);
        expect(mockCtx.strokeRect).toHaveBeenCalledTimes(1);
    });
    it('should set fillStyle to gray', () => {
        cell.click(mockCtx);
        expect(mockCtx.fillStyle).toBe('gray');
    });
    it('click should call draw', () => {
        const spy = jest.spyOn(cell, 'draw');
        cell.click(mockCtx);
        expect(spy).toHaveBeenCalled();
    });
    it('should only draw once', () => {
        const spy = jest.spyOn(cell, 'draw');
        cell.click(mockCtx);
        cell.click(mockCtx);
        cell.click(mockCtx);
        expect(spy).toHaveBeenCalledTimes(1);

    });
});