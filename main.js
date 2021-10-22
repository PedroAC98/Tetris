const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let gameBoard = document.querySelector('.game-board__container');
let miniscoreBoard = document.querySelector('.mini-score-board__container__block');

//función que genera los bloques individuales de ambos tableros. Cada bloque (blockDOM) tiene un bloque dentro de él (insideblockDOM). 
//Esta función devuelve blockDOM para poder utilizarla en la función drawBoard()

function generateBoardBlock() {
   const blockDOM = document.createElement('div');
   const insideblockDOM = document.createElement('div');
   blockDOM.classList.add('block');
   insideblockDOM.classList.add('insideblock');
   blockDOM.appendChild(insideblockDOM);
return blockDOM;
}

//Esta función pinta tantos bloques como width y heigth tenga nuestro tablero. 
function drawBoard(boardclass,width, heigth){
    for(let i = 0; i<width*heigth; i++){
        const printBlock = generateBoardBlock();
        boardclass.appendChild(printBlock)
    }
    
}
drawBoard(gameBoard,BOARD_WIDTH,BOARD_HEIGHT);
drawBoard(miniscoreBoard,4,4);


//Tetrominos 

