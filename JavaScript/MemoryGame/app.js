document.addEventListener('DOMContentLoaded', () => {
  const imageArray = [
    { title: 'image1', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true' },
    { title: 'image2', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true' },
    { title: 'image3', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true' },
    { title: 'image4', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true' },
    { title: 'image5', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true' },
    { title: 'image6', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true' },
    { title: 'image1', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true' },
    { title: 'image2', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true' },
    { title: 'image3', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true' },
    { title: 'image4', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true' },
    { title: 'image5', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true' },
    { title: 'image6', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true' }
  ];

  const cardBackSrc = 'https://github.com/Kalvium-Program/Image-files/blob/main/images/blank.png?raw=true';
  const gameGrid = document.querySelector('.grid');
  const pointsDisplay = document.getElementById('score');
  const startBtn = document.getElementById('start-btn');
  const playAgainBtn = document.getElementById('play-again-btn');

  let points = 0;
  let selectedImages = [];
  let selectedImageIds = [];

  const initializeBoard = () => {
    gameGrid.innerHTML = '';
    imageArray.sort(() => 0.5 - Math.random());
    imageArray.forEach((image, idx) => {
      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('card');
      cardWrapper.dataset.id = idx;

      const cardBack = document.createElement('img');
      cardBack.src = cardBackSrc;

      cardWrapper.appendChild(cardBack);
      gameGrid.appendChild(cardWrapper);

      cardWrapper.addEventListener('click', revealCard);
    });
  };

  const revealCard = function () {
    const imageId = this.dataset.id;
    if (!selectedImageIds.includes(imageId)) {
      selectedImages.push(imageArray[imageId].title);
      selectedImageIds.push(imageId);
      this.firstChild.src = imageArray[imageId].src;
      if (selectedImages.length === 2) {
        setTimeout(validateMatch, 500);
      }
    }
  };

  const validateMatch = () => {
    const allCards = document.querySelectorAll('.card');
    const [firstId, secondId] = selectedImageIds;

    if (selectedImages[0] === selectedImages[1]) {
      allCards[firstId].classList.add('hidden');
      allCards[secondId].classList.add('hidden');
      points++;
      pointsDisplay.textContent = points;

      if (points === imageArray.length / 2) {
        setTimeout(() => alert('Congratulations! You found all pairs!'), 200);
        endGame();
      }
    } else {
      allCards[firstId].firstChild.src = cardBackSrc;
      allCards[secondId].firstChild.src = cardBackSrc;
    }

    selectedImages = [];
    selectedImageIds = [];
  };

  function startGame(){
    points = 0;
    pointsDisplay.textContent = points;
    gameGrid.classList.remove('hidden');
    startBtn.classList.add('hidden');
    playAgainBtn.classList.add('hidden');
    initializeBoard();
  };

  document.getElementById('start-btn').addEventListener('click', startGame);

  function restartGame (){
    startGame();
  };

  document.getElementById('play-again-btn').addEventListener('click', restartGame);

  function endGame (){
    playAgainBtn.classList.remove('hidden');
  };

  initializeBoard();
});