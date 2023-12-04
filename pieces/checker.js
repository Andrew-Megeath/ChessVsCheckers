import {checkerMoveToTile} from "./pieceUtil.js"

class Checker{
    name = "Checker"
    isChecker = true

    canMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
        if(board[targetRow][targetCol]){
            return false
        }

        const rowDiff = targetRow - currentRow
        const colDiff = targetCol - currentCol
        const absColDiff = Math.abs(colDiff)

        if(rowDiff === 1 && absColDiff === 1){
            return true
        }else if(rowDiff === 2 && absColDiff === 2){
            const jumpOverPiece = board[currentRow + 1][currentCol + colDiff*0.5]
            return jumpOverPiece ? !jumpOverPiece.isChecker : false
        }
    }

    moveToTile(currentRow, currentCol, targetRow, targetCol, board){
        const capture = checkerMoveToTile(this, currentRow, currentCol, targetRow, targetCol, board)

        if(targetRow === 7){
            board[targetRow][targetCol] = new CheckerQueenQueen()
        }

        return capture
    }
}

export {Checker}