const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['internet', 'programming', 'datascience', 'server'];

let selectedWord;
let correctLetters;
let wrongLetters;

function selectRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    selectRandomWord();
    correctLetters = [];
    wrongLetters = [];
}

function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => `
        <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>
        `).join('')
        }`;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        if (index < wrongLetters.length) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    })
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

window.addEventListener('keydown', event => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
            else {
                showNotification();
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    startGame();
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
})

startGame();
displayWord();