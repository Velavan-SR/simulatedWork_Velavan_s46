const devchoice = document.getElementById('dev-in')
const userchoice = document.getElementById('user-in')
const result = document.getElementById('res')
const devScoreDisplay = document.getElementById('dev-sc');
const userScoreDisplay = document.getElementById('user-sc');

let devScore = 0;
let userScore = 0;

const changeUserInp = (e) => {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    userchoice.innerHTML = e.target.innerHTML;
    devchoice.innerHTML = computerChoice;
    
    if (computerChoice === e.target.innerHTML) {
        result.innerHTML = 'Tie';
    } else if (e.target.innerHTML === 'Rock' && computerChoice === 'Scissor') {
        result.innerHTML = 'You win !';
        userScore++;
    } else if (e.target.innerHTML === 'Paper' && computerChoice === 'Rock') {
        result.innerHTML = 'You win !';
        userScore++;
    } else if (e.target.innerHTML === 'Scissor' && computerChoice === 'Paper') {
        result.innerHTML = 'You win !';
        userScore++;
    } else {
        result.innerHTML = 'You lose :(';
        devScore++;
    }

    userScoreDisplay.innerHTML = userScore;
    devScoreDisplay.innerHTML = devScore;
};

const reset = () => {
    devScore = 0;
    userScore = 0;
    userScoreDisplay.innerHTML = userScore;
    devScoreDisplay.innerHTML = devScore;
    result.innerHTML = '';
    userchoice.innerHTML = '';
    devchoice.innerHTML = '';
};