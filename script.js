const notes = [];
const scoreDisplay = document.getElementById('score');
const music = document.getElementById('music');
const gameContainer = document.getElementById('game-container');
const menuContainer = document.getElementById('menu-container');
const songSelectionContainer = document.getElementById('song-selection-container');
const dinosaur = document.getElementById('dinosaur');
const countdownAudio = document.getElementById('countdown-audio');
const countdown3Img = document.getElementById('countdown-3-img');
const countdown2Img = document.getElementById('countdown-2-img');
const countdown1Img = document.getElementById('countdown-1-img');
const countdownGoImg = document.getElementById('countdown-go-img');
const scoreSound = document.getElementById('score-sound');
let scoreSoundInstances = [];
let score = 0;
let noteTimings = [];
let noteSpeed = 5;
let animationId;
let noteTimeouts = [];
let countdownTimeouts = [];
let countdownInProgress = false;
//pokud tu jsou nejake navic ktere jsem nepouzil tak je to tim ze jsem chtel nejake veci udelat a pak jsem zjistil ze nevim jak tak jsem to neudelal a mozna tu neco nechal

//funkce ktera rozpozna ktere tlacitko jste zmackl
function generateNoteTimings(beats) {
    const keys = ['ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight'];
    return beats.map((beat, index) => ({
        time: beat,
        key: keys[index % keys.length]
    }));
}
//funkce ukaze stranku kde si vybirate level
function showSongSelection() {
    menuContainer.classList.add('hidden');
    songSelectionContainer.classList.remove('hidden');
}
//toto je jen na okrasu v menu
function showOptions() {
    alert("Nic to nedělá je to tu jen na okrasu.");
}

//toto je taky jen na okrasu v menu
function exitGame() {
    alert("Ani toto nefunguje.");
}

//funkce vas posle zpet do menu
function showMenu() {
    music.pause();
    music.currentTime = 0;
    gameContainer.classList.add('hidden');
    songSelectionContainer.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    scoreDisplay.classList.add('hidden');
    cancelAnimationFrame(animationId); //kdyz jdete do menu tak sipky prestanou jezdit dolu

    // kdyz jdete do menu tak aby nebyly na obrazovce sipky
    clearNotes();

    noteTimeouts.forEach(timeout => clearTimeout(timeout));
    noteTimeouts.length = 0;
    clearCountdown();

    countdownInProgress = false;
    hideExitIndicator();
}

document.getElementById('exit-button').addEventListener('click', showMenu);

//funkce vycisti noty na obrazovce
function clearNotes() {
    notes.forEach(note => note.remove());
    notes.length = 0;
}

//funkce zrusi casovac pokud jdete do menu
function clearCountdown() {
    countdownTimeouts.forEach(timeout => clearTimeout(timeout));
    countdownTimeouts.length = 0;
    countdown3Img.classList.add('hidden');
    countdown2Img.classList.add('hidden');
    countdown1Img.classList.add('hidden');
    countdownGoImg.classList.add('hidden');
}

//funkce zapne casovac 3 2 1 go
function startCountdown(song, difficulty) {
    songSelectionContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    countdownAudio.play();
    countdownInProgress = true;

    countdown3Img.classList.remove('hidden');
    countdown3Img.classList.add('visible');
    countdownTimeouts.push(setTimeout(() => {
        countdown3Img.classList.remove('visible');
        countdown3Img.classList.add('hidden');
        countdown2Img.classList.remove('hidden');
        countdown2Img.classList.add('visible');
    }, 1000));
    countdownTimeouts.push(setTimeout(() => {
        countdown2Img.classList.remove('visible');
        countdown2Img.classList.add('hidden');
        countdown1Img.classList.remove('hidden');
        countdown1Img.classList.add('visible');
    }, 2000));
    countdownTimeouts.push(setTimeout(() => {
        countdown1Img.classList.remove('visible');
        countdown1Img.classList.add('hidden');
        countdownGoImg.classList.remove('hidden');
        countdownGoImg.classList.add('visible');
    }, 3000));
    countdownTimeouts.push(setTimeout(() => {
        countdownGoImg.classList.remove('visible');
        countdownGoImg.classList.add('hidden');
        if (countdownInProgress) {
            startGame(song, difficulty);
        }
    }, 4000));
}

