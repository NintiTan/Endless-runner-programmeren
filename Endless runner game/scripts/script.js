console.log("Script running...")


// speler:

let spelerPositieX = 10
let spelerPositieY = 43
let speler = document.querySelector("img")

function updateSpelerPositie() {
    speler.style.left = spelerPositieX + "%"
    speler.style.bottom = spelerPositieY + "%"
}

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

document.addEventListener('keydown', veranderSpelerPositie);


// obstakels

obstakelContainer = document.querySelector(".obstakels")
let obstakels = [];
const banen = ['23%', '43%', '63%'];

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

function genereerObstakels() {
    setInterval(() => {
        maakObstakel();
    }, 1000)
} 

genereerObstakels();


// collision + game over

let gameover = false
let scoreGameOver = document.querySelector("h2")
let schermGameOver = document.querySelector(".gameover")
let spelScherm =  document.querySelector(".spel")

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

setInterval(() => {
    updateHitboxPositie();
}, 100)


// Score teller

let scoreTeller = document.querySelector("h1");
let score = 0;

function verhoogScore() {
    score += 1; 
    updateScore(); 
}

function updateScore() {
    scoreTeller.textContent = "Score: " + score;
}
function startScoreInterval() {
    scoreInterval = setInterval(verhoogScore, 500);
}

function stopScoreInterval() {
    clearInterval(scoreInterval);
}

startScoreInterval();


// opnieuw spelen

const herlaadKnop = document.querySelector("button")

function herlaadPagina() {
    location.reload()
}

herlaadKnop.addEventListener('click', herlaadPagina)












