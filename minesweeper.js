document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells: [
        {
            row: 0,
            col: 0,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 0,
            col: 1,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 0,
            col: 2,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 1,
            col: 0,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 1,
            col: 1,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 1,
            col: 2,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 2,
            col: 0,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 2,
            col: 1,
            isMine: false,
            hidden: true,
            isMarked: false
        }, {
            row: 2,
            col: 2,
            isMine: true,
            hidden: true,
            isMarked: false
        }
    ]
};

function startGame() {

    // When left mouse click detected run checkForWin function
    document.addEventListener('click', checkForWin)
    // When right mouse click detected run checkForWin function
    document.addEventListener('contextmenu', checkForWin)

    for (var i = 0; i < board['cells'].length; i++) {
        board['cells'][i].surroundingMines = countSurroundingMines(board['cells'][i])
    }

    // Don't remove this function call: it makes the game work!
    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
    for (var i = 0; i < board.cells.length; i++) {

        if ((board.cells[i].isMine === true) && (board.cells[i].isMarked === false)) {
            // Not all the mine cells have been marked
            return
        }

        if ((board.cells[i].isMine === true) && (board.cells[i].isMarked === true)) {
            // Check if all the mines are marked.
            // Then check if any safe cells on the board are marked
            for (var j = 0; j < board.cells.length; j++) {
                if (board.cells[j].isMine === false && board.cells[j].isMarked === true) {
                    // There are still some safe cells that have not been revealed
                    return
                } else {
                    // All the mines have been marked and all safe cells have been revealed
                    lib.displayMessage('You win!')
                }
            }

        }
        // You can use this function call to declare a winner (once you've
        // detected that they've won, that is!)
        //   lib.displayMessage('You win!')
    }
}
    // Define this function to count the number of mines around the cell
    // (there could be as many as 8). You don't have to get the surrounding
    // cells yourself! Just use `lib.getSurroundingCells`:
    //
    //   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
    //
    // It will return cell objects in an array. You should loop through
    // them, counting the number of times `cell.isMine` is true.

    function countSurroundingMines(cell) {
        var mines = []
        var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);

        for (var i = 0; i < surroundingCells.length; i++) {
            if (surroundingCells[i].isMine === true) {
                mines.push(surroundingCells[i]);
            } else {}
        }
        return mines.length;
    }
