/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//1. roll button

document.querySelector(".btn-roll").addEventListener("click", function() {

	if (gamePlaying){
		// 1.1. Random number
		var dice = Math.floor(Math.random()*6 + 1);

		//1.2. Display the result
	    //1.2.1 Show dice
	    document.querySelector(".dice").style.display = "block";
	    //1.2.2 Display result
	    document.querySelector(".dice").src = "dice-" + dice + ".png";

	    //1.13. Update the round score IF the rolled number was NOT a 1
	    if (dice !== 1) {
	    	roundScore += dice;
	    	document.querySelector("#current-" + activePlayer).textContent = roundScore;
	    }
	    else {
	    	nextPlayer();
	    }
	}
});


//2. hold button

document.querySelector(".btn-hold").addEventListener("click", function() {

	if (gamePlaying){
		//add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			document.querySelector(".dice").style.display = "none";
			gamePlaying = false;
		}
		else {
			nextPlayer();
		}
	}
});




function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
	document.querySelector(".dice").style.display = "none";

	//change active class
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
}

// new button
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
	scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none";

    //default score
    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";

    //return player 1 and player 2 name
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    //remove all winner and active class
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    //add active class to player 0
    document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;








/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
