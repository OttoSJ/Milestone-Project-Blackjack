// Array of suits
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

// Array of card values
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const messeges = {
  dealerWins: "Dealer Wins!",
  playerWins: "Player Wins!!l",
};

const playersHand = [];
const numberOfAcesPlayer = [];
const dealersHand = [];
const numberOfAcesDealer = [];
let shuffledDeck = [];

// Function to create deck of cards
function getNewDeck(values) {
  unshuffled = [];
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      unshuffled.push(card);
      shuffledDeck = [...shuffle(unshuffled)];
    }
  }
}

getNewDeck(values);
console.log(shuffledDeck);
console.log(shuffledDeck.length);

// Function to shuffle cards
function shuffle(deck) {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];

    deck[location2] = tmp;
  }
  return deck;
}

// I hate how repetive this function is!!!!!!!
function handleDealer(event) {
  event.preventDefault();
  const dealer = "dealer";
  const player = "player";

  if (shuffledDeck.length < 4) {
    getNewDeck(values);
  }
  let firstPlayerCard = shuffledDeck.shift();
  let secondPlayerCard = shuffledDeck.shift();
  let firstDealerCard = shuffledDeck.shift();
  let secondDealerCard = shuffledDeck.shift();

  let firstPlayerCardValue = getFaceCardValue(firstPlayerCard.Value);

  let secondPlayerCardValue = getFaceCardValue(secondPlayerCard.Value);

  let firstDealerCardValue = getFaceCardValue(firstDealerCard.Value);

  let secondDealerCardValue = getFaceCardValue(secondDealerCard.Value);

  playersHand.push(firstPlayerCardValue, secondPlayerCardValue);

  dealersHand.push(firstDealerCardValue, secondDealerCardValue);

  let dealersHandTotal = checkTotalHandValue(dealersHand);
  let playersHandTotal = checkTotalHandValue(playersHand);

  createCard(firstPlayerCard, player);
  createCard(secondPlayerCard, player);
  createCard(firstDealerCard, dealer);
  createCard(secondDealerCard, dealer);

  findNumberOfAces(playersHand, numberOfAcesPlayer);
  findNumberOfAces(dealersHand, numberOfAcesDealer);

  let playersAces = findNumberOfAces(playersHand, numberOfAcesPlayer);

  let dealerAces = findNumberOfAces(dealersHand, numberOfAcesDealer);

  let adjustedDealersHandTotal = adjustHandTotalForAces(
    dealersHandTotal,
    dealerAces
  );

  let adjustedPlayersHandTotal = adjustHandTotalForAces(
    playersHandTotal,
    playersAces
  );

  checkForWinner(adjustedDealersHandTotal, dealer);
  checkForWinner(adjustedPlayersHandTotal, player);

  displayScore(adjustedDealersHandTotal, adjustedPlayersHandTotal);

  createHoldButton();
  createPlayerHitMeBtn();

  console.log(shuffledDeck.length);
}

function dealNewPlayerCard(event) {
  event.preventDefault();

  const player = "player";

  if (shuffledDeck.length === 0) {
    getNewDeck(values);
  }
  let nextPlayerCard = shuffledDeck.shift();
  let nextPlayerCardValue = getFaceCardValue(nextPlayerCard.Value);

  playersHand.push(nextPlayerCardValue);
  renderNextCard(nextPlayerCard, player);

  let playersHandTotal = checkTotalHandValue(playersHand);
  let dealersHandTotal = checkTotalHandValue(dealersHand);

  let playersAces = findNumberOfAces(playersHand, numberOfAcesPlayer);
  let adjustedPlayersHandTotal = adjustHandTotalForAces(
    playersHandTotal,
    playersAces
  );

  let dealerAces = findNumberOfAces(dealersHand, numberOfAcesDealer);
  let adjustedDealersHandTotal = adjustHandTotalForAces(
    dealersHandTotal,
    dealerAces
  );

  console.log(shuffledDeck.length, "Cards left");

  checkForWinner(adjustedPlayersHandTotal, player);

  displayScore(adjustedDealersHandTotal, adjustedPlayersHandTotal);

  createPlayAgainBtn(adjustedPlayersHandTotal);

  if (adjustedPlayersHandTotal > 21) {
    let hitMeButton = document.getElementById("hit-me");
    hitMeButton.disabled = true;

    let messege = document.querySelectorAll(".messeges")[0];
    messege.textContent = "Dealer Wins!";
  }
}

