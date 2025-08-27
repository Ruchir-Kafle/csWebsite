const body = document.body;

function addConsole() {
    body.innerHTML += 
    `<div class="console">
        <a href="./home.html">
            $ <span class="command">cd ..</span>
        </a>
    </div>`;
}

addConsole();