'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score, currentScore, activePlayer, playing;



// Starting conditions
const init = function (){


    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
};

init();


// switch the player

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};


// Rolling functionality
btnRoll.addEventListener("click", function (){
    if (playing) {
        //1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // console.log(dice);

        //2. Display the dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled:1 . if true switch the player
        if (dice !== 1) {
            // Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore;


        } else {
            // switch the player
            switchPlayer();

        }

    }
});

btnHold.addEventListener("click", function (){
    if (playing) {
        // 1. Add current score to the score
        score[activePlayer] += currentScore;
        // score[1] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer];

        // 2. Check if it's greater than 100;
        if (score[activePlayer] >= 100) {
            //3.Finish the game;
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");


        } else {
            switchPlayer();

        }
    }
});



// Resetting the game

btnNew.addEventListener("click", init);


// How to Play message showing

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

btnShowModal.addEventListener("click", function (){
   modal.classList.remove("hidden");
   overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", function (){
   modal.classList.add("hidden");
   overlay.classList.add("hidden");
});

overlay.addEventListener("click", function (){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});


