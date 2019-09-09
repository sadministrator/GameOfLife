'use strict';

$('#api').click(function(event) {
    console.log('api')
})

$('#rows').change(function(event) {
    console.log('Updated rows: ' + $('#rows').val())
    game.setHeight($('#rows').val())
})

$('#cols').change(function(event) {
    console.log('Updated cols: ' + $('#cols').val())
    game.setWidth($('#cols').val())
})

$('#create').click(function(event) {
    console.log('Create board.')
    game.render()
})

$('#delay').change(function(event) {
    console.log('Updated delay: ' + $('#delay').val())
    game.setDelay($('#delay').val())
})

$('#play').click(function(event) {
    console.log('Game playing.')
    game.setPause(false)
    game.play(game)
    // make next unclickable
})

$('#pause').click(function(event) {
    console.log('Game paused.')
    game.setPause(true)
})

$('#next').click(function(event) {
    console.log('Next frame.')
    game.next()
})

$('#clear').click(function(event) {
    console.log('Grid cleared.')
    game.board.clearGrid()
})

class UI {
    constructor(width, height, delay) {
        this.width = width
        this.height = height
        this.delay = delay
        this.pause = true
        this.board = new Board(width, height)
    }

    getWidth() {
        return this.width
    }

    setWidth(width) {
        this.width = width
        this.board.setWidth(width)
    }

    getHeight() {
        return this.height
    }

    setHeight(height) {
        this.height = height
        this.board.setHeight(height)
    }

    getDelay() {
        return this.delay
    }

    setDelay(delay) {
        this.delay = delay
    }

    getPause() {
        return this.pause
    }

    setPause(pause) {
        this.pause = pause
    }

    render() {

    }

    next() {
        this.board.tick()
        this.render()
        this.board.printGrid()
    }

    play(obj) {
        let intervalId = setInterval(function() {
            if(obj.getPause() || obj.board.deadGrid()) {
                clearInterval(intervalId)
            } else {
                obj.next()
            }
        })
    }
}

let game = new UI(10, 10, 50)

game.board.setCell(game.board.grid, 0, 0, ALIVE)
game.board.setCell(game.board.grid, 4, 5, ALIVE)
game.board.setCell(game.board.grid, 2, 8, ALIVE)
game.board.setCell(game.board.grid, 9, 5, ALIVE)
game.board.setCell(game.board.grid, 8, 2, ALIVE)
game.board.setCell(game.board.grid, 3, 3, ALIVE)
game.board.setCell(game.board.grid, 5, 1, ALIVE)
game.board.setCell(game.board.grid, 4, 4, ALIVE)
game.board.setCell(game.board.grid, 0, 1, ALIVE)
game.board.setCell(game.board.grid, 4, 6, ALIVE)
game.board.setCell(game.board.grid, 2, 9, ALIVE)
game.board.setCell(game.board.grid, 9, 6, ALIVE)
game.board.setCell(game.board.grid, 8, 3, ALIVE)
game.board.setCell(game.board.grid, 3, 4, ALIVE)
game.board.setCell(game.board.grid, 5, 2, ALIVE)
game.board.setCell(game.board.grid, 4, 5, ALIVE)

game.board.printGrid()