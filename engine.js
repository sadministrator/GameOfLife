'use strict'

const DEAD = 0
const ALIVE = 1

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.createGrid(width, height)
    }

    createGrid() {
        let grid = []

        for(let i = 0; i < this.width; i++) {
            grid[i] = []
        }

        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++) {
                grid[i][j] = DEAD
            }
        }
        return grid
    }

    clearGrid() {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                this.grid[i][j] = DEAD;
            }
        }
    }

    setCell(x, y, status) {
        if(this.grid[x] != undefined) {
            if(this.grid[x][y] != undefined) {
                this.grid[x][y] = status
            }
        }
        else {
            console.error( '(' + x + ', ' + y + ') is out of bounds.')
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
        let neighbors = this.printGrid.liveNeighbors(x, y)
        let cellStatus = this.getCell(x, y)

        if(cellStatus == ALIVE) {
            if(neighbors != 2 && neighbors != 3) {
                this.setCell(x, y, DEAD)
            }
        }
        else {
            if(neighbors == 3){
                this.setCell(x, y, ALIVE)
            }
        }
    }

    printGrid() {
        let str = ''

        for(let i = 0; i < this.width; i++){
            this.grid[i].forEach(function (cell){
                str += cell + '|'
            })
            console.log(str)
            str = ''
        }
    }
}

let boardy = new Board(10, 8)

boardy.createGrid()
boardy.setCell(0, 1, ALIVE)
boardy.setCell(1, 0, ALIVE)
boardy.setCell(1, 1, ALIVE)
boardy.setCell(9, 7, ALIVE)
boardy.setCell(9, 0, ALIVE)
boardy.setCell(0, 7, ALIVE)
boardy.setCell(2, 7, ALIVE)
boardy.setCell(9, 1, ALIVE)
boardy.setCell(1, 7, ALIVE)

boardy.printGrid()

console.log('0, 0 neighbors: ' + boardy.liveNeighbors(0, 0))
console.log('2, 0 neighbors: ' + boardy.liveNeighbors(2, 0))
console.log('0, 1 neighbors: ' + boardy.liveNeighbors(0, 1))
console.log('4, 4 neighbors: ' + boardy.liveNeighbors(4, 4))

boardy.clearGrid()
boardy.printGrid()