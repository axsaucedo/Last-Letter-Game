var scoreboard = document.getElementById("score");
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer");
var nextwordboard = document.getElementById("nextword");
var firstletterboard = document.getElementById("firstletter");
var errorboard = document.getElementById("error");
var TimeToFade = 1000.0;
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
	firstletterboard.value = lastword.substr(lastword.length - 1, lastword.length).toUpperCase();
	nextwordboard.value = "";
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
	var answer = (firstletterboard.value + nextwordboard.value).toLowerCase();

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
			displayError("Word is not recognized");
			break;
		case 2:
			displayError("Word already used");
	}
}

function displayError(message){
	errorboard.innerHTML = message;
	errorboard.style.FadeState = null;
	errorboard.style.opacity = 1;
	setTimeout(fade(), 1000);
}

function fade(){

	if (errorboard.FadeState == null
		|| errorboard.style.opacity == ''
		|| errorboard.style.opacity == '1') {
		errorboard.FadeState = 2;
	}
	else errorboard.FadeState = -2;

	if(errorboard.FadeState == 1 || errorboard.FadeState == -1)
	{
		errorboard.FadeState = errorboard.FadeState == 1 ? -1 : 1;
		errorboard.FadeTimeLeft = TimeToFade - errorboard.FadeTimeLeft;
	}
	else
	{
		errorboard.FadeState = errorboard.FadeState == 2 ? -1 : 1;
		errorboard.FadeTimeLeft = TimeToFade;
		setTimeout("animateFade(" + new Date().getTime() + ",'" + "error" + "')", 300);
	}  
}

function animateFade(lastTick)
{  
	var curTick = new Date().getTime();
	var elapsedTicks = curTick - lastTick;

	if(errorboard.FadeTimeLeft <= elapsedTicks)
	{
		errorboard.style.opacity = errorboard.FadeState == 1 ? '1' : '0';
		errorboard.style.filter = 'alpha(opacity = ' 
		    + (errorboard.FadeState == 1 ? '100' : '0') + ')';
		errorboard.FadeState = errorboard.FadeState == 1 ? 2 : -2;
		return;
	}

	errorboard.FadeTimeLeft -= elapsedTicks;
	var newOpVal = errorboard.FadeTimeLeft/TimeToFade;
	if(errorboard.FadeState == 1)
		newOpVal = 1 - newOpVal;

	errorboard.style.opacity = newOpVal;
	errorboard.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';

	setTimeout("animateFade(" + curTick + ",'" + "error" + "')", 33);
}

function notAlready(answer) {
	return (sentence.indexOf(answer) <= 0);
}



function checkIfCorrect(answer) {
	return (aDict.indexOf(answer) > 0);
}

reset();