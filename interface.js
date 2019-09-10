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
    console.log('Created board.')
    game.setHeight($('#rows').val())
    game.setWidth($('#cols').val())
    game.setDelay($('#delay').val())
    game.createTable()
})

$('#delay').change(function(event) {
    console.log('Updated delay: ' + $('#delay').val())
    game.setDelay($('#delay').val())
})

$('#play').click(function(event) {
    console.log('Game playing.')
    game.setHeight($('#rows').val())
    game.setWidth($('#cols').val())
    game.setDelay($('#delay').val())
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

$('#table').on('click', 'td', function(event) {
    game.toggleCell($(this).attr('x'), $(this).attr('y'))
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

    createTable() {
        var table = $('#table');
        table.empty()

        for(var col = 0; col < this.getWidth(); col++) {
            var tableRow = $('<tr>');
            table.append(tableRow)
            for(var row = 0; row < this.getHeight(); row++) {
                var cell = $('<td id="' + col + '-' + row + '">')
                cell.attr('x', col);
                cell.attr('y', row)
                if(this.board.getCell(col, row) == ALIVE) {
                    cell.css('background', 'green')
                } else {
                    cell.css('background', 'red')
                }
                tableRow.append(cell);
            }
        }
    }

    toggleCell(x, y) {
        if(this.board.getCell(x, y) == ALIVE) {
            this.board.setCell(this.board.grid, x, y, DEAD)
            $('#' + x + '-' + y).css('backgroundColor', 'red')
        } else {
            this.board.setCell(this.board.grid, x, y, ALIVE)
            $('#' + x + '-' + y).css('backgroundColor', 'green')
        }
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

    render() {
        for(let col = 0; col < this.getWidth(); col++) {
            for(let row = 0; row < this.getHeight(); row++) {
                if(this.board.getCell(col, row) == ALIVE) {
                    $('#' + col + '-' + row).css('backgroundColor', 'green')
                } else {
                    $('#' + col + '-' + row).css('backgroundColor', 'red')
                }
            }
        }
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