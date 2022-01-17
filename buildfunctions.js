function handleDealer(event) {
    
    event.preventDefault()
    let newCard = shuffledDeck.shift()
    createPlayerCard(newCard)
    createDealerCard(newCard)
    // dealerCard()
    id++
    console.log(id)
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

  
// export { createDealerCard, createPlayerCard, handleDealer}

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

