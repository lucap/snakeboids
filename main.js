
GRID_SIZE = 100

function random_empty_cell($table) {
    var x = Math.floor(Math.random() * GRID_SIZE);
    var y = Math.floor(Math.random() * GRID_SIZE);
    $cell = $table.find('tr').eq(x).find('td').eq(y);
    if ($cell.attr('class') !== undefined) {
        return random_empty_cell($table);
    }
    return $cell;
}

function draw_loop() {
    $cell = random_empty_cell($('table'));
    $cell.addClass('fruit');
    window.requestAnimationFrame(draw_loop);
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
    window.requestAnimationFrame(draw_loop);
});
