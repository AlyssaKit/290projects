function roll() {
    console.log("Rolling");
    rollHelper(1, isLocked(1));
    rollHelper(2, isLocked(2));
    rollHelper(3, isLocked(3));
    rollHelper(4, isLocked(4));
    rollHelper(5, isLocked(5));
    
}
function rollHelper(dieNumber, isLocked) {
  if(isLocked){
      return;
  }
  setDie(dieNumber, Math.floor(Math.random()*6)+1);
}

function score() {
    console.log("Scoring");
    const diceAmmount = [];
    for(let i = 1; i <= 5; i++){
        diceAmmount[i-1] = getDieValue(i);
    }
    sort(diceAmmount);
    console.log(diceAmmount);
    let message = chance(diceAmmount) + ofAKind(diceAmmount) + fullHouse(diceAmmount) + numbers(diceAmmount) + straights(diceAmmount);
    displayScoring(message);
}

function sort(diceAmmount){
    console.log(diceAmmount);
    for(let i = 0; i < 5; i++){
        for( let j = 0; j < 5; j++){
            if(diceAmmount[i] < diceAmmount[j]){
                temp = diceAmmount[j];
                diceAmmount[j] = diceAmmount[i];
                diceAmmount[i] = temp;
            }
        }
    }
}

function chance(diceAmmount) {
    let chanceAmmount = 0;
    for(let i = 0; i < 5; i ++){
        chanceAmmount = chanceAmmount + parseInt(diceAmmount[i]);
    }
    let returnMessage = "Score as Chance: " + chanceAmmount + "\n";
    return returnMessage;
}

function ofAKind(diceAmmount) {
    let aKindAmmount = 0;
    let aKindNum = diceAmmount[0];
    let counted = 0;

    for(let i = 0; i < 5; i++){
        if(aKindNum == diceAmmount[i]){
            aKindAmmount++;
        }
        if(aKindNum != diceAmmount[i+1] && aKindAmmount <= 2){
            aKindNum = diceAmmount[i+1];
            aKindAmmount = 0;
        }
        counted = counted + parseInt(diceAmmount[i]);
    }
    if(aKindAmmount >= 3){
        let returnMessage = "";
        for(let i = 2; i < aKindAmmount; i++){
            if(i == 4){
                returnMessage = returnMessage  + "Score as Yahtzee/5 of kind: 50\n";
                return returnMessage;
            }
            returnMessage = returnMessage  + "Score as " + (i+1) + " of a kind: " + counted + "\n";
        }    
        return returnMessage;
    }
    return "";
}

function fullHouse(diceAmmount) {
    if(((diceAmmount[0] == diceAmmount[1]) && (diceAmmount[1] == diceAmmount[2]) && (diceAmmount[3] == diceAmmount[4]) && (diceAmmount[3] != diceAmmount[0])
    || (diceAmmount[2] == diceAmmount[3]) && (diceAmmount[3] == diceAmmount[4]) && (diceAmmount[0] == diceAmmount[1])&& (diceAmmount[3] != diceAmmount[0]))){
        let returnMessage = "Score as full house: 25 \n";
        return returnMessage;
    }
    return "";
}

function numbers(diceAmmount){
    let dieNumString = "";
    for(let i = 0; i <= 5; i++){
        dieNumString = dieNumString + numbersHelper((i+1), diceAmmount);
    }
    return dieNumString;
}

function numbersHelper(dieNum, diceAmmount){
    let ammount = 0;
    for(let i = 0; i < 5; i++){
        if(dieNum == parseInt(diceAmmount[i])){
            ammount = ammount + parseInt(diceAmmount[i]);
        }       
    }  
    if(ammount > 0){
        let returnMessage = "Score as " + dieNum + "s: "+ ammount + "\n";
        return returnMessage;
    }
    return "";
}

function straights(diceAmmount) {
    let count = 1;
    for(let i = 0; i < 4; i++){
         if((diceAmmount[i+1] - diceAmmount[i] == 1)){
            count++;
        }
    }
    if(count >= 4){
        let returnMessage = "Score as small straight: 30\n";
        if(count == 5){
            returnMessage = returnMessage + "Score as large straight: 40\n";
        }
        return returnMessage;
    }
    return "";
}

//------------------------------------------------
//YOUR CODE ABOVE
//You may call the functions listed below but should not modify them

//returns the value showing on the given die (1-5)
function getDieValue(dieNumber) {
    let die = document.getElementById('die' + dieNumber);
    return die.textContent;
}

//Changes the given die number (1-5) to the given value (1-6)
function setDie(dieNumber, value) {
    let die = document.getElementById('die' + dieNumber);
    let regex = /\d+/;
    die.className = die.className.replace(regex, value);
    die.innerText = value;
}

//returns true if the given die number (1-5) is in the locked state, false if not
function isLocked(dieNumber) {
    let die = document.getElementById('die' + dieNumber);
    return die.className.indexOf("-fill") != -1;
}

//displays the message in the scoring information textarea
function displayScoring(message) {
    let textarea = document.getElementById('score-report');
    textarea.value = message;
}