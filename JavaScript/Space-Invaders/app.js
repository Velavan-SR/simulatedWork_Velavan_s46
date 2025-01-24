const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invaderId
let goingRight = true
let aliensRemoved = []

for (let i = 0 ; i < 225 ; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const spaceInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function drawInvader() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) 
        squares[spaceInvaders[i]].classList.add('invader')
    }
}

drawInvader()

function removeInvader() {
    for (let i = 0; i < spaceInvaders.length; i++) {
        squares[spaceInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

