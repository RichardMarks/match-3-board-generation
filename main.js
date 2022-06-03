function getRandomElementFromArray(arr) {
  const index = ~~(Math.random() * arr.length)
  const element = arr[index]
  return element
}

function hasMatch(board, numColumns, column, row, piece) {
  if (column > 1) {
    const rowOffset = row * numColumns
    const leftPiece = board[(column - 1) + rowOffset]
    const leftLeftPiece = board[(column - 2) + rowOffset]
    if (leftPiece && leftLeftPiece && leftPiece === leftLeftPiece && leftPiece === piece) {
      return true
    }
  }
  if (row > 1) {
    const topPiece = board[column + ((row - 1) * numColumns)]
    const topTopPiece = board[column + ((row - 2) * numColumns)]
    if (topPiece && topTopPiece && topPiece === topTopPiece && topPiece === piece) {
      return true
    }
  }
  return false
}

function generateBoard(numColumns, numRows, pieceTypes) {
  const BREAK_ITERATION = 100
  const numCells = numColumns * numRows
  const board = []
  for (let i = 0; i < numCells; i += 1) {
    let piece = getRandomElementFromArray(pieceTypes)
    const column = ~~(i % numColumns)
    const row = ~~(i / numColumns)
    
    let iterations = 0
    while (hasMatch(board, numColumns, column, row, piece) && iterations < BREAK_ITERATION) {
      piece = getRandomElementFromArray(pieceTypes)
      iterations += 1
    }
    
    board[column + (row * numColumns)] = piece
  }
  return board
}

const NUM_COLS = 8
const NUM_ROWS = 10
const PIECES = "abcdef".split('')

const board = generateBoard(NUM_COLS, NUM_ROWS, PIECES)

const out = []
for (let row = 0; row < NUM_ROWS; row += 1) {
  for (let column = 0; column < NUM_COLS; column += 1) {
    const cell = board[column + (row * NUM_COLS)]
    out.push(cell)
  }
  out.push('\n')
}

console.log(out.join(''))
