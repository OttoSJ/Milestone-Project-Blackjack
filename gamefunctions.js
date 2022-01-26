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

const playersHand = [];
const numberOfAcesPlayer = [];
const dealersHand = [];
const numberOfAcesDealer = [];
const deck = getDeck(values);
const shuffledDeck = shuffle(deck);

// Function to create deck of cards
function getDeck() {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

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

// Function to deal player card from top of deck with dealer function inside

// I hate how repetive this function is!!!!!!!
function handleDealer(event) {
  event.preventDefault();
  const dealer = "dealer";
  const player = "player";

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

  createHoldButton();
  createPlayerHitMeBtn();
}

function dealNewPlayerCard(event) {
  event.preventDefault();

  const player = "player";

  let nextPlayerCard = shuffledDeck.shift();
  let nextPlayerCardValue = getFaceCardValue(nextPlayerCard.Value);

  playersHand.push(nextPlayerCardValue);
  renderNextCard(nextPlayerCard, player);

  let playersHandTotal = checkTotalHandValue(playersHand);

  let playersAces = findNumberOfAces(playersHand, numberOfAcesPlayer);

  let adjustedPlayersHandTotal = adjustHandTotalForAces(
    playersHandTotal,
    playersAces
  );

  checkForWinner(adjustedPlayersHandTotal, player);

  createPlayAgainBtn(adjustedPlayersHandTotal);

  if (adjustedPlayersHandTotal > 21) {
    let hitMeButton = document.getElementById("hit-me");
    hitMeButton.disabled = true;
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

  dealer(adjustedDealersHandTotal, adjustedPlayersHandTotal);
  if (adjustedDealersHandTotal < adjustedPlayersHandTotal) {
    return playerHold();
  }
}

function dealNewDealerCard() {
  const dealer = "dealer";
  const player = "player";
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
  checkForWinner(adjustedDealersHandTotal, dealer);
  checkForWinner(adjustedPlayersHandTotal, player);
}

function handleReset() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.remove();

  let holdBtn = document.getElementById("hold");

  let playAgainBtn = document.querySelectorAll(".play-again-btn")[0];
  const deleteBtn = playAgainBtn ? playAgainBtn.remove() : holdBtn.remove();

  let el = document.querySelectorAll(".card");
  for (let i = 0; i < el.length; i++) {
    el[i].remove();
  }

  playersHand.length = 0;
  dealersHand.length = 0;
}

// TO DO LIST

// Need to add a messeges function that will be invoked inside of the playerHold function. It should display the winner of the game.

// Need to create an array of messeges to display
