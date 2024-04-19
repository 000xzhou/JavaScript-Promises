let numFacts = document.getElementById("numFacts");

async function getNum(num) {
  let number = await axios(`http://numbersapi.com/${num}`);
  numFacts.innerHTML += `<li>${number.data}</li>`;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
for (let i = 1; i < 5; i++) {
  getNum(getRandomInt(100));
}
