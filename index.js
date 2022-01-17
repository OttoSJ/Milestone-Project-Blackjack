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
    let dealer = "dealer"
    let player = "player"
    const deck = getDeck(values)
    const shuffledDeck = shuffle(deck)

    let newPlayerCard = shuffledDeck.shift()
    let newDealerCard = shuffledDeck.shift()
    let playerCardValue = getValue(newPlayerCard.Value)
    let dealerCardValue = getValue(newDealerCard.Value)
    playersHand.push(playerCardValue)
    dealersHand.push(dealerCardValue)
    createCard(newPlayerCard, player)
    createCard(newDealerCard, dealer)
  
    // console.log(playersHand)
    console.log(dealersHand)

}

let numbers = [ 2, 3, 9, 7]
let total = numbers.reduce((total, element) => total + element)
let el
function checkValue(total) {
    if (total < 10) {
       return el = 11 + total
    }else return el = 1 + total
    
}
console.log(checkValue(total))

// Function that resets the game
function handleReset() { 
    let el = document.getElementsByClassName("card")
    if (el.length > 0) {
        for (let i = 0; i < el.length; i++) {
            el[i].remove()
            handleReset()
            
        }
    }
    playersHand.length = 0;
    dealersHand.length = 0;
    console.log(el.length)
    console.log("reset clicked")
}






function createCard(newCard, contestant) {
    for (let i = 0; i < 2; i++) {
        
        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card")
        
        let CardsContainer = document.querySelector(`.${contestant}-card-container`)
        
        let cardValueContainer = document.createElement("div")
        cardValueContainer.setAttribute("class", "card-value-container")
        
        let CardValue = document.createElement("p")
        CardValue.setAttribute("class", `${contestant}-cards-value`)
        CardValue.textContent = `${newCard.Value}` 
        
        let SuitContainer = document.createElement("div")
        SuitContainer.setAttribute("class",`${contestant}-suit-container`)
        
        let image = document.createElement("img")
        image.setAttribute("class", `${contestant}-suit`)
        image.src = `images/${newCard.Suit}-solid.svg`
        
        CardsContainer.append(cardDiv)
        cardDiv.append(cardValueContainer)
        cardValueContainer.append(CardValue)
        cardDiv.append(SuitContainer)
        SuitContainer.append(image)
    }  
}
    











