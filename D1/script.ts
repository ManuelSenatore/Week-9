
let allCards:number[] = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = "";
let messageEl = document.getElementById("message-el")!;
let sumEl = document.getElementById("sum")!;
let cards = document.getElementById("cards")!;
let playerEl = document.getElementById("player-el")!

let player = {
     name: "Fratm",
     chips: 200
}



playerEl.innerHTML = player.name + ": $" + player.chips

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13 ) +1

    if (randomNumber === 1){
        return 11
    }
    else if (randomNumber > 10){
        return 10
    }
    else{
        return randomNumber
    }
}

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    allCards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();

}
function renderGame(){
    cards.textContent = "Cards: "
    for (let i = 0; i < allCards.length; i++) {
        cards.textContent += allCards[i] + " "
    }
    sumEl.innerHTML = "Sum: " + sum;
    if (sum <= 20){
    message = "Do you want a new card?";

} else if (sum === 21){
    message = "I wiiiin";
    hasBlackJack = true;
}else {
    message = "I looose";
    isAlive = false;
}
messageEl.innerHTML = message;
}

 function newCard(){
    if (isAlive === true && hasBlackJack === false) {
    let thirdCard = getRandomCard();
    sum += thirdCard
    allCards.push(thirdCard);
    renderGame();
    console.log(thirdCard);
    
}
}