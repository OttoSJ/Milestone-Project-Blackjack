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
  let dealersHandTotal = checkValue(dealersHand);
  let playersHandTotal = checkValue(playersHand);

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

  // console.log(dealersHandTotal);
  // console.log(playersHandTotal);

  // console.log(checkValue(dealersHand));
  // console.log(checkValue(playersHand));
}

function dealNewPlayerCard(event) {
  event.preventDefault();

  // const dealer = "dealer";
  const player = "player";

  let nextPlayerCard = shuffledDeck.shift();
  let nextPlayerCardValue = getFaceCardValue(nextPlayerCard.Value);

  playersHand.push(nextPlayerCardValue);

  renderNextCard(nextPlayerCard, player);

  // let dealersHandTotal = checkValue(dealersHand);
  let playersHandTotal = checkValue(playersHand);

  checkForBlackjack(playersHandTotal, player);
  createPlayAgainBtn(playersHandTotal);
  // console.log(checkForBlackjack(dealersHandTotal, dealer));
  // console.log(checkForBlackjack(playersHandTotal, player));
}

function playerHold() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.disabled = true;
  let dealersHandTotal = checkValue(dealersHand);
  let playersHandTotal = checkValue(playersHand);

  //   console.log("playerHold clicked");
  //   dealNewDealerCard();
  dealer(dealersHandTotal, playersHandTotal);
  //   playerHold();
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

  let dealersHandTotal = checkValue(dealersHand);
  let playersHandTotal = checkValue(playersHand);

  checkForBlackjack(dealersHandTotal, dealer);
  checkForBlackjack(playersHandTotal, player);
  // disableDealerHitMeBtn(dealersHandTotal, playersHandTotal);
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
