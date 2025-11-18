let gridArray = [
  ['#','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#'],
];

let player = 'X';

function handleClick(rowIndex, columnIndex){
  gridArray[rowIndex][columnIndex] = `${player}`;
  render();
  player = player == 'X' ? 'O' : 'X';

  const winner = checkWinner(gridArray);

  if(winner != null){
    document.querySelector('#app').innerHTML = `${winner} wins!`
  }
}

// AI GENERATED

function checkWinner(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    { r: 0, c: 1 },   // horizontal →
    { r: 1, c: 0 },   // vertical ↓
    { r: 1, c: 1 },   // diagonal down-right ↘
    { r: 1, c: -1 },  // diagonal down-left ↙
  ];

  function inBounds(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = grid[r][c];
      if (player === '#') continue;

      for (let { r: dr, c: dc } of directions) {
        let count = 1;

        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          if (!inBounds(nr, nc)) break;
          if (grid[nr][nc] !== player) break;

          count++;
        }

        if (count === 4) {
          return player; // 'X' or 'O'
        }
      }
    }
  }

  return null; // no winner
}

// END AI GENERATED

function render(){
  document.querySelector('#app').innerHTML = '';

  gridArray.map((row, r)=>{
    row.map((item, c)=>{
      const element = document.createElement('button');
      element.style.width = 'fit';
      element.innerHTML = `${item}`

      if(element.innerHTML != '#'){
        element.disabled = true;
      }

      element.onclick = () => {handleClick(r,c)};

      document.querySelector('#app').appendChild(element);
    })
  })
}

render();
