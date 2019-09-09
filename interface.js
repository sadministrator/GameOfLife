'use strict';

$('#api').click(function(event) {
    console.log('api')
})

$('#rows').change(function(event) {
    console.log('rows: ' + $('#rows').val())
})

$('#cols').change(function(event) {
    console.log('cols: ' + $('#cols').val())
})

$('#create').click(function(event) {
    console.log('create')
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