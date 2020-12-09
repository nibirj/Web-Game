var images = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
var imagesId = ["one", "two", "three", "four", "five", "six"]
var canIChange = [true, true, true, true, true];
var gameStarted = false; 
var canPutScore = false;
var countChange = [true, true, true, true, true, true, true, true, true, true, true, true, true];
var countChange2 = [true, true, true, true, true, true, true, true, true, true, true, true, true];
var scoreCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var imagesRightNow = ["one.png", "two.png", "three.png", "four.png", "five.png"];
var totalScore = 0;
var totalScore2 = 0;
var turnshuman = null;
var turns = 3;
var secondPerson = null;



function roll() {
	if (turnshuman != null) {
		if (turns == 0) {

		} else {
			scoreCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			canPutScore = true;
			gameStarted = true;
		for (i = 0; i < 5; i++) {
			const random = Math.floor(Math.random() * (5 - 0 + 1) + 0);
			if (i == 0 && canIChange[i]) {
				changePng(getById("one"), images[random], i);
			} else if (i == 1 && canIChange[i]) {
				changePng(getById("two"), images[random], i);
			} else if (i == 2 && canIChange[i]) {
				changePng(getById("three"), images[random], i);
			} else if (i == 3 && canIChange[i]) {
				changePng(getById("four"), images[random], i);
			} else if (i == 4 && canIChange[i]) {
				changePng(getById("five"), images[random], i);
			}
		}
		if (turnshuman == secondPerson) {
			calculate();
			changeScore();
		} else  {
			calculate2();
			changeScoreForPerson2();
		}
		turns--;
		getById("turnsLeft").innerHTML = turns;
		}
	}
}
	

function getById(id) {
	return document.getElementById(id);
}

function changePng(element, png, i) {
	imagesRightNow[i] = png;
	element.src = png;
}	

function cantChange(id, element) {
	if(gameStarted == true) {
		if (canIChange[id] == true){
			canIChange[id] = false;
			getById(element).style.border = "solid #0000FF";
		} else {
			canIChange[id] = true;
			getById(element).style.border = "";
		}
		
	}
}

function calculate() {
	var seven = true;
	var six = true;
	var full = true;
	var yahtzee = true;
	for (i = 0; i < 13; i++) {
		var png = imagesRightNow[i];
		if (png == "one.png") {
			scoreCount[0] = scoreCount[0] + 1;
			scoreCount[11] = scoreCount[11] + 1;
		} else if (png == "two.png") {
			scoreCount[1] = scoreCount[1] + 2;
			scoreCount[11] = scoreCount[11] + 2;
		} else if (png == "three.png") {
			scoreCount[2] = scoreCount[2] + 3;
			scoreCount[11] = scoreCount[11] + 3;
		} else if (png == "four.png") {
			scoreCount[3] = scoreCount[3] + 4;
			scoreCount[11] = scoreCount[11] + 4;
		} else if (png == "five.png") {
			scoreCount[4] = scoreCount[4] + 5;
			scoreCount[11] = scoreCount[11] + 5;
		} else if (png == "six.png") {
			scoreCount[5] = scoreCount[5] + 6;
			scoreCount[11] = scoreCount[11] + 6;
		} else if (i == 6 || i == 7) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length >= 3 && countChange[6]) {
						six = false;
						scoreCount[6] = scoreCount[11];
					}  else if (countChange[6] && six) {
						scoreCount[6] = 0;
					}
					if (imagesRightNow.filter(x => x == images[image]).length >= 4 && countChange[7]) {
						seven = false;
						scoreCount[7] = scoreCount[11];
					} else if (countChange[7] && seven) {
						scoreCount[7] = 0;
					}
				}
			} else if (i == 8) {
				if (imagesRightNow.includes("one.png") && imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png")) {
					scoreCount[8] = 30;
				} else if (imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png")) {
					scoreCount[8] = 30;
				} else if (imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png") && imagesRightNow.includes("six.png")) {
					scoreCount[8] = 30;
				} else {
					scoreCount[8] = 0;
				}
			} else if (i == 9) {
				if (imagesRightNow.includes("one.png") && imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png")) {
					scoreCount[9] = 40;
				} else if (imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png") && imagesRightNow.includes("six.png")) {
					scoreCount[9] = 40;
				} else {
					scoreCount[9] = 0;
				}
			} else if(i == 10) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length == 3 && countChange[10]) {
						for (image in images) {
							if (imagesRightNow.filter(x => x == images[image]).length == 2) {
								scoreCount[10] = 25;
								full = false;
							}
						}
					}  else if (countChange[10] && full) {
						scoreCount[10] = 0;	
					}
				}
			} else if (i == 11) {
				scoreCount[11] = scoreCount[11];
			} else if (i == 12) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length == 5 && countChange[12]) {
						scoreCount[12] = 50;
						yahtzee = false;
					} else if (countChange[12] && yahtzee) {
						scoreCount[12] = 0;	
				}
			}
		} 
	}
}

