/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret, guess, numWrong;
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

var wordsArray = [
  "Apples",
  "Bananas",
  "Pears"
];

var random = Math.floor(Math.random() * wordsArray.length)
var randomWord = wordsArray[random];

console.log(randomWord+ " boo")
 
//document.body.innerHTML = randomItem;
 
//click on data-char item in page saves data-char in string, and checks against randomWord characters
$('#keyboard p').click(function(evt) {
	var charMap = $(this).attr('data-char')
	console.log(this)
});

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