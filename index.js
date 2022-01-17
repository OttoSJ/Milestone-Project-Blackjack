// import { createDealerCard  } from "./buildfunctions.js";

// JAVASCRIPT

// CARDS AND FUCTIONALITY



// Need way to keep track of dealers card total 
// Need a way to keep track of players card total
// Need to compare the value of dealers cards to players cards

// GAME FUNCTIONALITY


// Need to create way to bet and track money
// Need to track how much money player has and end game when the player is out of money (How much money will the player start with)
// Need to add setTimeOut for slight delay for dealers card
// Need to add message if dealer holds

// THINGS THAT NEED TO HAPPEN WHEN I CLICK THE BUTTON
// Place each card into players array to track total value and also for placement of each card so player can see their hand
// Compare player total card value to dealer total card card value
    



// CSS
// Need to decide on layout



// Array of suits
const suits = ["Spades", "Diamonds", "Clubs", "Hearts"]

// Array of card values
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]



// Function to create deck of cards
function getDeck() {
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







// Function to deal player card from top of deck with dealer function inside

const playersHand = []
const dealersHand = []
function handleDealer(event) {
    event.preventDefault()
    
    const deck = getDeck(values)
    const shuffledDeck = shuffle(deck)

    let newPlayerCard = shuffledDeck.shift()
    let newDealerCard = shuffledDeck.shift()
    let playerCardValue = getValue(newPlayerCard.Value)
    let dealerCardValue = getValue(newDealerCard.Value)
    playersHand.push(playerCardValue)
    dealersHand.push(dealerCardValue)
    createPlayerCard(newPlayerCard)
    createDealerCard(newDealerCard)
  
    console.log(playersHand)

}

// Function that resets the game
function handleReset() { 
    let el = document.getElementsByClassName("card")
    if (el.length > 0) {
        for (let i = 0; i < el.length; i++) {
            el[i].remove()
            handleReset()
        }
    }
    
    console.log(el.length)
    console.log("reset clicked")
}

   

function createPlayerCard(newCard) {

    let cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card")

    let playerCardsContainer = document.querySelector(".player-cards-container")
    
    let cardValueContainer = document.createElement("div")
    cardValueContainer.setAttribute("class", "card-value-container")
    
    let playerCardValue = document.createElement("p")
    playerCardValue.setAttribute("class", "player-card-value")
    playerCardValue.textContent = `${newCard.Value}` 
    
    let playerSuitContainer = document.createElement("div")
    playerSuitContainer.setAttribute("class","player-suit-container")
    
    let image = document.createElement("img")
    image.setAttribute("class", "player-suit")
    image.src = `images/${newCard.Suit}-solid.svg`
    
    playerCardsContainer.append(cardDiv)
    cardDiv.append(cardValueContainer)
    cardValueContainer.append(playerCardValue)
    cardDiv.append(playerSuitContainer)
    playerSuitContainer.append(image)
}

    
function createDealerCard(newCard) {

    let cardDiv = document.createElement("div")
    cardDiv.setAttribute("class", "card")
      
    let dealerCardsContainer = document.querySelector(".dealer-card-container")
    
    let cardValueContainer = document.createElement("div")
    cardValueContainer.setAttribute("class", "card-value-container")
    
    let dealerCardValue = document.createElement("p")
    dealerCardValue.setAttribute("class", "dealer-cards-value")
    dealerCardValue.textContent = `${newCard.Value}` 
    
    let dealerSuitContainer = document.createElement("div")
    dealerSuitContainer.setAttribute("class","dealer-suit-container")
    
    let image = document.createElement("img")
    image.setAttribute("class", "dealer-suit")
    image.src = `images/${newCard.Suit}-solid.svg`
    
    dealerCardsContainer.append(cardDiv)
    cardDiv.append(cardValueContainer)
    cardValueContainer.append(dealerCardValue)
    cardDiv.append(dealerSuitContainer)
    dealerSuitContainer.append(image)
}  

function getValue(element) {
    if (element === "J" ) {
       return 10
    } else if (element === "Q") {
        return 10
    } else if (element === "K") {
        return 10
    } else return Number(element)
        
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
// }
// console.log(createDeck(values))


// Testing the change of value for the cards faces


// function getValue(element) {
//     if (element === "J" ) {
//        return console.log(10)
//     } else if (element === "Q") {
//         console.log(11)
//     } else if (element === "K") {
//         console.log(12)
//     } else return console.log(Number(element))
        
// }

// getValue("7")