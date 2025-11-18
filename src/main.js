import './style.css'

let gridArray = [
  ['#','#','#','#','#','#','1'],
  ['#','#','#','#','#','#','2'],
  ['#','#','#','#','#','#','3'],
  ['#','#','#','#','#','#','4'],
  ['#','#','#','#','#','#','5'],
  ['#','#','#','#','#','#','6'],
];

function handleClick(rowIndex, columnIndex){
  gridArray[rowIndex][columnIndex] = 'X';
  render();
}

function render(){
  document.querySelector('#app').innerHTML = '';

  gridArray.map((row, r)=>{
    row.map((item, c)=>{
      const element = document.createElement('button');
      element.style.width = 'fit';
      element.innerHTML = `${item}`

      element.onclick = () => {handleClick(r,c)};

      document.querySelector('#app').appendChild(element);
    })
  })
}

render();
