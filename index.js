// JAVASCRIPT

// CARDS AND FUCTIONALITY



// Need way to keep track of dealers card total 
// Need a way to keep track of players card total
// Need to compare the value of dealers cards to players cards

// GAME FUNCTIONALITY

// Need a function to reset the game
// Need to create way to bet and track money
// Need to track how much money player has and end game when the player is out of money (How much money will the player start with)




// CSS
// Need to decide on layout



// Array of suits
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"]

// Array of card values
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]



// Function to create deck of cards
function getDeck()
{
    let deck = new Array();

    for(let i = 0; i < suits.length; i++)
    {
        for(let x = 0; x < values.length; x++)
        {
            let card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }

    return deck;
}
// console.log(getDeck(values))

// Function to shuffle cards
function shuffle(deck)
{
	
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

        deck[location1] = deck[location2];
        // console.log(tmp)
		deck[location2] = tmp;
    }
    return deck
}

let deck = getDeck(values)
// console.log(shuffle(deck))
let shuffledDeck = shuffle(deck)
let dealer 
console.log(shuffledDeck)


// Function for dealer to reicve card
function dealerCard() {
    let newCard = shuffledDeck.shift()
    let dealerCard = document.querySelector(".dealer-card-value")
    dealerCard.textContent = `${newCard.Value}`
    let newCardImage = document.querySelector(".dealer-suit")
    newCardImage.src = `images/${newCard.Suit}-solid.svg`
    console.log(newCard)
    // Need to add conditional statement to check for dealers total hand value (16 tops!!)
    let number = 11
    let a = (number > 11) ? "A" : "B" 

    // Need to add setTimeOut for slight delay
    // Need to add message if dealer holds
}       

// Function to deal player card from top of deck with dealer function inside
let id = 0
function handleDealer(event) {

    event.preventDefault()
    let newCard = shuffledDeck.shift()
    // console.log(newCard.Suit)
    // let newCardValue = document.querySelector(".player-card-value")
    // newCardValue.textContent = `${newCard.Value}`
    // let newCardImage = document.querySelector(".player-suit")
    // newCardImage.src = `images/${newCard.Suit}-solid.svg`
    
   
    createCard(newCard)
    dealerCard()

    id++
    console.log(id)
}

function createCard(newCard) {

    let cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card")
    let playerCardsContainer = document.querySelector(".player-cards-container")
    playerCardsContainer.append(cardDiv)
    let cardValueContainer = document.createElement("div")
    cardValueContainer.setAttribute("class", "card-value-container")
    cardDiv.appendChild(cardValueContainer)
    let playerCardValue = document.createElement("p")
    playerCardValue.setAttribute("class", "player-card-value")
    playerCardValue.textContent = `${newCard.Value}` 
    cardValueContainer.append(playerCardValue)
    let playerSuitContainer = document.createElement("div")
    playerSuitContainer.setAttribute("class","player-suit-container")
    cardDiv.append(playerSuitContainer)
    let image = document.createElement("img")
    image.setAttribute("class", "player-suit")
    image.src = `images/${newCard.Suit}-solid.svg`
    playerSuitContainer.append(image)

}

// THINGS THAT NEED TO HAPPEN WHEN I CLICK THE BUTTON
// Place each card into players array to track total value and also for placement of each card so player can see their hand
// Compare player total card value to dealer total card card value








// THIS IS MY FUNCTION TO CREATE A DECK OF CARDS BUT IT'S INCOMPLETE. CURRENTLY IT GIVES ME AN ARRAY WITH FOUR ARRAYS OF ALL THE SUIT. STILL NEED TO FIGURE OUT HOW TO COMBINED THEM INTO ONE ARRAY. 

// function createDeck(arr) {
    
//     let deck = []
//     let cards = []
//     for (let i = 0; i < 4; i++) {
//         let card = arr.map(value => ({Suit: suits[i], Value: value }))
//         cards.push(card)
//         // deck = cards.pop()
//     }
//     return cards
// }
// console.log(createDeck(values))


// Testing the change of value for the cards faces
