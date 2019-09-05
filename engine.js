'use strict'

const DEAD = 0
const ALIVE = 1

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.grid = this.createGrid(width, height)
    }

    createGrid(width, height) {
        let grid = []

        for(let i = 0; i < width; i++) {
            grid[i] = []
        }

        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++) {
                grid[i][j] = DEAD
            }
        }
        return grid
    }

    setCell(x, y, status) {
        if(this.grid[x][y] != undefined) {
            this.grid[x][y] = status
        }
        else {
            console.error("Out of bounds.")
        }
    }

    getCell(x, y) {
        return this.grid[x][y]
    }

    liveNeighbors(x, y) {
        let liveNeighbors = 0;

        if(this.getCell((x + this.width - 1) % this.width, (y + this.height + 1) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width) % this.width, (y + this.height + 1) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width + 1) % this.width, (y + this.height + 1) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width + 1) % this.width, (y + this.height) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width + 1) % this.width, (y + this.height - 1) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width) % this.width, (y + this.height - 1) % this.height) == ALIVE){
            liveNeighbors++;
        }
        if(this.getCell((x + this.width - 1) % this.width, (y + this.height - 1) % this.height) == ALIVE){
            liveNeighbors++;
        }

        if(this.getCell((x + this.width - 1) % this.width, (y + this.height) % this.height) == ALIVE){
            liveNeighbors++;
        }

        return liveNeighbors
    }

    nextState(x, y) {

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
boardy.setCell(5, 6, ALIVE)
boardy.setCell(8, 7, ALIVE)
boardy.setCell(1, 1, ALIVE)
boardy.setCell(0, 0, ALIVE)
boardy.setCell(7, 1, ALIVE)
boardy.setCell(2, 7, ALIVE)
boardy.setCell(4, 1, ALIVE)

boardy.printGrid()

console.log('0, 2 neighbors: ' + boardy.liveNeighbors(0, 2))
console.log('2, 0 neighbors: ' + boardy.liveNeighbors(2, 0))
console.log('0, 1 neighbors: ' + boardy.liveNeighbors(0, 1))
console.log('4, 4 neighbors: ' + boardy.liveNeighbors(4, 4))