//funkce zapne hru
function startGame(song, difficulty) {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    music.src = song;
    music.play();

    // rychlost levelu podle obtiznosti
    if (difficulty === 'easy') {
        noteSpeed = 5;
    } else if (difficulty === 'medium') {
        noteSpeed = 6;
    } else if (difficulty === 'hard') {
        noteSpeed = 8;
    }

    songSelectionContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    scoreDisplay.classList.remove('hidden');
    showExitIndicator();
    hideMadeBy();

    //kadzou sipku jsem musel manualne napsat do tohoto kodu 
    if (song === 'been knew thattt.mp3') {
        noteTimings = [
            { time: 1, key: 'ArrowUp' },
            { time: 1783, key: 'ArrowDown' },
            { time: 3633, key: 'ArrowRight' },
            { time: 5516, key: 'ArrowLeft' },
            { time: 7316, key: 'ArrowUp' },
            { time: 9183, key: 'ArrowDown' },
            { time: 11076, key: 'ArrowRight' },
            { time: 12900, key: 'ArrowLeft' },
            { time: 14716, key: 'ArrowUp' },
            { time: 16600, key: 'ArrowDown' },
            { time: 18400, key: 'ArrowRight' },
            { time: 20233, key: 'ArrowLeft' },
            { time: 22133, key: 'ArrowUp' },
            { time: 23933, key: 'ArrowDown' },
            { time: 25783, key: 'ArrowRight' },
            { time: 27667, key: 'ArrowLeft' },
            { time: 31214, key: 'ArrowDown' },
            { time: 33083, key: 'ArrowLeft' },
            { time: 33533, key: 'ArrowUp' },
            { time: 34000, key: 'ArrowUp' },
            { time: 34450, key: 'ArrowUp' },
            { time: 34966, key: 'ArrowRight' },
            { time: 35433, key: 'ArrowUp' },
            { time: 35866, key: 'ArrowUp' },
            { time: 36266, key: 'ArrowUp' },
            { time: 36750, key: 'ArrowDown' },
            { time: 37183, key: 'ArrowUp' },
            { time: 37616, key: 'ArrowUp' },
            { time: 38083, key: 'ArrowUp' },
            { time: 38600, key: 'ArrowLeft' },
            { time: 39033, key: 'ArrowUp' },
            { time: 39500, key: 'ArrowUp' },
            { time: 39966, key: 'ArrowUp' },
            { time: 40433, key: 'ArrowRight' },
            { time: 40866, key: 'ArrowUp' },
            { time: 41333, key: 'ArrowUp' },
            { time: 41783, key: 'ArrowUp' },
            { time: 42283, key: 'ArrowDown' },
            { time: 42750, key: 'ArrowUp' },
            { time: 43200, key: 'ArrowUp' },
            { time: 43633, key: 'ArrowUp' },
            { time: 44116, key: 'ArrowLeft' },
            { time: 44583, key: 'ArrowUp' },
            { time: 45033, key: 'ArrowUp' },
            { time: 45466, key: 'ArrowUp' },
            { time: 45966, key: 'ArrowDown' },
            { time: 46650, key: 'ArrowLeft' },
            { time: 47133, key: 'ArrowUp' },
            { time: 47383, key: 'ArrowUp' },
            { time: 48016, key: 'ArrowDown' },
            { time: 48700, key: 'ArrowLeft' },
            { time: 49667, key: 'ArrowDown' },
            { time: 50766, key: 'ArrowUp' },
            { time: 51000, key: 'ArrowUp' },
            { time: 51266, key: 'ArrowUp' },
            { time: 53366, key: 'ArrowLeft' },
            { time: 54033, key: 'ArrowDown' },
            { time: 54700, key: 'ArrowUp' },
            { time: 55400, key: 'ArrowRight' },
            { time: 56100, key: 'ArrowUp' },
            { time: 56966, key: 'ArrowDown' },
            { time: 57733, key: 'ArrowRight' },
            { time: 58266, key: 'ArrowUp' },
            { time: 58450, key: 'ArrowUp' },
            { time: 59833, key: 'ArrowLeft' },
            { time: 60050, key: 'ArrowDown' },
            { time: 60266, key: 'ArrowUp' },
            { time: 60466, key: 'ArrowRight' },
            { time: 60744, key: 'ArrowLeft' },
            { time: 62100, key: 'ArrowDown' },
            { time: 62983, key: 'ArrowDown' },
            { time: 63550, key: 'ArrowDown' },
            { time: 64416, key: 'ArrowDown' },
            { time: 65766, key: 'ArrowUp' },
            { time: 66733, key: 'ArrowUp' },
            { time: 67466, key: 'ArrowUp' },
            { time: 68083, key: 'ArrowUp' },
            { time: 69500, key: 'ArrowRight' },
            { time: 70383, key: 'ArrowDown' },
            { time: 71033, key: 'ArrowUp' },
            { time: 71800, key: 'ArrowRight' },
            { time: 72483, key: 'ArrowLeft' },
            { time: 73116, key: 'ArrowUp' },
            { time: 74066, key: 'ArrowDown' },
            { time: 75516, key: 'ArrowUp' },
            { time: 77333, key: 'ArrowDown' },
            { time: 79166, key: 'ArrowRight' },
            { time: 81050, key: 'ArrowLeft' },
            { time: 82833, key: 'ArrowUp' },
            { time: 84733, key: 'ArrowDown' },
            { time: 86550, key: 'ArrowRight' },
            { time: 88400, key: 'ArrowLeft' },
            { time: 90266, key: 'ArrowDown' },
            { time: 91667, key: 'ArrowUp' },
            { time: 92166, key: 'ArrowLeft' },
            { time: 92600, key: 'ArrowUp' },
            { time: 93016, key: 'ArrowUp' },
            { time: 93466, key: 'ArrowUp' },
            { time: 93966, key: 'ArrowRight' },
            { time: 94450, key: 'ArrowUp' },
            { time: 94850, key: 'ArrowUp' },
            { time: 95316, key: 'ArrowUp' },
            { time: 95800, key: 'ArrowDown' },
            { time: 96250, key: 'ArrowUp' },
            { time: 96700, key: 'ArrowUp' },
            { time: 97133, key: 'ArrowUp' },
            { time: 99550, key: 'ArrowLeft' },
            { time: 99933, key: 'ArrowUp' },
            { time: 100416, key: 'ArrowUp' },
            { time: 100850, key: 'ArrowUp' },
            { time: 101316, key: 'ArrowRight' },
            { time: 101783, key: 'ArrowUp' },
            { time: 102216, key: 'ArrowUp' },
            { time: 102683, key: 'ArrowUp' },
            { time: 103150, key: 'ArrowDown' },
            { time: 103600, key: 'ArrowUp' },
            { time: 104050, key: 'ArrowUp' },
            { time: 104500, key: 'ArrowUp' },
        ];
    } else if (song === 'ur the moon.mp3') {
        noteTimings = [
            { time: 66, key: 'ArrowLeft' },
            { time: 266, key: 'ArrowDown' },
            { time: 483, key: 'ArrowUp' },
            { time: 667, key: 'ArrowRight' },
            { time: 1300, key: 'ArrowLeft' },
            { time: 1500, key: 'ArrowDown' },
            { time: 1700, key: 'ArrowUp' },
            { time: 1933, key: 'ArrowRight' },
            { time: 2533, key: 'ArrowLeft' },
            { time: 2750, key: 'ArrowDown' },
            { time: 3050, key: 'ArrowUp' },
            { time: 3450, key: 'ArrowLeft' },
            { time: 3650, key: 'ArrowDown' },
            { time: 3866, key: 'ArrowUp' },
            { time: 4083, key: 'ArrowRight' },
            { time: 4733, key: 'ArrowLeft' },
            { time: 4933, key: 'ArrowDown' },
            { time: 5133, key: 'ArrowUp' },
            { time: 5350, key: 'ArrowRight' },
            { time: 5966, key: 'ArrowLeft' },
            { time: 6166, key: 'ArrowDown' },
            { time: 6383, key: 'ArrowUp' },
            { time: 6833, key: 'ArrowLeft' },
            { time: 7050, key: 'ArrowDown' },
            { time: 7266, key: 'ArrowUp' },
            { time: 7483, key: 'ArrowRight' },
            { time: 8150, key: 'ArrowLeft' },
            { time: 8333, key: 'ArrowDown' },
            { time: 8533, key: 'ArrowUp' },
            { time: 8766, key: 'ArrowRight' },
            { time: 9416, key: 'ArrowLeft' },
            { time: 9616, key: 'ArrowDown' },
            { time: 9850, key: 'ArrowUp' },
            { time: 10283, key: 'ArrowLeft' },
            { time: 10516, key: 'ArrowDown' },
            { time: 10716, key: 'ArrowUp' },
            { time: 10950, key: 'ArrowRight' },
            { time: 11616, key: 'ArrowLeft' },
            { time: 11783, key: 'ArrowDown' },
            { time: 11966, key: 'ArrowUp' },
            { time: 12233, key: 'ArrowRight' },
            { time: 12816, key: 'ArrowLeft' },
            { time: 13016, key: 'ArrowDown' },
            { time: 13250, key: 'ArrowUp' },
            { time: 13716, key: 'ArrowUp' },
            { time: 15016, key: 'ArrowLeft' },
            { time: 15233, key: 'ArrowUp' },
            { time: 15433, key: 'ArrowLeft' },
            { time: 16250, key: 'ArrowDown' },
            { time: 16683, key: 'ArrowDown' },
            { time: 18416, key: 'ArrowRight' },
            { time: 18650, key: 'ArrowDown' },
            { time: 18834, key: 'ArrowRight' },
            { time: 19667, key: 'ArrowUp' },
            { time: 20100, key: 'ArrowUp' },
            { time: 21833, key: 'ArrowLeft' },
            { time: 22033, key: 'ArrowUp' },
            { time: 22250, key: 'ArrowLeft' },
            { time: 23116, key: 'ArrowDown' },
            { time: 23533, key: 'ArrowDown' },
            { time: 25266, key: 'ArrowRight' },
            { time: 25466, key: 'ArrowDown' },
            { time: 25683, key: 'ArrowRight' },
            { time: 26500, key: 'ArrowUp' },
            { time: 26950, key: 'ArrowUp' },
            { time: 28667, key: 'ArrowLeft' },
            { time: 28900, key: 'ArrowUp' },
            { time: 29083, key: 'ArrowLeft' },
            { time: 29950, key: 'ArrowDown' },
            { time: 30400, key: 'ArrowDown' },
            { time: 32116, key: 'ArrowRight' },
            { time: 32333, key: 'ArrowDown' },
            { time: 32533, key: 'ArrowRight' },
            { time: 33416, key: 'ArrowUp' },
            { time: 33833, key: 'ArrowUp' },
            { time: 35516, key: 'ArrowLeft' },
            { time: 35750, key: 'ArrowUp' },
            { time: 35966, key: 'ArrowLeft' },
            { time: 36816, key: 'ArrowDown' },
            { time: 37250, key: 'ArrowDown' },
            { time: 37683, key: 'ArrowLeft' },
            { time: 37883, key: 'ArrowDown' },
            { time: 38116, key: 'ArrowUp' },
            { time: 38366, key: 'ArrowRight' },
            { time: 38983, key: 'ArrowLeft' },
            { time: 39200, key: 'ArrowDown' },
            { time: 39400, key: 'ArrowUp' },
            { time: 39616, key: 'ArrowRight' },
            { time: 40283, key: 'ArrowLeft' },
            { time: 40483, key: 'ArrowDown' },
            { time: 40750, key: 'ArrowUp' },
            { time: 41166, key: 'ArrowLeft' },
            { time: 41350, key: 'ArrowDown' },
            { time: 41550, key: 'ArrowUp' },
            { time: 41766, key: 'ArrowRight' },
            { time: 42533, key: 'ArrowLeft' },
            { time: 42733, key: 'ArrowDown' },
            { time: 42933, key: 'ArrowUp' },
            { time: 43166, key: 'ArrowRight' },
            { time: 43750, key: 'ArrowLeft' },
            { time: 43950, key: 'ArrowDown' },
            { time: 44166, key: 'ArrowUp' },
            { time: 44616, key: 'ArrowLeft' },
            { time: 44850, key: 'ArrowDown' },
            { time: 45066, key: 'ArrowUp' },
            { time: 45283, key: 'ArrowRight' },
            { time: 45933, key: 'ArrowLeft' },
            { time: 46133, key: 'ArrowDown' },
            { time: 46333, key: 'ArrowUp' },
            { time: 46566, key: 'ArrowRight' },
            { time: 47166, key: 'ArrowLeft' },
            { time: 47383, key: 'ArrowDown' },
            { time: 47583, key: 'ArrowUp' },
            { time: 48050, key: 'ArrowLeft' },
            { time: 48250, key: 'ArrowDown' },
            { time: 48483, key: 'ArrowUp' },
            { time: 48700, key: 'ArrowRight' },
            { time: 49316, key: 'ArrowLeft' },
            { time: 49550, key: 'ArrowDown' },
            { time: 49766, key: 'ArrowUp' },
            { time: 49966, key: 'ArrowRight' },
            { time: 50566, key: 'ArrowLeft' },
            { time: 50766, key: 'ArrowDown' },
            { time: 50983, key: 'ArrowUp' },
            { time: 52750, key: 'ArrowLeft' },
            { time: 52950, key: 'ArrowUp' },
            { time: 53183, key: 'ArrowLeft' },
            { time: 53983, key: 'ArrowDown' },
            { time: 54416, key: 'ArrowDown' },
            { time: 56200, key: 'ArrowRight' },
            { time: 56400, key: 'ArrowDown' },
            { time: 56616, key: 'ArrowRight' },
            { time: 57466, key: 'ArrowUp' },
            { time: 57866, key: 'ArrowUp' },
            { time: 59566, key: 'ArrowLeft' },
            { time: 59816, key: 'ArrowUp' },
            { time: 60033, key: 'ArrowLeft' },
            { time: 60850, key: 'ArrowDown' },
            { time: 61300, key: 'ArrowDown' },
            { time: 63033, key: 'ArrowRight' },
            { time: 63233, key: 'ArrowDown' },
            { time: 63450, key: 'ArrowRight' },
            { time: 64316, key: 'ArrowUp' },
            { time: 64716, key: 'ArrowUp' },
            { time: 66483, key: 'ArrowLeft' },
            { time: 66700, key: 'ArrowDown' },
            { time: 66900, key: 'ArrowUp' },
            { time: 67133, key: 'ArrowRight' },
            { time: 67783, key: 'ArrowLeft' },
            { time: 68000, key: 'ArrowDown' },
            { time: 68233, key: 'ArrowUp' },
            { time: 68633, key: 'ArrowLeft' },
            { time: 68833, key: 'ArrowDown' },
            { time: 69050, key: 'ArrowUp' },
            { time: 69250, key: 'ArrowRight' },
            { time: 69950, key: 'ArrowLeft' },
            { time: 70133, key: 'ArrowDown' },
            { time: 70333, key: 'ArrowUp' },
            { time: 70533, key: 'ArrowRight' },
            { time: 71183, key: 'ArrowLeft' },
            { time: 71400, key: 'ArrowDown' },
            { time: 71616, key: 'ArrowUp' },
            { time: 72066, key: 'ArrowLeft' },
            { time: 72266, key: 'ArrowDown' },
            { time: 72466, key: 'ArrowUp' },
            { time: 72683, key: 'ArrowRight' },
            { time: 73333, key: 'ArrowLeft' },
            { time: 73550, key: 'ArrowDown' },
            { time: 73750, key: 'ArrowUp' },
            { time: 73966, key: 'ArrowRight' },
            { time: 74616, key: 'ArrowLeft' },
            { time: 74816, key: 'ArrowDown' },
            { time: 75016, key: 'ArrowUp' },
            { time: 75516, key: 'ArrowLeft' },
            { time: 75716, key: 'ArrowDown' },
            { time: 75900, key: 'ArrowUp' },
            { time: 76100, key: 'ArrowRight' },
            { time: 76766, key: 'ArrowLeft' },
            { time: 76966, key: 'ArrowDown' },
            { time: 77166, key: 'ArrowUp' },
            { time: 77383, key: 'ArrowRight' },
            { time: 78066, key: 'ArrowLeft' },
            { time: 78250, key: 'ArrowDown' },
            { time: 78466, key: 'ArrowUp' },
            { time: 79550, key: 'ArrowLeft' },
            { time: 80766, key: 'ArrowLeft' },
            { time: 81866, key: 'ArrowLeft' },
            { time: 82983, key: 'ArrowUp' },
            { time: 84200, key: 'ArrowUp' },
            { time: 85266, key: 'ArrowUp' },
            { time: 86316, key: 'ArrowRight' },
            { time: 87633, key: 'ArrowRight' },
            { time: 88733, key: 'ArrowRight' }
        ];
    } else if (song === 'like thatttt.mp3') {
        noteTimings = [
            { time: 50, key: 'ArrowDown' },
            { time: 233, key: 'ArrowUp' },
            { time: 400, key: 'ArrowRight' },
            { time: 600, key: 'ArrowDown' },
            { time: 766, key: 'ArrowUp' },
            { time: 1000, key: 'ArrowRight' },
            { time: 1133, key: 'ArrowDown' },
            { time: 1350, key: 'ArrowUp' },
            { time: 1516, key: 'ArrowRight' },
            { time: 1683, key: 'ArrowDown' },
            { time: 1800, key: 'ArrowUp' },
            { time: 2116, key: 'ArrowRight' },
            { time: 2250, key: 'ArrowDown' },
            { time: 2450, key: 'ArrowUp' },
            { time: 2616, key: 'ArrowDown' },
            { time: 2850, key: 'ArrowUp' },
            { time: 2966, key: 'ArrowDown' },
            { time: 3166, key: 'ArrowUp' },
            { time: 3366, key: 'ArrowRight' },
            { time: 3550, key: 'ArrowDown' },
            { time: 3733, key: 'ArrowUp' },
            { time: 3916, key: 'ArrowRight' },
            { time: 4083, key: 'ArrowDown' },
            { time: 4266, key: 'ArrowUp' },
            { time: 4466, key: 'ArrowRight' },
            { time: 4683, key: 'ArrowDown' },
            { time: 4783, key: 'ArrowUp' },
            { time: 4916, key: 'ArrowRight' },
            { time: 5200, key: 'ArrowLeft' },
            { time: 5383, key: 'ArrowLeft' },
            { time: 5550, key: 'ArrowLeft' },
            { time: 5766, key: 'ArrowLeft' },
            { time: 5983, key: 'ArrowDown' },
            { time: 6116, key: 'ArrowUp' },
            { time: 6283, key: 'ArrowRight' },
            { time: 7733, key: 'ArrowLeft' },
            { time: 8100, key: 'ArrowDown' },
            { time: 8266, key: 'ArrowUp' },
            { time: 8750, key: 'ArrowRight' },
            { time: 9366, key: 'ArrowDown' },
            { time: 9983, key: 'ArrowLeft' },
            { time: 10650, key: 'ArrowLeft' },
            { time: 11200, key: 'ArrowDown' },
            { time: 11816, key: 'ArrowRight' },
            { time: 12550, key: 'ArrowUp' },
            { time: 13316, key: 'ArrowLeft' },
            { time: 15850, key: 'ArrowUp' },
            { time: 17016, key: 'ArrowDown' },
            { time: 17783, key: 'ArrowLeft' },
            { time: 17993, key: 'ArrowDown' },
            { time: 18183, key: 'ArrowRight' },
            { time: 18316, key: 'ArrowUp' },
            { time: 19600, key: 'ArrowLeft' },
            { time: 19933, key: 'ArrowDown' },
            { time: 20100, key: 'ArrowUp' },
            { time: 20683, key: 'ArrowRight' },
            { time: 21233, key: 'ArrowDown' },
            { time: 21800, key: 'ArrowLeft' },
            { time: 22516, key: 'ArrowLeft' },
            { time: 23066, key: 'ArrowDown' },
            { time: 23683, key: 'ArrowRight' },
            { time: 24483, key: 'ArrowUp' },
            { time: 25166, key: 'ArrowLeft' },
            { time: 27683, key: 'ArrowDown' },
            { time: 28866, key: 'ArrowUp' },
            { time: 29650, key: 'ArrowLeft' },
            { time: 29816, key: 'ArrowDown' },
            { time: 30033, key: 'ArrowRight' },
            { time: 30150, key: 'ArrowUp' },
            { time: 31466, key: 'ArrowLeft' },
            { time: 31816, key: 'ArrowDown' },
            { time: 31983, key: 'ArrowUp' },
            { time: 32533, key: 'ArrowRight' },
            { time: 33100, key: 'ArrowDown' },
            { time: 33650, key: 'ArrowLeft' },
            { time: 34383, key: 'ArrowLeft' },
            { time: 34916, key: 'ArrowDown' },
            { time: 35550, key: 'ArrowRight' },
            { time: 36283, key: 'ArrowUp' },
            { time: 37033, key: 'ArrowLeft' },
            { time: 39550, key: 'ArrowUp' },
            { time: 40700, key: 'ArrowDown' },
            { time: 41500, key: 'ArrowLeft' },
            { time: 41650, key: 'ArrowDown' },
            { time: 41800, key: 'ArrowRight' },
            { time: 42016, key: 'ArrowUp' },
            { time: 43300, key: 'ArrowLeft' },
            { time: 43700, key: 'ArrowDown' },
            { time: 43816, key: 'ArrowUp' },
            { time: 44366, key: 'ArrowRight' },
            { time: 44966, key: 'ArrowDown' },
            { time: 45516, key: 'ArrowLeft' },
            { time: 46216, key: 'ArrowLeft' },
            { time: 46733, key: 'ArrowDown' },
            { time: 47366, key: 'ArrowRight' },
            { time: 48100, key: 'ArrowUp' },
            { time: 48816, key: 'ArrowLeft' },
            { time: 50366, key: 'ArrowDown' },
            { time: 51450, key: 'ArrowRight' },
            { time: 52700, key: 'ArrowUp' },
            { time: 53366, key: 'ArrowLeft' },
            { time: 53366, key: 'ArrowDown' },
            { time: 53516, key: 'ArrowDown' },
            { time: 53516, key: 'ArrowRight' },
            { time: 53667, key: 'ArrowRight' },
            { time: 53667, key: 'ArrowUp' },
            { time: 53866, key: 'ArrowUp' },
            { time: 53866, key: 'ArrowLeft' },
            { time: 55150, key: 'ArrowLeft' },
            { time: 55500, key: 'ArrowDown' },
            { time: 55666, key: 'ArrowUp' },
            { time: 56233, key: 'ArrowRight' },
            { time: 56733, key: 'ArrowDown' },
            { time: 57316, key: 'ArrowLeft' },
            { time: 58116, key: 'ArrowLeft' },
            { time: 58116, key: 'ArrowDown' },
            { time: 58650, key: 'ArrowRight' },
            { time: 58650, key: 'ArrowUp' },
            { time: 59266, key: 'ArrowUp' },
            { time: 59266, key: 'ArrowLeft' },
            { time: 60033, key: 'ArrowLeft' },
            { time: 60033, key: 'ArrowDown' },
            { time: 60700, key: 'ArrowDown' },
            { time: 60700, key: 'ArrowRight' },
            { time: 63266, key: 'ArrowLeft' },
            { time: 64416, key: 'ArrowLeft' },
            { time: 65183, key: 'ArrowRight' },
            { time: 65916, key: 'ArrowUp' },
            { time: 66650, key: 'ArrowLeft' },
            { time: 68083, key: 'ArrowDown' },
            { time: 68866, key: 'ArrowRight' },
            { time: 69667, key: 'ArrowLeft' },
            { time: 71083, key: 'ArrowUp' },
            { time: 71800, key: 'ArrowLeft' },
            { time: 72550, key: 'ArrowDown' },
            { time: 74050, key: 'ArrowRight' },
            { time: 74766, key: 'ArrowUp' },
            { time: 75516, key: 'ArrowLeft' },
            { time: 77016, key: 'ArrowLeft' },
            { time: 77733, key: 'ArrowDown' },
            { time: 78450, key: 'ArrowRight' },
            { time: 79966, key: 'ArrowRight' },
            { time: 80700, key: 'ArrowUp' },
            { time: 81400, key: 'ArrowLeft' },
            { time: 82916, key: 'ArrowDown' },
            { time: 83667, key: 'ArrowRight' },
            { time: 84450, key: 'ArrowLeft' },
            { time: 85933, key: 'ArrowLeft' },
            { time: 86266, key: 'ArrowLeft' },
            { time: 86700, key: 'ArrowLeft' },
            { time: 87016, key: 'ArrowLeft' },
            { time: 87383, key: 'ArrowUp' },
            { time: 88866, key: 'ArrowLeft' },
            { time: 88866, key: 'ArrowDown' },
            { time: 89066, key: 'ArrowDown' },
            { time: 89066, key: 'ArrowRight' },
            { time: 89233, key: 'ArrowRight' },
            { time: 89233, key: 'ArrowUp' },
            { time: 89433, key: 'ArrowUp' },
            { time: 89433, key: 'ArrowLeft' },
            { time: 90700, key: 'ArrowLeft' },
            { time: 91016, key: 'ArrowDown' },
            { time: 91200, key: 'ArrowRight' },
            { time: 91766, key: 'ArrowRight' },
            { time: 92350, key: 'ArrowUp' },
            { time: 92900, key: 'ArrowLeft' },
            { time: 93683, key: 'ArrowLeft' },
            { time: 93683, key: 'ArrowDown' },
            { time: 94216, key: 'ArrowDown' },
            { time: 94216, key: 'ArrowRight' },
            { time: 94816, key: 'ArrowRight' },
            { time: 94816, key: 'ArrowUp' },
            { time: 95533, key: 'ArrowUp' },
            { time: 95533, key: 'ArrowLeft' },
            { time: 96300, key: 'ArrowRight' },
            { time: 96300, key: 'ArrowLeft' },
            { time: 98783, key: 'ArrowUp' },
            { time: 99966, key: 'ArrowDown' },
            { time: 100766, key: 'ArrowLeft' },
            { time: 101466, key: 'ArrowDown' },
            { time: 102216, key: 'ArrowRight' },
            { time: 103683, key: 'ArrowUp' },
            { time: 104400, key: 'ArrowDown' },
            { time: 105133, key: 'ArrowLeft' },
            { time: 106650, key: 'ArrowRight' },
            { time: 107366, key: 'ArrowUp' },
            { time: 108116, key: 'ArrowDown' },
            { time: 109616, key: 'ArrowUp' },
            { time: 110383, key: 'ArrowDown' },
            { time: 110800, key: 'ArrowLeft' }
        ];
    }

    
    clearNotes();

    noteTimings.forEach(note => {
        console.log(`Creating note with key ${note.key} at time ${note.time}`);
        createNoteWithDelay(note.key, note.time);
    });

    animationId = requestAnimationFrame(moveNotes);
}

