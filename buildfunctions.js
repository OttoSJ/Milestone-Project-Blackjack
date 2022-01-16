function handleDealer(event) {
    
    event.preventDefault()
    let newCard = shuffledDeck.shift()
    createPlayerCard(newCard)
    createDealerCard(newCard)
    // dealerCard()
    id++
    console.log(id)
}


function createPlayerCard() {

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

{/* <div class="card">
          <div class="card-value-container">
            <p class="dealer-cards-value">3</p>
          </div>
          <div class="dealer-suit-container">
            <img class="dealer-suit" src="images/Hearts-solid.svg" alt="" />
          </div>
        </div> */}