var scoreboard = document.getElementById("score").innerHTML;
var lastwordboard = document.getElementById("lastword");
var countdownboard = document.getElementById("timer").innerHTML;
var nextwordboard = document.getElementById("nextword");



function checkAnswer() {
	var answer = nextwordboard.value;
	if (answer != ''
		&& checkIfExists(answer) ) {
		lastwordboard.innerHTML = answer;
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
