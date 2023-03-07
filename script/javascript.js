let start = document.querySelector(".start");
let game_contaienr = document.querySelector(".game-container");
let cover = document.getElementById("cover");
let choise = document.getElementById("choise");
let options = document.querySelectorAll(".option")


start.addEventListener("click", () => {
    game_contaienr.classList.remove("blur-background");
    cover.classList.remove("cover");
    start.style.display = "none";
    choise.style.display = "block";
    select_operation();
})
// ========================== start game ========================/
let operator = null;
let random_values = {
    firstRandomValue: 0,
    secondRandomValue: 0,
}

let operation_buttons = document.querySelectorAll(".operator-part")

function select_operation() {
    operation_buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            timing();
            operator = e.target.innerHTML;
            let operatorEl = document.getElementById("operator").innerHTML = operator;
            getRandomValues();
            start_game();
            SaveHeightScore();

            operation_buttons.forEach((btn) => {
                btn.classList.remove("hover-effect");
                btn.setAttribute("disabled", "disabled");
            })

            options.forEach(option => {
                option.removeAttribute("disabled", "disabled");
                option.classList.add("hover-effect");
            })
        })
    })
}



// ========================= start game =================================

let firstValueEl = document.querySelector(".first-value");
let secondValueEl = document.querySelector(".second-value");


let correctAnswer = null;
let optionsValues = {};


function start_game() {
    choise.style.display = "none";
    random_values = getRandomValues();

    let optionEl1 = document.querySelector(".option-1");
    let optionEl2 = document.querySelector(".option-2");
    let optionEl3 = document.querySelector(".option-3");
    let optionEl4 = document.querySelector(".option-4");

    if (operator == "X") {
        correctAnswer = random_values.RandomMultiplicationValue.firstValue * random_values.RandomMultiplicationValue.secondValue;

        firstValueEl.innerHTML = random_values.RandomMultiplicationValue.firstValue;
        secondValueEl.innerHTML = random_values.RandomMultiplicationValue.secondValue;

        getrandomMultiplicationValues();
        optionEl1.innerHTML = optionsValues.value1;
        optionEl2.innerHTML = optionsValues.value2;
        optionEl3.innerHTML = optionsValues.value3;
        optionEl4.innerHTML = optionsValues.value4;

    } else if (operator == "/") {
        correctAnswer = random_values.RandomDivisionValue.firstValue / random_values.RandomDivisionValue.secondValue;

        firstValueEl.innerHTML = random_values.RandomDivisionValue.firstValue;
        secondValueEl.innerHTML = random_values.RandomDivisionValue.secondValue;

        if (!Number.isInteger(correctAnswer)) {
            correctAnswer = correctAnswer.toFixed(1)
        }
        getrandomDivisionValues();

        let v1 = parseInt(optionsValues.value1);
        let v2 = parseInt(optionsValues.value2);
        let v3 = parseInt(optionsValues.value3);
        let v4 = parseInt(optionsValues.value4);

        if (!Number.isInteger(v1)) {
            v1 = v1.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v2 = v2.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v3 = v3.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v4 = v4.toFixed(1)
        }
        optionEl1.innerHTML = v1;
        optionEl2.innerHTML = v2;
        optionEl3.innerHTML = v3;
        optionEl4.innerHTML = v4;

    } else if (operator == "+") {
        correctAnswer = random_values.RandomAddtionValue.firstValue + random_values.RandomAddtionValue.secondValue;

        firstValueEl.innerHTML = random_values.RandomAddtionValue.firstValue;
        secondValueEl.innerHTML = random_values.RandomAddtionValue.secondValue;

        getrandomAdditionValues()

        optionEl1.innerHTML = optionsValues.value1;
        optionEl2.innerHTML = optionsValues.value2;
        optionEl3.innerHTML = optionsValues.value3;
        optionEl4.innerHTML = optionsValues.value4;

    } else if (operator == "-") {
        correctAnswer = random_values.RandomSubtractionValue.firstValue - random_values.RandomSubtractionValue.secondValue;

        firstValueEl.innerHTML = random_values.RandomSubtractionValue.firstValue;
        secondValueEl.innerHTML = random_values.RandomSubtractionValue.secondValue;

        getrandomSubtractionValues();

        optionEl1.innerHTML = optionsValues.value1;
        optionEl2.innerHTML = optionsValues.value2;
        optionEl3.innerHTML = optionsValues.value3;
        optionEl4.innerHTML = optionsValues.value4;

    } else if (operator == "%") {

        firstValueEl.innerHTML = random_values.RandomPercentageValue.firstValue;
        secondValueEl.innerHTML = random_values.RandomPercentageValue.secondValue;

        correctAnswer = parseInt(random_values.RandomPercentageValue.firstValue) * ((parseInt(random_values.RandomPercentageValue.secondValue) / 100));

        if (!Number.isInteger(correctAnswer)) {
            correctAnswer = correctAnswer.toFixed(0)
        }
        getrandomPercentageValues();

        let v1 = parseInt(optionsValues.value1);
        let v2 = parseInt(optionsValues.value2);
        let v3 = parseInt(optionsValues.value3);
        let v4 = parseInt(optionsValues.value4);

        if (!Number.isInteger(v1)) {
            v1 = v1.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v2 = v2.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v3 = v3.toFixed(1)
        } else if (!Number.isInteger(v1)) {
            v4 = v4.toFixed(1)
        }
        optionEl1.innerHTML = v1;
        optionEl2.innerHTML = v2;
        optionEl3.innerHTML = v3;
        optionEl4.innerHTML = v4;


    }

    let correctOption = document.querySelector(`.option-${random_values.selectOption}`).innerHTML = correctAnswer;
}

