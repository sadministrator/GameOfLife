'use strict';

$('#api').click(function(event) {
    console.log('api')
})

$('#rows').change(function(event) {
    console.log('Updated rows: ' + $('#rows').val())
    game.setHeight($('#rows').val())
    console.log('Proof: ' + game.getHeight() + ' board too: ' + game.board.getHeight())
})

$('#cols').change(function(event) {
    console.log('Updated cols: ' + $('#cols').val())
    game.setWidth($('#cols').val())
    console.log('Proof: ' + game.getWidth() + ' board too: ' + game.board.getWidth())
})

$('#create').click(function(event) {
    console.log('Created board.')
    game.setHeight($('#rows').val())
    game.setWidth($('#cols').val())
    game.setDelay($('#delay').val())
    game.board.grid = game.board.createGrid()
    game.board.resultsGrid = game.board.createGrid()
    console.log(game.board.grid)
    //game.board.clearGrid()
    game.createTable()
    game.render()
})

$('#delay').change(function(event) {
    console.log('Updated delay: ' + $('#delay').val())
    game.setDelay($('#delay').val())
})

$('#play').click(function(event) {
    console.log('Game playing.')
    //game.setHeight($('#rows').val())
    //game.setWidth($('#cols').val())
    game.setDelay($('#delay').val())
    game.setPause(false)
    game.play(game)
    $(this).addClass('inactive')
    $('#next').addClass('inactive')
    $('#pause').removeClass('inactive')
})

$('#pause').click(function(event) {
    console.log('Game paused.')
    game.setPause(true)
    $(this).addClass('inactive')
    ('#play').removeClass('inactive')
    ('#next').removeClass('inactive')
})

$('#next').click(function(event) {
    console.log('Next frame.')
    game.next()
})

$('#clear').click(function(event) {
    console.log('Grid cleared.')
    game.board.clearGrid()
    game.render()
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
                cell.attr('x', col);
                cell.attr('y', row)
                //if(this.board.getCell(col, row) == ALIVE) {
                //    cell.css('background', 'green')
                //} else {
                //    cell.css('background', 'red')
                //}
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