const devchoice = document.getElementById('dev-in')
const userchoice = document.getElementById('user-in')
const result = document.getElementById('res')


const changeUserInp = (e) => {
    const choices = ['Rock', 'Paper', 'Scissor'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    userchoice.innerHTML = e.target.innerHTML;
    devchoice.innerHTML = computerChoice;
    if (computerChoice === e.target.innerHTML) {
        result.innerHTML = 'Tie';
    } else if (userchoice === 'rock' && devchoice === 'Scissor') {
        result.innerHTML = 'You win';
    } else if (userchoice === 'paper' && devchoice === 'Rock') {
        result.innerHTML = 'You win';
    } else if (userchoice === 'scissor' && devchoice === 'Paper') {
        result.innerHTML = 'You win';
    } else {
        result.innerHTML = 'You lose';
    }
}