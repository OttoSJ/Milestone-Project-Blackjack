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
  let dealersHandTotal = checkValue(dealersHand);
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

// Function check the total value of both the dealer and player's hands
function checkValue(total) {
  return total.reduce((total, element) => total + element);
}

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
  let playersHandTotal = checkValue(playersHand);
  let dealersHandTotal = checkValue(dealersHand);
  if (playersHandTotal === dealersHandTotal) {
    return " Draw!";
  } else if (playersHandTotal < dealersHandTotal && dealersHandTotal < 22) {
    return dealersHandTotal + " Dealer Wins!";
  } else if (playersHandTotal > dealersHandTotal && playersHandTotal < 22)
    return playersHandTotal + " Player Wins!";
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

// function dealerHolds(dealersHandTotal) {
//   let handTotal = `${dealersHandTotal}`;
//   if (handTotal > 15 && handTotal < 22) {
//     createHitMeBtn("blue", "dealNewCard(event)");
//     document.getElementById("hit-me").style.zIndex = 4;
//     return console.log("Dealer is at or over 16");
//   } else createHitMeBtn("grey", "dealNewPlayerCard(event)");
//   document.getElementById("hit-me").style.zIndex = 4;

//   console.log("dealer is under 17");
// }

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

// function testFunction() {
//   console.log("testing");
// }

// ***************************************************************

// let playersHand= [2, 7, 11, 11, 11, 11]
// let newArray = []
// function checkValue(total) {
//   return total.reduce((total, element) => total + element);
// }

// function compareHands(arr) {
//   arr.filter( number => {
//     if (number === 11) {
//       newArray.push(number)
//     }
//   })
//   return newArray.length

// }

// console.log(compareHands(playersHand))

// function addAces(newArray) {
//   if (newArray.length === 0) {
//     return console.log(checkValue(playersHand))
//   }else if (newArray.length === 1) {
//     return console.log(checkValue(playersHand))
//   }else if (newArray.length === 2) {
//    return console.log(checkValue(playersHand) - 10)
//   }else if (newArray.length === 3) {
//     return console.log(checkValue(playersHand) - 20)
//   }else return console.log(checkValue(playersHand) - 30)
// }
// addAces(newArray)

// // console.log(addAces(playersHand))
//   // return let twoAces = checkValue(playersHand)
// class Player {
//   constructor(handValue){
//   this.handValue = [handValue]
//   }

//   checkValue(handValue) {
//     return this.handValue.reduce((total, element) => total + element);
//   }
//   }

// let playerOne = new Player(12)
// playerOne.handValue.push(1)
// playerOne.handValue.push(12)
// console.log(playerOne)
// console.log(playerOne.checkValue())
