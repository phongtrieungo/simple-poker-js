// Get element reference
const createDeckButton = document.getElementById("create-deck-btn");
const resetDeckButton = document.getElementById("reset-deck-btn");
const drawCardButton = document.getElementById("draw-card-btn");
const numberOfAvailableCards = document.getElementById(
    "number-of-available-cards"
);
const drawnCards = document.getElementById("drawn-cards");
const rankValue = document.getElementById('rank-value');

// Variables
let cardsOnHand = [];
const delay = 500;
const cardValues = {
    "Ace of Hearts": 1,
    "2 of Hearts": 2,
    "3 of Hearts": 3,
    "4 of Hearts": 4,
    "5 of Hearts": 5,
    "6 of Hearts": 6,
    "7 of Hearts": 7,
    "8 of Hearts": 8,
    "9 of Hearts": 9,
    "10 of Hearts": 10,
    "Jack of Hearts": 11,
    "Queen of Hearts": 12,
    "King of Hearts": 13,
    "Ace of Diamonds": 1,
    "2 of Diamonds": 2,
    "3 of Diamonds": 3,
    "4 of Diamonds": 4,
    "5 of Diamonds": 5,
    "6 of Diamonds": 6,
    "7 of Diamonds": 7,
    "8 of Diamonds": 8,
    "9 of Diamonds": 9,
    "10 of Diamonds": 10,
    "Jack of Diamonds": 11,
    "Queen of Diamonds": 12,
    "King of Diamonds": 13,
    "Ace of Clubs": 1,
    "2 of Clubs": 2,
    "3 of Clubs": 3,
    "4 of Clubs": 4,
    "5 of Clubs": 5,
    "6 of Clubs": 6,
    "7 of Clubs": 7,
    "8 of Clubs": 8,
    "9 of Clubs": 9,
    "10 of Clubs": 10,
    "Jack of Clubs": 11,
    "Queen of Clubs": 12,
    "King of Clubs": 13,
    "Ace of Spades": 1,
    "2 of Spades": 2,
    "3 of Spades": 3,
    "4 of Spades": 4,
    "5 of Spades": 5,
    "6 of Spades": 6,
    "7 of Spades": 7,
    "8 of Spades": 8,
    "9 of Spades": 9,
    "10 of Spades": 10,
    "Jack of Spades": 11,
    "Queen of Spades": 12,
    "King of Spades": 13,
};

// Classes
class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();
        this.count = 0;
        this.numberOfAllowedDrawCards = 5;
    }

    reset() {
        this.deck = [];
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

        suits.forEach((suit) => {
            values.forEach((val) => {
                this.deck.push(`${val} of ${suit}`);
            });
        });
    }

    shuffle() {
        const numberOfCards = this.deck.length;
        for (let i = 0; i < numberOfCards; i++) {
            const j = Math.floor(Math.random() * numberOfCards);
            const tmp = this.deck[i];

            this.deck[i] = this.deck[j];
            this.deck[j] = tmp;
        }
    }

    drawCards() {
        const drawnCards = [];
        const stopCondition = this.count + this.numberOfAllowedDrawCards > this.deck.length ? this.length() : this.count + this.numberOfAllowedDrawCards;
        for (let index = this.count; index < stopCondition; index++, this.count++) {
            drawnCards.push(this.deck[index]);
        }

        return drawnCards;
    }

    length() {
        return this.deck.length;
    }

    remainCards() {
        return this.deck.length - this.count;
    }
}

class Card {
    constructor(card) {
        this.card = card;
        this.value = cardValues[card];
        this.suit = card.substring(card.indexOf(" of ") + 4);
        this.placeHolder = null;
        this.flipped = false;

        const suits = { Hearts: 0, Diamonds: 13, Clubs: 26, Spades: 39 };
        this.position = suits[this.suit] + this.value; //Position in a sorted deck
    }

    displayCard(placeHolder, flipped = true) {
        this.placeHolder = placeHolder;
        this.placeHolder.classList.add("card");
        this.flipped = flipped;
        if (flipped) {
            this.placeHolder.style.backgroundPosition = -150 * this.position + "px";
        } else {
            this.placeHolder.style.backgroundPosition = "0px";
        }
    }

    flip() {
        if (this.flipped) {
            this.placeHolder.style.backgroundPosition = "0px";
            this.flipped = false;
        } else {
            this.placeHolder.style.backgroundPosition = -150 * this.position + "px";
            this.flipped = true;
        }
    }
}

// Main logic

let deck = null;

const setup = () => {
    if (deck === null) {
        hideDeck();
    }
};

const createLoader = () => {
    const span = document.createElement("span");
    span.classList.add("loader");
    return span;
};

const removeLoader = (loader) => {
    if (loader) {
        loader.remove();
    }
};

createDeckButton.addEventListener("click", () => {
    rankValue.innerHTML = '';
    while (drawnCards.firstChild) {
        drawnCards.removeChild(drawnCards.lastChild);
    }
    hideDeck();
    const loader = createLoader();

    createDeckButton.appendChild(loader);
    deck = new Deck();

    setTimeout(() => {
        removeLoader(loader);
        showDeck();
        numberOfAvailableCards.innerHTML = `${deck.length()} cards`;
        drawCardButton.disabled = false;
    }, delay);
});

resetDeckButton.addEventListener("click", () => {
    rankValue.innerHTML = '';
    while (drawnCards.firstChild) {
        drawnCards.removeChild(drawnCards.lastChild);
    }
    hideDeck();
    const loader = createLoader();

    resetDeckButton.appendChild(loader);

    deck = new Deck();

    setTimeout(() => {
        removeLoader(loader);
        showDeck();
        numberOfAvailableCards.innerHTML = `${deck.length()} cards`;
        drawCardButton.disabled = false;
    }, delay);
});

