import {CheckerQueen} from "./checkerQueen.js"
import {checkerMoveToTile, omniCheckerCanMoveToTile} from "./pieceUtil.js"

class Checker{
    name = "Checker"
    isChecker = true

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        return omniCheckerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board)
            && targetRow - currentRow > 0
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        const capture = checkerMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)

        if(targetRow === 7){
            board[targetRow][targetCol] = new CheckerQueen()
        }

        return capture
    }
}

export {Checker}