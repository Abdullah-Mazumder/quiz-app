// Global variables
const question = document.querySelector('#question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const answer = document.querySelector('#answer');
const postBtn = document.querySelector('#post');
const allPostContainerInputs = document.querySelectorAll('.post-container input');
const searchBtn = document.querySelector('.search-box button');
const searchInput = document.querySelector('#search');
const editQuestionBox = document.querySelector('.edit-question-box');
const editQuestion = document.querySelector('#edit-question');
const editOption1 = document.querySelector('#edit-option1');
const editOption2 = document.querySelector('#edit-option2');
const editOption3 = document.querySelector('#edit-option3');
const editOption4 = document.querySelector('#edit-option4');
const editAnswer = document.querySelector('#edit-answer');
const okBtn = document.querySelector('.ok-btn button');
const modalCrossBtn = document.querySelector('.msg-container .cross-btn span');
const okDeleteBtn = document.querySelector('.delete-ok-btn button');
const modalDeleteCrossBtn = document.querySelector('.delete-msg-container .delete-cross-btn span');
const deleteBtn = document.querySelector('.edit-delete-container .buttons button:first-child');
const msgContainer = document.querySelector('.msg-container');
const msgDeleteContainer = document.querySelector('.delete-msg-container');
const deletePostBtn = document.querySelector('.buttons button:first-child');
const submitEditPostBtn = document.querySelector('.buttons button:last-child');
const allEditPostContainerInputs = document.querySelectorAll('.edit-delete-container .edit-question-box form input');


let serialQuestionNumber = questionsArray.length + 1;

// onload handler
window.onload = () => {
    main();
}

// main function
const main = () => {
    autoLoadQuestiion();
    postBtn.addEventListener('click', getQuestionsArray);
    searchBtn.addEventListener('click', loadQuestion);
    deletePostBtn.addEventListener('click', deleteQuestion);
    submitEditPostBtn.addEventListener('click', postEditedQuestion);
    okDeleteBtn.addEventListener('click', deleteQuestionFromStorage);
}

const autoLoadQuestiion = () => {
    if (questionsArray.length === 0 || !localStorage.getItem('questionsArray')) {
        localStorage.setItem('questionsArray', JSON.stringify(ArrayOfQuestions));
        window.location.reload();
    }
}

const postEditedQuestion = (event) => {
    event.preventDefault();
    if (inputValidator(allEditPostContainerInputs)) {
        if (isAnswerAvailableInOption(allEditPostContainerInputs, editAnswer)) {
            const objectOfPost = editObjectFromUser();
            questionsArray.splice(searchInput - 1, 1, objectOfPost);
            setItemToLcStrg();
            window.location.reload();
        } else {
            showMessage('Answer must be available in options.');
        }
    }
}

const closeModal = () => {
    modalCrossBtn.addEventListener('click', () => {
        msgContainer.style.transform = 'scale(0)';
    });
    okBtn.addEventListener('click', () => {
        msgContainer.style.transform = 'scale(0)';
    });
}

const deleteQuestion = (event) => {
    event.preventDefault();
    showDeleteMessage('Are you sure?');
    modalDeleteCrossBtn.addEventListener('click', () => {
        msgDeleteContainer.style.transform = 'scale(0)';
    })
}

const deleteQuestionFromStorage = () => {
    questionsArray.splice(searchInput.value - 1, 1);
    sortNumbPropertiOfQuestionsArray();
    setItemToLcStrg();
    msgDeleteContainer.style.transform = 'scale(0)';
    searchInput.value = '';
    window.location.reload();
}

const sortNumbPropertiOfQuestionsArray = () => {
    for (let i = 0; i < questionsArray.length; i++) {
        questionsArray[i].numb = i + 1;
    }
}

const showDeleteMessage = (msg) => {
    const content = document.querySelector('.delete-msg-container .delete-content');
    content.innerHTML = msg;
    msgDeleteContainer.style.opacity = 1;
    msgDeleteContainer.style.transform = 'scale(1)';
}

const showMessage = (msg) => {
    const content = document.querySelector('.msg-container .content');
    content.innerHTML = msg;
    msgContainer.style.opacity = 1;
    msgContainer.style.transform = 'scale(1)';
    closeModal();
}

const loadQuestion = (event) => {
    event.preventDefault();
    const inputValue = +searchInput.value.trim();
    if (!questionsArray[inputValue - 1]) {
        showMessage(`Question not found. You have ${questionsArray.length} questions.`);
        closeModal();
        return;
    }
    const question = questionsArray[inputValue - 1];
    editQuestionBox.style.maxHeight = '700px';
    editQuestion.value = question.question;
    editOption1.value = question.options[0];
    editOption2.value = question.options[1];
    editOption3.value = question.options[2];
    editOption4.value = question.options[3];
    editAnswer.value = question.answer;
}

const editObjectFromUser = function() {
    const obj = {
        numb: searchInput.value.trim(),
        question: editQuestion.value,
        answer: editAnswer.value.trim(),
        options: [editOption1.value.trim(), editOption2.value.trim(), editOption3.value.trim(), editOption4.value.trim()]
    }
    return obj;
}

const createObjectFromUser = function() {
    const obj = {
        numb: serialQuestionNumber++,
        question: question.value.trim(),
        answer: answer.value.trim(),
        options: [option1.value.trim(), option2.value.trim(), option3.value.trim(), option4.value.trim()]
    }
    return obj;
}

const questionsArrayHandler = () => {
    if (inputValidator(allPostContainerInputs)) {
        if (isAnswerAvailableInOption(allPostContainerInputs, answer)) {
            const objectOfPost = createObjectFromUser();
            questionsArray.push(objectOfPost);
            question.value = '';
            option1.value = '';
            option2.value = '';
            option3.value = '';
            option4.value = '';
            answer.value = '';
            console.log(questionsArray)
            return questionsArray;
        } else {
            showMessage('Answer must be available in options.');
        }
    }
}

const getQuestionsArray = (event) => {
    event.preventDefault();
    const questionsArray = questionsArrayHandler();
    if (questionsArray) {
        setItemToLcStrg();
    }
}

const setItemToLcStrg = () => {
    localStorage.setItem('questionsArray', JSON.stringify(questionsArray));
}

const inputValidator = (nodeList) => {
    for (let i = 0; i < nodeList.length; i++) {
        if ((nodeList[i].value.trim() == '') && !nodeList[i].value.trim()) {
            showMessage('Input is invalid');
            return false;
        }
    }
    return true;
}

const isAnswerAvailableInOption = (nodeList, answer) => {
console.log(nodeList)
    for (let i = 1; i < nodeList.length - 1; i++) {
        if (nodeList[i].value.trim() === answer.value.trim()) {
            return true;
        }
    }
    return false;
}