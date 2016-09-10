
GRID_SIZE = 100

function draw_grid() {
    $table = $('table');
    for (i = 0; i < GRID_SIZE; i++) {
        $row = $('<tr>');
        for (j = 0; j < GRID_SIZE; j++) {
            $row.append('<td>');
        }
        $table.append($row);
    }
}

$(document).ready(function() {
    draw_grid()
});
