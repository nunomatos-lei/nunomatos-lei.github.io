const hoverBox = document.getElementById('hover-box');
const hoverStatus = document.getElementById('hover-status');

hoverBox.addEventListener('mouseover', () => {
    hoverBox.style.backgroundColor = 'lightgreen';
    hoverStatus.textContent = "Mouse status: Inside";
});

hoverBox.addEventListener('mouseout', () => {
    hoverBox.style.backgroundColor = 'lightblue';
    hoverStatus.textContent = "Mouse status: Outside";
});

const dblClickBtn = document.getElementById('dblclick-btn');
const dblClickMsg = document.getElementById('dblclick-msg');

dblClickBtn.addEventListener('dblclick', () => {
    dblClickMsg.textContent = "You double-clicked the button!";
    setTimeout(() => {
        dblClickMsg.textContent = ""; 
    }, 3000);
});

const textInput = document.getElementById('text-input');
const textOutput = document.getElementById('text-output');

textInput.addEventListener('keyup', (event) => {
    textOutput.textContent = `You typed: ${event.target.value}`;
});

const rangeSlider = document.getElementById('range-slider');
const sliderValue = document.getElementById('slider-value');

rangeSlider.addEventListener('input', (event) => {
    sliderValue.textContent = `Slider value: ${event.target.value}`;
});

const nameForm = document.getElementById('name-form');
const formResponse = document.getElementById('form-response');

nameForm.addEventListener('submit', (event) => {
    event.preventDefault();  
    const name = document.getElementById('name-input').value;
    formResponse.textContent = `Hello, ${name}! Welcome to the event page.`;
    nameForm.reset();  
});
