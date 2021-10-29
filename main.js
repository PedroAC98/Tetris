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
    borderBlockDOM.style.display = 'none';
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
    [0, 1, 2, BOARD_WIDTH],
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
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
]


const T_TETROMINO = [
    [0, 1, 2, BOARD_WIDTH + 1],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 1],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, 1],
    [1, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1]
]
// Generamos las piezas para el miniboard, con solo la primera rotacion y la constante MINI_BOARD_WIDTH
const I_TETROMINO_MINI = [
    [0, 1, 2, 3],
    
]

const L_TETROMINO_MINI = [
    [0, 1, 2, MINI_BOARD_WIDTH],
    
]

const S_TETROMINO_MINI = [
    [1, 2, MINI_BOARD_WIDTH, MINI_BOARD_WIDTH + 1],
    
]

const Z_TETROMINO_MINI = [
    [0, 1, MINI_BOARD_WIDTH + 1, MINI_BOARD_WIDTH + 2],
    
]

const J_TETROMINO_MINI = [
    [0, 1, 2, MINI_BOARD_WIDTH + 2],
    
]

const O_TETROMINO_MINI = [
    [0, 1, MINI_BOARD_WIDTH, MINI_BOARD_WIDTH + 1],
    
]


const T_TETROMINO_MINI = [
    [0, 1, 2, MINI_BOARD_WIDTH + 1],
    
]

const allTetrominos = [I_TETROMINO, L_TETROMINO, S_TETROMINO, Z_TETROMINO, J_TETROMINO, O_TETROMINO, T_TETROMINO];
const allTetrominosMini = [I_TETROMINO_MINI, L_TETROMINO_MINI, S_TETROMINO_MINI, Z_TETROMINO_MINI, J_TETROMINO_MINI, O_TETROMINO_MINI, T_TETROMINO_MINI];





// Pinta tetromino random al inicio del tablero
function drawTetrominoeInMainBoard() {
    currentTetrominoe.piece.forEach(index => {
        arrayBoard[currentPosition + index].classList.add('tetromino');
    })
}
//borra el tetromino del tablero
function undrawTetrominoeInMainBoard() {
    currentTetrominoe.piece.forEach(index => {
        arrayBoard[currentPosition + index].classList.remove('tetromino');
    })
}


// ----------------------------------------FUNCIONES DEL MINIBOARD--------------------------------

 function drawTetrominoeInMiniBoard() {
    nextTetrominoe.miniPiece.forEach(index => {
        arrayMiniBoard[currentPositionMiniBoard + index].classList.add('tetromino');
    })
}

function undrawTetrominoeInMiniBoard() {
    currentTetrominoe.miniPiece.forEach(index => {
        arrayMiniBoard[currentPositionMiniBoard + index].classList.remove('tetromino');
    })
}
// function cleanMiniBoard() {
//     generateRandomTetrominoe().forEach(index=> {
//         arrayMiniBoard[currentPositionMiniBoard+index].classList.remove('board__tetromino');
//     })
// }
// --------------------------------------------------------------------------------------------------

//Obtención de una pieza de manera aleatorio, con rotacion incial
let currentTetrominoe = generateRandomTetrominoe();
let nextTetrominoe = generateRandomTetrominoe();

function generateRandomTetrominoe() {   
    
    let randomTetrominoe = Math.floor(Math.random() * 7);
    

     return {
        positionAtTetrominoeList: randomTetrominoe,
        piece: allTetrominos[randomTetrominoe][0],
        position: arrayBoard[3],
        rotation: 0,
        miniPiece: allTetrominosMini[randomTetrominoe][0],
    }
    

}

//-------------------------------------------------------GESTION DEL MOVIMIENTO-----------------------------------------------------------------------

function moveRight() {
    return currentTetrominoe.piece.some(index => (currentPosition + index) % BOARD_WIDTH === BOARD_WIDTH - 1
        || currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock')))
        ||currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index+1].classList.contains('taken'))
        
}

function moveLeft() {
    return currentTetrominoe.piece.some(index => (currentPosition + index) % BOARD_WIDTH === 0
        || currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock')))
        ||currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index-1].classList.contains('taken'))
}


function moveDown() {
    return currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock'))
    ||currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('taken'))
}

