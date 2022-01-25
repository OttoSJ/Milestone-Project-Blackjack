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

function dealer(dealersHandTotal, playersHandTotal) {
  if (dealersHandTotal >= 21) {
    return createPlayAgainBtnDealer();
  } else if (dealersHandTotal < playersHandTotal) {
    return dealNewDealerCard();
  } else return createPlayAgainBtnDealer();
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

// Function compares hands and returns the winner

// Function checks for winner. CHANGE NAME TO CHECK FOR WINNER
function checkForWinner(contestentsHand, contestant) {
  if (contestentsHand === 21) {
    return console.log(contestentsHand, contestant, `Has Blackjack!`);
  } else if (contestentsHand > 21) {
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

// Need to switch out this function with the one I found. Mine works now!!
function createDeck(arr) {
  let cards = [];
  for (let i = 0; i < 4; i++) {
    let card = arr.map((value) => ({ Suit: suits[i], Value: value }));
    cards[i] = [...card];
  }
  return _.flattenDeep(cards);
}
// console.log(createDeck(values));

// This function will be called once for each player in handleDealer, dealNewPlayerCard and dealNewDealerCard
findNumberOfAces = (contestantsHand, numberOfContestantsAces) => {
  let aces = contestantsHand.filter((number) => number === 11);
  numberOfContestantsAces = [...aces];
  return console.log(aces);
};
// This function will replace checkValue function
checkTotalHandValue = (playersHand) => {
  let total = playersHand.reduce((total, element) => total + element);
  let grandTotal = total;
  return grandTotal;
};

// This function will be called once for each player in handleDealer, dealNewPlayerCard and dealNewDealerCard. This function will provide the single source of truth for all the hands. It will require a new array for player and dealer to push the adjusted total into and the checkForWinner function will recieve its number from here.

adjustHandTotalForAces = (handTotal, numberOfAces) => {
  if (numberOfAces.length === 0) {
    return handTotal;
  } else if (numberOfAces.length === 1 && handTotal <= 21) {
    return handTotal;
  } else if (numberOfAces.length === 1 && handTotal > 21) {
    return handTotal - 10;
  } else if (numberOfAces.length === 2 && handTotal <= 21) {
    return handTotal - 10;
  } else if (numberOfAces.length + playersHand.length === 5 && handTotal > 31) {
    return handTotal - 20;
  } else if (numberOfAces.length + playersHand.length === 5 && handTotal > 21) {
    return handTotal - 10;
  } else if (numberOfAces.length + playersHand.length === 6 && handTotal < 32) {
    return handTotal - 10;
  } else if (numberOfAces.length === 2 && handTotal > 21) {
    return handTotal - 20;
  } else if (numberOfAces.length === 3 && handTotal > 10) {
    return handTotal - 30;
  } else return handTotal - 40;
};

// findNumberOfAces(dealersTotal);
// console.log(numberOfAces);
// console.log(numberOfAces.length);

// checkTotalHandValue(dealersTotal);
// console.log(checkTotalHandValue(dealersTotal));
// let totalDealersCount = checkTotalHandValue(dealersTotal);
// adjustHandTotalForAces(totalDealersCount);

// FUNCTIONS THAT HAVE BEEN REMOVED FROM USE

// Function checks for double Aces
// function checkForDoubleAces(contestant, handValue) {
//   if (contestant.length === 2 && handValue >= 22) {
//     return handValue - 10;
//   } else if (contestant.length > 2 && handValue > 10) {
//     return console.log(handValue - 10);
//   }
// }

// Function disables hit me button if dealer has more than 16
// function disableDealerHitMeBtn(dealersHandTotal, playersHandTotal) {
//   if (dealersHandTotal >= 16 && playersHandTotal <= 21) {
//     let hitMeButton = document.getElementById("dealer");
//     // hitMeButton.disabled = true;
//     console.log(compareHands());
//     createPlayAgainBtn();
//   }
// }

// function compareHands() {
//   let playersHandTotal = checkTotalHandValue(playersHand);
//   let dealersHandTotal = checkTotalHandValue(dealersHand);
//   if (playersHandTotal === dealersHandTotal) {
//     return " Draw!";
//   } else if (playersHandTotal < dealersHandTotal && dealersHandTotal < 22) {
//     return dealersHandTotal + " Dealer Wins!";
//   } else if (playersHandTotal > dealersHandTotal && playersHandTotal < 22) {
//     return playersHandTotal + " Player Wins!";
//   }
// }

// function dealNewCard(event) {
//   event.preventDefault();
//   const dealer = "dealer";
//   const player = "player";

//   let nextPlayerCard = shuffledDeck.shift();
//   let nextPlayerCardValue = getFaceCardValue(nextPlayerCard.Value);

//   let nextDealerCard = shuffledDeck.shift();
//   let nextDealerCardValue = getFaceCardValue(nextDealerCard.Value);

//   dealersHand.push(nextDealerCardValue);
//   playersHand.push(nextPlayerCardValue);

//   renderNextCard(nextPlayerCard, player);
//   renderNextCard(nextDealerCard, dealer);
//   createPlayerHitMeBtn();
// }
