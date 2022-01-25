const prompt = require("prompt-sync")();

class Deck {
    constructor() {
        this.suits = ["Spades", "Diamonds", "Clubs", "Hearts"]
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Ace", "Jack", "Queen", "King"]
    }

    makedeck() {
        let deck = []
        for (let x = 0; x < this.suits.length; x++) {
            for (let y = 0; y < this.values.length; y++) {
                deck.push(`${this.values[y]} of ${this.suits[x]}`);
            }
        }
        deck = this.shuffle(deck)
        return deck;
    }

    shuffle(deck) {
        for (let i = 0; i < 52; i++) {
            let card = deck[i];
            let shuffle = Math.floor(Math.random() * 52);
            deck[i] = deck[shuffle];
            deck[shuffle] = card;
        }
        return deck
    }
}

class Player {
    constructor() {
        this.hand = []
        this.money = 0
        this.playAgain = false
        this.score = 0
    }
    bet() {
        this.wager = Number(prompt("How much do you want to bet? "))
        return this.wager
    }
    drawCard(n) {
        let hand = this.hand
        for (let i = 0; i < n; i++) {
            let drawnCard = deck.pop()
            this.addCardValue(drawnCard)
            hand.push(drawnCard)
        }
    }

    openhand() {
        this.drawCard(2)
    }

    hit() {
        if (this.hand.length >= 2) {
            let standOrHit = prompt("Do you want to hit?(y/n) ")
            if (standOrHit == "y") {
                console.log("Player draws a card...")
                this.drawCard(1)
            }
        } else {
            console.log("Player draws a card...")
            this.drawCard(1)
        }
    }
    showHand() {
        console.log("Player's Hand:" + this.hand)
    }

    addCardValue(card) {
        let card = card.split(" ")[0]

        if (parseInt(card) <= 10) {
            this.score += parseInt(card)
        } else if (card === 'Ace') {
            if (this.score + 11 <= 21) {
                this.score += 11
            } else {
                this.score += 1
            }
        } else {
            this.score += 10
        }
    }
    showScore() {
        console.log("The player's score is: " + this.score)
        if (this.score == 21) {
            console.log("BLACKJACK!!!")
            console.log("ヽ(•‿•)ノ")
        } else if (this.score > 21) {
            console.log("ヽ(ಠ_ಠ)ノ BUST!!")

        }
    }
}

class Dealer {
    constructor() {
        this.hand = []
        this.score = 0
    }
    drawCard(n) {
        let hand = this.hand
        for (let i = 0; i < n; i++) {
            let card = deck.pop()
            this.addCardValue(card)
            hand.push(card)
        }
    }

    openhand() {
        this.drawCard(2)
    }

    hit() {
        if (this.hand.length <= 2) {
            let hitorstay = prompt("Do you want to hit? y/n")
            console.log(hitorstay)
            if (stay = "y") {
                console.log("Player draws a card...")
                this.drawCard(1)
            }
        } else {
            console.log("Player draws a card...")
            this.drawCard(1)
        }
    }
    addCardValue(card) {
        let cardRank = card.split(" ")[0]

        if (parseInt(cardRank) <= 10) {
            this.score += parseInt(cardRank)
        } else if (cardRank === 'Ace') {
            if (this.score + 11 <= 21) {
                this.score += 11
            } else {
                this.score += 1
            }
        } else {
            this.score += 10
        }
    }
    showHand() {
        console.log("The dealer is showing the following... ")
        // The Dealer only reveals one card and leaves the other one "face down"
        console.log(this.hand[0])
    }
    showScore() {
        console.log("The dealer's score is..." + this.score)
    }
}



