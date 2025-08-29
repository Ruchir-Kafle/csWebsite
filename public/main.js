const body = document.body;

function addConsole() {
    const homeConsoleDiv = document.querySelector(`.home-console`);
    const indexConsoleDiv = document.querySelector(`.index-console`);
    let directory = "./home.html";
    let consoleText = "cd .."

    if (homeConsoleDiv != null) {
        directory = "../index.html";
    } else if (indexConsoleDiv != null) {
        directory = "pages/home.html";
        consoleText = "cd home.html";
    }


    body.innerHTML += 
    `<div class="console">
        <a href="${directory}">
            $ <span class="command">${consoleText}</span>
        </a>
    </div>`;
}

addConsole();