checkOptions();
//=================================== check game over =====================================
let height_scoreEl = document.getElementById("height-score");
let hscore = JSON.parse(localStorage.getItem("height-score"));
let height_score = 0;


height_score = hscore;
height_scoreEl.innerHTML = "Height Score : " + height_score;


let score = 0;
let scoreEl = document.getElementById("score");
let wrongEl = document.querySelector(".wrong");
let correctEl = document.querySelector(".correct");


let timer = 10;

function timing() {
    setInterval(function () {
        if (timer == 0) {
            wrongEl.classList.add("celebration");


            score--;
            scoreEl.innerHTML = "Score :" + score;
            timer = 10;
            start_game();
        }
        if (wrongEl.classList.contains("celebration") || correctEl.classList.contains("celebration")) {
            setTimeout(() => {
                wrongEl.classList.remove("celebration");
                correctEl.classList.remove("celebration");
            }, 1000)

        }
        timer--;
        let timerEl = document.getElementById("timer").innerHTML = "Timer : 0" + timer;

    }, 1000)
}

function checkOptions() {
    options.forEach(option => {
        option.addEventListener("click", e => {

            if (timer > 1 && e.target.innerHTML == correctAnswer) {
                score++;
                correctEl.classList.add("celebration");

            } else {
                score--;
                wrongEl.classList.add("celebration");
            }
            if (score > height_score) {
                height_score = score;
                SaveHeightScore();
            }
            height_scoreEl.innerHTML = "Height Score : " + height_score;
            timer = 10;
            scoreEl.innerHTML = "Score :" + score;
            start_game();

        })
    })
}

function SaveHeightScore() {
    localStorage.setItem("height-score", JSON.stringify(height_score));
}




// ========================================= randoms ==============================================


function getRandomValues() {
    random_values = {
        RandomAddtionValue: {
            firstValue: Math.floor(Math.random() * 100),
            secondValue: Math.floor(Math.random() * 100),
        },
        RandomSubtractionValue: {
            firstValue: Math.floor(Math.random() * 100),
            secondValue: Math.floor(Math.random() * 50),
        },
        RandomDivisionValue: {
            firstValue: Math.floor(Math.random() * 100),
            secondValue: Math.floor(Math.random() * 33),
        },
        RandomMultiplicationValue: {
            firstValue: Math.floor(Math.random() * 20),
            secondValue: Math.floor(Math.random() * 10),
        },
        RandomPercentageValue: {
            firstValue: Math.floor(Math.random() * 100),
            secondValue: Math.floor(Math.random() * 1000),
        },
        selectOption: Math.ceil(Math.random() * 4),
    }
    return random_values;
}



