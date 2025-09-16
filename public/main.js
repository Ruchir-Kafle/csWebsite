async function addConsole(body, consoleResolve) {
    const delayPerLetter = 100;

    let directory = "../index.html";
    let consoleText = "..";
    let command = "cd ";

    if (document.title == "ruchir_kafle's_website") {
        directory = "pages/home.html";
        consoleText = "./home/";
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


async function wallOfText(main, wallResolve) {
    const delayPerLine = 50;

    main.innerHTML += `<div class="wall-of-text"></div>`;
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


function topConsole(navigationNode, file) {
    const console = document.createElement("p");
    console.classList.add("top-console");
    console.innerHTML = `<span class="user">root@ruchir:~$</span> <span class="command">cat ${file} </span>`;
    
    navigationNode.insertAdjacentElement("afterend", console);
}


async function start(main, body) {
    const delay = 1000;

    if (document.title == "ruchir_kafle's_website") {
        await new Promise(delayResolve => setTimeout(() => delayResolve(), delay))
        await new Promise(wallResolve => wallOfText(main, wallResolve));
    } else {
        if (main.children.length <= 1 && document.title != "terminal")
           main.innerHTML += `<div class="no-contents-error"><p>404: FILE NOT FOUND.</p> <p>Please try again when Ruchir has made this file.</p></div>`;

        let navBar = document.createElement("div");
        navBar.classList.add("navigation");
    
        navBar.innerHTML =
        `
        <p>
            <span class="user">root@ruchir:~$</span> <span class="command">ls</span>
        </p>
        <nav class="navigation-bar">
            <li><span>├────</span><a href="./about.html">about.html</a> <- link</li>
            <li><span>├────</span><a href="./cs.html">cs.html</a></li>
            <li><span>├────</span><a href="./stemOne.html">stem_one.html</a></li>
            <li><span>├────</span><a href="./stemTwo.html">stem_two.html</a></li>
            <li><span>├────</span><a href="./physics.html">physics.html</a></li>
            <li><span>├────</span><a href="./spanish.html">spanish.html</a></li>
            <li><span>├────</span><a href="./math.html">math.html</a></li>
            <li><span>└────</span><a href="./humanities.html">humanities.html</a></li>
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