function calculate2() {
	var seven = true;
	var six = true;
	var full = true;
	var yahtzee = true;
	for (i = 0; i < 13; i++) {
		var png = imagesRightNow[i];
		if (png == "one.png") {
			scoreCount[0] = scoreCount[0] + 1;
			scoreCount[11] = scoreCount[11] + 1;
		} else if (png == "two.png") {
			scoreCount[1] = scoreCount[1] + 2;
			scoreCount[11] = scoreCount[11] + 2;
		} else if (png == "three.png") {
			scoreCount[2] = scoreCount[2] + 3;
			scoreCount[11] = scoreCount[11] + 3;
		} else if (png == "four.png") {
			scoreCount[3] = scoreCount[3] + 4;
			scoreCount[11] = scoreCount[11] + 4;
		} else if (png == "five.png") {
			scoreCount[4] = scoreCount[4] + 5;
			scoreCount[11] = scoreCount[11] + 5;
		} else if (png == "six.png") {
			scoreCount[5] = scoreCount[5] + 6;
			scoreCount[11] = scoreCount[11] + 6;
		} else if (i == 6 || i == 7) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length >= 3 && countChange2[6]) {
						six = false;
						scoreCount[6] = scoreCount[11];
					}  else if (countChange2[6] && six) {
						scoreCount[6] = 0;
					}
					if (imagesRightNow.filter(x => x == images[image]).length >= 4 && countChange2[7]) {
						seven = false;
						scoreCount[7] = scoreCount[11];
					} else if (countChange2[7] && seven) {
						scoreCount[7] = 0;
					}
				}
			} else if (i == 8) {
				if (imagesRightNow.includes("one.png") && imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png")) {
					scoreCount[8] = 30;
				} else if (imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png")) {
					scoreCount[8] = 30;
				} else if (imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png") && imagesRightNow.includes("six.png")) {
					scoreCount[8] = 30;
				} else {
					scoreCount[8] = 0;
				}
			} else if (i == 9) {
				if (imagesRightNow.includes("one.png") && imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png")) {
					scoreCount[9] = 40;
				} else if (imagesRightNow.includes("two.png") && imagesRightNow.includes("three.png") && imagesRightNow.includes("four.png") && imagesRightNow.includes("five.png") && imagesRightNow.includes("six.png")) {
					scoreCount[9] = 40;
				} else {
					scoreCount[9] = 0;
				}
			} else if(i == 10) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length == 3 && countChange2[10]) {
						for (image in images) {
							if (imagesRightNow.filter(x => x == images[image]).length == 2) {
								scoreCount[10] = 25;
								full = false;
							}
						}
					}  else if (countChange2[10] && full) {
						scoreCount[10] = 0;	
					}
				}
			} else if (i == 11) {
				scoreCount[11] = scoreCount[11];
			} else if (i == 12) {
				for (image in images) {
					if (imagesRightNow.filter(x => x == images[image]).length == 5 && countChange2[12]) {
						scoreCount[12] = 50;
						yahtzee = false;
					} else if (countChange2[12] && yahtzee) {
						scoreCount[12] = 0;	
				}
			}
		} 
	}
}