function playerHold() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.disabled = true;

  let dealersHandTotal = checkTotalHandValue(dealersHand);
  let playersHandTotal = checkTotalHandValue(playersHand);

  let playersAces = findNumberOfAces(playersHand, numberOfAcesPlayer);

  let dealerAces = findNumberOfAces(dealersHand, numberOfAcesDealer);

  let adjustedDealersHandTotal = adjustHandTotalForAces(
    dealersHandTotal,
    dealerAces
  );
  let adjustedPlayersHandTotal = adjustHandTotalForAces(
    playersHandTotal,
    playersAces
  );

  if (shuffledDeck.length === 0) {
    getNewDeck(values);
  }
  console.log(shuffledDeck.length);

  dealer(adjustedDealersHandTotal, adjustedPlayersHandTotal);
  if (adjustedDealersHandTotal < adjustedPlayersHandTotal) {
    return playerHold();
  }

  checkForWinnerMessege(adjustedDealersHandTotal, adjustedPlayersHandTotal);
}

function dealNewDealerCard() {
  const dealer = "dealer";
  const player = "player";

  if (shuffledDeck.length === 0) {
    getNewDeck(values);
  }
  let nextDealerCard = shuffledDeck.shift();
  let nextDealerCardValue = getFaceCardValue(nextDealerCard.Value);

  dealersHand.push(nextDealerCardValue);
  renderNextCard(nextDealerCard, dealer);

  let dealersHandTotal = checkTotalHandValue(dealersHand);
  let playersHandTotal = checkTotalHandValue(playersHand);

  let playersAces = findNumberOfAces(playersHand, numberOfAcesPlayer);

  let dealerAces = findNumberOfAces(dealersHand, numberOfAcesDealer);

  let adjustedDealersHandTotal = adjustHandTotalForAces(
    dealersHandTotal,
    dealerAces
  );
  let adjustedPlayersHandTotal = adjustHandTotalForAces(
    playersHandTotal,
    playersAces
  );

  console.log(shuffledDeck.length);

  checkForWinner(adjustedDealersHandTotal, dealer);
  checkForWinner(adjustedPlayersHandTotal, player);

  displayScore(adjustedDealersHandTotal, adjustedPlayersHandTotal);
}

function handleReset() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.remove();

  let holdBtn = document.getElementById("hold");

  let playAgainBtn = document.querySelectorAll(".play-again-btn")[0];

  let messege = document.querySelectorAll(".messeges")[0];
  messege.textContent = "";

  let dealerMessege = document.querySelectorAll(".dealer-score-messege")[0];
  let playerMessege = document.querySelectorAll(".player-score-messege")[0];
  dealerMessege.textContent = ``;
  playerMessege.textContent = ``;

  const deleteBtn = playAgainBtn ? playAgainBtn.remove() : holdBtn.remove();

  let el = document.querySelectorAll(".card");
  for (let i = 0; i < el.length; i++) {
    el[i].remove();
  }
  if (shuffledDeck.length === 0) {
    getNewDeck(values);
  }
  playersHand.length = 0;
  dealersHand.length = 0;
}

// TO DO LIST

// Need to fix bug that causes -10 when there are 5 cards and no aces and over 21. Here is the line in the function that needs to be rethought (else if (numberOfAces + playersHand.length === 5 && handTotal > 21) {
// return handTotal - 10;). The problem is that its looking for the total of 5 cards which doesn't have include anything from the aces count, thus once you get to five cards and the total is over the set amount it takes off 10.

// Need to add a feature that checks and creates another deck once the current deck is near epmty. It should be added to the play again button which is called be the handleReset function.

// Need to add read me file.