function getrandomAdditionValues() {

    let randomOptionValue1 = Math.ceil(Math.random() * 100) + Math.ceil(Math.random() * 100);
    let randomOptionValue2 = Math.ceil(Math.random() * 100) + Math.ceil(Math.random() * 100);
    let randomOptionValue3 = Math.ceil(Math.random() * 100) + Math.ceil(Math.random() * 100);
    let randomOptionValue4 = Math.ceil(Math.random() * 100) + Math.ceil(Math.random() * 100);

    optionsValues = {
        value1: randomOptionValue1,
        value2: randomOptionValue2,
        value3: randomOptionValue3,
        value4: randomOptionValue4,
    }
    return optionsValues;
}


function getrandomDivisionValues() {

    let randomOptionValue1 = Math.ceil(Math.random() * 1000) / Math.ceil(Math.random() * 100);
    let randomOptionValue2 = Math.ceil(Math.random() * 1000) / Math.ceil(Math.random() * 100);
    let randomOptionValue3 = Math.ceil(Math.random() * 1000) / Math.ceil(Math.random() * 100);
    let randomOptionValue4 = Math.ceil(Math.random() * 1000) / Math.ceil(Math.random() * 100);
    optionsValues = {
        value1: randomOptionValue1,
        value2: randomOptionValue2,
        value3: randomOptionValue3,
        value4: randomOptionValue4,
    }
    return optionsValues;
}


function getrandomSubtractionValues() {

    let randomOptionValue1 = Math.ceil(Math.random() * 100) - Math.ceil(Math.random() * 50);
    let randomOptionValue2 = Math.ceil(Math.random() * 100) - Math.ceil(Math.random() * 50);
    let randomOptionValue3 = Math.ceil(Math.random() * 100) - Math.ceil(Math.random() * 50);
    let randomOptionValue4 = Math.ceil(Math.random() * 100) - Math.ceil(Math.random() * 50);

    optionsValues = {
        value1: randomOptionValue1,
        value2: randomOptionValue2,
        value3: randomOptionValue3,
        value4: randomOptionValue4,
    }
    return optionsValues;
}


function getrandomMultiplicationValues() {

    let randomOptionValue1 = Math.ceil(Math.random() * 20) * Math.ceil(Math.random() * 10);
    let randomOptionValue2 = Math.ceil(Math.random() * 20) * Math.ceil(Math.random() * 10);
    let randomOptionValue3 = Math.ceil(Math.random() * 20) * Math.ceil(Math.random() * 10);
    let randomOptionValue4 = Math.ceil(Math.random() * 20) * Math.ceil(Math.random() * 10);

    optionsValues = {
        value1: randomOptionValue1,
        value2: randomOptionValue2,
        value3: randomOptionValue3,
        value4: randomOptionValue4,
    }
    return optionsValues;
}

function getrandomPercentageValues() {

    let randomOptionValue1 = (Math.ceil(Math.random() * 100)) * (Math.ceil(Math.random() * 1000) / 100);
    let randomOptionValue2 = (Math.ceil(Math.random() * 100)) * (Math.ceil(Math.random() * 1000) / 100);
    let randomOptionValue3 = (Math.ceil(Math.random() * 100)) * (Math.ceil(Math.random() * 1000) / 100)
    let randomOptionValue4 = (Math.ceil(Math.random() * 100)) * (Math.ceil(Math.random() * 1000) / 100)

    optionsValues = {
        value1: randomOptionValue1,
        value2: randomOptionValue2,
        value3: randomOptionValue3,
        value4: randomOptionValue4,
    }
    return optionsValues;
}