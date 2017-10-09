/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret = [],
  secretIdx = [],
  guess = [],
  rightGuess = [],
  numWrong = 0,
  guessIdx, clickCount = 0
/*----- cached element references -----*/
alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // may delete TBD
var wordsArray = [
  "apples",
  "bananas",
  "pears",
  "broom"
];
/*----- event listeners -----*/

/*----- functions -----*/
// $(document).ready(function () {
// choose random word from wordsArray, hold it in randomWord
function randomFromArray() {
  var random = Math.floor(Math.random() * wordsArray.length)
  var randomToString = wordsArray[random];
  console.log(randomToString);
  secret = randomToString.split("");
  console.log(secret + ' foo');
}
randomFromArray();
manageHiddenWord();
function manageHiddenWord() {
  for (var i = 0; i < secret.length; i++) {
    $('.secretword > ul').append('<li class="conceal" data-idx="' + (this.secret[i]) + '"><b>' + (this.secret[i]) + '</b></li>');
  }
var touchKeys = document.getElementsByTagName("p");
for (var i = 0, length = touchKeys.length; i < length; i++) {
  var touchKey = touchKeys[i];
  touchKey.addEventListener('click', (function (evt) {
        // *this* refers to the p tag that's been clicked
        // need to keep adding to guess while numWrong < 6
    guess.push(this.getAttribute('data-char'));
         // check char in guess against secret 
   if ( guess !== null ) { // don't really know what to do here
      guess.forEach(function(item){
        console.log(item + " fooly");
      revealHiddenChar();
      });
    } else { 
      console.log(secret + " no match");
      numWrong++;
    }
    console.log(this.getAttribute('data-char') + " (is data attribute)");
  }), true);
};
}
      function revealHiddenChar() {
        for (var i = 0; i < guess.length; i++) { 
          $('li[data-idx^="' + (guess[i]) + '"]').attr({
            'class': 'reveal'
          })
      }
    }



//click on data-char item in page saves data-char in string, and checks against randomWord characters
// if character is in randomWord, create innerHTML element containing the character
//secret = words[ Math.floor(Math.random()*words.length)];
//guess = // set to a string of same length as secret, but with placeholders //


function render() {
  renderSecret();
  renderGallows();
  if (winner) {
    renderWinner();
  } else {
    renderTurn();
  }
}
// }); //end ready
