import {chessMoveToTile} from "./pieceUtil.js"
import {Queen} from "./queen.js"

class Pawn{
    name = "Pawn"
    isChecker = false
    firstMove = true

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        const rowDiff = targetRow - currentRow
        const colDiff = targetCol - currentCol

        if(board[targetRow][targetCol]){
            return board[targetRow][targetCol].isChecker && rowDiff === -1 && Math.abs(colDiff) === 1
        }else{
            return ((this.firstMove && rowDiff === -2 && !board[currentRow - 1][currentCol]) || rowDiff === -1)
                && colDiff === 0
        }
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        const capture = chessMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)

        this.firstMove = false
        if(targetRow === 0){
            board[targetRow][targetCol] = new Queen()
        }

        return capture
    }
}

export {Pawn}