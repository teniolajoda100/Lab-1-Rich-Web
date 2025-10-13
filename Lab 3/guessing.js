// Select all DOM elements
const boxes = document.querySelectorAll('.box');
const startButton = document.querySelector('button');
const message = document.getElementById('msg');
const container = document.querySelector('.container');

// Optional: basic layout styling
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.marginTop = '50px';

boxes.forEach(box => {
    box.style.width = '150px';
    box.style.height = '150px';
    box.style.margin = '10px';
    box.style.border = '2px solid #444';
    box.style.display = 'inline-flex';
    box.style.alignItems = 'center';
    box.style.justifyContent = 'center';
    box.style.fontFamily = 'Arial, sans-serif';
    box.style.fontSize = '18px';
    box.style.cursor = 'pointer';
    box.style.backgroundColor = '#f0f0f0';
});

startButton.style.marginTop = '20px';
startButton.style.padding = '10px 20px';
startButton.style.fontSize = '16px';
startButton.style.cursor = 'pointer';
startButton.style.borderRadius = '8px';
startButton.style.backgroundColor = '#4CAF50';
startButton.style.color = 'white';
startButton.style.border = 'none';
startButton.style.fontWeight = 'bold';

message.style.textAlign = 'center';
message.style.fontFamily = 'Arial, sans-serif';
message.style.fontSize = '20px';
message.style.marginTop = '30px';
message.style.color = '#333';

// Game variables
let correctBox = null;
let tries = 0;
let gameActive = false;

// Start game
startButton.addEventListener('click', () => {
    // Reset all boxes
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundImage = '';
        box.style.backgroundColor = '#f0f0f0';
    });

    // Randomly choose the correct box
    correctBox = Math.floor(Math.random() * boxes.length);
    tries = 0;
    gameActive = true;

    message.textContent = 'Game started! Guess which box hides the picture.';
});

// Box click handler
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (!gameActive) {
            message.textContent = 'Click "Start" to begin the game.';
            return;
        }

        tries++;

        // If the correct box is clicked
        if (index === correctBox) {
            box.style.backgroundImage = 'url("image1.jpg")'; // your image
            box.style.backgroundSize = 'cover';
            box.style.backgroundPosition = 'center';
            message.textContent = `You found it in ${tries} ${tries === 1 ? 'try' : 'tries'}!`;
            gameActive = false;
        } else {
            box.textContent = 'Not here';
            box.style.backgroundColor = '#ddd';
        }
    });
});