//funkce rozpoznava cas u tech sipek ktere jsem psal manualne
function createNoteWithDelay(key, time) {
    if (time <= 99999) {
        let timeout = setTimeout(() => createNoteOnHighTime(key), time);
        noteTimeouts.push(timeout);
    } else {
        const maxTimeout = 99999;
        const intervals = Math.floor(time / maxTimeout);
        const remainder = time % maxTimeout;
        let accumulatedTime = 0;

        for (let i = 0; i < intervals; i++) {
            accumulatedTime += maxTimeout;
            noteTimeouts.push(setTimeout(() => {}, accumulatedTime));
        }

        noteTimeouts.push(setTimeout(() => createNoteOnHighTime(key), accumulatedTime + remainder));
    }
}

//funkce vytvari noty (bez googlu bych byl ztraceny)
function createNoteOnHighTime(key) {
    const track = document.querySelector(`.track[data-key="${key}"]`);
    const note = document.createElement('img');
    note.src = `arrow-${key.toLowerCase().replace('arrow', '')}.png`;
    note.classList.add('note');
    note.setAttribute('data-key', key);
    note.style.top = '-80px';
    track.appendChild(note);
    notes.push(note);
}

//funkce pro pohyb sipek dolu
function moveNotes() {
    notes.forEach((note, index) => {
        let position = parseInt(note.style.top || -80);
        if (position >= 600) {
            note.remove();
            notes.splice(index, 1);
        } else {
            position += noteSpeed;
            note.style.top = `${position}px`;
        }
    });

    dinosaurDance();

    animationId = requestAnimationFrame(moveNotes);
}

