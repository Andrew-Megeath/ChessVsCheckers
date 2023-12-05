import {Checker} from "./pieces/checker.js"
import {CheckerQueen} from "./pieces/checkerQueen.js"
import {Pawn} from "./pieces/pawn.js"
import {Knight} from "./pieces/knight.js"
import {Bishop} from "./pieces/bishop.js"
import {Rook} from "./pieces/rook.js"
import {Queen} from "./pieces/queen.js"
import {King} from "./pieces/king.js"

const C = "Checker"
const CQ = "CheckerQueen"
const P = "Pawn"
const KT = "Knight"
const B = "Bishop"
const R = "Rook"
const Q = "Queen"
const KG = "King"
const E = ""

const PIECE_CLASSES = {}
PIECE_CLASSES[C] = Checker
PIECE_CLASSES[CQ] = CheckerQueen
PIECE_CLASSES[P] = Pawn
PIECE_CLASSES[KT] = Knight
PIECE_CLASSES[B] = Bishop
PIECE_CLASSES[R] = Rook
PIECE_CLASSES[Q] = Queen
PIECE_CLASSES[KG] = King

const BOARD_LAYOUT = [
    [CQ, CQ, CQ, CQ, CQ, CQ, CQ, CQ],
    [C, C, C, C, C, C, C, C],
    [E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [P, P, P, P, P, P, P, P],
    [R, KT, B, Q, KG, B, KT, R]
]

const SELECTED_COLOR_LIGHT = "#79c746"
const SELECTED_COLOR_DARK = "#347508"
const PROSPECT_COLOR_LIGHT = "#64d8e3"
const PROSPECT_COLOR_DARK = "#077f8a"

class Tile{
    constructor(row, col, node){
        this.row = row
        this.col = col
        this.node = node
    }
}

let turnNode = null
let numTurnsValNode = null

let gameRunning = false
let board = null
let numTurns = 0
let numCheckers = 0
let selectedTile = null
let prospectTiles = []

function getTileNode(row, col){
    return document.getElementById(row + ":" + col)
}

function renderPiece(tileNode, pieceName){
    tileNode.innerHTML = '<img class="piece" id="' + pieceName + '" src="resources/' + pieceName + '.png">'
}

function renderEmpty(tileNode){
    tileNode.innerHTML = '<img class="placeholder" src="resources/Placeholder.png">'
}

function startNewGame(){
    gameRunning = true
    board = new Array(8)
    numTurns = 0
    numCheckers = 0
    selectedTile = null
    prospectTiles = []

    for(let row = 0; row <= 7; row++){
        board[row] = new Array(8)

        for(let col = 0; col <= 7; col++){
            const tileNode = getTileNode(row, col)

            if(BOARD_LAYOUT[row][col]){
                const pieceName = BOARD_LAYOUT[row][col]
                const piece = new PIECE_CLASSES[pieceName]()

                board[row][col] = piece
                renderPiece(tileNode, pieceName)

                if(piece.isChecker){
                    numCheckers++
                }
            }else{
                renderEmpty(tileNode)
            }
        }
    }
}

function endGame(winner){
    gameRunning = false
    turnNode.innerHTML = winner + " wins!"
}

function clearSelection(){
    selectedTile.node.style.backgroundColor = null
    selectedTile = null
    prospectTiles.forEach(tile => tile.node.style.backgroundColor = null)
    prospectTiles = []
}

function isEvenTile(row, col){
    return (row + col)%2 !== 0
}

function isCheckerTurn(){
    return numTurns%2 === 0
}

function onTileClicked(event){
    if(!gameRunning){
        return
    }

    const clickedTileNode = event.target.tagName.toLowerCase() === "img" ? event.target.parentNode : event.target

    const clickedRow = Number(clickedTileNode.id.slice(0, 1))
    const clickedCol = Number(clickedTileNode.id.slice(2, 3))
    const clickedPiece = board[clickedRow][clickedCol]

    if(clickedPiece && clickedPiece.isChecker === isCheckerTurn()){
        if(selectedTile){
            clearSelection()
        }

        selectedTile = new Tile(clickedRow, clickedCol, clickedTileNode)
        if(isEvenTile(clickedRow, clickedCol)){
            clickedTileNode.style.backgroundColor = SELECTED_COLOR_DARK
        }else{
            clickedTileNode.style.backgroundColor = SELECTED_COLOR_LIGHT
        }

        for(let prospectRow = 0; prospectRow <= 7; prospectRow++){
            for(let prospectCol = 0; prospectCol <= 7; prospectCol++){
                if(clickedPiece.canMoveToTile(clickedRow, clickedCol, prospectRow, prospectCol, board)){
                    const prospectTileNode = getTileNode(prospectRow, prospectCol)
                    prospectTiles.push(new Tile(prospectRow, prospectCol, prospectTileNode))

                    if(isEvenTile(prospectRow, prospectCol)){
                        prospectTileNode.style.backgroundColor = PROSPECT_COLOR_DARK
                    }else{
                        prospectTileNode.style.backgroundColor = PROSPECT_COLOR_LIGHT
                    }
                }
            }
        }
    }else if(selectedTile){
        const selectedPiece = board[selectedTile.row][selectedTile.col]

        if(selectedPiece.canMoveToTile(selectedTile.row, selectedTile.col, clickedRow, clickedCol, board)){
            const capture = selectedPiece.moveToTile(selectedTile.row, selectedTile.col, clickedRow, clickedCol, board)
            if(capture){
                renderEmpty(getTileNode(capture.row, capture.col))

                if(capture.piece.isChecker){
                    numCheckers--
                    if(numCheckers === 0){
                        endGame("Chess")
                    }
                }else if(capture.piece.name === KG){
                    endGame("Checkers")
                }
            }

            renderPiece(clickedTileNode, board[clickedRow][clickedCol].name)
            renderEmpty(selectedTile.node)
            clearSelection()

            if(gameRunning){
                numTurnsValNode.innerHTML = ++numTurns
                turnNode.innerHTML = isCheckerTurn() ? "Checkers' turn" : "Chess's turn"
            }
        }
    }
}

function onResetClicked(_event){
    document.querySelectorAll(".tile").forEach(tile => tile.style.backgroundColor = null)

    turnNode.innerHTML = "Checkers' turn"
    numTurnsValNode.innerHTML = "0"

    startNewGame()
}

window.addEventListener("DOMContentLoaded", () => {
    turnNode = document.getElementById("turn")
    numTurnsValNode = document.getElementById("numTurnsVal")

    document.querySelectorAll(".tile").forEach(tile => {tile.addEventListener("click", onTileClicked)})
    document.getElementById("reset").addEventListener("click", onResetClicked)

    startNewGame()
})