function findPokemon(){
    const input = document.getElementById("input"); // grab input element
    const pokemon = input.value.trim().toLowerCase(); // trim excess and make lowercase for API compatibility

    if(!pokemon){
        alert("Please enter a Pokemon name or ID");
        return;
    }

    const cacheData = localStorage.getItem(pokemon); // check if the data is already in localStorage

    if(cacheData){ // if it is
        const pokemondata = JSON.parse(cacheData); // parse the data
        console.log("Data loaded from cache"); // log to console
        displayPokemon(pokemondata); // call display function
    }
    else{ // if not, fetch from API

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) // fetch data from API
        .then(response => {
            if(!response.ok){ // if there is an error
                throw new Error("Pokemon not found"); // throw error
            }

            return response.json(); // if no error, return data

        })
        .then(data => {
            localStorage.setItem(pokemon, JSON.stringify(data)); // store the data in localStorage
            displayPokemon(data); // call display function
        })
        .catch(error => {
            alert(error.message); // alert error message
            console.error(error); // log error to console
        });

        console.log("Data fetched from API")
    }
}

function displayPokemon(data){
    const image = document.getElementById("sprite");
    sprite.src = data.sprites.front_default; // set image source to sprite from API

    const sound = document.getElementById("cry");
    const audioPlayer = sound.parentElement; // get the audio player element

    sound.src = data.cries.latest; // set audio source to pokemon cry
    audioPlayer.load(); // load new audio source

    const moveSelector = document.querySelectorAll(".moves");
    const pokemonMoves = data.moves; // get pokemon moves

    moveSelector.forEach(select => {
        select.innerHTML = ""; // clear existing options

        pokemonMoves.forEach(move => {
            const moveName = move.move.name; // get move name
            const option = document.createElement("option"); // create new option element

            option.value = moveName; // set option value to move name
            option.textContent = moveName; // set option text to move name

            select.appendChild(option); // add option to select element
        });
    });
}

function addToTeam(){
    const pokemonSprite = document.getElementById("sprite").src; // get current pokemon sprite

    const firstMove = document.getElementById("move1").value;
    const secondMove = document.getElementById("move2").value;
    const thirdMove = document.getElementById("move3").value;
    const fourthMove = document.getElementById("move4").value;

    if(!firstMove || !secondMove || !thirdMove || !fourthMove){ // if a move is missing
        alert("Please select all four moves before adding to team");
        return;
    }

    const teamSection = document.getElementById("team");
    if(teamSection.classList.contains("hidden")){
        teamSection.classList.remove("hidden");
    }

    const myTeam = document.getElementById("myTeam");

    const teamMember = document.createElement("div"); // create new div for team member
    teamMember.classList.add("teamMembers"); // add class for styling

    teamMember.innerHTML = `
        <div class="spriteContainer">
            <img src="${pokemonSprite}" alt="Pokemon Sprite">
        </div>
        <div class="movesList">
            <ul>
                <li>${firstMove}</li>
                <li>${secondMove}</li>
                <li>${thirdMove}</li>
                <li>${fourthMove}</li>
            </ul>
        </div>
    `; // set inner HTML to list of moves

    myTeam.appendChild(teamMember); // add pokemon to team
}