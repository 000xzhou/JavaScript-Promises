// callbacks and promises
// Part 1: Number Facts
let numbersAPI = "http://numbersapi.com/";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let fourFacts = [];
for (let i = 1; i < 5; i++) {
  fourFacts.push(axios.get(`${numbersAPI}${getRandomInt(100)}/`));
}

Promise.all(fourFacts)
  .then((numbers) => numbers.forEach((fact) => console.log(fact.data)))
  .catch((err) => console.log(err));
