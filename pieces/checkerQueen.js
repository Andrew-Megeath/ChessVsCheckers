import {checkerMoveToTile, omniCheckerCanMoveToTile} from "./pieceUtil.js"

class CheckerQueen{
    name = "CheckerQueen"
    isChecker = true

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return omniCheckerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return checkerMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)
    }
}

export {CheckerQueen}