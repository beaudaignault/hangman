/*----- constants -----*/

/*----- app's state (variables) -----*/
var secret, guess, numWrong;
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

function rotateArray(){
  var keys = Object.keys( ArrOfarr );

  var name = keys[ Math.floor(Math.random()*keys.length) ];

  var item = ArrOfarr[ name ];

  console.log( name );
  console.log( item );
}
//secret = words[ Math.floor(Math.random()*words.length)];
//guess = // set to a string of same length as secret, but with placeholders //
