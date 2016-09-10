
var GRID_SIZE = 100
var DIRECTIONS = {
    up:    [-1, 0],
    down:  [1, 0],
    right: [0, 1],
    left:  [0, -1],
}

var snakes = []

function random_empty_cell($table) {
    var x = Math.floor(Math.random() * GRID_SIZE);
    var y = Math.floor(Math.random() * GRID_SIZE);
    $cell = $table.find('tr').eq(x).find('td').eq(y);
    if ($cell.attr('class') !== undefined) {
        return random_empty_cell($table);
    }
    return [x,y];
}

function draw_loop() {
    move_snake(snakes[0], 'left');
    window.requestAnimationFrame(draw_loop);
}

function move_snake(snake, direction) {
    var head = snake[0];
    var move_vector = DIRECTIONS[direction];
    var new_head = [head[0] + move_vector[0], head[1] + move_vector[1]]
    snake.unshift(new_head);
    for (var cell of snake) {
        $cell = $('table').find('tr').eq(cell[0]).find('td').eq(cell[1]);
        $cell.addClass('snake');
    }
}

function draw_grid() {
    var $table = $('table');
    for (i = 0; i < GRID_SIZE; i++) {
        var $row = $('<tr>');
        for (j = 0; j < GRID_SIZE; j++) {
            $row.append('<td>');
        }
        $table.append($row);
    }
}

$(document).ready(function() {
    draw_grid();
    var start_cell = random_empty_cell($('table'));
    snakes.push([start_cell]);
    window.requestAnimationFrame(draw_loop);
});
