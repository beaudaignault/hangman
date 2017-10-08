/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret = [],
  guess = [],
  rightGuess = [],
  numWrong, guessIdx, clickCount = 0
/*----- cached element references -----*/
var wordsArray = [
  "Apples",
  "Bananas",
  "Pears",
  "Broom"
];
/*----- event listeners -----*/
/*----- functions -----*/
$(document).ready(function () {
  // choose random word from wordsArray, hold it in randomWord
  function randomFromArray() {
    var random = Math.floor(Math.random() * wordsArray.length)
    var randomToString = wordsArray[random];
    console.log(randomToString);
    secret = randomToString.split("");
    console.log(secret + ' foo')
  }
  randomFromArray();
  //click on data-char item in page saves data-char in string, and checks against randomWord characters
  function wordFrontend() {
   
    for (var i = 0; i < secret.length; i++) {
      let secretIdx = secret.length;
    
      $(".secretword > p").append('<b class="conceal" data-idx ='  + secret.length  + '>' + secret[i] + '</b>');
     
          var elements = document.getElemntById('success-attempt').getElementsByClassName('conceal');
          return elements.innerText = ' _ ';
       
        // secretIdx.innerText = " _ ";  
      
    };
  }
  wordFrontend();
  // if character is in randomWord, create innerHTML element containing the character


  //secret = words[ Math.floor(Math.random()*words.length)];
  //guess = // set to a string of same length as secret, but with placeholders //


  function render() {
    renderScore();
    renderBoard();
    if (winner) {
      renderWinner();
    } else {
      renderTurn();
    }
  }
}); //end ready
