import './style.css'

let gridArray = [
  ['#','#','#','#','#','#','1'],
  ['#','#','#','#','#','#','2'],
  ['#','#','#','#','#','#','3'],
  ['#','#','#','#','#','#','4'],
  ['#','#','#','#','#','#','5'],
  ['#','#','#','#','#','#','6'],
];

function render(){
  gridArray.map((row)=>{
    row.map((item)=>{
      const element = document.createElement('button');
      element.style.width = 'fit';
      element.innerHTML = `${item}`

      document.querySelector('#app').appendChild(element);
    })
  })
}
