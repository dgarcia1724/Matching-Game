const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let hasBeenFlipped = false;
let pause = false;

function flipCard() {
  if (pause) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasBeenFlipped) {
    hasBeenFlipped = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  pause = true;
  setTimeout(function () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasBeenFlipped, pause] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(function (card) {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
