const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const MINI_BOARD_WIDTH = 4;
const MINI_BOARD_HEIGHT = 4;

let gameBoard = document.querySelector('.game-board__container');
let miniBoard = document.querySelector('.mini-board__container__block');


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

//Esta función pinta tantos bloques como BOARD_WIDTH y heigth tenga nuestro tablero. 
function drawBoard(boardclass, BOARD_WIDTH, heigth) {
    for (let i = 0; i < BOARD_WIDTH * heigth; i++) {
        const printBlock = generateBoardBlock();
        boardclass.appendChild(printBlock);
    }
}
drawBoard(gameBoard, BOARD_WIDTH, BOARD_HEIGHT);
drawBoard(miniBoard, 4, 4);

//función que genera bloques-borde
function generateBorderBlock() {
    const borderBlockDOM = document.createElement('div');
    borderBlockDOM.classList.add('boardBlock');
    borderBlockDOM.classList.add('block');
    borderBlockDOM.style.display='none';
    return borderBlockDOM;
}

//función que pinta bloques-borde al final del tablero
function drawBorderBlock() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        const printBorderBlock = generateBorderBlock();
        gameBoard.appendChild(printBorderBlock);
    }
}
drawBorderBlock();

//---------------------------------------------------------------TETROMINOE---------------------------------------------------------------------------- 

//Selección de todos los divs dentro de gameBoard
//Array.from genera un array usando el objeto devuelto por querySelectorAll(). De esta forma podemos iterar sobre el array usando el index.
//Al asignar una variable BOARD_WIDTH a 10, podemos usar BOARD_WIDTH como coordenada para iterar sobre las filas.

//---------------------------------------ARRAYS--------------------------------------

let arrayBoard = [];
let arrayMiniBoard = [];

const boardBlocks = gameBoard.querySelectorAll('.block');
arrayBoard = Array.from(boardBlocks);

const miniBoardBlocks = miniBoard.querySelectorAll('.block');
arrayMiniBoard = Array.from(miniBoardBlocks);

//-----------------------------------------------------------------------------------

let currentPosition = 3;
let currentPositionMiniBoard = 4;

const I_TETROMINO = [
    [0, 1, 2, 3],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 3 + 1],
    [0, 1, 2, 3],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 3 + 1]
]

const L_TETROMINO = [
    [0, 1, 2, BOARD_WIDTH ],
    [0, 1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1],
    [2, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 2 + 2]
]

const S_TETROMINO = [
    [1, 2, BOARD_WIDTH, BOARD_WIDTH + 1],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 2],
    [1, 2, BOARD_WIDTH, BOARD_WIDTH + 1],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 2]
]

const Z_TETROMINO = [
    [0, 1, BOARD_WIDTH + 1, BOARD_WIDTH + 2],
    [2, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 1],
    [0, 1, BOARD_WIDTH + 1, BOARD_WIDTH + 2],
    [2, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 1]
]

const J_TETROMINO = [
    [0, 1, 2, BOARD_WIDTH + 2],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2, BOARD_WIDTH * 2 + 1],
    [0, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2],
    [1, 2, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1]
]

const O_TETROMINO = [
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1], //Creo que esta versión del tetromino O es mejor porque no deja espacios en blaco a los lados
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1], ,
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1], ,
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
]


const T_TETROMINO = [
    [0, 1, 2, BOARD_WIDTH + 1],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 1],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, 1],
    [1, BOARD_WIDTH,  BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1]
]

const allTetrominos = [I_TETROMINO, L_TETROMINO, S_TETROMINO, Z_TETROMINO, J_TETROMINO, O_TETROMINO, T_TETROMINO];

// Pinta tetromino random al inicio del tablero
function drawTetrominoeInMainBoard() {
    currentTetrominoe.forEach(index => {
        arrayBoard[currentPosition + index].classList.add('board__tetromino');
    })
}
//borra el tetromino del tablero
function undrawTetrominoeInMainBoard() {
    currentTetrominoe.forEach(index => {
        arrayBoard[currentPosition + index].classList.remove('board__tetromino');
    })
}

