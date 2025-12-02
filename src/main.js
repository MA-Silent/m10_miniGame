let gridArray = [
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
];

let player = 'X';
let gameId = crypto.randomUUID();

document.querySelector('#gameIdText').innerText = gameId;

let xScore = 0;
let yScore = 0;



function handleClick(rowIndex, columnIndex) {

  if (gridArray[rowIndex][columnIndex] !== '#') return;

  gridArray[rowIndex][columnIndex] = player;

  player = player === 'X' ? 'O' : 'X';

  render();

  const winner = checkWinner(gridArray);

  if (winner != null) {
    const container = document.createElement('div');

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart'
    restartButton.onclick = () => {
      gridArray = [
        ['#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#'],
      ];
      render();
    }

    container.innerHTML = `${winner} wins!`
    container.appendChild(restartButton);

    container.classList.add('container');

    document.querySelector('#game').innerHTML = '';
    document.querySelector('#win').innerHTML = '';
    document.querySelector('#win').appendChild(container);


    if (winner == 'X') {
      xScore++;
    } else {
      yScore++;
    }
  }
}

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

function render() {
  document.querySelector('#game').innerHTML = '';
  document.querySelector('#win').innerHTML = '';

  gridArray.map((row, r) => {
    row.map((item, c) => {
      const element = document.createElement('button');
      element.style.width = 'fit';
      element.innerHTML = `${item}`

      if (element.innerHTML != '#') {
        element.disabled = true;
      }

      element.onclick = () => { handleClick(r, c) };

      document.querySelector('#game').appendChild(element);
    })
  })

  document.querySelector('#score').innerHTML = ''

  const scoreX = document.createElement('p');
  const scoreY = document.createElement('p');

  scoreY.innerHTML = `O: ${yScore}`
  scoreX.innerHTML = `X: ${xScore}`

  if (player === 'X') {
    scoreX.classList.add('active-player-red');
  } else {
    scoreY.classList.add('active-player-yellow');
  }

  document.querySelector('#score').appendChild(scoreX);
  document.querySelector('#score').appendChild(scoreY)
}

render();
