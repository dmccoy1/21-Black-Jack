const prompt = require("prompt-sync")(); //needed to take input from the console. 

class Deck {
    constructor() {
        this.suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
    }

    makeDeck() {//Loop combines a rank to each suit 
        let deck = [];
        for (let i = 0; i < this.suits.length; i++) {
            for (let rank = 0; rank < this.ranks.length; rank++) {
                deck.push(`${this.ranks[rank]} of ${this.suits[i]}`)
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
        this.money = 1000
        this.playAgain = true
        this.wager = 0
        this.score = 0
        this.hitOrStay = "y"
    }
    bet() {//a little input validation!
        this.wager = Number(prompt(`How much do you want to bet? You currently have $${this.money} in your bank `))
        while (true) {
            if (isNaN(this.wager)) {
                console.log(`Use intergers to place your bet! (0-9)`)
            } else if (this.wager > this.money) {
                console.log(`Don't be silly place a bet that's not more than what you have: $${this.money}`)
                continue
            } else {
                break
            }
            console.log(`Player bet ${this.wager}.`)
            this.money -= this.wager;
        }

        this.money -= this.wager
    }

    drawCard(n) {
        let hand = this.hand
        for (let i = 0; i < n; i++) {
            let card = deck.pop()
            this.addCardValue(card)
            hand.push(card)
        }
    }
    openhand() {//player is drawn 2 cards at the start of each round
        this.drawCard(2)
    }
    hit() {
        if (this.hand.length >= 2) {
            while (true) {
                this.hitOrStay = prompt("Do you want to hit?(y/n) ")
                if (this.hitOrStay === "y") {
                    console.log("Player draws a card...")
                    this.drawCard(1)
                    console.log("You were dealt a new card " + this.hand[this.hand.length - 1])
                    console.log(`You currently have ${this.hand} in your hand.`)
                    console.log(`Your score is now: ${this.score}.`)
                } else if (this.hitOrStay !== "y" && this.hitOrStay !== "n") {
                    console.log("Please enter 'y' or 'n'")
                    continue
                } else {
                    break
                }
            }
        } else {
            console.log("Player draws a card...")
            this.drawCard(1)
        }
    }

    showHand() {
        console.log("The players hand is the following: ")
        console.log(this.hand)
    }

    reset() {
        this.hand = []
        this.hitOrStay = "y"
        this.score = 0
    }
    showScore() {
        console.log("The player's score is: " + this.score)
    }

    addCardValue(card) {//score is calculated - Ace is either a 1 or 11 based on score when drawn 
        let cardRank = card.split(" ")[0]
        if (parseInt(cardRank) <= 10) {
            this.score += parseInt(cardRank)
        } else if (cardRank === 'Ace') {
            if (this.score + 11 < 21) {
                this.score += 11
            } else {
                this.score += 1
            }
        } else {
            this.score += 10
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
    hit() {
        console.log("Dealer draws a card...")
        this.drawCard(1)
    }
    openhand() {//the dealer is drawn two cards but the top card is only reavled below
        this.drawCard(2)
    }

    showHand() {
        console.log("The dealer is showing the following 1 card: ")
        console.log(this.hand[0])
    }

    showFullHand() {
        console.log("The dealer is showing their full hand... ")
        console.log(this.hand)
    }

    reset() {
        this.hand = []
        this.score = 0
    }

    addCardValue(card) {
        let cardRank = card.split(" ")[0]
        if (parseInt(cardRank) <= 10) {
            this.score += parseInt(cardRank)
        } else if (cardRank === 'Ace') {
            if (this.score + 11 < 21) {
                this.score += 11

            } else {
                this.score += 1

            }
        } else {
            this.score += 10
        }
    }
}
let player = new Player()
let dealer = new Dealer()
let deck = new Deck()
deck = deck.makeDeck()
function greet() {
    console.log("Ayo lads and lassies! It's famous actor Jack Black here!");
    console.log("How about I dabble you in a game of Black Jack")
}
function gameIntro() {
    while (true) {
        let welcome = prompt("Do you want to play? (Y/N)");
        if (welcome == "Y" || welcome == "y") {
            console.log("Starting game now!")
            playGame()
        }
        else if (welcome !== "Y" && welcome !== "y" && welcome !== "N" && welcome !== "n") {
            console.log("You must enter 'y' to play!")
            gameIntro()
            continue
        }
        else if (welcome == "N" || welcome == "n") {
            console.log("You Suck!")
            player.playAgain = false
            return false
        } else {
            break
        }
    }
}
function playGame() {

    // Create deck of cards
    // Create player & dealer
    while (player.playAgain = true) {
        while (player.money > 0) {//game will run aslong as player has money 
            // Player needs to bet
            player.bet()
            // Deal the cards
            console.log("Dealing the players cards...")
            player.openhand()
            if (player.score == 21) {
                console.log("BLACKJACK!!!")
                console.log("Player WINS")
                player.money += player.wager * 2
                console.log(`Player has $${player.money}.`)
                player.reset()
                dealer.reset()
                continue
            }
            //console.log("The player is showing the following: ")
            player.showHand()

            console.log("Dealing the dealers cards...")
            dealer.openhand()
            //console.log("The dealer is showing the following: ")
            dealer.showHand()

            // Player plays game
            while (player.hitOrStay === "y") {
                player.hit()

                if (player.score > 21) {
                    console.log("BUST...YOU LOST...LOSER")
                    console.log(`You have ${player.money} left.`)
                    break
                }
            }

            if (player.score > 21) {
                player.reset()
                dealer.reset()
                continue
            }
            console.log(`Player stays with a score of ${player.score}.`)
            console.log("Dealers Turn!")

            // Dealer plays 
            console.log("Here comes the dealers Big Reveal!")
            dealer.showFullHand()

            while (dealer.score < 17) {
                dealer.hit()
            }
            if (dealer.score > 21) {
                console.log("Dealer BUSTS")
                console.log("Player WINS")
                player.money += player.wager * 2
                console.log(`Player has $${player.money}.`)
                player.reset()
                dealer.reset()
                continue
            }
            if (player.score > dealer.score) {
                console.log("Player WINS")
                player.money += player.wager * 2
                console.log(`Player now has $${player.money}.`)
            } else {
                console.log("Dealer WINS")
                console.log(`Player now has $${player.money}.`)

            }

            player.reset()
            dealer.reset()

        }
    }
}
greet()
gameIntro()