function rotate() {
    return currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock')
        || currentTetrominoe.piece.some(index => (currentPosition + index) % BOARD_WIDTH === 0)
        || currentTetrominoe.piece.some(index => (currentPosition + index) % BOARD_WIDTH === BOARD_WIDTH - 1))
}

// -------------------------------------------//Esta función no hacia ----------------------------------------------------------

function stop() {
    if (currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('boardBlock'))||
    currentTetrominoe.piece.some(index => arrayBoard[currentPosition + index + BOARD_WIDTH].classList.contains('taken')) ){
        currentTetrominoe.piece.forEach(index => arrayBoard[currentPosition + index].classList.add('taken'));
    }
    else{
        moveDown()
    }
}

// ----------------------------------------------------------------------------------------------------------------------

window.addEventListener('keydown', event => {
    let code = event.keyCode;
    if (code === 123)
        event.preventDefault();
})
document.addEventListener('keydown', event => {
    event.preventDefault();
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
    }
    if (code === 38 && rotate() === false) {
        undrawTetrominoeInMainBoard()
        currentTetrominoe.rotation++
        if (currentTetrominoe.rotation === currentTetrominoe.piece.length) {
            currentTetrominoe.rotation = 0
        }
        currentTetrominoe.piece = allTetrominos[currentTetrominoe.positionAtTetrominoeList][currentTetrominoe.rotation]
        drawTetrominoeInMainBoard();
    }
})


//-------------------------------------------------------BUCLES------------------------------------------------------------------------

// 

function gameLoop() { //Mover ficha hacia abajo, game over, eliminar fila completa
    
    undrawTetrominoeInMainBoard();
    drawTetrominoeInMainBoard();
    drawTetrominoeInMiniBoard();
    const timer= setInterval(() => {
         
        
        
        if (moveDown() === false) {
            undrawTetrominoeInMainBoard();
            currentPosition = currentPosition + BOARD_WIDTH;
            drawTetrominoeInMainBoard();
            
        }
        else {
            stop();
            updateTetrisBoard();
            currentPosition = 3;
            currentTetrominoe = nextTetrominoe;
            nextTetrominoe = generateRandomTetrominoe();
            drawTetrominoeInMainBoard();
            undrawTetrominoeInMiniBoard();
            drawTetrominoeInMiniBoard();
        }
        gameOver(timer);
        
    }, 1000);

}



// ------------------------------------------------GAMEOVER--------------------------------------------
function gameOver(timer) {
    const row = [0,1,2,3,4,5,6,7,8,9];

    if(row.find(index => arrayBoard[index].classList.contains('taken'))){
        let img = document.querySelector(".game-board__container")
       let text= document.createElement('h1');
       text.textContent ="HAS PERDIDO PRINGAO";
       img.appendChild(text);
        clearInterval(timer);
    }
}




function updateTetrisBoard() {
    //Mirar si hay alguna fila que cumpla la condición: todos los bloques de width*[i] contienen la clase:'board__tetromino'.

  for(let i=0; i<199; i+=BOARD_WIDTH){
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every(index => arrayBoard[index].classList.contains('taken'))){
        row.forEach(index => {
            arrayBoard[index].classList.remove('taken');
            arrayBoard[index].classList.remove('tetromino');
        })

        const REMOVED_ROW = arrayBoard.splice(i,BOARD_WIDTH);
            arrayBoard = REMOVED_ROW.concat(arrayBoard);
            arrayBoard.forEach(index=>gameBoard.appendChild(index));
    }

  }

   
    // const ROW = ['0',]; //variable que nos da la posición de inicio de todas las filas
    // for (let i = 1; i < BOARD_HEIGHT; i++) {
    //     ROW.push(`BOARD_WIDTH*${i}`)
    // }

    // return ROW.every(index => arrayBoard[index].classList.contains('board__tetromino'));
}
 updateTetrisBoard();


 // Inicializar el juego

const startButton = document.querySelector('.start__button');
startButton.addEventListener("click", init);
console.log()

// limpiar Board y miniBoard
function cleanMainBoard(){
    arrayBoard.forEach(element=> element.classList.remove('.tetromino', '.taken'));
}
function init(){
    cleanMainBoard();   
    gameLoop(); 
}
 
