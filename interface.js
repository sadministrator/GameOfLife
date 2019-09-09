'use strict';

$('#api').click(function(event) {
    console.log('api')
})

$('#rows').change(function(event) {
    console.log('rows: ' + $('#rows').val())
    game.setHeight($('#rows').val())
})

$('#cols').change(function(event) {
    console.log('cols: ' + $('#cols').val())
    game.setWidth($('#cols').val())
})

$('#create').click(function(event) {
    console.log('create')
    game.render()
})

$('#delay').change(function(event) {
    console.log('delay: ' + $('#delay').val())
})

$('#play').click(function(event) {
    console.log('play')
})

$('#pause').click(function(event) {
    console.log('pause')
})

$('#next').click(function(event) {
    console.log('next')
})

$('#clear').click(function(event) {
    console.log('clear')
})

class Interface {
    constructor(width, height, delay) {
        this.width = width
        this.height = height
        this.delay = delay
        this.pause = true
        this.board = new Board(width. height)
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

    render() {
        
    }
}

let game = new Interface(10, 10, 100)