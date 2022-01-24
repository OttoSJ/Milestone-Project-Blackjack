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
// console.log(getDeck(values))

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

const playersHand = [];
const dealersHand = [];
const deck = getDeck(values);
const shuffledDeck = shuffle(deck);
console.log(shuffledDeck);

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
  checkForBlackjack(dealersHandTotal, dealer);
  checkForBlackjack(playersHandTotal, player);
  checkForDoubleAces(playersHand, playersHandTotal);
  checkForDoubleAces(dealersHand, dealersHandTotal);
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

  checkForBlackjack(playersHandTotal, player);
  createPlayAgainBtn(playersHandTotal);
  if (playersHandTotal > 21) {
    let hitMeButton = document.getElementById("hit-me");
    hitMeButton.disabled = true;
  }
}

function playerHold() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.disabled = true;
  let dealersHandTotal = checkTotalHandValue(dealersHand);
  let playersHandTotal = checkTotalHandValue(playersHand);

  //   console.log("playerHold clicked");
  //   dealNewDealerCard();
  dealer(dealersHandTotal, playersHandTotal);
  if (dealersHandTotal < playersHandTotal) {
    return playerHold();
  }
}

function dealer(dealersHandTotal, playersHandTotal) {
  if (dealersHandTotal >= 21) {
    return createPlayAgainBtnDealer();
  } else if (dealersHandTotal < playersHandTotal) {
    return dealNewDealerCard();
  } else return createPlayAgainBtnDealer();
}

function dealNewDealerCard() {
  const dealer = "dealer";
  const player = "player";
  let nextDealerCard = shuffledDeck.shift();
  let nextDealerCardValue = getFaceCardValue(nextDealerCard.Value);
  console.log("newDealer card clicked");

  dealersHand.push(nextDealerCardValue);

  renderNextCard(nextDealerCard, dealer);

  let dealersHandTotal = checkTotalHandValue(dealersHand);
  let playersHandTotal = checkTotalHandValue(playersHand);

  checkForBlackjack(dealersHandTotal, dealer);
  checkForBlackjack(playersHandTotal, player);
}

function createPlayAgainBtnDealer() {
  let playAgainBtn = document.createElement("button");
  playAgainBtn.setAttribute("class", "play-again-btn");
  playAgainBtn.setAttribute("onclick", "testFunction()");
  playAgainBtn.textContent = "Play Again";
  document.body.append(playAgainBtn);
  let holdButton = document.querySelector(".hold");
  holdButton.remove();
  console.log("createPlayAgainBtn clicked");
}

function handleReset() {
  //   let el = document.getElementsByClassName("card");
  let hitMeButton = document.getElementById("hit-me");
  //   console.log(el.length);
  //   if (el.length > 0) {
  //     el.romove();
  //     handleReset();
  //   }
  //   for (let i = 0; i < el.length; i++) {
  //     el.remove();
  //   }
  // Need to figure out a better solution for hiding this button. This creates a button everytime this has to run to delete the cards
  holdButton = document.createElement("button");
  holdButton.setAttribute("class", "cover-hold");
  document.body.append(holdButton);

  hitMeButton.remove();
  playersHand.length = 0;
  dealersHand.length = 0;
}

let dealersTotal = [11, 3];

let numberOfAces = [];

// This function will be called once for each player in handleDealer, dealNewPlayerCard and dealNewDealerCard
findNumberOfAces = (number) => {
  let aces = number.filter((number) => number === 11);
  numberOfAces = [...aces];
  return aces;
};
// This function will replace checkValue function
checkTotalHandValue = (playersHand) => {
  let total = playersHand.reduce((total, element) => total + element);
  let grandTotal = total;
  return grandTotal;
};

// This function will be called once for each player in handleDealer, dealNewPlayerCard and dealNewDealerCard. This function will provide the single source of truth for all the hands. It will require a new array for player and dealer to push the adjusted total into and the checkForBlackjack function will recieve its number from here.

adjustHandTotalForAces = (handTotal) => {
  if (numberOfAces.length === 0) {
    return console.log(handTotal);
  } else if (numberOfAces.length === 1 && handTotal <= 21) {
    return console.log(handTotal);
  } else if (numberOfAces.length === 1 && handTotal > 21) {
    return console.log(handTotal - 10);
  } else if (numberOfAces.length === 2 && handTotal <= 21) {
    return console.log(handTotal - 10);
  } else if (numberOfAces.length + playersHand.length === 5 && handTotal > 31) {
    return console.log(handTotal - 20);
  } else if (numberOfAces.length + playersHand.length === 5 && handTotal > 21) {
    return console.log(handTotal - 10);
  } else if (numberOfAces.length + playersHand.length === 6 && handTotal < 32) {
    return console.log(handTotal - 10);
  } else if (numberOfAces.length === 2 && handTotal > 21) {
    return console.log(handTotal - 20);
  } else if (numberOfAces.length === 3 && handTotal > 10) {
    return console.log(handTotal - 30);
  } else return console.log(handTotal - 40);
};

findNumberOfAces(dealersTotal);
console.log(numberOfAces);
console.log(numberOfAces.length);

checkTotalHandValue(dealersTotal);
console.log(checkTotalHandValue(dealersTotal));
let totalDealersCount = checkTotalHandValue(dealersTotal);
adjustHandTotalForAces(totalDealersCount);
