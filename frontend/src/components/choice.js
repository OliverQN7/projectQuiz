import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Choice {
    constructor() {
        this.quizzes = [];
        this.init();
    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/tests', 'GET');

            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.quizzes = result;
                this.processQuizzes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    processQuizzes() {
        const that = this;
        const choiceOptionsElement = document.getElementById('choice-options');
        if (this.quizzes && this.quizzes.length > 0) {
            this.quizzes.forEach(quiz => {
                const choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice__option';
                choiceOptionElement.setAttribute('data-id', quiz.id);
                choiceOptionElement.onclick = function () {
                    that.chooseQuiz(this);
                }

                const choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice__option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice__option-arrow';

                const choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', '/images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'Стрелка');


                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);

                choiceOptionsElement.appendChild(choiceOptionElement);
            })
        }
    }

    chooseQuiz(element) {
        const dataId = element.getAttribute('data-id');
        if (dataId) {
            localStorage.setItem('id', dataId);
            location.href = '#/test';
        }
    }
}