drawCardButton.addEventListener("click", () => {
    cardsOnHand = [];
    while (drawnCards.firstChild) {
        drawnCards.removeChild(drawnCards.lastChild);
    }
    const loader = createLoader();

    drawCardButton.appendChild(loader);

    if (deck) {
        cardsOnHand = [...deck.drawCards()];
    }

    setTimeout(() => {
        removeLoader(loader);
        const cardDetails = cardsOnHand.map((val) => new Card(val));

        cardDetails.forEach((c) => {
            const card = document.createElement("div");
            c.displayCard(card);
            drawnCards.appendChild(c.placeHolder);
        });
        numberOfAvailableCards.innerHTML = `${deck.remainCards()} cards`;

        if (deck.remainCards() === 0) {
            drawCardButton.disabled = true;
        }

        const result = calculateHandRanking(cardDetails);
        rankValue.innerHTML = result;
    }, delay);
});

const showDeck = () => {
    if (deck) {
        drawCardButton.classList.remove("hide");
    }
};

const hideDeck = () => {
    drawCardButton.classList.add("hide");
};

const createCard = (c) => {
    const card = document.createElement("div");
    const cardName = document.createElement("span");
    card.classList.add("card");

    card.appendChild(cardName);

    return card;
};

function evaluateSameSuit(calculatedCards) {
    let result = '';
    const sorted = calculatedCards.sort((pre, cur) => pre.value - cur.value).map(s => s.value);
    let isStraightFlush = true;
    let start = 0;

    for (let i = 0; i < sorted.length; i++) {
        const element = sorted[i];

        if (i === 0) {
            start = element;
            continue;
        }

        isStraightFlush = isStraightFlush && start + 1 === element;
        start = element;

    }

    if (isStraightFlush) {
        if (sorted[0] === 10 && sorted[sorted.length - 1] === 14) {
            result = 'Royal flush';
        } else {
            result = 'Straight flush';
        }
    } else {
        result = 'Flush';
    }
    return result;
}

function calculateHandRanking(cards) {
    let result = 'HighCards';
    if (cards.length < 5) {
        return result;
    }

    const calculatedCards = [...cards].map(selectedCard => ({ suit: selectedCard.suit, value: selectedCard.value === 1 ? 14 : selectedCard.value }));

    const groupBySuit = new Map();

    const groupByValue = new Map();

    calculatedCards.forEach(card => {
        if (groupBySuit.has(card.suit)) {
            const currentVal = groupBySuit.get(card.suit);
            groupBySuit.set(card.suit, `${currentVal} ${card.value}`);
        } else {
            groupBySuit.set(card.suit, card.value);
        }

        if (groupByValue.has(card.value)) {
            const currentVal = groupByValue.get(card.value);
            groupByValue.set(card.value, `${currentVal} ${card.suit}`);
        } else {
            groupByValue.set(card.value, card.suit);
        }
    })

    if (groupBySuit.size === 1) {
        result = evaluateSameSuit(calculatedCards);
        return result;
    }

    if (groupByValue.size === 2) {
        const groupValues = groupByValue.values();
        const groupOne = groupValues.next().value;
        const groupTwo = groupValues.next().value;

        const groupOneValues = groupOne.split(' ');
        const groupTwoValues = groupTwo.split(' ');

        if (groupOneValues.length === 4 || groupTwoValues.length === 4) {
            result = 'Four of a kind';
        } else {
            result = 'Full House';
        }
        return result;
    }

    if (groupByValue.size === 3) {
        const groupValues = groupByValue.values();
        const groupOne = groupValues.next().value;
        const groupTwo = groupValues.next().value;
        const groupThree = groupValues.next().value;

        const groupOneValues = groupOne.split(' ');
        const groupTwoValues = groupTwo.split(' ');
        const groupThreeValues = groupThree.split(' ');

        if (groupOneValues.length === 3 || groupTwoValues.length === 3 || groupThreeValues.length === 3) {
            result = 'Three of a kind';
        } else if (
            (groupOneValues.length = 2 && groupTwoValues.length === 2) ||
            (groupOneValues.length = 2 && groupThreeValues.length === 2) ||
            (groupTwoValues.length = 2 && groupThreeValues.length === 2)
        ) {
            result = 'Two Pair';
        }
        return result;
    }

    if (groupByValue.size === 4) {
        const groupValues = groupByValue.values();
        const groupOne = groupValues.next().value;
        const groupTwo = groupValues.next().value;
        const groupThree = groupValues.next().value;
        const groupFour = groupValues.next().value;

        const groupOneValues = groupOne.split(' ');
        const groupTwoValues = groupTwo.split(' ');
        const groupThreeValues = groupThree.split(' ');
        const groupFourValues = groupFour.split(' ');

        if (groupOneValues.length === 2 || groupTwoValues.length === 2 || groupThreeValues.length === 2 || groupFourValues.length === 2) {
            result = 'Pair';
        }
        return result;
    }

    const sorted = calculatedCards.sort((pre, cur) => pre.value - cur.value).map(s => s.value);
    let isStraight = true;
    let start = 0;

    for (let i = 0; i < sorted.length; i++) {
        const element = sorted[i];

        if (i === 0) {
            start = element;
            continue;
        }

        isStraight = isStraight && start + 1 === element;
        start = element;
    }

    return isStraight ? 'Straight' : 'HighCards';
}

setup();