// callbacks and promises
// Part 2: Deck of Cards

let shuffledDeck = axios
  .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((id) => {
    return id.data.deck_id;
  });
const drawCardHTML = document.getElementById("drawCard");
const cardHTML = document.getElementById("card");
drawCardHTML.addEventListener("click", () => {
  shuffledDeck
    .then((deckId) => {
      let drawCard = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
      axios.get(`${drawCard}`).then((card) => {
        console.log(card.data.cards[0].suit);
        console.log(card.data.cards[0].value);
        console.log(card.data);
        cardHTML.innerHTML += `<img src=${card.data.cards[0].image} alt="card" />`;
      });
    })

    .catch((err) => {
      console.log(err);
    });
});
