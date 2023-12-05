import {cardinalRangerCanMoveToTile, chessMoveToTile} from "./pieceUtil.js"

class Rook{
    name = "Rook"
    isChecker = false

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return cardinalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return chessMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)
    }
}

export {Rook}