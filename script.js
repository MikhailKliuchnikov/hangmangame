// Global variables
const alphabetChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
// Random words and function call afterwards
const randomWords = [
  "apple",
  "banana",
  "cherry",
  "dragonfly",
  "elephant",
  "forest",
  "giraffe",
  "horizon",
  "island",
  "jungle",
  "kangaroo",
  "lemon",
  "mountain",
  "nectar",
  "ocean",
  "penguin",
  "quartz",
  "rainbow",
  "sunflower",
  "tiger",
  "umbrella",
  "violet",
  "whale",
  "xylophone",
  "yacht",
  "zebra",
  "avocado",
  "breeze",
  "cactus",
  "dolphin",
  "emerald",
  "falcon",
  "glacier",
  "harbor",
  "igloo",
  "jewel",
  "koala",
  "lantern",
  "meadow",
  "nightfall",
  "octopus",
  "parrot",
  "quokka",
  "river",
  "sapphire",
  "toucan",
  "unicorn",
  "volcano",
  "windmill",
  "yogurt",
  "zeppelin",
  "almond",
  "butterfly",
  "cloud",
  "desert",
  "echo",
  "flamingo",
  "grove",
  "hazel",
  "iris",
  "jade",
  "kiwi",
  "lilac",
  "mango",
  "nebula",
  "olive",
  "peach",
  "quiver",
  "rose",
  "starfish",
  "tulip",
  "urchin",
  "violet",
  "willow",
  "xenon",
  "yeti",
  "zenith",
  "anchor",
  "blizzard",
  "coral",
  "daisy",
  "ember",
  "fern",
  "gazelle",
  "honey",
  "indigo",
  "jasmine",
  "kelp",
  "lotus",
  "maple",
  "nutmeg",
  "opal",
  "pine",
  "quince",
  "raven",
  "sage",
  "thistle",
  "umbra",
  "velvet",
  "walnut",
];
const parts = [
  "ground" /*ground*/,
  "head" /*scaffold*/,
  "scaffold" /*head*/,
  "legs" /*body*/,
  "arms" /*arms*/,
  "body" /*leg*/,
];
let iterationIndex;
let secretWord;

function initGame() {
  const endingWindow = document.querySelector(".endingWindow");
  const menu = document.getElementById("menu");
  if (endingWindow && menu) {
    endingWindow.replaceWith(menu);
  }

  resetGuessesDisplay();

  iterationIndex = 0;
  secretWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  createSecretWordElements(secretWord);

  hideHangman();
  addSubmitElAndListener();
}

// Hangman visibility manipultaions

function hideHangman() {
  const partIds = ["scaffold", "head", "body", "arms", "legs", "ground"];
  partIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.visibility = "hidden";
    }
  });
}
function showHangmanPart(partId) {
  const el = document.getElementById(partId);
  if (el) {
    el.style.visibility = "visible";
  }
}

// Hidden word mechanics

// Creation & revealing the correct characters
function addWrongGuess(letter) {
  const wrongCharsList = document.getElementById("wrong-chars");
  // Prevent duplicates
  if (
    [...wrongCharsList.children].some(
      (li) => li.innerText.toLowerCase() === letter.toLowerCase()
    )
  )
    return;

  showHangmanPart(parts[iterationIndex]);
  iterationIndex++;
  const li = document.createElement("li");
  li.innerText = letter.toLowerCase();
  li.classList.add("wrong");
  wrongCharsList.appendChild(li);
}
// Element creation
function createSecretWordElements(word) {
  const parentEl = document.getElementById("secretWord");
  parentEl.innerHTML = "";

  word.split("").forEach((char) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerText = char;
    p.classList.add("secret-char");
    li.classList.add("secretContainer");
    li.appendChild(p);
    parentEl.appendChild(li);
  });
}

// Reveal correct guesses
function revealCorrectChar(letter) {
  let paragraphs = document.querySelectorAll(".secret-char");
  paragraphs.forEach((p) => {
    let char = p.innerHTML.toLowerCase();
    if (char === letter.toLowerCase()) {
      p.classList.add("visible");
    }
  });
}

function win(secretWord) {
  document.getElementById("menu").style.display = "none";

  const mainEl = document.createElement("div");
  mainEl.classList.add("endingWindow");

  const header = document.createElement("h3");
  header.innerText = "Congratulations! You win!";

  const p = document.createElement("p");
  p.innerText = `The secret word was:   --${secretWord}--`;

  const button = document.createElement("button");
  button.innerText = "Play again";
  button.onclick = () => {
    mainEl.remove();
    document.getElementById("menu").style.display = "";
    initGame();
  };

  mainEl.appendChild(header);
  mainEl.appendChild(p);
  mainEl.appendChild(button);
  document.getElementById("game-container").appendChild(mainEl);
}

function lose(secretWord) {
  document.getElementById("menu").style.display = "none";

  const mainEl = document.createElement("div");
  mainEl.classList.add("endingWindow");

  const header = document.createElement("h3");
  header.innerText = "Alas! You lose!";

  const p = document.createElement("p");
  p.innerText = `The secret word was:  --${secretWord}--`;

  const button = document.createElement("button");
  button.innerText = "Play again";
  button.onclick = () => {
    mainEl.remove();
    document.getElementById("menu").style.display = "";
    initGame();
  };

  mainEl.appendChild(header);
  mainEl.appendChild(p);
  mainEl.appendChild(button);
  document.getElementById("game-container").appendChild(mainEl);
}

function resetGuessesDisplay() {
  document.getElementById("secretWord").innerHTML = "";
  document.getElementById("wrong-chars").innerHTML = "";
}

// function for determining the outcome of a round

function playRound(playerGuess) {

  playerGuess = playerGuess.toLowerCase();
  if ([...secretWord].includes(playerGuess)) {
    revealCorrectChar(playerGuess);
    if (checkWinCond()) {
      win(secretWord);
    }
  } else if(!playerGuess){
    return;
  } else {
    addWrongGuess(playerGuess);
    if (checkLoseCond()) {
      showHangmanPart(parts[iterationIndex]);
      lose(secretWord);
    }
  }
}

function checkWinCond() {
  const chars = document.querySelectorAll("#secretWord .secret-char");
  return [...chars].every(
    (char) => window.getComputedStyle(char).visibility === "visible"
  );
}

function checkLoseCond() {
  return iterationIndex >= parts.length;
}
// Function adds event listeners for submit button

function addSubmitElAndListener() {
  const clone = document.getElementById("sumbitTpl").content.cloneNode(true);

  const form = clone.querySelector(".myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let playerGuess = form.elements["guess"].value;
    playRound(playerGuess);
    form.elements["guess"].value = "";
  });

  // Clear previous one in order to prevent stacking listeners
  document.getElementById("submitWrapper").innerHTML = "";
  document.getElementById("submitWrapper").appendChild(clone);
}

// TEST GROUNDS
initGame();
