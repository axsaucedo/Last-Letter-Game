var scoreboard = document.getElementById("score");
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer");
var nextwordboard = document.getElementById("nextword");
var gameover = document.getElementById("gameover");
var finishedsentence = document.getElementById("finishedsentence");
var playing = document.getElementById("playing");
var lastword = "Last";
var sentence = [];
var score = 0;
var timer = 10;
var timeout = null;
var aDict;
$.getJSON("letters/aDict.json", function(data){
	aDict = data;
});

function youlose(){
	nextwordboard.disabled = true;
//	finishedsentence.innerHTML = sentence;
	timeout = setTimeout('gameover.style.display = "block";', 500);
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
	sentence.push(lastword);
	console.log(sentence);
	nextwordboard.value = lastword.substr(lastword.length - 1, lastword.length);
	timer = 10;
	countdownboard.innerHTML = String(timer);
	gameover.style.display = "none";
	playing.style.display = "block";
	timeout = setTimeout('countdown()', 1000);
	nextwordboard.disabled = false;
}

function pointsscored () {
	return timer;
}

function checkAnswer() {
	var answer = nextwordboard.value;

	if (notAlready(answer)) {
		if (answer != '' && checkIfCorrect(answer) ) {
			lastword = answer;
			score += pointsscored();
			scoreboard.innerHTML = String(score);
			reset();
		}
		else {
			error(1);
		}
	}
	else{
		error(2); //answer does not exist in dictionary
	}
}

function error(type){
	switch (type)
	{
		case 1:
			alert("Word is not recognized");
			break;
		case 2:
			alert("Word already used");
	}
}

function notAlready(answer) {
	return (sentence.indexOf(answer) <= 0);
}



function checkIfCorrect(answer) {
	return (aDict.indexOf(answer) > 0);
}

reset();