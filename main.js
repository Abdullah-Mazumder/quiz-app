const myBtn = document.querySelector('.myBtn button');
const myRulesBox = document.querySelector('.rulesBox')
const exitBtn = document.querySelector('.buttons button:first-child');
const continueBtn = document.querySelector('.buttons button:last-child');
const questions = document.querySelector('.questions');
const nextBtn = document.querySelector('.nextBtn');
const timeCount = document.querySelector('.timecount .seconds');
const timeLine = document.querySelector('.timeLines');
const resultBox = document.querySelector('.resultBox');
const restart1 = document.querySelector('.restart1');
const quit = document.querySelector('.quit');
const scoreText = document.querySelector('.scoreText');


let questionLen = questionsArray.length - 1;
let letterMark = (questionLen / 5) * 4;
let questionNumber = 0;
let timeCounter;
let counterLine;
let userScope = 0;
let counterOne = 0;

myBtn.onclick = () => {
    myRulesBox.classList.add('activeInfo');
}

exitBtn.onclick = () => {
    myRulesBox.classList.remove('activeInfo');
}

nextBtn.onclick = () => {
    if (questionNumber < questionLen) {
        counterOne++;
        questionNumber++;
        showQuestions(questionNumber);
        startTimer(15);
        startTimeLiner(0);

        nextBtn.style.display = 'none';
    }else {
        showResultBox();
    }
}

continueBtn.onclick = () => {
    myRulesBox.classList.remove('activeInfo');
    document.querySelector('.muQuizApp').style.display = 'none';
    questions.classList.add('activeInfo');
    showQuestions(0);
    startTimer(15);
    startTimeLiner(0);
}

quit.onclick = () => {
    window.location.reload();
}

restart1.onclick = () => {
    nextBtn.style.display = 'none';
    questionNumber = 0;
    counterOne = 0;
    userScope = 0;
    resultBox.classList.remove('activeResult');
    myRulesBox.classList.remove('activeInfo');
    document.querySelector('.muQuizApp').style.display = 'none';
    questions.classList.add('activeInfo');
    showQuestions(questionNumber);
    startTimer(15);
    startTimeLiner(0);
}

function showQuestions(index) {
    const questionText = document.querySelector('.text');
    const optionsList = document.querySelector('.myOptions');
    let optionTag = `<div class="options" onclick='optionSelected(this)'>
                        <span>${questionsArray[index].options[0]}</span>
                    </div>
                    <div class="options" onclick='optionSelected(this)'>
                        <span>${questionsArray[index].options[1]}</span>
                    </div>
                    <div class="options" onclick='optionSelected(this)'>
                        <span>${questionsArray[index].options[2]}</span>
                    </div>
                    <div class="options" onclick='optionSelected(this)'>
                        <span>${questionsArray[index].options[3]}</span>
                    </div>`;
    let questionTag = `<span>${questionsArray[index].numb}. ${questionsArray[index].question}</span>`;
    questionText.innerHTML = questionTag;
    optionsList.innerHTML = optionTag;

    const totalQue = document.querySelector('.totalQue');
    let pElement = `${questionsArray[index].numb} of ${questionLen + 1} Questios`;
    totalQue.innerHTML = pElement;
}

function optionSelected(option) {
    if (counterOne === questionLen) {
        nextBtn.innerHTML = "Result";
    }else {
        nextBtn.innerHTML = "Next Que";
    }
    if (timeCounter) {
        clearInterval(timeCounter)
    }
    if (counterLine) {
        clearInterval(counterLine)
    }
    const userAns = option.innerText;
    const correctAns = questionsArray[questionNumber].answer;
    const allOptions = document.querySelector('.myOptions').children.length;
    const checkIcon = `<i class="fa-solid fa-check"></i>`;
    const crossIcon = `<i class="fa-solid fa-xmark"></i>`;

    if (userAns === correctAns) {
        userScope++;
        option.classList.add('correct');
        option.innerHTML += checkIcon;
    }else {
        option.classList.add('incorrect');
        option.innerHTML += crossIcon;

        for (let index = 0; index < allOptions; index++) {
            if (document.querySelector('.myOptions').children[index].innerText === correctAns) {
                document.querySelector('.myOptions').children[index].classList.add('correct');
                document.querySelector('.myOptions').children[index].innerHTML += checkIcon;
            }
        }
    }

    for (let index = 0; index < allOptions; index++) {
        document.querySelector('.myOptions').children[index].classList.add('disabled');
    }

    nextBtn.style.display = 'block';
}

function showResultBox() {
    myRulesBox.classList.remove('activeInfo');
    questions.classList.remove('activeInfo');
    resultBox.classList.add('activeResult');
    
    if (userScope >= letterMark) {
        scoreText.innerHTML = `<span>Congratulations!! You Got<p>${userScope}</p> Out Of<p>${questionLen + 1}</p></span>`;
    }else if(userScope >= 1 && userScope < letterMark) {
        scoreText.innerHTML = `<span>Carry On.. You Got<p>${userScope}</p> Out Of<p>${questionLen + 1}</p></span>`;
    }else {
        scoreText.innerHTML = `<span>I Am Sorry... You Got<p>${userScope}</p> Out Of<p>${questionLen + 1}</p></span>`;
    }
}

function autoSelectAnswer() {
    if (counterOne === questionLen) {
        nextBtn.innerHTML = "Result";
    }else {
        nextBtn.innerHTML = "Next Que";
    }
    
    const correctAns = questionsArray[questionNumber].answer;
    const allOptions = document.querySelector('.myOptions').children.length;
    const checkIcon = `<i class="fa-solid fa-check"></i>`;

    for (let index = 0; index < allOptions; index++) {
        document.querySelector('.myOptions').children[index].style.pointerEvents = 'none';
        if (document.querySelector('.myOptions').children[index].innerText === correctAns) {
            document.querySelector('.myOptions').children[index].classList.add('correct');
            document.querySelector('.myOptions').children[index].innerHTML += checkIcon;
        }
    }

    nextBtn.style.display = 'block';
}

function startTimer(time) {
    if (timeCounter) {
        clearInterval(timeCounter);
    }
    timeCounter = setInterval(timer, 1000);

    function timer() {
        time = time < 10 ? `0${time}` : time;
        timeCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(timeCounter);
            timeCount.textContent = '00';
            autoSelectAnswer();
            timeLine.style.width = `100%`;
            clearInterval(counterLine);
        }
    }
}

function startTimeLiner(time) {
    if (counterLine) {
        clearInterval(counterLine);
    }
    counterLine = setInterval(timer, 50);

    function timer() {
        time += 1;
        timeLine.style.width = `${time}px`;
        if (time > 319) {
            clearInterval(counterLine)
        }
    }
}