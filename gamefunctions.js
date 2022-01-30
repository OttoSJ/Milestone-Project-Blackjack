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
let numberOfPlayerWins = 0;
let numberOfGamesPlayed = 0;
const dealersHand = [];
const numberOfAcesDealer = [];
let shuffledDeck = [];

// Function to create deck of cards
function getNewDeck(values) {
  let cards = [];
  for (let i = 0; i < 4; i++) {
    let card = values.map((value) => ({ Suit: suits[i], Value: value }));
    cards[i] = [...card];
    _.flattenDeep(cards);
    shuffledDeck = [...shuffle(_.flattenDeep(cards))];
  }
}

getNewDeck(values);
console.log(shuffledDeck);
// console.log(shuffledDeck.length);

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
  numberOfGamesPlayed++;
  console.log(numberOfGamesPlayed, "Games Played");

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

  displayScore(adjustedDealersHandTotal, adjustedPlayersHandTotal);

  createHoldButton();
  createPlayerHitMeBtn();
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

  displayScore(adjustedDealersHandTotal, adjustedPlayersHandTotal);

  createPlayAgainBtn(adjustedPlayersHandTotal);

  if (adjustedPlayersHandTotal > 21) {
    let hitMeButton = document.getElementById("hit-me");
    hitMeButton.disabled = true;

    let messege = document.querySelectorAll(".messeges")[0];
    messege.textContent = "Dealer Wins!";
    console.log(numberOfGamesPlayed, "Games Played");
    getWinningPercentage();
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

  getWinningPercentage();
  console.log(numberOfGamesPlayed, "Games Played");

  if (shuffledDeck.length === 0) {
    getNewDeck(values);
  }

  dealer(adjustedDealersHandTotal, adjustedPlayersHandTotal);
  if (adjustedDealersHandTotal < adjustedPlayersHandTotal) {
    getWinningPercentage();
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

// FUTURE TO DO LIST

// Need to add running game stats like winning percentage. I can also build the betting off the this same logic.

// Need to add betting feature
// - Buttons to add amount to bet
// - Add vitual wallet to track players money total
// - Add set dollar amount the player starts with
// -

// Need to add a condition the the handleReset function that checks for to see if the Play Again button is present so that when the resest button is pressed I don't get an error. The reset button should remove all buttons and add the deal button back to the sceen. It should also reset the running game stats back to zero.
