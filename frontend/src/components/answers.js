import {UrlManager} from "../utils/url-manager.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Answer {
    constructor() {
        this.quiz = null;

        this.questionTitleElement = null;
        this.optionsElement = null;

        this.routeParams = UrlManager.getQueryParams();

        this.init();
        this.backToResults();
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        const userEmail = Auth.getUserEmail();

        if (!userInfo && !userEmail) {
            location.href = "/#";
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    document.getElementById("title").innerText = result.test.name;
                    document.getElementById("userData").innerHTML =
                        "Тест выполнил <span> " +
                        userInfo.fullName + ', ' +
                        userEmail
                    "</span>";

                    this.quiz = result.test.questions;
                    // Ищем элемент заголовка и записываем его в переменную, чтобы каждый раз не искать этот элемент
                    this.questionTitleElement = document.getElementById("answer-title");
                    // Ищем элементы ответов
                    this.optionsElement = document.getElementById("options");
                    this.showQuestions();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    showQuestions() {
        const allQuestion = this.quiz;

        this.optionsElement.innerHTML = "";

        allQuestion.forEach((item, index) => {
            const titleElement = document.createElement("div");
            titleElement.className = "answer-title";
            titleElement.innerHTML =
                "<span>Вопрос " + (index + 1) + ": </span>" + item.question;
            this.optionsElement.append(titleElement);

            this.showAnswers(item);
        });
    }

    showAnswers(item) {
        item.answers.forEach(answer => {
            const inputId = 'answer-' + answer.id;
            const answerOptionElement = document.createElement("div");
            answerOptionElement.className = "answer-option";

            const inputElement = document.createElement("input");
            inputElement.className = "option-answer";
            inputElement.setAttribute("id", inputId);
            inputElement.setAttribute("type", "radio");
            inputElement.setAttribute("name", inputId);
            inputElement.setAttribute("value", answer.id);
            inputElement.setAttribute("disabled", "disabled");

            const labelElement = document.createElement("label");
            labelElement.setAttribute("for", inputId);
            labelElement.innerText = answer.answer;

            if (answer.correct === true) {
                inputElement.style.border = "6px solid #5FDC33";
                labelElement.style.color = "#5FDC33";
            } else if (answer.correct === false) {
                inputElement.style.border = "6px solid #DC3333";
                labelElement.style.color = "#DC3333";
            }

            this.optionsElement.appendChild(answerOptionElement);
            answerOptionElement.appendChild(inputElement);
            answerOptionElement.appendChild(labelElement);
        })
    }

    backToResults() {
        document
            .getElementById("backToResults")
            .addEventListener("click", (event) => {
                event.preventDefault();
                location.href = "#/result?id=" + this.routeParams.id;
            });
    }
}
