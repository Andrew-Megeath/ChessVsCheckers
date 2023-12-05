import {Capture} from "./../../Capture.js"

function chessPieceAtTile(row, col, board){
    return !!(board[row][col] && !board[row][col].isChecker)
}

function omniCheckerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
    const rowDiff = targetRow - currentRow
    const colDiff = targetCol - currentCol
    const absRowDiff = Math.abs(rowDiff)
    const absColDiff = Math.abs(colDiff)

    if(absRowDiff === 1 && absColDiff === 1){
        return !board[targetRow][targetCol] || !board[targetRow][targetCol].isChecker
    }else if(absRowDiff === 2 && absColDiff === 2 && !board[targetRow][targetCol]){
        const jumpOverPiece = board[currentRow + rowDiff*0.5][currentCol + colDiff*0.5]
        return jumpOverPiece ? !jumpOverPiece.isChecker : false
    }
}

function rangerCanMoveToTile(condition, currentRow, currentCol, targetRow, targetCol, board){
    const rowDiff = targetRow - currentRow
    const colDiff = targetCol - currentCol

    if(condition(rowDiff, colDiff)){
        const rowInc = Math.sign(rowDiff)
        const colInc = Math.sign(colDiff)
        let stepRow = currentRow
        let stepCol = currentCol

        while(stepRow !== targetRow || stepCol !== targetCol){
            stepRow += rowInc
            stepCol += colInc

            if(board[stepRow][stepCol]){
                return stepRow === targetRow && stepCol === targetCol && board[stepRow][stepCol].isChecker
            }
        }

        return true
    }else{
        return false
    }
}

function cardinalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
    return rangerCanMoveToTile(
        (rowDiff, colDiff) => rowDiff === 0 ^ colDiff === 0,
        currentRow, currentCol, targetRow, targetCol, board
    )
}

function diagonalRangerCanMoveToTile(currentRow, currentCol, targetRow, targetCol, board){
    return rangerCanMoveToTile(
        (rowDiff, colDiff) => rowDiff !== 0 && Math.abs(rowDiff) === Math.abs(colDiff),
        currentRow, currentCol, targetRow, targetCol, board
    )
}

function checkerMoveToTile(piece, currentRow, currentCol, targetRow, targetCol, board){
    const landedOnPiece = board[targetRow][targetCol]
    board[targetRow][targetCol] = piece
    board[currentRow][currentCol] = null

    const distance = Math.abs(targetRow - currentRow)

    if(distance === 1){
        if(landedOnPiece){
            return new Capture(targetRow, targetCol, landedOnPiece)
        }
    }else if(distance === 2){
        const captureRow = (currentRow + targetRow)*0.5
        const captureCol = (currentCol + targetCol)*0.5

        const hoppedOverPiece = board[captureRow][captureCol]
        board[captureRow][captureCol] = null

        return new Capture(captureRow, captureCol, hoppedOverPiece)
    }
}

function chessMoveToTile(piece, currentRow, currentCol, targetRow, targetCol, board){
    const capturedPiece = board[targetRow][targetCol]
    board[targetRow][targetCol] = piece
    board[currentRow][currentCol] = null

    if(capturedPiece){
        return new Capture(targetRow, targetCol, capturedPiece)
    }
}

export {
    chessPieceAtTile, omniCheckerCanMoveToTile, cardinalRangerCanMoveToTile, diagonalRangerCanMoveToTile,
    checkerMoveToTile, chessMoveToTile
}