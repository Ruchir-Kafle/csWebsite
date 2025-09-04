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
    let characterList = `@#$%^&*()_+-=[{}]'";:.?`;
    
    let currentLine = `<p>`;

    for (let i = 0; i < Math.floor( 40 + Math.random() * 40 ); i++) {
        let randomCharacter = characterList[Math.floor( Math.random() * characterList.length )];
        currentLine += randomCharacter;
    }

    currentLine += `</p>`;
    return currentLine;
}

function wallOfText() {
    const saveContents = body.innerHTML;
    let wall = `<section class="wall-of-text">`;

    for (let i = 0; i < 50; i++) {
        wall += lineOfText();
    }

    wall += `</section>`;
    body.innerHTML += wall;

}

function consoleBlinker() {
    const blinker = `<span class="blinker">|</span>`;
    const blinkerIntervalMilliseconds = 500;
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

addConsole();
wallOfText();
consoleBlinker();