function renderNextCard(newCard, contestant) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");

  let playerCardsContainer = document.querySelector(
    `.${contestant}-card-container`
  );

  let cardValueContainer = document.createElement("div");
  cardValueContainer.setAttribute("class", "card-value-container");

  let playerCardValue = document.createElement("p");
  playerCardValue.setAttribute("class", `${contestant}-card-value`);
  playerCardValue.textContent = `${newCard.Value}`;

  let playerSuitContainer = document.createElement("div");
  playerSuitContainer.setAttribute("class", `${contestant}-suit-container`);

  let image = document.createElement("img");
  image.setAttribute("class", `${contestant}-suit`);
  image.src = `images/${newCard.Suit}-solid.svg`;

  playerCardsContainer.append(cardDiv);
  cardDiv.append(cardValueContainer);
  cardValueContainer.append(playerCardValue);
  cardDiv.append(playerSuitContainer);
  playerSuitContainer.append(image);
}

function createCard(newCard, contestant) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");

  let cardsContainer = document.querySelector(`.${contestant}-card-container`);

  let cardValueContainer = document.createElement("div");
  cardValueContainer.setAttribute("class", "card-value-container");

  let CardValue = document.createElement("p");
  CardValue.setAttribute("class", `${contestant}-cards-value`);
  CardValue.textContent = `${newCard.Value}`;

  let SuitContainer = document.createElement("div");
  SuitContainer.setAttribute("class", `${contestant}-suit-container`);

  let image = document.createElement("img");
  image.setAttribute("class", `${contestant}-suit`);
  image.src = `images/${newCard.Suit}-solid.svg`;

  cardsContainer.append(cardDiv);
  cardDiv.append(cardValueContainer);
  cardValueContainer.append(CardValue);
  cardDiv.append(SuitContainer);
  SuitContainer.append(image);
}

function dealNewPlayerCard(event) {
  event.preventDefault();

  const player = "player";

  let nextPlayerCard = shuffledDeck.shift();
  let nextPlayerCardValue = getFaceCardValue(nextPlayerCard.Value);

  playersHand.push(nextPlayerCardValue);

  renderNextCard(nextPlayerCard, player);

  let playersHandTotal = checkValue(playersHand);

  checkForBlackjack(playersHand, playersHandTotal);

  console.log(playersHandTotal);
  // console.log(dealersHand);
  // console.log("---------------");
  // console.log(playersHand);
}

function createPlayerDealerHitMeBtn() {
  let button = document.createElement("button");
  button.setAttribute("id", "hit-me");
  button.setAttribute("onclick", "dealNewCard(event)");
  button.setAttribute("class", "deal-card");
  button.textContent = "Hit Me";
  button.style.zIndex = 4;
  button.style.backgroundColor = "grey";
  let main = document.querySelector("main");
  main.append(button);
}

function createPlayerHitMeBtn() {
  let button = document.createElement("button");
  button.setAttribute("id", "hit-me");
  button.setAttribute("onclick", "dealNewPlayerCard(event)");
  button.setAttribute("class", "deal-card");
  button.textContent = "Hit Me";
  button.style.backgroundColor = "blue";
  button.style.zIndex = 4;
  let main = document.querySelector("main");
  main.append(button);
}

// Function checks the value of the card that was delt and assigns a value to face cards
function getFaceCardValue(element) {
  if (element === "A") {
    return 11;
  } else if (element === "J") {
    return 10;
  } else if (element === "Q") {
    return 10;
  } else if (element === "K") {
    return 10;
  } else return Number(element);
}

// Function check the total value of both the dealer and player's hands
function checkValue(total) {
  return total.reduce((total, element) => total + element);
}

// Function checks for double Aces
function checkForDoubleAces(contestant, handValue) {
  if (contestant.length === 2 && handValue >= 22) {
    return console.log(handValue - 10);
    // Need to write a function that calls for another card it the conditions here are true.
  }
}

// Function compares hands and returns the winner
function compareHands() {
  let player = checkValue(playersHand);
  let dealer = checkValue(dealersHand);
  if (player === dealer) {
    return " Draw!";
  } else if (player < dealer) {
    return dealer + " Dealer Wins!";
  } else return player + " Player Wins!";
}

// Function checks for blackjack
function checkForBlackjack(contestentsHand, contestant) {
  if (contestentsHand === 21) {
    return console.log(`${contestant} Has Blackjack!`);
  } else if (contestentsHand > 21) {
    return console.log(`${contestant} Loses!!`);
  } else console.log(`No Blackjack ${contestant}`);
}

function createPlayAgainBtn() {
  let playAgainBtn = document.createElement("button");
  playAgainBtn.setAttribute("class", "play-again-btn");
  playAgainBtn.setAttribute("onclick", "testFunction()");
  playAgainBtn.textContent = "Play Again";
  document.body.append(playAgainBtn);
}

// NEED TO FIGURE OUT THIS FUNCTION NEXT ***************************************************************
function dealerHolds(dealersHand, dealersHandTotal) {
  let handTotal = `${dealersHandTotal}`;
  if (handTotal > 15 && handTotal < 22) {
    createPlayerHitMeBtn();
    document.getElementById("hit-me").style.zIndex = 4;
    return console.log("Dealer is at or over 16");
  } else createPlayerDealerHitMeBtn();
  console.log("dealer is under 17");
}

// **************************************************************

// THESE FUNCTIONS BELOW ARE NOT IN USE AS IM STILL WORKING ON THEM OR WORKING ON HOW TO EMPLEMENT THEM
// ********************************************************************************

// This function will be to replace the repition in the handleDealer function once I can figure out how to implement it
function firstHand(shuffledDeck) {
  for (let i = 0; i < 2; i++) {
    let hand = [];
    let card = shuffledDeck.shift();
    hand.push(card);
  }
  return hand;
}

// THIS IS MY FUNCTION TO CREATE A DECK OF CARDS BUT IT'S INCOMPLETE. CURRENTLY IT GIVES ME AN ARRAY WITH FOUR ARRAYS OF ALL THE SUITS. STILL NEED TO FIGURE OUT HOW TO COMBINED THEM INTO ONE ARRAY.

// function createDeck(arr) {
//     let cards = []
//     for (let i = 0; i < 4; i++) {
//         let card = arr.map(value => ({Suit: suits[i], Value: value }))
//         cards.push(card)
//         // deck = cards.pop()
//     }
//     return cards
// console.log(createDeck(values))
// }

function testFunction() {
  console.log("testing");
}
