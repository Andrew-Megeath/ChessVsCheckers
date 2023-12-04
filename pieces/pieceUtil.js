import {Capture} from "./../../Capture.js"

function checkerMoveToTile(piece, currentRow, currentCol, targetRow, targetCol, board){
    board[targetRow][targetCol] = piece
    board[currentRow][currentCol] = null

    if(Math.abs(targetRow - currentRow) === 2){
        const captureRow = (currentRow + targetRow)*0.5
        const captureCol = (currentCol + targetCol)*0.5
        const capturedPiece = board[captureRow][captureCol]
        board[captureRow][captureCol] = null
        return new Capture(captureRow, captureCol, capturedPiece)
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

export {checkerMoveToTile, chessMoveToTile}