// JAVASCRIPT

// CARDS AND FUCTIONALITY

// Need a function to create a deck of cards DONE****
// Need a function to shuffle deck of cards   DONE***
// Need a function to render cards
// Need way to keep track of dealers card total 
// Need a way to keep track of players card total
// Need a function to compare the value of dealers cards to players cards

// GAME FUNCTIONALITY

// Need a function to reset the game
// Need to create way to bet and track money
// Need to track how much money player has and end game when the player is out of money (How much money will the player start with)




// CSS
// Need to find images of cards to display
// Need to decide on layout
// Need to get background color
// Need to an array of card images and match the cards being delt with the card suit and value??

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
console.log(getDeck(values))

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
console.log(shuffle(deck))
     

let number = document.querySelector(".card-value")
number.textContent = 7
        
        
        












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
