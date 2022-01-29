// Need to switch out this function with the one I found. Mine works now!!

function createDeck(arr) {
  let cards = [];
  for (let i = 0; i < 4; i++) {
    let card = arr.map((value) => ({ Suit: suits[i], Value: value }));
    cards[i] = [...card];
  }
  return _.flattenDeep(cards);
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
