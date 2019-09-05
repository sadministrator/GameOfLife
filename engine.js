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

    printGrid() {
        let str = ''

        for(let i = 0; i < this.width; i++){
            this.grid[i].forEach(function (cell){
                str += cell + '|'
            })
            console.log(str)
            str = ''
            //console.log('\n')
        }
    }
}

let boardy = new Board(10, 8)

boardy.createGrid()
boardy.printGrid()