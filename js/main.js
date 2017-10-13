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
  "broom",
  "pancake",
  "abyss",
  "espionage"
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
  } else {
    onWin();
  }
  renderButtons();
} // end HandelClick

document.getElementById('nextword').addEventListener('click', getNextWord);

/*----- functions -----*/
function renderHangMan() {
  wrongGuess.forEach(function (item, idx) {
    $('b[data-item^="' + (idx) + '"]').attr({
      'class': 'reveal'
    });
  });
}

function renderButtons() {
  $('#keyboard p').each(function () {
    var currentLetter = $(this).attr('data-char')
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

// choose random word 
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
  getRandomWord();
  onTouchKeys();
} // end RESET

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
  };
}

function onLose() {
  informStatus();
  resetKeys();
  revealSecret();
}

function revealSecret() {
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
