function getRandomNumber() {
  return Math.floor(Math.random() * 118) + 1;
}

let currentElement = null; // holds the element generated
let currentMode = ""; // holds the question state
let countdown = null; // holds the countdown timer

// create an array that tracks how many times a number has been generated
let ledger = new Array(119).fill(0);
let ledgerCount = 0;

window.addEventListener("DOMContentLoaded", () => { // when the dom content loads
    findElement(); // call findElement function
});

function findElement(){
    let element = getRandomNumber();

    while(ledger[element] == 3){
        if(ledgerCount < 354){ // if there are still elements that can be generated
            element = getRandomNumber(); // go find them
        }
        else{
            // reset everything
            ledger.fill(0);
            ledgerCount = 0;
        }
    }

    ledger[element] += 1;
    ledgerCount++;

    const cacheData = localStorage.getItem(element); // check if the data is already in localStorage

    // Clear previous feedback and input when generating a new question
    document.getElementById("feedback").classList.add("hidden");
    document.getElementById("input").value = "";


    if (Math.random() < 0.5){
        currentMode = 'guessName';
    }
    else{
        currentMode = 'guessSymbol';
    }

    if(cacheData){ // if it is
        const elementdata = JSON.parse(cacheData); // parse the data
        console.log("Data loaded from cache"); // log to console
        currentElement = elementdata;
        displayElement(elementdata); // call display function
    }
    else{ // if not, fetch from API

        fetch(`https://api.periodictableofelements.org/elements/${element}/`) // fetch data from API
        .then(response => {
            if(!response.ok){ // if there is an error
                throw new Error("Element not found"); // throw error
            }

            return response.json(); // if no error, return data

        })
        .then(data => {
            localStorage.setItem(element, JSON.stringify(data)); // store the data in localStorage
            currentElement = data;
            displayElement(data); // call display function
        })
        .catch(error => {
            alert(error.message); // alert error message
            console.error(error); // log error to console
        });

        console.log("Data fetched from API")
    }
}

function displayElement(data){
    const questionDiv = document.getElementById("question"); // get the place where the question will go

    if (currentMode === 'guessName') {
        questionDiv.innerHTML = `What is the name of the element with the symbol: <strong>${data.symbol}</strong>?`;
    } else {
        questionDiv.innerHTML = `What is the symbol for the element: <strong>${data.name}</strong>?`;
    }
    
    questionDiv.classList.remove("hidden");

}

function enterAnswer(event){

    if(event){
        event.preventDefault();
    }

    if(!currentElement){
        alert("Please wait for element to load");
        return;
    }

    const userAnswer = document.getElementById("input").value.trim().toLowerCase();

    let correctAnswer = "";
    let displayCorrect = "";

    if (currentMode === 'guessName'){
        correctAnswer = currentElement.name.trim().toLowerCase();
        displayCorrect = currentElement.name;
    }
    else{
        correctAnswer = currentElement.symbol.trim().toLowerCase();
        displayCorrect = currentElement.symbol;
    }

    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.classList.remove("hidden");

    if(countdown){
        clearInterval(countdown);
    }

    if (userAnswer === correctAnswer) {

        let timeLeft = 3; // countdown time setting

        feedbackDiv.style.color = "green";
        feedbackDiv.innerHTML = `Correct! It is ${displayCorrect}.<br>Next element in ${timeLeft}s.`;

        countdown = setInterval(() => {

            timeLeft--; // decrement the timer
            if(timeLeft > 0){ // continue to display message, now with changing time
                feedbackDiv.innerHTML = `Correct! It is ${displayCorrect}.<br>Next element in ${timeLeft}s.`;
            }
            else{ // clear the timer and generate new element
                clearInterval(countdown);
                findElement();
            }
        }, 1000);

        document.getElementById("skip").classList.add("hidden"); // rehide the skip button if needed

    } else {
        feedbackDiv.style.color = "red";
        feedbackDiv.textContent = `Incorrect. Try again or press skip.`;

        document.getElementById("input").value = "";
        document.getElementById("skip").classList.remove("hidden");
    }
}

function skipElement(){
    let displayCorrect = "";

    // check which game mode we are in and display the correct answer type
    if(currentMode === 'guessName'){
        displayCorrect = currentElement.name;
    }
    else{
        displayCorrect = currentElement.symbol;
    }

    const feedbackDiv = document.getElementById("feedback"); // get the feedback div
    feedbackDiv.classList.remove("hidden"); // unhide it

    // display the correct answer after a skip
    let timeLeft = 3;

    feedbackDiv.style.color = "black";
    feedbackDiv.innerHTML = `The correct answer was ${displayCorrect}.<br>Next element in ${timeLeft}s.`;

    // rehide skip button
    document.getElementById("skip").classList.add("hidden"); // rehide the skip button

    countdown = setInterval(() => {

            timeLeft--; // decrement the timer
            if(timeLeft > 0){ // continue to display message, now with changing time
                feedbackDiv.innerHTML = `The correct answer was ${displayCorrect}.<br>Next element in ${timeLeft}s.`;
            }
            else{ // clear the timer and generate new element
                clearInterval(countdown);
                findElement();
            }
        }, 1000);
}