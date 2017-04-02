document.addEventListener('DOMContentLoaded', startGame)

//Define your `board` object here!
var board = {
    cells: []
}

var scatterMines = function(board) {
    // This function take board object and randomly scatters mines into the board.

    var mineCount = Math.ceil((15 / 100) * board.cells.length)
    // Gets the number of mines that will be used on this sized board.
    // 15 Percent of cells will be mines

    for (var i = 0; i < mineCount; i++) {
        // Choose a random cell on board
        var mineIndex = Math.floor((Math.random() * board.cells.length) + 0);

        // Make cell a mine
        board.cells[mineIndex].isMine = true;
    }

}

var generateBoard = function(cellNumber) {
    // boardSize is the number of cells across and down
    // confirm that cellNumber variable is a number and is divisiable by 2
    if (!isNaN(cellNumber) && (cellNumber % 2 === 0) && (cellNumber > 4)) {
        alert("You entered a valid number")
        var boardSize = cellNumber

        var r = 0
        var c = 0

        for (var r = 0; r < boardSize; r++) {
            // Outer loop. Create all cells along row
            var cell = {
                row: r,
                col: c,
                isMine: false,
                hidden: true,
                isMarked: false
            }
            board.cells.push(cell);

            // Inner loop. Create all cells down column
            for (var c = 1; c < boardSize; c++) {
                var cell = {
                    row: r,
                    col: c,
                    isMine: false,
                    hidden: true,
                    isMarked: false
                }
                board.cells.push(cell);
            }
        }
    scatterMines(board);
    } else {
        alert('That is not a valid table size')
    }
}

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


var UserInput = prompt('How cell across would you like your board? (must be bigger than four)');

generateBoard(UserInput);
