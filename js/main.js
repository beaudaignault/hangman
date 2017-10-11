/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret = [],
  secretIdx = [],
  guess = [],
  wrongGuess = [],
  numWrong = 0,
  guessIdx, clickCount = 0

/*----- cached element references -----*/
var wordsArray = [
  "apple",
  "banana",
  "pear",
  "broom"
];
// var $p = $(p);
/*----- event listeners -----*/
function handleClick(evt) { 
  this.removeEventListener('click', handleClick)

  if (!secret.includes(this.getAttribute('data-char').toString())) {
    wrongGuess.push(this.getAttribute('data-char'));
    wrongGuess.forEach(function (item, idx) {
      console.log(item, idx)
      $('b[data-item^="' + (idx) + '"]').attr({
        'class': 'reveal'
      });
    });
  }
  // *this* refers to the p tag that's been clicked, I think ;)
  guess.push(this.getAttribute('data-char'));
  // check char in guess against secret
  if (guess !== null) { // don't really know what to do here
    guess.forEach(function (item, idx) {
      revealChar();
    });
  }
  if (numWrong === 6) { // no idea what I've done here (below) <-
    this.removeEventListener('click', handleClick)
    numWrong++;
    console.log(numWrong + ' num wrong')
    onLose();
    numWrong++
    
    inform('try again!');
  }
  onWin();
  renderButton();
  
} // end HandelClick
function renderButton() {
  $('#keyboard p').each(function() {
    var currentLetter = $(this).attr('data-char')
    // determins whether currentLetter is in wrongGuesses
    if (!wrongGuess.includes(currentLetter)) {
      $(this).attr({
        'class': ''
      })
    }else {
      $(this).attr({
        'class': 'fail'
      })
    }
  })


}
/*----- functions -----*/
// $(document).ready(function () {
// choose random word from wordsArray, hold it in randomWord
function randomFromArray() {
  var random = Math.floor(Math.random() * wordsArray.length)
  var randomToString = wordsArray[random];
  console.log(randomToString);
  secret = randomToString.split("");
  // console.log(secret + ' foo');
}
randomFromArray();

function nextWord() {
  // RESET things 
  wrongGuess = []
  resetKeys()
  // get rid of the underlines
  $('.secretword > ul').html("");

  // reset the hangman character


  // reset the touch keys
  function resetKeys() {
    var resetks = document.getElementsByTagName("p");
    for (var i = 0, length = resetks.length; i < length; i++) {
      // wrongGuess.forEach(function (item, idx) {
        $('p').attr({
          'class': 'clear' //to-do: RESET doesn't clear this style. Sad :(
        });
      // });
    }
  }

  // end RESET

  // generate a new secret
  randomFromArray();

  // put underlines on the DOM for each letter in secret
  manageHiddenWord();
}
document.getElementById('nextword').addEventListener('click', nextWord);

function manageHiddenWord() {
  for (var i = 0; i < secret.length; i++) {
    $('.secretword > ul').append('<li class="conceal" data-idx="' + (this.secret[i]) + '"><b>' + (this.secret[i]) + '</b></li>');
  }
  var touchKeys = document.getElementsByTagName("p");
  for (var i = 0, length = touchKeys.length; i < length; i++) {
    var touchKey = touchKeys[i];
    touchKey.addEventListener('click', handleClick);
  }; // for touchKey end
}
manageHiddenWord();

function revealChar() {
  for (var i = 0; i < guess.length; i++) {
    $('li[data-idx^="' + (guess[i]) + '"]').attr({
      'class': 'reveal'
    });
    
  }
}

// function onLose() {}

function inform(message) {
  $("#dialog .dialog-msg").html(message);
  $("#dialog").dialog("open");
};

function onWin() {
  var counter = 0;
  for (var i = 0; i < $('li').length; i++) {
    if ($('li')[i].getAttribute('class') === 'reveal') {
      counter += 1;
    }
  }
  if (counter === secret.length) {
    console.log('end of game');
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
