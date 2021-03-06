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

function createHoldButton() {
  let holdButton = document.createElement("button");
  holdButton.setAttribute("class", "hold");
  holdButton.setAttribute("onclick", "playerHold()");
  holdButton.textContent = "Hold";
  holdButton.style.zIndex = 3;
  document.body.append(holdButton);
}

// Function creates play again button and renders
function createPlayAgainBtn(HandTotal) {
  if (HandTotal > 21) {
    let playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class", "play-again-btn");
    playAgainBtn.setAttribute("onclick", "handleReset()");
    playAgainBtn.textContent = "Play Again";
    document.body.append(playAgainBtn);
    let holdButton = document.querySelector(".hold");
    holdButton.remove();
  }
}

function createPlayAgainBtnDealer() {
  let playAgainBtn = document.createElement("button");
  playAgainBtn.setAttribute("class", "play-again-btn");
  playAgainBtn.setAttribute("onclick", "handleReset()");
  playAgainBtn.textContent = "Play Again";
  document.body.append(playAgainBtn);
  let holdButton = document.querySelector(".hold");
  holdButton.remove();
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

function displayScore(dealersHand, playersHand) {
  let dealerMessege = document.querySelectorAll(".dealer-score-messege")[0];
  let playerMessege = document.querySelectorAll(".player-score-messege")[0];
  dealerMessege.textContent = `Dealer Score ${dealersHand}`;
  playerMessege.textContent = `Player Score ${playersHand} `;
}

// This function will be called once for each player in handleDealer, dealNewPlayerCard and dealNewDealerCard
findNumberOfAces = (contestantsHand, numberOfContestantsAces) => {
  let aces = contestantsHand.filter((number) => number === 11);
  numberOfContestantsAces = [...aces];
  return aces.length;
};
// This function adds the total hand value and returns that number
checkTotalHandValue = (playersHand) => {
  let total = playersHand.reduce((total, element) => total + element);
  let grandTotal = total;
  return grandTotal;
};

// This function adust the value of ace depending on the total hand value and return the value of ace as 1 or 11.
adjustHandTotalForAces = (handTotal, numberOfAces) => {
  if (numberOfAces === 0 && handTotal < 21) {
    return handTotal;
  } else if (numberOfAces === 1 && handTotal <= 21) {
    return handTotal;
  } else if (numberOfAces === 1 && handTotal > 21) {
    return handTotal - 10;
  } else if (numberOfAces === 2 && handTotal <= 21) {
    return handTotal - 10;
  } else if (numberOfAces + playersHand.length === 5 && handTotal > 31) {
    return handTotal - 20;
  } else if (numberOfAces === 2 && handTotal > 21) {
    return handTotal - 10;
  } else if (numberOfAces + playersHand.length === 6 && handTotal < 32) {
    return handTotal - 10;
  } else if (numberOfAces === 2 && handTotal > 21) {
    return handTotal - 20;
  } else if (numberOfAces === 3 && handTotal > 10) {
    return handTotal - 30;
  } else return handTotal;
  // Try moving else if statement at line 189 down and the next else if statement up to fix logic bug.
};

function checkForWinnerMessege(
  adjustedDealersHandTotal,
  adjustedPlayersHandTotal
) {
  const messegesContainer = document.querySelectorAll(".messeges")[0];
  if (adjustedDealersHandTotal > 21) {
    // numberOfGamesPlayed++;
    numberOfPlayerWins++;
    console.log(numberOfPlayerWins, "Player win total");
    return (messegesContainer.textContent = "Player Wins!!");
  } else if (adjustedDealersHandTotal === adjustedPlayersHandTotal) {
    // numberOfGamesPlayed++;
    numberOfPlayerWins++;
    console.log(numberOfPlayerWins, "Player win total");
    return (messegesContainer.textContent = "Draw");
    // numberOfGamesPlayed++;
  } else adjustedDealersHandTotal > adjustedPlayersHandTotal;
  console.log(numberOfPlayerWins, "Player win total");
  return (messegesContainer.textContent = "Dealer Wins!");
}

// I need to figure out why if the player wins the first game that number isn't included in the winning
function getWinningPercentage() {
  let winningPercentageMessege = document.querySelectorAll(
    ".winning-percentage-number"
  )[0];
  let winningPercentage = numberOfPlayerWins / numberOfGamesPlayed;
  winningPercentageMessege.textContent = `${winningPercentage.toFixed(2)} %`;
}
