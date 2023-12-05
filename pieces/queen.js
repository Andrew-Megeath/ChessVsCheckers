import {cardinalRangerCanMoveToTile, chessMoveToTile, diagonalRangerCanMoveToTile} from "./pieceUtil.js"

class Queen{
    name = "Queen"
    isChecker = false

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return cardinalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
            || diagonalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return chessMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)
    }
}

export {Queen}