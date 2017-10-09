/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret = [],
secretIdx = [],
  guess = [],
  rightGuess = [],
  numWrong = 0, guessIdx, clickCount = 0 
/*----- cached element references -----*/
 alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var wordsArray = [
  "Apples",
  "Bananas",
  "Pears",
  "Broom"
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

    function wordFrontend() {
          for (var i = 0; i < secret.length; i++) {
            $('.secretword > ul').append('<li class="conceal" data-idx="'+ (this.secret[i]) + '">' + (this.secret[i]) + '</li>');
            //let secretIdx = secret.length;
            //secretIdx  = "_";
            console.log(this.secret[i] +" voo")
          };
        }
        wordFrontend();
  }
  var touchKeys = document.getElementsByTagName("p");
  for (var i = 0, length = touchKeys.length; i < length; i++) {
    var touchKey = touchKeys[i];
    touchKey.addEventListener('click', (function() {
      // `this` refers to the p tag that's been clicked
      // need to keep adding to guess while numWrong < 6
      if (numWrong < 6){
        guess.push(this.getAttribute('data-char'));
        // check char in guess against secret

      } else {
        alert('game over')
        numWrong++;
      }

      console.log(this.getAttribute('data-char'));
    }), true);
  };



  // function seeIfMatch(){
  //     document.getElementsByTagName("p").addEventListener('click', function(evt) {
  //   $('p').attr('data-char').value ;console.log(evt)
  //   });
    
  //   }
    // letterChioce = $('b').attr('data-char').value($this)  

  
//   .data('test', $(this).text());
// }
  randomFromArray();
  //click on data-char item in page saves data-char in string, and checks against randomWord characters
  
    // var elements = document.getElementById('#success-attempt');
    // var targetB = elements.getElementsByClassName('conceal')[0];
    //  targetB.innerText = ' _ ';

    // secretIdx.innerText = " _ ";  

 

  
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
