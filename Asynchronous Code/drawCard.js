let cardBtn = document.getElementById("drawCard");
let cardHTML = document.getElementById("card");
class Deck {
  constructor(id) {
    this.id = id;
  }

  async drawingCard() {
    let drawCard = `https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=1`;
    let response = await axios.get(drawCard);
    cardHTML.innerHTML += `<img src=${response.data.cards[0].image} alt="card" />`;
  }
  async shuffleDeck() {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    this.id = response.data.deck_id;
  }
}

let deck = new Deck();
deck.shuffleDeck().then(() => {
  cardBtn.addEventListener("click", () => deck.drawingCard());
});