//puvodne to mel byt dinosaurus co dole tanci ale nakonec to je kapybara ale tady toto jsem uz nemenil protoze bych musel menit hodne veci
function dinosaurDance() {
    const currentTime = music.currentTime;
    if (Math.floor(currentTime * 2) % 2 === 0) {
        dinosaur.style.transform = 'translateX(-50%) scaleX(1.2)';
    } else {
        dinosaur.style.transform = 'translateX(-50%) scaleX(-1.2)';
    }
}

//funkce ktera rozpozna jestli hrac spravne klikl na sipku
function checkHit(event) {
    const key = event.key;
    const track = document.querySelector(`.track[data-key="${key}"]`);
    if (track) {
        // animace sipek kdyz ji zmacknete
        track.querySelector('.perfect-arrow').classList.add('pulse');
        setTimeout(() => {
            track.querySelector('.perfect-arrow').classList.remove('pulse');
        }, 300);
    }
    notes.forEach((note, index) => {
        const noteKey = note.getAttribute('data-key');
        const notePosition = parseInt(note.style.top);
        if (key === noteKey && notePosition > 485 && notePosition < 565) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            note.remove();
            notes.splice(index, 1);
            const instance = scoreSound.cloneNode(true);
            scoreSoundInstances.push(instance);
            instance.play();
            //toto dela aby se zvuk ktery hraje pri kliknuti sipky hral vicekrat kdyz jich je u sebe vic
            scoreSoundInstances = scoreSoundInstances.filter(instance => !instance.ended);
        }
    });
}

