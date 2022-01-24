// var baseFlatten = require("./_baseFlatten");

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

  let cardValue = document.createElement("p");
  cardValue.setAttribute("class", `${contestant}-cards-value`);
  cardValue.textContent = `${newCard.Value}`;

  let suitContainer = document.createElement("div");
  suitContainer.setAttribute("class", `${contestant}-suit-container`);

  let image = document.createElement("img");
  image.setAttribute("class", `${contestant}-suit`);
  image.src = `images/${newCard.Suit}-solid.svg`;

  cardsContainer.append(cardDiv);
  cardDiv.append(cardValueContainer);
  cardValueContainer.append(cardValue);
  cardDiv.append(suitContainer);
  suitContainer.append(image);
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
function createHitMeBtn(contestant, buttonColor, clickFunction) {
  let button = document.createElement("button");
  button.setAttribute("id", `${contestant}`);
  button.setAttribute("onclick", `${clickFunction}`);
  button.setAttribute("class", "deal-card");
  button.textContent = "Hit Me";
  button.style.backgroundColor = `${buttonColor}`;
  button.style.zIndex = 4;
  let main = document.querySelector("main");
  main.append(button);
}

function createDealerHitMeBtn() {
  let dealersHandTotal = checkTotalHandValue(dealersHand);
  if (dealersHandTotal < 17) {
    return createHitMeBtn("dealer", "red", "dealNewDealerCard()");
    // console.log("dealer under 17 creating new dealer hit me botton");
  } else return console.log("dealer holds");
}

function createHoldButton() {
  let holdButton = document.createElement("button");
  holdButton.setAttribute("class", "hold");
  holdButton.setAttribute("onclick", "playerHold()");
  holdButton.textContent = "Hold";
  holdButton.style.zIndex = 3;
  document.body.append(holdButton);
}

// Function creates play again button and renders
function createPlayAgainBtn(playersHandTotal) {
  if (playersHandTotal > 21) {
    let playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "play-again-btn");
    playAgainBtn.setAttribute("onclick", "testFunction()");
    playAgainBtn.textContent = "Play Again";
    document.body.append(playAgainBtn);
    let holdButton = document.querySelector(".hold");
    holdButton.remove();
  }
}

// Function disables hit me button if dealer has more than 16
function disableDealerHitMeBtn(dealersHandTotal, playersHandTotal) {
  if (dealersHandTotal >= 16 && playersHandTotal <= 21) {
    let hitMeButton = document.getElementById("dealer");
    // hitMeButton.disabled = true;
    console.log(compareHands());
    createPlayAgainBtn();
  }
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

// Delete this function once you've determined that it's no longer in use anywhere else
// function checkValue(total) {
//   return total.reduce((total, element) => total + element);
// }

// Function checks for double Aces
function checkForDoubleAces(contestant, handValue) {
  if (contestant.length === 2 && handValue >= 22) {
    return handValue - 10;
  } else if (contestant.length > 2 && handValue > 10) {
    return console.log(handValue - 10);
  }
}

// Function compares hands and returns the winner
function compareHands() {
  let playersHandTotal = checkTotalHandValue(playersHand);
  let dealersHandTotal = checkTotalHandValue(dealersHand);
  if (playersHandTotal === dealersHandTotal) {
    return " Draw!";
  } else if (playersHandTotal < dealersHandTotal && dealersHandTotal < 22) {
    return dealersHandTotal + " Dealer Wins!";
  } else if (playersHandTotal > dealersHandTotal && playersHandTotal < 22) {
    return playersHandTotal + " Player Wins!";
  }
}

// Function checks for blackjack
function checkForBlackjack(contestentsHand, contestant) {
  if (contestentsHand === 21) {
    return console.log(contestentsHand, contestant, `Has Blackjack!`);
  } else if (contestentsHand > 21) {
    // return createPlayAgainBtn();
    return console.log(contestentsHand, contestant, `Loses`);
  } else console.log(contestentsHand, contestant);
}

function testFunction() {
  console.log("testing");
}

// NEED TO FIGURE OUT THIS FUNCTION NEXT ***************************************************************
function dealerHolds(dealersHandTotal) {
  let handTotal = `${dealersHandTotal}`;
  if (handTotal > 15 && handTotal < 22) {
    createPlayerHitMeBtn();
    document.getElementById("hit-me").style.zIndex = 4;
    return console.log("Dealer is at or over 16");
  } else createPlayerDealerHitMeBtn();
  console.log("dealer is under 17");
}

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

function createDeck(arr) {
  let cards = [];
  for (let i = 0; i < 4; i++) {
    let card = arr.map((value) => ({ Suit: suits[i], Value: value }));
    cards[i] = [...card];
  }
  return _.flattenDeep(cards);
}
// console.log(createDeck(values));
