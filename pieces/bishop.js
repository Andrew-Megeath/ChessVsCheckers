import {chessMoveToTile, diagonalRangerCanMoveToTile} from "./pieceUtil.js"

class Bishop{
    name = "Bishop"
    isChecker = false

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return diagonalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return chessMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)
    }
}

export {Bishop}