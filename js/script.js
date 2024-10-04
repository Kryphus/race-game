console.log('test')

// Global variables
var idInterval; // Interval ID for race.
var v1, v2, v3; // Duck velocities.
var x1 = 0, x2 = 0, x3 = 0; // Duck positions.

let round = 1; // Current race round.
let playerScores = { "Player 1": 0, "Player 2": 0, "Player 3": 0 }; // Player scores.
const maxRounds = 3; // Max rounds.


// Change duck image when clicked functionality
document.addEventListener('DOMContentLoaded', () => {
    const duckGifs = ["./img/duck1.gif", "./img/duck2.gif", "./img/duck3.gif", "./img/duck4.gif", "./img/duck5.gif", "./img/duck6.gif"];

    function changeDuckGif(event) {
        const imgElement = event.target;
        const currentGif = imgElement.src.split('/').pop();
        let currentIndex = duckGifs.findIndex(gif => gif.includes(currentGif));

        currentIndex = (currentIndex + 1) % duckGifs.length;
        imgElement.src = duckGifs[currentIndex];
    }

    const ducks = document.querySelectorAll('.duckGif');
    ducks.forEach(duck => {
        duck.addEventListener('click', changeDuckGif);
    });
});

// Start the race animation
function startAnimation() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnStop").disabled = false;

    // Randomize velocities
    v1 = Math.floor(Math.random() * 20) + 5;
    v2 = Math.floor(Math.random() * 20) + 5;
    v3 = Math.floor(Math.random() * 20) + 5;

    idInterval = setInterval('move_a_step()', 100);
}

// Move ducks a step forward
function move_a_step() {
    var goal1 = document.querySelector(".track1").clientWidth;
    var goal2 = document.querySelector(".track2").clientWidth;
    var goal3 = document.querySelector(".track3").clientWidth;

    // Check for winners
    if (x1 >= goal1 && x1 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        showWinner("Player 1");
        return; 
    }

    if (x2 >= goal2 && x2 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        showWinner("Player 2");
        return; 
    }

    if (x3 >= goal3 && x3 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        showWinner("Player 3");
        return; 
    }

    // Move ducks forward
    x1 += v1;
    x2 += v2;
    x3 += v3;

    document.querySelector("#m1").style.transform = `translateX(${x1}px)`;
    document.querySelector("#m2").style.transform = `translateX(${x2}px)`;
    document.querySelector("#m3").style.transform = `translateX(${x3}px)`;
}

// Stop the race animation
function stopAnimation() {
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnStop").disabled = true;
    clearInterval(idInterval);
}

// Display winner and update score
function showWinner(winner) {
    const hangingContainer = document.getElementById('hanging-container');
    hangingContainer.querySelector('h3 span').textContent = winner; 
    hangingContainer.style.display = 'flex'; 
    hangingContainer.style.flexDirection = 'column';
    hangingContainer.style.gap = '10px';

}

// for restart button
document.getElementById('restartButton').onclick = function() {
    window.location.reload(); 
};

// for player name
document.querySelectorAll('.playerName').forEach(nameElement => {
    nameElement.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.textContent; 
        input.classList.add('editPlayerName'); 

        this.replaceWith(input);
        input.focus();

        input.addEventListener('blur', function() {
            savePlayerName(input);
        });
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                savePlayerName(input);
            }
        });
    });
});

// Save edited player name
function savePlayerName(input) {
    const oldName = input.previousElementSibling ? input.previousElementSibling.textContent : input.getAttribute('data-old-name');
    const newName = input.value;
    
    if (playerScores.hasOwnProperty(oldName)) {
        playerScores[newName] = playerScores[oldName];
        delete playerScores[oldName];
    }

    const newP = document.createElement('p');
    newP.textContent = newName;
    newP.classList.add('playerName');
    newP.addEventListener('click', function() {
        input.replaceWith(newP);
    });

    input.replaceWith(newP);
}

// Reset the race
function resetRace() {
    clearInterval(idInterval); 
    x1 = x2 = x3 = 0; 
    document.querySelector("#m1").style.transform = `translateX(${x1}px)`; 
    document.querySelector("#m2").style.transform = `translateX(${x2}px)`; 
    document.querySelector("#m3").style.transform = `translateX(${x3}px)`;
    document.getElementById("btnStart").disabled = false; 
    document.getElementById("btnStop").disabled = true; 
    document.getElementById('hanging-container').style.display = 'none'; 
}

// Display winner and update score
function showWinner(winner) {
    playerScores[winner] += 1; 
    updateScoreDisplay(); 

    if (playerScores[winner] >= 3) {
        const hangingContainer = document.getElementById('hanging-container');
        hangingContainer.querySelector('h3 span').textContent = winner; 
        hangingContainer.style.display = 'flex'; 
        hangingContainer.style.flexDirection = 'column';
        hangingContainer.style.gap = '10px';
    } else {
        setTimeout(resetRace, 1000);
    }
}

// Update the score display on UI
function updateScoreDisplay() {
    document.getElementById('player1Score').textContent = playerScores['Player 1'];
    document.getElementById('player2Score').textContent = playerScores['Player 2'];
    document.getElementById('player3Score').textContent = playerScores['Player 3'];
}


