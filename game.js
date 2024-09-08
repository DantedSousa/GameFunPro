const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações
const playerWidth = 10, playerHeight = 100, ballRadius = 10;
let playerX = canvas.width - playerWidth - 10, playerY = (canvas.height - playerHeight) / 2;
let ballX = 0, ballY = [50, canvas.height / 2, canvas.height - 50][Math.floor(Math.random() * 3)];
let ballSpeedX = 5, ballSpeedIncrement = 1;

// Desenha o jogador e a bolinha
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Atualiza a posição da bolinha
function update() {
    if (ballX + ballRadius > playerX && ballY > playerY && ballY < playerY + playerHeight) {
        ballX = 0;
        ballY = [50, canvas.height / 2, canvas.height - 50][Math.floor(Math.random() * 3)];
        ballSpeedX += ballSpeedIncrement;
    } else if (ballX > canvas.width) {
        ballX = 0;
        ballY = [50, canvas.height / 2, canvas.height - 50][Math.floor(Math.random() * 3)];
    } else {
        ballX += ballSpeedX;
    }
}

// Atualiza a posição do jogador com o mouse
function onMouseMove(event) {
    playerY = Math.max(Math.min(event.clientY - canvas.getBoundingClientRect().top - playerHeight / 2, canvas.height - playerHeight), 0);
}

// Configura o evento do mouse e inicia o loop de animação
canvas.addEventListener('mousemove', onMouseMove);

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
