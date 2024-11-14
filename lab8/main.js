   if(!localStorage.getItem('counter')){
      localStorage.setItem('counter', 0);
   }

   function count() {
      let counter = localStorage.getItem('counter');
      counter++;
      document.getElementById('conta').textContent = counter;
      localStorage.setItem('counter', counter);
   }
   
   document.getElementById('conta').textContent = localStorage.getItem('counter');

   document.getElementById('button5').onclick = count;

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

   const p2 = document.getElementById('p2');
   document.querySelectorAll("#color").forEach((e) => {
      e.onclick = () => {
         const color = e.dataset.color;
         p2.style.color = color;
      };
   });
 
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

   const colorSelect = document.getElementById('color1');

   colorSelect.onchange = function() {
      document.body.style.backgroundColor = this.value;
   };

   const tex1 = document.getElementById('t3');
   const tex2 = document.getElementById('t4');
   const tex3 = document.getElementById('tx1');
   document.querySelector('form').onsubmit = (e) => {
      e.preventDefault();
      tex3.textContent = "Olá, o " + tex1.value + " tem " + tex2.value + "!";
  };

   const countte = document.getElementById('count1');
   let tiktak = 0;

   function startCounter() {
      setInterval(() => {
         tiktak++;
         countte.textContent = tiktak;
      }, 1000);
   }

   window.onload = startCounter;



   