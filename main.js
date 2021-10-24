const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let gameBoard = document.querySelector('.game-board__container');
let miniBoard = document.querySelector('.mini-board__container__block');
const width = 10;

//función que genera los bloques individuales de ambos tableros. Cada bloque (blockDOM) tiene un bloque dentro de él (insideblockDOM). 
//Esta función devuelve blockDOM para poder utilizarla en la función drawBoard()

function generateBoardBlock() {
    const blockDOM = document.createElement('div');
    const insideblockDOM = document.createElement('div');
    blockDOM.classList.add('block');
    insideblockDOM.classList.add('insideblock');
    blockDOM.appendChild(insideblockDOM);
    // makeBlock = blockDOM;------------------------------------> ¿QUÉ ES ESTO?
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
drawBoard(miniBoard, 4, 4);

//función que genera bloques-borde
function generateBorderBlock() {
    const borderBlockDOM = document.createElement('div');
    borderBlockDOM.classList.add('border__block');
    return borderBlockDOM;
}

//función que pinta bloques-borde al final del tablero
function drawBorderBlock() {
    for (let i = 0; i < width; i++) {
        const printBorderBlock = generateBorderBlock();
        gameBoard.appendChild(printBorderBlock);
    }
}
drawBorderBlock();

//---------------------------------------------------------------TETROMINOE---------------------------------------------------------------------------- 

//Selección de todos los divs dentro de gameBoard
//Array.from genera un array usando el objeto devuelto por querySelectorAll(). De esta forma podemos iterar sobre el array usando el index.
//Al asignar una variable width a 10, podemos usar width como coordenada para iterar sobre las filas.

//---------------------------------------ARRAYS--------------------------------------

let arrayBoard = [];
let arrayMiniBoard = [];

const boardBlocks = gameBoard.querySelectorAll('.block');
arrayBoard = Array.from(boardBlocks);

const miniBoardBlocks = miniBoard.querySelectorAll('.block');
arrayMiniBoard = Array.from(miniBoardBlocks);

//-----------------------------------------------------------------------------------

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
    [0, 1, width, width + 1], //Creo que esta versión del tetromino O es mejor porque no deja espacios en blaco a los lados
    [0, 1, width, width + 1], ,
    [0, 1, width, width + 1], ,
    [0, 1, width, width + 1],
]

// Otetromino = [
//     [width + 1, width + 2, width * 2 + 1, width * 2 + 2], //Version anterior del tetromino O
//     [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
//     [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
//     [width + 1, width + 2, width * 2 + 1, width * 2 + 2]
// ]

Ttetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]

const allTetrominos = [Itetromino, Ltetromino, Stetromino, Ztetromino, Jtetromino, Otetromino, Ttetromino];


// Pinta tetromino random al inicio del tablero
function drawTetrominoeInMainBoard() {
    generateRandomTetrominoe().forEach(index => {
        arrayBoard[currentPosition + index].classList.add('board__tetromino');
    })
}
//borra el tetromino del tablero
function undrawTetrominoeInMainBoard() {
    generateRandomTetrominoe().forEach(index => {
        arrayBoard[currentPosition + index].classList.remove('board__tetromino');
    })
}

//Obtención de una pieza de manera aleatorio, con rotacion incial

function generateRandomTetrominoe() {
    let randomTetrominoe = Math.floor(Math.random() * 7);
    let chosenTetrominoe = allTetrominos[randomTetrominoe][0];
    return chosenTetrominoe;
}
drawTetrominoeInMainBoard();