function changeScore() {
	for (i = 0; i < 13; i++) {
		if(countChange[i]) {
			if (i == 0) {
				document.getElementById("ones").innerHTML = scoreCount[0];
			} else if (i == 1) {
				document.getElementById("twos").innerHTML = scoreCount[1];
			} else if (i == 2) {
				document.getElementById("threes").innerHTML = scoreCount[2];
			} else if (i == 3) {
				document.getElementById("fours").innerHTML = scoreCount[3];
			} else if (i == 4) {
				document.getElementById("fives").innerHTML = scoreCount[4];
			} else if (i == 5) {
				document.getElementById("sixs").innerHTML = scoreCount[5];
			} else if (i == 6) {
				document.getElementById("3ofakind").innerHTML = scoreCount[6];
			} else if (i == 7) {
				document.getElementById("4ofaKind").innerHTML = scoreCount[7];
			} else if (i == 8) {
				document.getElementById("smallStraight").innerHTML = scoreCount[8];
			} else if (i == 9) {
				document.getElementById("largeStraight").innerHTML = scoreCount[9];
			} else if (i == 10) {
				document.getElementById("fullHouse").innerHTML = scoreCount[10];
			} else if (i == 11) {
				document.getElementById("jokers").innerHTML = scoreCount[11];
			} else if (i == 12) {
				document.getElementById("yahtzee").innerHTML = scoreCount[12];
			}
		}
	}
}

function changeScoreForPerson2() {
	for (i = 0; i < 13; i++) {
		if(countChange2[i]) {
			if (i == 0) {
				document.getElementById("ones2").innerHTML = scoreCount[0];
			} else if (i == 1) {
				document.getElementById("twos2").innerHTML = scoreCount[1];
			} else if (i == 2) {
				document.getElementById("threes2").innerHTML = scoreCount[2];
			} else if (i == 3) {
				document.getElementById("fours2").innerHTML = scoreCount[3];
			} else if (i == 4) {
				document.getElementById("fives2").innerHTML = scoreCount[4];
			} else if (i == 5) {
				document.getElementById("sixs2").innerHTML = scoreCount[5];
			} else if (i == 6) {
				document.getElementById("3ofakind2").innerHTML = scoreCount[6];
			} else if (i == 7) {
				document.getElementById("4ofaKind2").innerHTML = scoreCount[7];
			} else if (i == 8) {
				document.getElementById("smallStraight2").innerHTML = scoreCount[8];
			} else if (i == 9) {
				document.getElementById("largeStraight2").innerHTML = scoreCount[9];
			} else if (i == 10) {
				document.getElementById("fullHouse2").innerHTML = scoreCount[10];
			} else if (i == 11) {
				document.getElementById("jokers2").innerHTML = scoreCount[11];
			} else if (i == 12) {
				document.getElementById("yahtzee2").innerHTML = scoreCount[12];
			}
		}
	}
}


function changeTable(id, listid) {
	if(gameStarted && countChange[listid] && turnshuman == secondPerson) {
		getById(id).style.backgroundColor = "gray";
		countChange[listid] = false;
		totalScore += scoreCount[listid];
		getById("totalScore").innerHTML = totalScore;
		gameStarted = false;
		getById("whosTurn").innerHTML = "Player 2";
		changeBack();
	}
}

function changeTable2(id, listid) {
	if(gameStarted && countChange2[listid] && turnshuman != secondPerson) {
		getById(id).style.backgroundColor = "gray";
		countChange2[listid] = false;
		totalScore2 += scoreCount[listid];
		getById("totalScore2").innerHTML = totalScore2;
		gameStarted = false;
		getById("whosTurn").innerHTML = "Player 1";
		changeBack2();
	}
}

function giveHowMenyTurns() {
	var e = document.getElementById("turns");
	var strUser = e.options[e.selectedIndex].value;
    turnshuman = strUser;
    secondPerson = strUser;
    document.getElementById("askTurns").style.display = "none";
    document.getElementById("other").style.display = "block";
    document.getElementById("turnsCount").innerHTML = turnshuman;
}

function changeBack() {
	for (i = 0; i < 6; i++) {
		if (canIChange[i] == false) {
			canIChange[i] = true;
			getById(imagesId[i]).style.border = "";
		}
	}
	turns = 3;
	turnshuman--;
	document.getElementById("turnsCount").innerHTML = secondPerson;
	getById("turnsLeft").innerHTML = turns;
}

function changeBack2() {
	for (i = 0; i < 6; i++) {
		if (canIChange[i] == false) {
			canIChange[i] = true;
			getById(imagesId[i]).style.border = "";
		}
	}
	turns = 3;
	secondPerson--;
	document.getElementById("turnsCount").innerHTML = secondPerson;
	getById("turnsLeft").innerHTML = turns;
	if (secondPerson == 0 && turnshuman == 0) {
		alert("Game is over Player 1 score: " + totalScore + " Player 2 score: " + totalScore2);
		window.location.reload();
	}
}