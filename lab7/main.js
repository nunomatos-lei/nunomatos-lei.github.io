   let counter = 33;
   const heading = document.querySelector('#conta');
   function count() {
      counter++;
      heading.textContent = counter;
   } 

   document.getElementById('button5').onclick = count();

   const container = document.getElementById('container');
   container.style.display = 'inline-block';

   
   document.getElementById('button5').style.display = 'inline-block';
   document.getElementById('conta').style.display = 'inline-block';

   const p1 = document.querySelector('#p1');
   p1.addEventListener('mouseover', function() {
    p1.textContent = "Obrigado por passares!";
 });
 
 p1.addEventListener('mouseout', function() {
    p1.textContent = "Passa por aqui!";
 });

   const p2 = document.getElementById('p2')
   const redB = document.getElementById('red');
   redB.onclick = function(){
      p2.style.color = 'red';
     }
   const greenB = document.getElementById('green');
   greenB.onclick = function(){
      p2.style.color = 'green';
     }
   const blueB = document.getElementById('blue');
   blueB.onclick = function(){
      p2.style.color = 'blue';
     }

   const input = document.getElementById('t1');

   function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
   }
  
   input.addEventListener('input', () => {
   input.style.backgroundColor = getRandomColor();
    });

    const word = document.getElementById('t2');
    const b1 = document.getElementById('b1');
    word.addEventListener('input', () =>{
      b1.onclick = function(){
      document.body.style.backgroundColor = word.value;
      }
    })

   