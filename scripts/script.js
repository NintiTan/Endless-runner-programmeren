console.log("Script running...")

// variabelen

let spelerPositieX = 10
let spelerPositieY = 43
const speler = document.querySelector("img")
const obstakelContainer = document.querySelector(".obstakels")
let obstakels = [];
const banen = ['23%', '43%', '63%'];
let gameover = false
const scoreGameOver = document.querySelector("h2")
const schermGameOver = document.querySelector(".gameover")
const spelScherm =  document.querySelector(".spel")
const scoreTeller = document.querySelector("h1");
let score = 0;
const herlaadKnop = document.querySelector(".probeeropnieuw")
const achtergrondMuziek =  document.querySelector(".achtergrondmuziek")
const muziekKnop = document.querySelector(".muziekknop")
let speeltMuziek = false

// functies

// Update de positie van de speler op het scherm
function updateSpelerPositie() {
    speler.style.left = spelerPositieX + "%"
    speler.style.bottom = spelerPositieY + "%"
}

// Pas de positie van de speler aan afhankelijk van of er op W of S wordt gedrukt
function veranderSpelerPositie(event) {
    if(event.key == "w") { // https://www.toptal.com/developers/keycode/table
        if(spelerPositieY < 63){
            spelerPositieY += 20
            console.log("speler beweegt omhoog!")
        }
    } else if(event.key == "s") {
        if(spelerPositieY > 23){
            spelerPositieY -= 20
            console.log("speler beweegt omlaag!")
        }
    }

    updateSpelerPositie();
}

// Maak een obstakel aan op een willekeurige baan
function maakObstakel() {
    let baanEen, baanTwee;
    do {
        baanEen = Math.floor(Math.random() * banen.length);
        baanTwee = Math.floor(Math.random() * banen.length);
    } while (baanEen === baanTwee);
    console.log("Obstakel aangemaakt")

    const maakObstakel = (baan) => {
        const obstakel = document.createElement('img');
        obstakel.src = 'images/obstakel.png'; 
        obstakel.style.position = 'absolute';
        obstakel.style.left = '100%';
        obstakel.style.bottom = banen[baan];
        obstakelContainer.appendChild(obstakel);
        obstakels.push(obstakel);

        const beweegInterval = setInterval(() => {
            const huidigePositie = parseInt(obstakel.style.left);
            if (huidigePositie <= 0) {
                clearInterval(beweegInterval);
                obstakelContainer.removeChild(obstakel);
            } else {
                obstakel.style.left = (huidigePositie - 1) + '%';
            }
        }, 20);
    };

    maakObstakel(baanEen);
    maakObstakel(baanTwee);

} 

// Genereer obstakels elke 1000ms
function genereerObstakels() {
    setInterval(() => {
        maakObstakel();
    }, 1000)
} 

// Update de positie van de hitbox van de speler en obstakels en check of ze elkaar raken
function updateHitboxPositie() {
    const spelerHitbox = speler.getBoundingClientRect(); // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

    obstakels.forEach(obstakel => {
        const obstakelHitbox = obstakel.getBoundingClientRect();
        if (spelerHitbox.right >= obstakelHitbox.left && spelerHitbox.top == obstakelHitbox.top) {
            console.log("obstakel geraakt")
            gameover = true
            stopScoreInterval();
            schermGameOver.style.opacity = 100;
            scoreGameOver.textContent = "Score: " + score;
            spelScherm.style.opacity = 0;

        }
    });
}

// Update de positie van de hitbox van de speler en obstakels elke 100ms
setInterval(() => {
    updateHitboxPositie();
}, 100)

// Verhoog score met 1 en update de scoreteller
function verhoogScore() {
    score += 1; 
    updateScore(); 
}

// Update de scoreteller
function updateScore() {
    scoreTeller.textContent = "Score: " + score;
}

// Start de score interval
function startScoreInterval() {
    scoreInterval = setInterval(verhoogScore, 500);
}

// Stop de score interval
function stopScoreInterval() {
    clearInterval(scoreInterval);
}

// herlaad de pagina
function herlaadPagina() {
    location.reload()
}

function speelMuziek() {
    achtergrondMuziek.play();
    console.log("Muziek speelt")
    muziekKnop.textContent = "Stop muziek"
    speeltMuziek = true
}

function stopMuziek() {
    achtergrondMuziek.pause();
    console.log("Muziek stopt")
    muziekKnop.textContent = "Start muziek"
    speeltMuziek = false
}

function muziekAanUit() {
    if (speeltMuziek === false) {
        speelMuziek();
    } else if (speeltMuziek === true) {
        stopMuziek();
    }
}


genereerObstakels();

startScoreInterval();

// event listeners

herlaadKnop.addEventListener('click', herlaadPagina)

document.addEventListener('keydown', veranderSpelerPositie)

muziekKnop.addEventListener('click', muziekAanUit)












