const body = document.body;


function addConsole() {
    const indexConsoleDiv = document.querySelector(`#index-console`);
    const homeConsoleDiv = document.querySelector(`#home-console`);
    let directory = "./home.html";
    let consoleText = ".."

    if (homeConsoleDiv != null) {
        directory = "../index.html";
    } else if (indexConsoleDiv != null) {
        directory = "pages/home.html";
        consoleText = "home.html";
    }

    body.innerHTML += 
    `<div class="console">
        <a href="${directory}">
            <span class="user">root@ruchir:~$</span> <span class="command">code ${consoleText}</span>
        </a>
    </div>`;
}



function consoleBlinker() {
    const blinkerIntervalMilliseconds = 500;

    const blinker = `<span class="blinker">|</span>`;
    const originalConsoleInnerHTML = document.querySelector(`.console .command`).innerHTML;
    
    let blinkerActive = false;
    
    setInterval(() => {
        const currentConsole = document.querySelector(`.console .command`);

        if (!blinkerActive) {
            currentConsole.innerHTML += blinker;
            blinkerActive = true;
        } else {
            currentConsole.innerHTML = originalConsoleInnerHTML;
            blinkerActive = false;
        }

    }, blinkerIntervalMilliseconds);
}


function lineOfText() {
    const characterList = `@#$%^&*()_+-=[{}]'";:.?`;
    
    let currentLine = document.createElement("p");

    for (let i = 0; i < Math.floor( 40 + Math.random() * 40 ); i++) {
        let randomCharacter = characterList[Math.floor( Math.random() * characterList.length )];
        currentLine.innerHTML += randomCharacter;
    }

    return currentLine;
}


function recursiveGeneration(count, max, linesResolve) {
    const textTimeoutMilliseconds = 100;
    
    if (count > max) {linesResolve(); return}

    setTimeout(() => {
        wallDiv.appendChild(lineOfText());
        recursiveGeneration(count + 1, max, linesResolve);
    }, textTimeoutMilliseconds);
}


async function wallOfText(wallResolve) {

    body.innerHTML += `<div class="wall-of-text"></div>`;
    const wallDiv = document.querySelector(`.wall-of-text`);

    let lines = [
        10,
        "Hack into Ruchir's system",
        5,
        "Scroll down",
        5,
        "Click on the command in the terminal at the bottom",
        10
    ]

    for (let line of lines) {

        if (typeof line === "number") {
            await new Promise(linesResolve => recursiveGeneration(0, line, linesResolve));
        } else {
            let currentLine = document.createElement("p");
            currentLine.classList.add("important-line");
            currentLine.innerHTML = line;
            wallDiv.appendChild(currentLine);
        }

    }

    wallResolve();

}


function typeWriter() {

}


async function main() {
    const delay = 1000

    const indexConsoleDiv = document.querySelector(`#index-console`);
    const saveContents = body.innerHTML;

    if (indexConsoleDiv) {
        body.innerHTML = ``;
    
        await new Promise(delayResolve => setTimeout(() => delayResolve(), delay))
        await new Promise(wallResolve => wallOfText(wallResolve));
        body.innerHTML += saveContents;
    }

    addConsole();
    consoleBlinker();
}

main();