import {chessPieceAtTile, chessMoveToTile} from "./pieceUtil.js"

class Knight{
    name = "Knight"
    isChecker = false

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        if(chessPieceAtTile(targetRow, targetCol, board)){
            return false
        }

        const absRowDiff = Math.abs(targetRow - currentRow)
        const absColDiff = Math.abs(targetCol - currentCol)

        return (absRowDiff === 1 && absColDiff === 2) || (absRowDiff === 2 && absColDiff === 1)
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return chessMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)
    }
}

export {Knight}