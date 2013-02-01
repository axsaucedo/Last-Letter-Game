var scoreboard = document.getElementById("score");
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer");
var nextwordboard = document.getElementById("nextword");
var firstletterboard = document.getElementById("firstletter");
var errorboard = document.getElementById("error");
var comboboard = document.getElementById("combo");
var TimeToFade = 1000.0;
var gameover = document.getElementById("gameover");
var finishedsentence = document.getElementById("finishedsentence");
var playing = document.getElementById("playing");
var tryagainbutton = document.getElementById("tryword");
var sentence = [];
var score = 0;
var timer = 10;
var timeout = null;
var lastword = null;
var pointsCombo = 1;
var aDict;
var combo = 0;
$.getJSON("letters/aDict.json", function(data){
	aDict = data;
	lastword = data[Math.floor(Math.random() * data.length)];
	reset();
});

function playAgain() {
	lastword = aDict[Math.floor(Math.random() * aDict.length)];
	combo = 0;
	score = 0;
	sentence = [];
	comboboard.innerHTML = 0;
	scoreboard.innerHTML = 0;
	reset();
}

function youlose(){
	nextwordboard.disabled = true;
	nextwordboard.value = "";
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
	return timer * pointsCombo;
}

function checkAnswer() {
	var answer = (firstletterboard.value + nextwordboard.value).toLowerCase();

	if (answer == "")
		return;

	if (notAlready(answer)) {
		if (checkIfCorrect(answer) ) {
			positiveScore();

			lastword = answer;

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

function positiveScore() {
	combo++;
	var extra = "";

	if (combo > 5){
		if (combo > 30){
			if (combo > 200) {
				extra = "  x4";
				pointsCombo = 4;
			}
			else {
				extra = "  x3";
				pointsCombo = 3;
			}
		}
		else {
			extra = "  x2";
			pointsCombo = 2;
		}
	}

	score += pointsscored();

	scoreboard.innerHTML = String(score);

	comboboard.innerHTML = combo + extra;
}

function error(type){
	combo = 0;
	pointsCombo = 1;
	comboboard.innerHTML = 0;

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


