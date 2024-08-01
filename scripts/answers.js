(function () {
    const Answer = {
        quiz: null,
        quizRight: null,

        name: null,
        lastName: null,
        email: null,

        questionTitleElement: null,

        optionsElement: null,

        userAnswers: [],

        async init() {
            await this.getRequest();
            await this.getRightAnswers();
            this.checkRightAnswer();
        },
        getRequest() {
            checkUserData();

            const testId = localStorage.getItem('id');

            this.name = localStorage.getItem('name');
            this.lastName = localStorage.getItem('lastName');
            this.email = localStorage.getItem('email');
            this.userResult = localStorage.getItem('results');

            if (testId) {
                const xhr = new XMLHttpRequest();

                xhr.open("GET", "https://testologia.ru/get-quiz?id=" + testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        getRightAnswers() {
            const testId = localStorage.getItem('id');

            if (testId) {
                const xhr = new XMLHttpRequest();

                xhr.open("GET", "https://testologia.ru/get-quiz-right?id=" + testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quizRight = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = "index.html";
                    }
                }
            }
        },
        checkRightAnswer(inputElement, chosenAnswerId, rightAnswerId) {
            document.getElementById("title").innerText = this.quiz.name;
            document.getElementById("userData").innerHTML =
                "Тест выполнил <span> " +
                this.name +
                " " +
                this.lastName +
                ", " +
                this.email +
                "</span>";

            // Ищем элемент заголовка и записываем его в переменную, чтобы каждый раз не искать этот элемент
            this.questionTitleElement = document.getElementById("answer-title");
            // Ищем элементы ответов
            this.optionsElement = document.getElementById("options");

            this.showQuestions();
        },
        showQuestions() {
            const allQuestion = this.quiz.questions;

            this.optionsElement.innerHTML = "";
            const that = this;

            allQuestion.forEach((item, index) => {
                const titleElement = document.createElement("div");
                titleElement.className = "answer-title";
                titleElement.innerHTML =
                    "<span>Вопрос " + (index + 1) + ": </span>" + item.question;
                this.optionsElement.append(titleElement);
                const choosenAnswer = JSON.parse(this.userResult).find((result) => {
                    return result.questionId === item.id;
                });

                this.userAnswers.push(choosenAnswer.chosenAnswerId);
                this.showAnswers(
                    item.answers,
                    choosenAnswer.chosenAnswerId,
                    this.quizRight[index]
                );
            });
        },
        showAnswers(answers, chosenAnswerId, rightAnswerId) {
            answers.forEach(answer => {
                const inputId = "answer-" + answer.id;
                const answerOptionElement = document.createElement("div");
                answerOptionElement.className = "answer-option";

                const inputElement = document.createElement("input");
                inputElement.className = "option-answer";
                inputElement.setAttribute("id", inputId);
                inputElement.setAttribute("type", "radio");
                inputElement.setAttribute("name", inputId);
                inputElement.setAttribute("value", answer.id);
                inputElement.setAttribute("disabled", "disabled");

                if (chosenAnswerId === answer.id) {
                    inputElement.checked = true;
                }

                const labelElement = document.createElement("label");
                labelElement.setAttribute("for", inputId);
                labelElement.innerText = answer.answer;

                if (chosenAnswerId === answer.id) {
                    if (rightAnswerId === answer.id) {
                        inputElement.checked = false;
                        inputElement.style.border = "6px solid #5FDC33";
                        labelElement.style.color = "#5FDC33";
                    } else {
                        inputElement.checked = false;
                        inputElement.style.border = "6px solid #DC3333";
                        labelElement.style.color = "#DC3333";
                    }
                }

                this.optionsElement.appendChild(answerOptionElement);
                answerOptionElement.appendChild(inputElement);
                answerOptionElement.appendChild(labelElement);
            });
        },
    };
    Answer.init();
    document
        .getElementById("backToResults")
        .addEventListener("click", function (event) {
            event.preventDefault();
            location.href = "result.html";
        });
})();