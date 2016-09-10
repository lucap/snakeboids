
var GRID_SIZE = 100
var DIRECTIONS = {
    up:    [-1, 0],
    down:  [1, 0],
    right: [0, 1],
    left:  [0, -1],
}

var snakes = []

function cell_to_element(cell) {
    return $('table').find('tr').eq(cell[0]).find('td').eq(cell[1]);
}

function random_empty_cell() {
    var x = Math.floor(Math.random() * GRID_SIZE);
    var y = Math.floor(Math.random() * GRID_SIZE);
    if (cell_to_element([x,y]).attr('class') !== undefined) {
        return random_empty_cell($table);
    }
    return [x,y];
}

function draw_loop() {
    move_snake(snakes[0], 'up');
    window.requestAnimationFrame(draw_loop);
}

function move_snake(snake, direction) {
    var head = snake[0];
    var move_vector = DIRECTIONS[direction];
    var new_head = [head[0] + move_vector[0], head[1] + move_vector[1]]
    snake.unshift(new_head); // insert in the front
    var tail = snake.pop();  // remove from the back

    cell_to_element(tail).removeClass('snake')
    cell_to_element(new_head).addClass('snake')
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
    var start_cell = random_empty_cell();
    snakes.push([
        start_cell,
        [start_cell[0]+1, start_cell[1]],
        [start_cell[0]+2, start_cell[1]],
        [start_cell[0]+3, start_cell[1]],
    ]);
    window.requestAnimationFrame(draw_loop);
});
