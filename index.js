let score = 0;
let count = false;
let d;
let failed = 0;

let imagesEl = document.querySelector(".images");
let startBtn = document.querySelector("#startBtn");
let showBtn = document.querySelector("#showBtn");
let scoreEl = document.querySelector("#score");
let failedEl = document.querySelector("#failed");
let indNum = [];
let images = [
  {
    name: "king of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/English_pattern_king_of_hearts.svg/360px-English_pattern_king_of_hearts.svg.png",
  },

  {
    name: "queen of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/English_pattern_queen_of_hearts.svg/360px-English_pattern_queen_of_hearts.svg.png",
  },
  {
    name: "jack of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/English_pattern_jack_of_hearts.svg/360px-English_pattern_jack_of_hearts.svg.png",
  },

  {
    name: "king of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/English_pattern_king_of_hearts.svg/360px-English_pattern_king_of_hearts.svg.png",
  },

  {
    name: "queen of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/English_pattern_queen_of_hearts.svg/360px-English_pattern_queen_of_hearts.svg.png",
  },
  {
    name: "jack of hearts",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/English_pattern_jack_of_hearts.svg/360px-English_pattern_jack_of_hearts.svg.png",
  },
];

function renderImages(img) {
  score = 0;
  failed = 0;
  console.log(count);
  scoreEl.textContent = `Score: ${score}`;
  failedEl.textContent = `Failed: ${failed}`;
  shuffleArray();
  alert(`Instructions: you can either go with luck or memory.
Tap the 'show card' button to have a peek and memorize the location of cards.

OR

Just start opening cards and take guesses about the matching card!
open any card and you have to try to guess the location of the card matching it!
Good luck 🤗`);
  let imgStr = "";
  let countIdx = 1;
  for (let j = 0; j < images.length; j++) {
    imgStr += `
        <div class="container" onclick="imageClicked(${countIdx})">
            <div class="renderedImage ${img[j].name}" id="${countIdx}" >
              <img src="${img[j].url}" alt="">
            </div>
        </div>`;
    countIdx++;
  }
  countIdx = images.length + 1;
  imagesEl.innerHTML = imgStr;
}

function shuffleArray() {
  for (let i = images.length - 1; i > 0; i--) {
    // Generate random number
    let j = Math.floor(Math.random() * (i + 1));
    let temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }
}
let gameStarted = false;
function show() {
  console.log(count);
  if (gameStarted) {
    alert(`you can only view cards at the start of a new game!`);
    return;
  }

  if (count) {
    alert(`cannot view cards more than once!!
you can start the game again if you want!`);
    return;
  }
  console.log(count);
  let imgEl = document.querySelectorAll(".renderedImage");
  for (let i = 0; i < imgEl.length; i++) {
    imgEl[i].style.display = "block";
    imgEl[i].classList.add("open");
  }
  d = setTimeout(hide, 800);
  count = true;
}

function hide() {
  let imgEl = document.querySelectorAll(".open");

  for (let i = 0; i < imgEl.length; i++) {
    imgEl[i].style.display = "none";
    imgEl[i].classList.remove("open");
  }
}

const imageClicked = (ct) => {
  let imgEl = document.getElementById(`${ct}`);
  imgEl.style.display = "block";
  imgEl.classList.add("open");
  gameStarted = true;
  sameCard();
};

const sameCard = () => {
  let imgEl = document.querySelectorAll(".open");

  if (imgEl.length === 3) {
    hide();
    failed++;
    score -= 5;
  } else if (imgEl.length === 2) {
    let c1 = imgEl[0];
    let c2 = imgEl[1];
    if (c1.innerHTML === c2.innerHTML) {
      for (let i = 0; i < imgEl.length; i++) {
        c1.classList.add("valid");
        c1.classList.remove("open");
        c2.classList.add("valid");
        c2.classList.remove("open");
        console.log(count);
      }
      score += 10;
    } else {
      setTimeout(hide, 300);
      failed++;
      score -= 5;
    }
  }
  let validEl = document.querySelectorAll(".valid");
  if (validEl.length === 6) {
    setTimeout(function () {
      if (failed === 0 && !count) {
        alert(`You won!! 🥳 with all perfect guesses!`);
      } else if (failed === 1) {
        alert(`You won!! 🥳 with ${failed} failed attempt.
Your final score is:  ${score}`);
      } else {
        alert(`You won!! 🥳 with ${failed} failed attempts.
Your final score is:  ${score} , ${count}`);
      }
      document.location.reload();
      score = 0;
      failed = 0;
      count = 0;
    }, 500);
  }

  scoreEl.textContent = `Score: ${score}`;
  failedEl.textContent = `Failed: ${failed}`;
};

startBtn.addEventListener("click", () => {
  showBtn.style.display = "unset";
  count = 0;
  renderImages(images);
});

showBtn.addEventListener("click", () => {
  show();
});
