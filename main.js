const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let scoreBoard = document.querySelector('.score-board__container');
let miniscoreBoard = document.querySelector('.mini-score-board__container__block');

function generateBoardBlock() {
   const blockDOM = document.createElement('div');
   const insideblockDOM = document.createElement('div');
   blockDOM.classList.add('block');
   insideblockDOM.classList.add('insideblock');
   blockDOM.appendChild(insideblockDOM);
return blockDOM;
}
function drawBoard(boardclass,width, heigth){
    for(let i = 0; i<width*heigth; i++){
        const printBlock = generateBoardBlock();
        boardclass.appendChild(printBlock)
    }
    
}
drawBoard(scoreBoard,BOARD_WIDTH,BOARD_HEIGHT);
drawBoard(miniscoreBoard,4,4);

