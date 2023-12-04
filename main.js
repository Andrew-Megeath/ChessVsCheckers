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
    [C, C, C, CQ, CQ, C, C, C],
    [C, C, C, C, C, C, C, C],
    [E, E, E, P, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E],
    [P, P, P, P, P, P, P, P],
    [R, KT, B, Q, KG, B, KT, R]
]

const SELECTED_COLOR = "#5bd10d"
const PROSPECT_COLOR = "#0CDDF0"

class Tile{
    constructor(row, col, node){
        this.row = row
        this.col = col
        this.node = node
    }
}

let board = null
let checkerTurn = true
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
    board = new Array(8)
    checkerTurn = true
    selectedTile = null

    for(let row = 0; row <= 7; row++){
        board[row] = new Array(8)

        for(let col = 0; col <= 7; col++){
            const tileNode = getTileNode(row, col)

            if(BOARD_LAYOUT[row][col]){
                const pieceName = BOARD_LAYOUT[row][col]
                board[row][col] = new PIECE_CLASSES[pieceName]()
                renderPiece(tileNode, pieceName)
            }else{
                renderEmpty(tileNode)
            }
        }
    }


}

function clearSelection(){
    selectedTile.node.style.backgroundColor = null
    selectedTile = null
    prospectTiles.forEach(tile => tile.node.style.backgroundColor = null)
    prospectTiles = []
}

function onTileClicked(event){
    const clickedTileNode = event.target.tagName.toLowerCase() === "img" ? event.target.parentNode : event.target

    const clickedRow = Number(clickedTileNode.id.slice(0, 1))
    const clickedCol = Number(clickedTileNode.id.slice(2, 3))
    const clickedPiece = board[clickedRow][clickedCol]

    if(clickedPiece && clickedPiece.isChecker === checkerTurn){
        if(selectedTile){
            clearSelection()
        }

        selectedTile = new Tile(clickedRow, clickedCol, clickedTileNode)
        clickedTileNode.style.backgroundColor = SELECTED_COLOR

        for(let prospectRow = 1; prospectRow <= 7; prospectRow++){
            for(let prospectCol = 1; prospectCol <= 7; prospectCol++){
                if(clickedPiece.canMoveToTile(clickedRow, clickedCol, prospectRow, prospectCol, board)){
                    const prospectNode = getTileNode(prospectRow, prospectCol)

                    prospectTiles.push(new Tile(prospectRow, prospectCol, prospectNode))
                    prospectNode.style.backgroundColor = PROSPECT_COLOR
                }
            }
        }
    }else if(selectedTile){
        const selectedPiece = board[selectedTile.row][selectedTile.col]

        if(selectedPiece.canMoveToTile(selectedTile.row, selectedTile.col, clickedRow, clickedCol, board)){
            const capture = selectedPiece.moveToTile(selectedTile.row, selectedTile.col, clickedRow, clickedCol, board)
            if(capture){
                renderEmpty(getTileNode(capture.row, capture.col))
            }

            renderPiece(clickedTileNode, board[clickedRow][clickedCol].name)
            renderEmpty(selectedTile.node)
            clearSelection()

            checkerTurn = !checkerTurn
        }
    }

}

document.querySelectorAll(".tile").forEach(tile => {tile.addEventListener("click", onTileClicked)})

startNewGame()