const devchoice = document.getElementById('dev-in');
const userchoice = document.getElementById('user-in');
const result = document.getElementById('res');
const devScoreDisplay = document.getElementById('dev-sc');
const userScoreDisplay = document.getElementById('user-sc');
const buttons = document.getElementById('buttons');
const startBtn = document.getElementById('start-btn');
const playAgain = document.getElementById('play-again');

let devScore = 0;
let userScore = 0;

const startGame = () => {
    devScore = 0;
    userScore = 0;
    devScoreDisplay.innerHTML = devScore;
    userScoreDisplay.innerHTML = userScore;
    result.innerHTML = '';
    userchoice.innerHTML = '';
    devchoice.innerHTML = '';
    buttons.classList.remove('hidden');
    startBtn.classList.add('hidden');
    playAgain.classList.add('hidden');
};

const changeUserInp = (e) => {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    userchoice.innerHTML = e.target.innerHTML;
    devchoice.innerHTML = computerChoice;
    
    if (computerChoice === e.target.innerHTML) {
        result.innerHTML = 'Tie';
    } else if (
        (e.target.innerHTML === 'Rock' && computerChoice === 'Scissor') ||
        (e.target.innerHTML === 'Paper' && computerChoice === 'Rock') ||
        (e.target.innerHTML === 'Scissor' && computerChoice === 'Paper')
    ) {
        result.innerHTML = 'You win!';
        userScore++;
    } else {
        result.innerHTML = 'You lose :(';
        devScore++;
    }

    userScoreDisplay.innerHTML = userScore;
    devScoreDisplay.innerHTML = devScore;

    if (userScore === 5 || devScore === 5) {
        endGame();
    }
};

const endGame = () => {
    const winner = userScore === 5 ? 'You' : 'Device';
    result.innerHTML = `${winner} won the game!`;
    buttons.classList.add('hidden');
    playAgain.classList.remove('hidden');
};

const reset = () => {
    startGame();
};