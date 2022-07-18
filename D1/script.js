var allCards = [];
var sum = 0;
var hasBlackJack = false;
var isAlive = false;
var message = "";
var messageEl = document.getElementById("message-el");
var sumEl = document.getElementById("sum");
var cards = document.getElementById("cards");
var playerEl = document.getElementById("player-el");
var player = {
    name: "Fratm",
    chips: 200
};
playerEl.innerHTML = player.name + ": $" + player.chips;
function getRandomCard() {
    var randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    }
    else if (randomNumber > 10) {
        return 10;
    }
    else {
        return randomNumber;
    }
}
function startGame() {
    isAlive = true;
    var firstCard = getRandomCard();
    var secondCard = getRandomCard();
    allCards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}
function renderGame() {
    cards.textContent = "Cards: ";
    for (var i = 0; i < allCards.length; i++) {
        cards.textContent += allCards[i] + " ";
    }
    sumEl.innerHTML = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want a new card?";
    }
    else if (sum === 21) {
        message = "I wiiiin";
        hasBlackJack = true;
    }
    else {
        message = "I looose";
        isAlive = false;
    }
    messageEl.innerHTML = message;
}
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        var thirdCard = getRandomCard();
        sum += thirdCard;
        allCards.push(thirdCard);
        renderGame();
        console.log(thirdCard);
    }
}
