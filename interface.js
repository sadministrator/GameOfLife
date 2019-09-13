'use strict';

$('#api').click(function(event) {
    console.log('api')
})

$('#rows').change(function(event) {
    game.createAll()
    console.log('Updated rows: ' + $('#rows').val())

})

$('#cols').change(function(event) {
    game.createAll()
    console.log('Updated cols: ' + $('#cols').val())
})

$('#create').click(function(event) {
    game.createAll()
    console.log('Created board.')
})

$('#delay').change(function(event) {
    console.log('Updated delay: ' + $('#delay').val())
    game.setDelay($('#delay').val())
})

$('#play').click(function(event) {
    $(this).attr('disabled', 'disabled')
    $('#next').attr('disabled', 'disabled')
    $('#pause').removeAttr('disabled')
    game.setDelay($('#delay').val())
    game.setPause(false)
    game.play(game)
    console.log('Game playing.')
})

$('#pause').click(function(event) {
    $(this).attr('disabled', 'disabled')
    $('#play').removeAttr('disabled')
    $('#next').removeAttr('disabled')
    game.setPause(true)
    console.log('Game paused.')
})

$('#next').click(function(event) {
    game.next()
    console.log('Next frame.')
})

$('#clear').click(function(event) {
    game.setPause(true)
    $('#pause').attr('disabled', 'disabled')
    game.board.clearGrid()
    game.render()
    console.log('Grid cleared.')
})

$('#table').on('click', 'td', function(event) {
    game.toggleCell($(this).attr('x'), $(this).attr('y'))
})

class UI {
    constructor(width, height, delay) {
        this.width = width
        $('#cols').val(width)

        this.height = height
        $('#rows').val(height)

        this.delay = delay
        $('#delay').val(delay)

        this.pause = true
        this.board = new Board(width, height)
        this.createTable()
        this.render()
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
                cell.attr('x', col)
                cell.attr('y', row)
                tableRow.append(cell);
            }
        }
    }

    createAll(){
        game.setHeight($('#rows').val())
        game.setWidth($('#cols').val())
        game.setDelay($('#delay').val())
        game.board.grid = game.board.createGrid()
        game.board.resultGrid = game.board.createGrid()
        game.createTable()
        game.render()
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

let game = new UI(13, 13, 100)

/*game.board.setCell(game.board.grid, 0, 0, ALIVE)
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

game.board.printGrid()*/