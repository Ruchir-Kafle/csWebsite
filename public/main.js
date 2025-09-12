const body = document.body;


async function addConsole(consoleResolve) {
    const delayPerLetter = 100;

    const indexConsoleDiv = document.querySelector(`#index-console`);
    const homeConsoleDiv = document.querySelector(`#home-console`);
    let directory = "./home.html";
    let consoleText = "..";
    let command = "cd ";

    if (homeConsoleDiv != null) {
        directory = "../index.html";

        body.removeChild(homeConsoleDiv);
    } else if (indexConsoleDiv != null) {
        directory = "pages/home.html";
        consoleText = "./home/";

        body.removeChild(indexConsoleDiv);
    }

    body.innerHTML += 
    `<div class="console">
        <a href="${directory}">
            <span class="user">root@ruchir:~$</span> <span class="command"></span>
        </a>
    </div>`;


    consoleCommands = document.querySelectorAll(`.command`);
    consoleCommand = consoleCommands.item(consoleCommands.length - 1);
    if (consoleCommand)
        await new Promise (typeWriterResolve => typeWriter(consoleCommand, command + consoleText, delayPerLetter, typeWriterResolve));

        consoleResolve();

}


function typeWriter(element, text, delayPerLetter, typeWriterResolve) {    
    staggeredGenerator(0, text.length, delayPerLetter, (count) => {
        element.innerHTML += text[count]; 
    }, typeWriterResolve);
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


function staggeredGenerator(count, max, textTimeoutMilliseconds, action, resolve=null) {
    
    if (count >= max) {
        if (resolve) resolve();
        return;
    }

    setTimeout(() => {
        action(count);
        staggeredGenerator(count + 1, max, textTimeoutMilliseconds, action, resolve);
    }, textTimeoutMilliseconds);

}


async function wallOfText(wallResolve) {
    const delayPerLine = 50;

    body.innerHTML += `<div class="wall-of-text"></div>`;
    const wallDiv = document.querySelector(`.wall-of-text`);

    let lines = [
        5,
        "Hack into Ruchir's system",
        5,
        "Go to bottom of page",
        6,
        "Click on the command in the terminal at the bottom",
        7
    ]

    for (let line of lines) {

        if (typeof line === "number") {
            await new Promise(linesResolve => staggeredGenerator(0, line, delayPerLine, (count) => {
                wallDiv.appendChild(lineOfText())
            }, linesResolve));
        } else {
            let currentLine = document.createElement("p");
            currentLine.classList.add("important-line");
            currentLine.innerHTML = line;
            wallDiv.appendChild(currentLine);
        }

    }

    wallResolve();

}


function topConsole() {
    const console = 
    `<p>
        <span class="user">root@ruchir:~$</span> <span class="command">cat </span>
    </p>`;
}


async function main() {
    const delay = 1000

    let indexConsoleDiv = document.querySelector(`#index-console`);
    
    if (indexConsoleDiv) {
        let saveContents = body.innerHTML;
        body.innerHTML = ``;
        
        await new Promise(delayResolve => setTimeout(() => delayResolve(), delay))
        await new Promise(wallResolve => wallOfText(wallResolve));
        body.innerHTML += saveContents;
    } else {
        if (body.children.length <= 2 && !document.querySelector(`#home-console`))
           body.innerHTML += `<div class="no-contents-error"><p>404: FILE NOT FOUND.</p> <p>Please try again when Ruchir has made this file.</p></div>`;

        const navBar = document.createElement("div");
        navBar.classList.add("navigation");
    
        navBar.innerHTML =
        `
        <p>
            <span class="user">root@ruchir:~$</span> <span class="command">ls</span>
        </p>
        <nav class="navigation-bar">
            <li><span>├────</span><a href="./about.html">about.html</a></li>
            <li><span>├────</span><a href="./cs.html">cs.html</a></li>
            <li><span>├────</span><a href="./stemOne.html">stem_one.html</a></li>
            <li><span>├────</span><a href="./stemTwo.html">stem_two.html</a></li>
            <li><span>├────</span><a href="./physics.html">physics.html</a></li>
            <li><span>├────</span><a href="./spanish.html">spanish.html</a></li>
            <li><span>├────</span><a href="./math.html">math.html</a></li>
            <li><span>└────</span><a href="./humanities.html">humanities.html</a></li>
        </nav>
        `;
    
        body.prepend(navBar);
    }


    await new Promise(consoleResolve => addConsole(consoleResolve));
    consoleBlinker();
}

main();