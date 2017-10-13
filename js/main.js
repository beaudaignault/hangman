/*----- constants -----*/
//# to-do: name function as verbs, name vars as nouns
// well formatted code
// remove dead code and use sensible comments
// native or Jquery javaScript, not both
// use simi-colons

/*----- app's state (variables) -----*/
var secret = [],
  guess = [],
  wrongGuess = [],
  clickCount = 0

/*----- cached element references -----*/
var wordsArray = [
  "apple",
  "banana",
  "girdle",
  "pear",
  "bromide",
  "broom"
];

function removeHangMan() {
  $('.b-parts b').each(function (idx) {
    $('b[data-item^="' + (idx) + '"]').attr({
      'class': ''
    });
  });
}

/*----- event listeners -----*/
$('.try-again').on('click', function () {
  getNextWord();
})

function renderHangMan() {
  wrongGuess.forEach(function (item, idx) {
    $('b[data-item^="' + (idx) + '"]').attr({
      'class': 'reveal'
    });
  });
}

function handleClick(evt) {
  this.removeEventListener('click', handleClick)
  if (!secret.includes(this.getAttribute('data-char'))) {
    wrongGuess.push(this.getAttribute('data-char'));
  }
  renderHangMan();
  guess.push(this.getAttribute('data-char'));
  // check char in guess against secret
  guess.forEach(function (item, idx) {
    revealChar();
  });
  if (wrongGuess.length === 6) {
    onLose();
  }
  onWin();
  renderButton();
} // end HandelClick

/*----- functions -----*/

function renderButton() {
  $('#keyboard p').each(function () {
    var currentLetter = $(this).attr('data-char')
    // determins whether currentLetter is in wrongGuesses
    if (!wrongGuess.includes(currentLetter)) {
      $(this).attr({
        'class': ''
      })
    } else {
      $(this).attr({
        'class': 'fail'
      })
    }
  });
}

// choose random word from wordsArray, hold it in randomWord
function getRandomWord() {
  var random = Math.floor(Math.random() * wordsArray.length)
  var randomToString = wordsArray[random];
  secret = randomToString.split("");
}
getRandomWord();

function getNextWord() { // RESET 
  wrongGuess = [];
  guess = [];
  removeHangMan();
  hideStatus();
  resetKeys();
  renderHangMan();
  $('.secretword > ul').html("");
  // reset the hangman character
  // reset the touch keys

  getRandomWord();
  onTouchKeys();
} // end RESET

document.getElementById('nextword').addEventListener('click', getNextWord);

function onTouchKeys() {
  for (var i = 0; i < secret.length; i++) {
    $('.secretword > ul').append('<li class="conceal" data-idx="' + (this.secret[i]) + '"><b>' + (this.secret[i]) + '</b></li>');
  }
  var touchKeys = document.getElementsByTagName("p");
  for (var i = 0, length = touchKeys.length; i < length; i++) {
    var touchKey = touchKeys[i];
    touchKey.addEventListener('click', handleClick);
  };
  renderHangMan();
}
onTouchKeys();

function revealChar() {
  for (var i = 0; i < guess.length; i++) {
    $('li[data-idx^="' + (guess[i]) + '"]').attr({
      'class': 'reveal'
    });
  }
}

function resetKeys() {
  var resetks = document.getElementsByTagName("p");
  for (var i = 0, length = resetks.length; i < length; i++) {
    $('#keyboard p').attr({
      'class': 'clear-away'
    });
  }; // simi-colon here? 
}

function onLose() {
  informStatus();
  resetKeys();
  revealSecret();
}

function revealSecret() {
  // push all the letters of the secret into the guess array (one at a time)
  secret.forEach(function (letter) {
    guess.push(letter);
  })

  revealChar();

}

function informStatus(checkWin) {
  if (checkWin) {
    $('.dialog-msg').html('<h2>You Win!</h2>');
    $('#dialog').show('fold', 1000);
  } else {
    $('.dialog-msg').html("<h2>You've been hanged!</h2>");
    $('#dialog').show('fold', 1000);

  }
}

function hideStatus() {
  $('#dialog').hide('fold', 1000);
}

function onWin() {
  var counter = 0;
  for (var i = 0; i < $('li').length; i++) {
    if ($('li')[i].getAttribute('class') === 'reveal') {
      counter += 1;
    }
  }
  if (counter === secret.length) {
    informStatus(true);
  }
}

//click on data-char item in page saves data-char in string, and checks against randomWord characters
// if character is in randomWord, create innerHTML element containing the character
//secret = words[ Math.floor(Math.random()*words.length)];
//guess = // set to a string of same length as secret, but with placeholders //
