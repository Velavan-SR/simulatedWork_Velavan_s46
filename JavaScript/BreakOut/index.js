const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const livesDisplay = document.getElementById('lives');
const startButton = document.querySelector('#start-btn');
const resetButton = document.querySelector('#reset-btn');

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;

let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;
let lives = 3;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// Block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// Blocks array
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
];

// Add blocks
function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

// Draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// Draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

// Add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// Add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

// Check for collisions
function checkForCollisions() {
    // Block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = score;

            if (blocks.length === 0) {
                scoreDisplay.textContent = 'YOU WIN!';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    // Wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || // Right wall
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) || // Top wall
        ballCurrentPosition[0] <= 0 // Left wall
    ) {
        changeDirection();
    }

    // User collisions
    if (
        ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
        changeDirection();
    }

    // Bottom collision (lose life)
    if (ballCurrentPosition[1] <= ballDiameter) {
        lives--;
        livesDisplay.textContent = lives;

        if (lives === 0) {
            scoreDisplay.textContent = 'You Lose >_<';
            clearInterval(timerId);
            document.removeEventListener('keydown', moveUser);
        } else {
            ballCurrentPosition = [...ballStart]; // Reset ball position
            drawBall();
        }
    }
}

// Change ball direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}

// Start the game
function startGame() {
    timerId = setInterval(moveBall, 20);
    document.addEventListener('keydown', moveUser);
}

// Reset the game
function resetGame() {
    location.reload()
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

addBlock();