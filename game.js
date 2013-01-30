var scoreboard = document.getElementById("score").innerHTML;
var lastwordboard = document.getElementById("lastword").innerHTML;
var countdownboard = document.getElementById("timer").innerHTML;
var nextwordboard = document.getElementById("nextword").value;



function checkAnswer() {
	var answer = nextwordboard;
	if (answer != '')
		checkIfExists(answer);

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
}
