var scoreboard = document.getElementById("score").innerHTML;
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer").innerHTML;
var nextwordboard = document.getElementById("nextword");



function checkAnswer() {
	var answer = nextwordboard.value;
	console.log(answer);
	lastwordboard.innerHTML = answer;
	return false;
}



function checkIfExists() {
	var json = $.getJSON("a.json", function(data) {
		console.log("yes")
	});
}