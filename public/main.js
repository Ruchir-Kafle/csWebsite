const body = document.body;

function addConsole() {
    const homeConsoleDiv = document.querySelector(`#home-console`);
    const indexConsoleDiv = document.querySelector(`#index-console`);
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

function lineOfText() {
    const characterList = `@#$%^&*()_+-=[{}]'";:.?`;
    
    let currentLine = document.createElement("p");

    for (let i = 0; i < Math.floor( 40 + Math.random() * 40 ); i++) {
        let randomCharacter = characterList[Math.floor( Math.random() * characterList.length )];
        currentLine.innerHTML += randomCharacter;
    }

    return currentLine;
}

function wallOfText() {
    const textTimeoutMilliseconds = 100;
    const linesOfText = 50;

    body.innerHTML += `<div class="wall-of-text"></div>`;
    const wallDiv = document.querySelector(`.wall-of-text`);

    let count = 0;

    function generateLines(count) {
        if (count > 49) return

        setTimeout(() => {
            wallDiv.appendChild(lineOfText());
            generateLines(count + 1);
        }, textTimeoutMilliseconds);
    }

    generateLines(count);
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

function main() {
    const saveContents = body.innerHTML;
    body.innerHTML = ``;

    setTimeout(wallOfText, 1000);

    setTimeout(() => {
        body.innerHTML = saveContents;

        addConsole();
        consoleBlinker();
    }, 5000)
}

main();