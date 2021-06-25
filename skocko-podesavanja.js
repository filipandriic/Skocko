var combination1 = [];
var combination2 = [];

var currPlayer = 0;
var currSymb = 0;

function addSymbol(src) {
    if (currSymb < 4) {

        if (currPlayer == 0) {
            combination2.push(src);
        } else {
            combination1.push(src);
        }

        let current = "empty" + currSymb;
        document.getElementById(current).src = src;
        currSymb++;
    }
}

function eraseSymbol() {
    if (currSymb > 0) {

        if (currPlayer == 0) {
            combination2.pop();
        } else {
            combination1.pop();
        }

        currSymb--;
        let current = "empty" + currSymb;
        document.getElementById(current).src = "skocko-dodatno/empty.png";  
    }
}



function confirmCombination() {
    if (currSymb == 4) {

        if (currPlayer == 0) {
            currPlayer++;
            localStorage.setItem("combination2", combination2);
            document.getElementById("currentPlayerSettingCombination").innerHTML = "Drugi igrac:";
            reset();
        } else {
            localStorage.setItem("combination1", combination1);
            window.location.href = "skocko-igra.html";
        }

    }
}

function reset() {
    while (currSymb > 0) {
        currSymb--;
        let current = "empty" + currSymb;
        document.getElementById(current).src = "skocko-dodatno/empty.png";
    }
}