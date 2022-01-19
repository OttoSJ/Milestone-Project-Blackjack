// JAVASCRIPT
// CARDS AND FUCTIONALITY

// Need to keep dealer from taking another card after 16

// GAME FUNCTIONALITY

// Need to create way to bet and track money
// Need to track how much money player has and end game when the player is out of money (How much money will the player start with)
// Need to add setTimeOut for slight delay for dealers card
// Need to add message if dealer holds

// CSS

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
  let firstPlayerCardValue = getValue(firstPlayerCard.Value);
  let secondPlayerCardValue = getValue(secondPlayerCard.Value);
  let firstDealerCardValue = getValue(firstDealerCard.Value);
  let secondDealerCardValue = getValue(secondDealerCard.Value);
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
  createHitMeBtn();
  document.getElementById("hit-me").style.zIndex = 4;
  let hold = document.createElement("button");
  hold.setAttribute("class", "hold");
  hold.setAttribute("onclick", "playerHold()");
  hold.textContent = "Hold";
  hold.style.zIndex = 3;
  document.body.append(hold);
  // console.log(dealersHand)
  // console.log(playersHand)

  console.log(checkValue(dealersHand));
  console.log(checkValue(playersHand));
}

function playerHold() {
  let hitMeButton = document.getElementById("hit-me");
  hitMeButton.remove();
  let results = compareHands();

  console.log(results);
}

function handleNewCard(event) {
  event.preventDefault();
  const dealer = "dealer";
  const player = "player";

  let nextPlayerCard = shuffledDeck.shift();
  let nextPlayerCardValue = getValue(nextPlayerCard.Value);

  let nextDealerCard = shuffledDeck.shift();
  let nextDealerCardValue = getValue(nextDealerCard.Value);

  playersHand.push(nextPlayerCardValue);
  dealersHand.push(nextDealerCardValue);
  renderNextCard(nextPlayerCard, dealer);
  renderNextCard(nextDealerCard, player);

  let dealersHandTotal = checkValue(dealersHand);
  let playersHandTotal = checkValue(playersHand);

  checkForBlackjack(dealersHandTotal, dealer);
  checkForBlackjack(playersHandTotal, player);
  console.log(dealersHandTotal);
  console.log(playersHandTotal);
}

// Function that resets the game
function handleReset() {
  let el = document.getElementsByClassName("card");
  let hitMeButton = document.getElementById("hit-me");

  if (el.length > 0) {
    for (let i = 0; i < el.length; i++) {
      el[i].remove();
      handleReset();
    }
  }
  // Need to figure out a better solution for hiding this button. This creates a button everytime this has to run to delete the cards
  let hold = document.createElement("button");
  hold.setAttribute("class", "cover-hold");
  document.body.append(hold);

  hitMeButton.remove();
  playersHand.length = 0;
  dealersHand.length = 0;
}
