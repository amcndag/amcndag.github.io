function tickUp(){
    let count = document.getElementById("counter").innerHTML;
    count++;
    document.getElementById("counter").innerHTML = count;
}

function tickDown(){
    let count = document.getElementById("counter").innerHTML;
    count--;
    document.getElementById("counter").innerHTML = count;
}

function runForLoop(){
    let count = document.getElementById("counter").innerHTML;
    let text="";

    for(let i = 0; i <= count; i++){
        text += i + " ";
    }

    document.getElementById("forLoopResult").innerHTML = text;
}

function showOddNumbers(){
    let count = document.getElementById("counter").innerHTML;
    let text="";

    for(let i = 1; i <= count; i++){
        if(i % 2 == 1){
            text += i + " ";
        }
    }

    document.getElementById("oddNumberResult").innerHTML = text;
}

function addMultiplesToArray(){
    let count = document.getElementById("counter").innerHTML;
    const multiplesOfFive = [];

    for(let i = count; i > 0; i--){
        if(i % 5 == 0){
            multiplesOfFive.push(i);
        }
    }

    console.log(multiplesOfFive);
}

function printCarObject(){
    let carType = document.getElementById("carType").value;
    let carMPG = document.getElementById("carMPG").value;
    let carColor = document.getElementById("carColor").value;

    const car = {
        type : carType,
        mpg : carMPG,
        color : carColor,
    }

    console.log(car);
}

function loadCar(carNumber){

    let carSelected;

    if(carNumber == 1){
        carSelected = carObject1;
    }
    else if(carNumber == 2){
        carSelected = carObject2;
    }
    else if(carNumber == 3){
        carSelected = carObject3;
    }
    else{
        console.log("Invalid car number");
        return;
    }

    document.getElementById("carType").value = carSelected.cType;
    document.getElementById("carMPG").value = carSelected.cMPG;
    document.getElementById("carColor").value = carSelected.cColor;
}

function changeColor(colorNumber){

    let text = document.getElementById("styleParagraph");

    if(colorNumber == 1){
        text.style.color = "red";
    }
    else if(colorNumber == 2){
        text.style.color = "green";
    }
    else if(colorNumber == 3){
        text.style.color = "blue";
    }
    else{
        console.log("Invalid color");
    }
}