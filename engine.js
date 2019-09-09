'use strict'

const DEAD = 0
const ALIVE = 1

class Board {
    constructor(width, height, delay) {
        this.width = width
        this.height = height
        this.delay = delay
        this.grid = this.createGrid()
        this.resultGrid = this.createGrid()
        this.pause = true;
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

    deadGrid() {
      liveCell = false;

      for(let col = 0; col < this.width; col ++) {
        for(let row = 0; row < this.height; row++) {
          if(this.grid[col][row] == ALIVE){
            liveCell = true
            return liveCell
          }
        }
      }

      return liveCell
    }

    play() {
        while(!pause && !this.deadGrid()) {
            setTimeout(function() {
                this.tick()
            }, this.delay)
        }
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