//tajne veci
let typedChars = '';
const eggContainers = document.querySelectorAll('.egg-container');
const eggAudios = document.querySelectorAll('audio');

const easterEggs = ['fawk', 'freakybob', 'goat'];

document.addEventListener('keydown', function(event) {
    const keyPressed = event.key.toLowerCase();
    
    typedChars += keyPressed;

    easterEggs.forEach(easterEgg => {
        if (typedChars.endsWith(easterEgg)) {
            activateEasterEgg(easterEgg);
            typedChars = '';
        }
    });

    if (event.key === 'Escape') {
        hideEasterEggs();
        pauseEggAudios();
    }
});

function activateEasterEgg(eggName) {
    const eggContainer = document.getElementById(eggName + '-egg');
    const eggAudio = document.getElementById(eggName + '-audio');

    eggContainer.style.animation = 'slideDown 5s forwards';
    eggAudio.play();

    eggAudio.onended = function() {
        eggContainer.style.animation = 'slideUp 0.5s forwards';
    };
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const eggContainers = document.querySelectorAll('.egg-container');
        eggContainers.forEach(function(container) {
            container.style.animation = 'slideUp 0.5s forwards';
        });
    }
});

function hideEasterEggs() {
    eggContainers.forEach(container => {
        container.style.top = '-100%';
    });
}

function pauseEggAudios() {
    eggAudios.forEach(audio => {
        audio.pause();
    });
}

//funkce ktera ukaze nahore vpravo jak se dostat z levelu do menu
function showExitIndicator() {
    const exitIndicator = document.getElementById('exit-indicator');
    exitIndicator.classList.remove('hidden');
}

// funkce ktera nahore vpravo schova text press escape to go to the menu kdyz zmacknete escape
function hideExitIndicator() {
    const exitIndicator = document.getElementById('exit-indicator');
    exitIndicator.classList.add('hidden');
}

//funkce schova text dole vlevo kde je napsany tvurce (ja) kdyz zapnete level
function hideMadeBy() {
    const madeBy = document.getElementById('made-by');
    madeBy.classList.add('hidden');
}

//rozpoznavaji jestli hrac zmackl escape a pokud ano tak ho to posle do menu
document.addEventListener('keydown', checkHit);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        showMenu();
    } else {
        checkHit(event);
    }
});