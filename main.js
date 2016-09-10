
var GRID_SIZE = 100
var NUM_SNAKES = 30
var SNAKE_LENGTH = 1
var COLLISION_THRESHOLD = 50
var DIRECTIONS = [
    [-1, 0], // up
    [1, 0],  // down
    [0, 1],  // right
    [0, -1], // left
]

var snakes = []

function cell_to_element(cell) {
    return $('table').find('tr').eq(cell[0]).find('td').eq(cell[1]);
}

function random_element(elements) {
    return elements[Math.floor(Math.random()*elements.length)];
}

function random_empty_cell() {
    var x = Math.floor(Math.random() * GRID_SIZE);
    var y = Math.floor(Math.random() * GRID_SIZE);
    if (cell_to_element([x,y]).attr('class') !== undefined) {
        return random_empty_cell($table);
    }
    return [x,y];
}

function vector_to_direction(vector) {
    var direction = [0,0];
    if (Math.abs(vector[0]) >= Math.abs(vector[1])) {
        direction[0] = vector[0] >= 0 ? 1 : -1;
    } else {
        direction[1] = vector[1] >= 0 ? 1 : -1;
    }
    return direction;
}

function collision_avoidance(current_snake) {
    var vector = [0,0]
    for (var other_snake of snakes) {

        if (current_snake.id !== other_snake.id) {
            var current_head = current_snake.cells[0];
            var other_head = other_snake.cells[0];
            var distance = Math.abs(Math.hypot(
                current_head[0]-other_head[0],
                current_head[1]-other_head[1]
            ))
            if (distance <= COLLISION_THRESHOLD) {
                vector[0] = vector[0] - (other_head[0] - current_head[0]);
                vector[1] = vector[1] - (other_head[1] - current_head[1]);
            }
        }
    }
    return vector;
}

function draw_loop() {
    for (var snake of snakes) {
        var c_vector = collision_avoidance(snake);
        snake.heading = vector_to_direction(c_vector);
        move_snake(snake);
    }
    window.requestAnimationFrame(draw_loop);
}

function init_snakes() {
    for (i = 0; i < NUM_SNAKES; i++) {
        snakes.push({
            id: Math.random(),
            heading: random_element(DIRECTIONS),
            length: SNAKE_LENGTH,
            cells: [random_empty_cell()],
        });
    }
}

function move_snake(snake) {
    var head = snake.cells[0];
    var direction = snake.heading;
    var new_head = [head[0] + direction[0], head[1] + direction[1]]
    snake.cells.unshift(new_head); // insert in the front
    cell_to_element(new_head).addClass('snake')

    while (snake.cells.length > snake.length) {
        var tail = snake.cells.pop();  // remove from the back
        cell_to_element(tail).removeClass('snake');
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
    init_snakes();
    window.requestAnimationFrame(draw_loop);
});
