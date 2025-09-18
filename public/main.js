const delayPerLetter = 100;

const blinkerIntervalMilliseconds = 500;

const characterList = `@#$%^&*()_+-=[{}]'";:.?`;
const defaultCharactersPerLine = 40;
const potentialCharactersPerLine = 40;

const arrowCount = 50;
const delayPerLine = 50;

const terminalArrowCount = arrowCount * 1.5;

const directoryPointer = `<--- current file`;

const delayBeforeStart = 1000;


async function addConsole(body, consoleResolve) {
    let directory = "../index.html";
    let consoleText = "out";
    let command = "sign ";

    if (document.title == "ruchir_kafle's_website") {
        command = "enter ";
        directory = "pages/terminal.html";
        consoleText = "ruchir's_system";
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
    let currentLine = document.createElement("p");

    for (let i = 0; i < Math.floor( defaultCharactersPerLine + Math.random() * potentialCharactersPerLine ); i++) {
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


async function wallOfText(main, wallResolve) {
    main.innerHTML += `<div class="wall-of-text"></div>`;
    const wallDiv = document.querySelector(`.wall-of-text`);

    let lines = [
        5,
        "Hack into Ruchir's system,",
        5,
        "Go to bottom of page,",
        6,
        "Click on the yellow text.",
        7
    ]

    for (let line of lines) {

        if (typeof line === "number") {
            await new Promise(linesResolve => staggeredGenerator(0, line, delayPerLine, (count) => {
                wallDiv.appendChild(lineOfText())
            }, linesResolve));
        } else {
            const fillerLinesCount = 1;
            
            let currentLine = document.createElement("div");
            currentLine.classList.add("important-line");

            for (let i = 0; i < fillerLinesCount * 2 + 1; i++) {
                let save;
                if (i < fillerLinesCount) save = `<p>` + `v`.repeat(arrowCount) + `</p>`;
                else if (i == fillerLinesCount) save = `<p>${line}</p>`;
                else if (i > fillerLinesCount) save = `<p>` + `^`.repeat(arrowCount) + `</p>`;

                currentLine.innerHTML += save;
            }

            wallDiv.appendChild(currentLine);
        }

    }

    wallResolve();

}


function topConsole(navigationNode, file) {
    const console = document.createElement("p");
    console.classList.add("top-console");
    console.innerHTML = `<span class="user">root@ruchir:~$</span> <span class="command">read ${file} </span>`;
    
    navigationNode.insertAdjacentElement("afterend", console);
}


function preProcessing(main) {

    if (main.children.length <= 1 && document.title != "terminal")
           main.innerHTML += `<div class="no-contents-error"><p>404: FILE NOT FOUND.</p> <p>Please try again when Ruchir has put content in this file.</p></div>`;

    if (document.title == "terminal")
        main.innerHTML += `
        <div class="important-line">
            ${`<p>` + `v`.repeat(terminalArrowCount) + `</p>`}
            <p>Select a file to view (in <span class="green">green</span>) from the navigation bar above.</p>
            ${`<p>` + `^`.repeat(terminalArrowCount) + `</p>`}
        </div>
        `;
}


async function start(main, body) {
    if (document.title == "ruchir_kafle's_website") {
        await new Promise(delayResolve => setTimeout(() => delayResolve(), delayBeforeStart))
        await new Promise(wallResolve => wallOfText(main, wallResolve));
    } else {
        preProcessing(main);

        let navBar = document.createElement("div");
        navBar.classList.add("navigation");
    
        navBar.innerHTML =
        `
        <p>
            <span class="user">root@ruchir:~$</span> <span class="command">show files</span>
        </p>
        <nav class="navigation-bar">
            <li><span>├────</span><a href="./terminal.html">terminal</a> ${"terminal" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./about.html">about.html</a> ${"about.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./cs.html">cs.html</a> ${"cs.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./stemOne.html">stem_one.html</a> ${"stem_one.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./stemTwo.html">stem_two.html</a> ${"stem_two.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./physics.html">physics.html</a> ${"physics.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./spanish.html">spanish.html</a> ${"spanish.html" == document.title ? directoryPointer : ""}</li>
            <li><span>├────</span><a href="./math.html">math.html</a> ${"math.html" == document.title ? directoryPointer : ""}</li>
            <li><span>└────</span><a href="./humanities.html">humanities.html</a> ${"humanities.html" == document.title ? directoryPointer : ""}</li>
        </nav>
        `;
    
        main.prepend(navBar);

        navBar = document.querySelector(".navigation");
        if (navBar && document.title != "terminal") {
            topConsole(navBar, document.title);
        }

    }

    await new Promise(consoleResolve => addConsole(body, consoleResolve));
    consoleBlinker();
}


// Event Listener

document.addEventListener("DOMContentLoaded", function() {
    const body = document.body
    const main = document.querySelector("main");

    start(main, body);
})
