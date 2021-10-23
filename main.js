const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let gameBoard = document.querySelector('.game-board__container');
let miniscoreBoard = document.querySelector('.mini-score-board__container__block');
const width = 10;
let arrayBoard = [];
//función que genera los bloques individuales de ambos tableros. Cada bloque (blockDOM) tiene un bloque dentro de él (insideblockDOM). 
//Esta función devuelve blockDOM para poder utilizarla en la función drawBoard()

function generateBoardBlock() {
    const blockDOM = document.createElement('div');
    const insideblockDOM = document.createElement('div');
    blockDOM.classList.add('block');
    insideblockDOM.classList.add('insideblock');
    blockDOM.appendChild(insideblockDOM);
    makeBlock = blockDOM;
    return blockDOM;
}

//Esta función pinta tantos bloques como width y heigth tenga nuestro tablero. 
function drawBoard(boardclass, width, heigth) {
    for (let i = 0; i < width * heigth; i++) {
        const printBlock = generateBoardBlock();
        boardclass.appendChild(printBlock);
    }
}
drawBoard(gameBoard, BOARD_WIDTH, BOARD_HEIGHT);
drawBoard(miniscoreBoard, 4, 4);


//Tetrominos 

const boardBlocks = gameBoard.querySelectorAll('.block'); //Selección de todos los divs dentro de gameBoard
//Array.from genera un array usando el objeto devuelto por querySelectorAll(). De esta forma podemos iterar sobre el array usando el index.
//Al asignar una variable width a 10, podemos usar width como coordenada para iterar sobre las filas.
arrayBoard = Array.from(boardBlocks);
let currentPosition = 0;

Itetromino = [
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1]
]

Ltetromino = [
    [width, width + 1, width + 2, width * 2],
    [0, 1, width + 1, width * 2 + 1],
    [2, width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2]
]

Stetromino = [
    [1, 2, width, width + 1],
    [1, width + 1, width + 2, width * 2 + 2],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1]
]

Ztetromino = [
    [0, 1, width + 1, width + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2]
]

Jtetromino = [
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [0, width, width + 1, width + 2],
    [1, 2, width + 1, width * 2 + 1]
]

Otetromino = [
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
    [width + 1, width + 2, width * 2 + 1, width * 2 + 2]
]

Ttetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]

const allTetrominos = [Itetromino, Ltetromino, Stetromino, Ztetromino, Jtetromino, Otetromino, Ttetromino];
let chosenTetromino = allTetrominos[1][3]; //Tetromino de ejemplo

function drawTetromino() {
    chosenTetromino.forEach(index => {
        arrayBoard[currentPosition + index].classList.add('board__tetromino');
    })
}

drawTetromino()
