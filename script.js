let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".new-game");
let restartBtn = document.querySelector(".restart");
let msgRef = document.querySelector(".message");

let winningpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let xturn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
        popupRef.classList.remove("hide");
        newgameBtn.disabled=false;
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
        popupRef.classList.add("hide");
    msgRef.innerHTML = "";
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    xturn = true;
    enableButtons();
});

const winFunction = (letter) => {
    msgRef.innerHTML = `🎉 <br> '${letter}' wins`;
    disableButtons();
};

const drawFunction = () => {
    msgRef.innerHTML = `😎 <br> It's a draw`;
    disableButtons();
};

const winChecker = () => {
    for (let pattern of winningpattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText
        ];
        if (element1 && element1 === element2 && element2 === element3) {
            winFunction(element1);
            return true;
        }
    }
    return false;
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        element.innerText = xturn ? "X" : "O";
        xturn = !xturn;
        element.disabled = true;
        count++;
        
        if (winChecker()) return;
        if (count === 9) drawFunction();
    });
});

window.onload = enableButtons;
restartBtn.addEventListener("click", () => {
    count = 0;
    xturn = true;
    enableButtons();
});

