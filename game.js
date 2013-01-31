var scoreboard = document.getElementById("score");
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer").innerHTML;
var nextwordboard = document.getElementById("nextword");
var lastword = "Last";
var sentence = "";
var score = 0;
var timer = 10;

function reset() {
	lastwordboard.innerHTML = lastword;
	sentence += " " + lastword;
	console.log(sentence);
	nextwordboard.value = lastword.substr(lastword.length, lastword.length);
	timer = 10;
	countdownboard.innerHTML = String(timer);
}

function pointsscored () {
	return timer;
}

function youlose(){

}

function checkAnswer() {
	var answer = nextwordboard.value;
	if (answer != ''
		&& checkIfExists(answer) ) {
		lastword = answer;
		score += pointsscored();
		scoreboard.innerHTML = String(score);
		reset();
	}

	return false;
}



function checkIfExists(answer) {
	var exists = false;
	console.log("inside");
	var json = $.getJSON("letters/a.json", function(data) {
		for(var i = 0; i < data.length; i++)
			if (data[i] === $.trim(answer))
				return true;

		return false;
	});
	console.log(json);
	return true;
}

reset();