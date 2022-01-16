


let cardDiv = document.createElement("div")
cardDiv.setAttribute("class", "card")
let playerCardsContainer = document.querySelector(".player-cards-container")
playerCardsContainer.append(cardDiv)
let cardValueContainer = document.createElement("div")
cardValueContainer.setAttribute("class", "card-value-container")
cardDiv.appendChild(cardValueContainer)
let playerCardValue = document.createElement("p")
playerCardValue.setAttribute("class", "player-card-value")
// playerCardValue.textContent = `${newCard.Value}` 
cardValueContainer.append(playerCardValue)
let playerSuitContainer = document.createElement("div")
playerSuitContainer.setAttribute("class","player-suit-container")
cardDiv.append(playerSuitContainer)
let image = document.createElement("img")
image.setAttribute("class", "player-suit")
// image.src = `images/${newCard.Suit}-solid.svg`
playerSuitContainer.append(image)
