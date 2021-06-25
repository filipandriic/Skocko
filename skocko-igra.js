window.onload = loadData;

var currSymb = 0;
var currTry = 0;

var guessTable;
var resultTable;
var guessTable1 = [];
var resultTable1 = [];
var guessTable2 = [];
var resultTable2 = [];

var timer1 = 60;
var timer2 = 60;

var guess = [];
var inGame = true;

function loadData() {
    guessTable = document.getElementById("guessTable");
    resultTable = document.getElementById("resultTable");

    document.getElementById("timer").innerHTML = timer1;

    for (let i = 0; i < 7; i++) {
        guessTable1[i] = [];
        guessTable2[i] = [];
        resultTable1[i] = [];
        resultTable2[i] = [];

        for (let j = 0; j < 4; j++) {
            guessTable1[i][j] = "skocko-dodatno/empty.png";
            guessTable2[i][j] = "skocko-dodatno/empty.png";
            resultTable1[i][j] = "skocko-dodatno/gray.png";
            resultTable2[i][j] = "skocko-dodatno/gray.png";
        }
    }

    startTimer();
}

function setData() {

    if (currTry % 2 == 0) {
        //prvi igrac
        document.getElementById("player").innerHTML = "Igrac 1";
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 4; j++) {
                guessTable.rows[i].cells[j].querySelector('img').src = guessTable1[i][j];
                resultTable.rows[i].cells[j].querySelector('img').src = resultTable1[i][j];
            }
        }
        if (timer2 == 0)
            document.getElementById("timer").innerHTML = timer1 + "\nYou won!";
        else
        document.getElementById("timer").innerHTML = timer1;
    } else {
        //drugi igrac
        document.getElementById("player").innerHTML = "Igrac 2";
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 4; j++) {
                guessTable.rows[i].cells[j].querySelector('img').src = guessTable2[i][j];
                resultTable.rows[i].cells[j].querySelector('img').src = resultTable2[i][j];
            }
        }
        if (timer1 == 0)
            document.getElementById("timer").innerHTML = timer2 + "\nYou won!";
        else
        document.getElementById("timer").innerHTML = timer2;
    }

    
}

function addSymbol(src) {
    if (currSymb < 4 && inGame) {
        guess.push(src);
        guessTable.rows[Math.floor(currTry / 2)].cells[currSymb].querySelector('img').src = src;        
        currSymb++;
    }
}

function eraseSymbol() {
    if (currSymb > 0 && inGame) {
        guess.pop();
        currSymb--;
        guessTable.rows[Math.floor(currTry / 2)].cells[currSymb].querySelector('img').src = "skocko-dodatno/empty.png";  
    }
}

function confirmCombination() {
    if (currSymb == 4 && inGame) {
        checkCombination();
        saveData();
        if (inGame)
            changePlayer();
    }
}

function checkCombination() {
    let name = "";
    if (currTry % 2 == 0) 
        name = "combination1";
    else
        name = "combination2";

    let reds = [];
    let combination = localStorage.getItem(name);
    combination = combination.split(",");
    let red = 0;
    let yellow = 0;

    for (let i = 0; i < 4; i++) {
        if (combination[i] == guess[i]) {
            red++;
            reds.push(i);
        }
    }

    lab1:
    for (let i = 0; i < 4; i++) {
        if (!reds.includes(i)) {
            for (let j = 0; j < 4; j++) {
                if (!reds.includes(j)) {
                    if (combination[i] == guess[j]) {
                        yellow++;
                        continue lab1;
                    }
                }
            }
        }   
    }

    getResults(red, yellow);
}

function getResults(red, yellow) {
    let current = 0;

    while (current < red) {
        resultTable.rows[Math.floor(currTry / 2)].cells[current].querySelector('img').src = "skocko-dodatno/red.png";
        current++;
    }

    while (current < red + yellow) {
        resultTable.rows[Math.floor(currTry / 2)].cells[current].querySelector('img').src = "skocko-dodatno/yellow.png";
        current++;
    }
    
    if (red == 4) {
        inGame = false;
        stopTimer();
        document.getElementById("timer").innerHTML = document.getElementById("timer").innerHTML + "\nYou won!";
    } else if (currTry == 12) {
        document.getElementById("timer").innerHTML = document.getElementById("timer").innerHTML + "\nNo more tries!";
    } else if (currTry == 13) {
        inGame = false;
        stopTimer();
        document.getElementById("timer").innerHTML = document.getElementById("timer").innerHTML + "\nDraw!";
    }
}

function saveData() {
    if (currTry % 2 == 0) {
        for (let i = 0; i < 4; i++) {
            guessTable1[Math.floor(currTry / 2)][i] = guessTable.rows[Math.floor(currTry / 2)].cells[i].querySelector('img').src;
            resultTable1[Math.floor(currTry / 2)][i] = resultTable.rows[Math.floor(currTry / 2)].cells[i].querySelector('img').src;
        }
    } else {
        for (let i = 0; i < 4; i++) {
            guessTable2[Math.floor(currTry / 2)][i] = guessTable.rows[Math.floor(currTry / 2)].cells[i].querySelector('img').src;
            resultTable2[Math.floor(currTry / 2)][i] = resultTable.rows[Math.floor(currTry / 2)].cells[i].querySelector('img').src;
        }
    }
}

function changePlayer() {
    guess = [];
    currSymb = 0;
    currTry++;
    setTimeout(setData, 1000);
}

let handler;
function startTimer() {
    handler = setInterval(timer, 1000);
}

function timer() {
    if (currTry % 2 == 0) {
        timer1--;
        document.getElementById("timer").innerHTML = timer1;
    } else {
        timer2--;
        document.getElementById("timer").innerHTML = timer2;
    }

    if (timer1 == 0) {
        stopTimer();
        inGame = false;
        document.getElementById("timer").innerHTML = timer1 + "\nTime's up!";
        currTry++;
        setTimeout(setData, 1000);
    }
    if (timer2 == 0) {
        stopTimer();
        inGame = false;
        document.getElementById("timer").innerHTML = timer2 + "\nTime's up!";
        currTry++;
        setTimeout(setData, 1000);
    }
}

function stopTimer() {
    clearInterval(handler);
}

function newGame() {
    window.location.href = "skocko-podesavanja.html";
}