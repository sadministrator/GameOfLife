'use strict'

const DEAD = 0
const ALIVE = 1

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.createGrid()
        this.resultGrid = this.createGrid()
    }

    createGrid() {
        let grid = []

        for(let col = 0; col < this.width; col++) {
            grid[col] = []
        }

        for(let col = 0; col < this.width; col++){
            for(let row = 0; row < this.height; row++) {
                grid[col][row] = DEAD
            }
        }
        return grid
    }

    clearGrid() {
        for(let col = 0; col < this.width; col++) {
            for(let row = 0; row < this.height; row++) {
                this.grid[col][row] = DEAD;
            }
        }
    }

    setCell(grid, x, y, status) {
        if(x < this.width && y < this.height){
            grid[x][y] = status
        }
        else {
            console.error('(' + x + ', ' + y + ') is out of bounds.')
        }
    }

    getCell(x, y) {
        return this.grid[x][y]
    }

    liveNeighbors(x, y) {
        let liveNeighbors = 0;

        liveNeighbors += this.getCell((x + this.width - 1) % this.width, (y + this.height + 1) % this.height)

        liveNeighbors += this.getCell((x + this.width) % this.width, (y + this.height + 1) % this.height)

        liveNeighbors += this.getCell((x + this.width + 1) % this.width, (y + this.height + 1) % this.height)

        liveNeighbors += this.getCell((x + this.width + 1) % this.width, (y + this.height) % this.height)

        liveNeighbors += this.getCell((x + this.width + 1) % this.width, (y + this.height - 1) % this.height)

        liveNeighbors += this.getCell((x + this.width) % this.width, (y + this.height - 1) % this.height)

        liveNeighbors += this.getCell((x + this.width - 1) % this.width, (y + this.height - 1) % this.height)

        liveNeighbors += this.getCell((x + this.width - 1) % this.width, (y + this.height) % this.height)

        return liveNeighbors
    }

    nextState(x, y) {
        let neighbors = this.liveNeighbors(x, y)
        let cellStatus = this.getCell(x, y)

        if(cellStatus == ALIVE) {
            if(neighbors != 2 && neighbors != 3) {
                return DEAD
            }
            return ALIVE
        }
        else {
            if(neighbors == 3){
                return ALIVE
            }
            return DEAD
        }
    }

    swapGrids() {
        var wrapper = {}
        wrapper.wrappedGrid = this.grid
        wrapper.wrappedGridResult = this.resultGrid

        let temp = wrapper.wrappedGrid
        wrapper.wrappedGrid = wrapper.wrappedResultGrid
        wrapper.wrappedResultGrid = temp
    }

    copyResults() {
        for(let col = 0; col < this.width; col++) {
            for(let row = 0; row < this.height; row++) {
                this.grid[col][row] = this.resultGrid[col][row]
            }
        }
    }


    tick() {
        for(let col = 0; col < this.width; col++) {
            for(let row = 0; row < this.height; row++) {
                this.setCell(this.resultGrid, col, row, this.nextState(col, row));
            }
        }
        this.copyResults()
    }

    printGrid() {
        let str = ''

        for(let col = 0; col < this.width; col++){
            this.grid[col].forEach(function (cell){
                str += cell + ' | '
            })
            console.log(str)
            str = ''
        }
    }


    printResultGrid() {
        let str = ''

        for(let col = 0; col < this.width; col++){
            this.resultGrid[col].forEach(function (cell){
                str += cell + ' | '
            })
            console.log(str)
            str = ''
        }
    }
}

let boardy = new Board(6, 5)

boardy.createGrid()
boardy.setCell(boardy.grid, 0, 0, ALIVE)
boardy.setCell(boardy.grid, 1, 1, ALIVE)
boardy.setCell(boardy.grid, 2, 2, ALIVE)
boardy.setCell(boardy.grid, 3, 3, ALIVE)
boardy.setCell(boardy.grid, 4, 4, ALIVE)

boardy.printGrid()
console.log('__________________________________')

boardy.tick()
boardy.printGrid()
console.log('__________________________________')

boardy.tick()
boardy.printGrid()
console.log('__________________________________')

boardy.tick()
boardy.printGrid()
console.log('__________________________________')