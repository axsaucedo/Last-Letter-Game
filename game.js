var scoreboard = document.getElementById("score");
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer");
var nextwordboard = document.getElementById("nextword");
var lastword = "Last";
var sentence = "";
var score = 0;
var timer = 10;
var timeout = null;

function youlose(){
	nextwordboard.disabled = true;
}

function countdown() {
	timer--;
	countdownboard.innerHTML = String(timer);
	if (timer == 0)
		youlose();
	else
		timeout = setTimeout('countdown()', 1000);
}

function reset() {
	clearTimeout(timeout);
	lastwordboard.innerHTML = lastword;
	sentence += " " + lastword;
	console.log(sentence);
	nextwordboard.value = lastword.substr(lastword.length - 1, lastword.length);
	timer = 10;
	countdownboard.innerHTML = String(timer);
	timeout = setTimeout('countdown()', 1000);
}

function pointsscored () {
	return timer;
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