// ----------------------------------------FUNCIONES DEL MINIBOARD--------------------------------

// function drawTetrominoeInMiniBoard() {
//     generateRandomTetrominoe().forEach(index=> {
//         arrayMiniBoard[currentPositionMiniBoard+index].classList.add('board__tetromino');
//         return 
//     })
// }

// function cleanMiniBoard() {
//     generateRandomTetrominoe().forEach(index=> {
//         arrayMiniBoard[currentPositionMiniBoard+index].classList.remove('board__tetromino');
//     })
// }
// --------------------------------------------------------------------------------------------------

//Obtención de una pieza de manera aleatorio, con rotacion incial
let chosenTetrominoe = {};
let randomTetrominoe = Math.floor(Math.random() * 7);
let nextTetrominoe = generateRandomTetrominoe().piece;
let currentRotation = chosenTetrominoe.rotation;
let currentTetrominoe = allTetrominos[randomTetrominoe][currentRotation];



function generateRandomTetrominoe() {
    chosenTetrominoe = {
        positionAtTetrominoeList: randomTetrominoe,
        piece: allTetrominos[randomTetrominoe][0],
        position: arrayBoard[3],
        rotation: 0,
    }
    return chosenTetrominoe
}
generateRandomTetrominoe()


// function generateRandomTetrominoe() {
//     let randomTetrominoe = Math.floor(Math.random() * 7);
//     let chosenTetrominoe = allTetrominos[randomTetrominoe][0];
//     return chosenTetrominoe;
// }

drawTetrominoeInMainBoard()
// drawTetrominoeInMiniBoard();


//-------------------------------------------------------GESTION DEL MOVIMIENTO-----------------------------------------------------------------------

function moveRight() {
    return currentTetrominoe.some(index => (currentPosition + index) % BOARD_WIDTH === BOARD_WIDTH - 1
     || currentTetrominoe.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock')))
}

function moveLeft() {
    return currentTetrominoe.some(index => (currentPosition + index) % BOARD_WIDTH === 0 
    || currentTetrominoe.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock')))
}


function moveDown() {
    return currentTetrominoe.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock'))
}

function rotate() {
    return currentTetrominoe.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock') 
  ||currentTetrominoe.some(index => (currentPosition + index) % BOARD_WIDTH === 0)
    ||currentTetrominoe.some(index => (currentPosition + index) % BOARD_WIDTH === BOARD_WIDTH - 1))
}

function stop() {
    if (currentTetrominoe.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock'))) {
        currentTetrominoe.forEach(index => arrayBoard[currentPosition + index].classList.add('boardBlock'))
    }
}

window.addEventListener('keydown', event=>{
    if (code === 123)
    event.preventDefault();
})
document.addEventListener('keydown', event => {
    let code = event.keyCode;
    if (code === 37 && moveLeft() === false) {
        undrawTetrominoeInMainBoard();
        currentPosition = currentPosition - 1;
        drawTetrominoeInMainBoard();
    }
    if (code === 39 && moveRight() === false) {
        undrawTetrominoeInMainBoard();
        currentPosition = currentPosition + 1;
        drawTetrominoeInMainBoard();
    }
    if (code === 40 && moveDown() === false) {
        undrawTetrominoeInMainBoard();
        currentPosition = currentPosition + BOARD_WIDTH;
        drawTetrominoeInMainBoard();
        stop();
    }
    if (code === 38 && rotate() === false) {
        undrawTetrominoeInMainBoard()
        currentRotation++
        if (currentRotation === currentTetrominoe.length) {
            currentRotation = 0
        }
        currentTetrominoe = allTetrominos[randomTetrominoe][currentRotation]
        drawTetrominoeInMainBoard();
    } 
})


