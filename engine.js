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

    getWidth() {
        return this.width
    }

    setWidth(width) {
        this.width = width
    }

    getHeight() {
        return this.height
    }

    setHeight(height) {
        this.height = height
    }

    setCell(grid, x, y, status) {
        let xInt = parseInt(x)
        let yInt = parseInt(y)

        if(xInt < this.width && yInt < this.height){
            console.log(this.grid)
            console.log('xInt: ' + xInt + ' yInt: ' + yInt)
            grid[xInt][yInt] = status
            console.log('xInt: ' + xInt + ' yInt: ' + yInt)

        }
        else {
            console.error('(' + x + ', ' + y + ') is out of bounds.')
            console.error('Width: ' + this.width + ' Height: ' + this.height)
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

    deadGrid() {
      for(let col = 0; col < this.width; col ++) {
        for(let row = 0; row < this.height; row++) {
          if(this.grid[col][row] == ALIVE){
            return false
          }
        }
      }
      return true
    }

    printGrid() {
        let str = ''

        for(let col = 0; col < this.width; col++) {
            for(let row = 0; row < this.height; row++) {
                str += this.grid[col][row] + ' | '
            }
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
