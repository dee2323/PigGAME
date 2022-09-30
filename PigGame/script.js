'use strict';
const scorEL0 = document.querySelector('#score--0');
const scoreEL1 = document.querySelector('#score--1');
const diceE = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1');
const scores = [0, 0]
let activePlayer = 0;
let playing = true;
const startingConditions = function () {
    scorEL0.textContent = 0;
    scoreEL1.textContent = 0;
    sum = 0;
    playing = true;
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    diceE.classList.add('hidden');
}
let sum = 0;
const togglePlayer = function () {
    sum = 0;
    document.getElementById(`current--${activePlayer}`).textContent = sum;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
}
startingConditions();
btnNew.addEventListener('click', function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scores[0] = 0
    scores[1] = 0
    startingConditions();

});
btnRoll.addEventListener('click', function () {

    if (playing) {
        const random = Math.trunc(Math.random() * 6) + 1;
        diceE.classList.remove('hidden');
        diceE.src = `dice-${random}.png`
        if (random !== 1) {
            sum += random;
            document.getElementById(`current--${activePlayer}`).textContent = sum;
        } else {
            togglePlayer()
        }
    }
})
btnHold.addEventListener('click',
    function () {
        if (playing) {
            scores[activePlayer] += sum;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            if (scores[activePlayer] >= 20) {
                playing = false;
                diceE.classList.add('hidden');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            } else
                togglePlayer();
        }
    })