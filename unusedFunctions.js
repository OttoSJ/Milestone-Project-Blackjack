// Need to switch out this function with the one I found. Mine works now!!

function getNewDeck(values) {
  unshuffled = [];
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      unshuffled.push(card);
      shuffledDeck = [...shuffle(unshuffled)];
    }
  }
}

function firstHand(shuffledDeck) {
  for (let i = 0; i < 2; i++) {
    let hand = [];
    let card = shuffledDeck.shift();
    hand.push(card);
  }
  return hand;
}

function dealerHolds(dealersHandTotal) {
  let handTotal = `${dealersHandTotal}`;
  if (handTotal > 15 && handTotal < 22) {
    createPlayerHitMeBtn();
    document.getElementById("hit-me").style.zIndex = 4;
    return console.log("Dealer is at or over 16");
  } else createPlayerDealerHitMeBtn();
  console.log("dealer is under 17");
}
