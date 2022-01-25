// Need to switch out this function with the one I found. Mine works now!!

function createDeck(arr) {
  let cards = [];
  for (let i = 0; i < 4; i++) {
    let card = arr.map((value) => ({ Suit: suits[i], Value: value }));
    cards[i] = [...card];
  }
  return _.flattenDeep(cards);
}

// This function will be to replace the repition in the handleDealer function once I can figure out how to implement it

function firstHand(shuffledDeck) {
  for (let i = 0; i < 2; i++) {
    let hand = [];
    let card = shuffledDeck.shift();
    hand.push(card);
  }
  return hand;
}
