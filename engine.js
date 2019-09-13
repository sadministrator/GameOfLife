'use strict'

const DEAD = 0
const ALIVE = 1

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.createGrid()
        this.resultGrid = this.createGrid()
        //this.createGrids()
    }

    createGrid() {
        let grid = new Array(parseInt(this.width)).fill(0)

        for(let col = 0; col < this.width; col++) {
            grid[col] = new Array(parseInt(this.height)).fill(0)
        }

        //for(let col = 0; col < this.width; col++) {
        //    grid[col] = []
        //}

        //for(let col = 0; col < this.width; col++){
         //   for(let row = 0; row < this.height; row++) {
        //        grid[col][row] = DEAD
        //    }
        //}
        return grid
    }

    createGrids() {
        let newBoard = new Array(parseInt(this.width)).fill(0)
        let newResultBoard = new Array(parseInt(this.height))

        for(let col = 0; col < this.width; col++) {
            newBoard[col] = new Array(parseInt(this.height)).fill(0)
            newResultBoard[col] = new Array(parseInt(this.height)).fill(0)
        }

        this.grid = newBoard
        this.resultGrid = newResultBoard
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
        x = parseInt(x)
        y = parseInt(y)

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
        x = parseInt(x)
        y = parseInt(y)

        let liveNeighbors = 0;

        liveNeighbors += this.getCell((x + parseInt(this.width) - 1) % parseInt(this.width), (y + parseInt(this.height) + 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width)) % parseInt(this.width), (y + parseInt(this.height) + 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width) + 1) % parseInt(this.width), (y + parseInt(this.height) + 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width) + 1) % parseInt(this.width), (y + parseInt(this.height)) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width) + 1) % parseInt(this.width), (y + parseInt(this.height) - 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width)) % parseInt(this.width), (y + parseInt(this.height) - 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width) - 1) % parseInt(this.width), (y + parseInt(this.height) - 1) % parseInt(this.height))

        liveNeighbors += this.getCell((x + parseInt(this.width) - 1) % parseInt(this.width), (y + parseInt(this.height)) % parseInt(this.height))

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
}
