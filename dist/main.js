/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));\n    window.addEventListener('popstate', this.handleRouteChanging.bind(this));\n  }\n  handleRouteChanging() {\n    this.router.openRoute();\n  }\n}\nnew App();\n\n//# sourceURL=webpack://quiz/./src/app.js?");

/***/ }),

/***/ "./src/components/answers.js":
/*!***********************************!*\
  !*** ./src/components/answers.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Answer: () => (/* binding */ Answer)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Answer {\n  constructor() {\n    this.quiz = null;\n    this.quizRight = null;\n    this.name = null;\n    this.lastName = null;\n    this.email = null;\n    this.questionTitleElement = null;\n    this.optionsElement = null;\n    this.userAnswers = [];\n    this.getRequest();\n    this.getRightAnswers();\n    this.checkRightAnswer();\n  }\n  getRequest() {\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData();\n    const testId = localStorage.getItem('id');\n    this.name = localStorage.getItem('name');\n    this.lastName = localStorage.getItem('lastName');\n    this.email = localStorage.getItem('email');\n    this.userResult = localStorage.getItem('results');\n    if (testId) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", \"https://testologia.ru/get-quiz?id=\" + testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n      } else {\n        location.href = '#/';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n  getRightAnswers() {\n    const testId = localStorage.getItem('id');\n    if (testId) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", \"https://testologia.ru/get-quiz-right?id=\" + testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quizRight = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = \"#/\";\n        }\n      }\n    }\n  }\n  checkRightAnswer(inputElement, chosenAnswerId, rightAnswerId) {\n    document.getElementById(\"title\").innerText = this.quiz.name;\n    document.getElementById(\"userData\").innerHTML = \"Тест выполнил <span> \" + this.name + \" \" + this.lastName + \", \" + this.email + \"</span>\";\n\n    // Ищем элемент заголовка и записываем его в переменную, чтобы каждый раз не искать этот элемент\n    this.questionTitleElement = document.getElementById(\"answer-title\");\n    // Ищем элементы ответов\n    this.optionsElement = document.getElementById(\"options\");\n    this.showQuestions();\n  }\n  showQuestions() {\n    const allQuestion = this.quiz.questions;\n    this.optionsElement.innerHTML = \"\";\n    allQuestion.forEach((item, index) => {\n      const titleElement = document.createElement(\"div\");\n      titleElement.className = \"answer-title\";\n      titleElement.innerHTML = \"<span>Вопрос \" + (index + 1) + \": </span>\" + item.question;\n      this.optionsElement.append(titleElement);\n      const chosenAnswer = JSON.parse(this.userResult).find(result => {\n        return result.questionId === item.id;\n      });\n      this.userAnswers.push(chosenAnswer.chosenAnswerId);\n      this.showAnswers(item.answers, chosenAnswer.chosenAnswerId, this.quizRight[index]);\n    });\n  }\n  showAnswers(answers, chosenAnswerId, rightAnswerId) {\n    answers.forEach(answer => {\n      const inputId = \"answer-\" + answer.id;\n      const answerOptionElement = document.createElement(\"div\");\n      answerOptionElement.className = \"answer-option\";\n      const inputElement = document.createElement(\"input\");\n      inputElement.className = \"option-answer\";\n      inputElement.setAttribute(\"id\", inputId);\n      inputElement.setAttribute(\"type\", \"radio\");\n      inputElement.setAttribute(\"name\", inputId);\n      inputElement.setAttribute(\"value\", answer.id);\n      inputElement.setAttribute(\"disabled\", \"disabled\");\n      if (chosenAnswerId === answer.id) {\n        inputElement.checked = true;\n      }\n      const labelElement = document.createElement(\"label\");\n      labelElement.setAttribute(\"for\", inputId);\n      labelElement.innerText = answer.answer;\n      if (chosenAnswerId === answer.id) {\n        if (rightAnswerId === answer.id) {\n          inputElement.checked = false;\n          inputElement.style.border = \"6px solid #5FDC33\";\n          labelElement.style.color = \"#5FDC33\";\n        } else {\n          inputElement.checked = false;\n          inputElement.style.border = \"6px solid #DC3333\";\n          labelElement.style.color = \"#DC3333\";\n        }\n      }\n      this.optionsElement.appendChild(answerOptionElement);\n      answerOptionElement.appendChild(inputElement);\n      answerOptionElement.appendChild(labelElement);\n      this.backToResults();\n    });\n  }\n  backToResults() {\n    document.getElementById(\"backToResults\").addEventListener(\"click\", function (event) {\n      event.preventDefault();\n      location.href = \"#/result\";\n    });\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/answers.js?");

/***/ }),

/***/ "./src/components/choice.js":
/*!**********************************!*\
  !*** ./src/components/choice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Choice: () => (/* binding */ Choice)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Choice {\n  constructor() {\n    this.quizzes = [];\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData();\n    const xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", \"https://testologia.ru/get-quizzes\", false);\n    xhr.send();\n    if (xhr.status === 200 && xhr.responseText) {\n      try {\n        this.quizzes = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      this.processQuizzes();\n    } else {\n      location.href = '#/';\n    }\n  }\n  processQuizzes() {\n    const that = this;\n    const choiceOptionsElement = document.getElementById('choice-options');\n    if (this.quizzes && this.quizzes.length > 0) {\n      this.quizzes.forEach(quiz => {\n        const choiceOptionElement = document.createElement('div');\n        choiceOptionElement.className = 'choice__option';\n        choiceOptionElement.setAttribute('data-id', quiz.id);\n        choiceOptionElement.onclick = function () {\n          that.chooseQuiz(this);\n        };\n        const choiceOptionTextElement = document.createElement('div');\n        choiceOptionTextElement.className = 'choice__option-text';\n        choiceOptionTextElement.innerText = quiz.name;\n        const choiceOptionArrowElement = document.createElement('div');\n        choiceOptionArrowElement.className = 'choice__option-arrow';\n        const choiceOptionImageElement = document.createElement('img');\n        choiceOptionImageElement.setAttribute('src', '/images/arrow.png');\n        choiceOptionImageElement.setAttribute('alt', 'Стрелка');\n        choiceOptionArrowElement.appendChild(choiceOptionImageElement);\n        choiceOptionElement.appendChild(choiceOptionTextElement);\n        choiceOptionElement.appendChild(choiceOptionArrowElement);\n        choiceOptionsElement.appendChild(choiceOptionElement);\n      });\n    }\n  }\n  chooseQuiz(element) {\n    const dataId = element.getAttribute('data-id');\n    if (dataId) {\n      localStorage.setItem('id', dataId);\n      location.href = '#/test';\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/choice.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\n  constructor() {\n    this.agreeElement = null;\n    this.processElement = null;\n    this.fields = [{\n      name: 'name',\n      id: \"name\",\n      element: null,\n      regex: /^[А-Я][а-я]+\\s*$/,\n      valid: false\n    }, {\n      name: 'lastName',\n      id: \"last-name\",\n      element: null,\n      regex: /^[А-Я][а-я]+\\s*$/,\n      valid: false\n    }, {\n      name: 'email',\n      id: \"email\",\n      element: null,\n      regex: /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,\n      valid: false\n    }];\n    const that = this;\n    this.fields.forEach(item => {\n      item.element = document.getElementById(item.id);\n      item.element.onchange = function () {\n        that.validateField.call(that, item, this);\n      };\n    });\n    this.processElement = document.getElementById('process');\n    this.processElement.onclick = function () {\n      that.processForm();\n    };\n    this.agreeElement = document.getElementById('agree');\n    this.agreeElement.onchange = function () {\n      that.validateForm();\n    };\n  }\n  validateField(field, element) {\n    if (!element.value || !element.value.match(field.regex)) {\n      element.parentNode.style.borderColor = 'red';\n      field.valid = false;\n    } else {\n      element.parentNode.removeAttribute(\"style\");\n      field.valid = true;\n    }\n    this.validateForm();\n  }\n  validateForm() {\n    const validForm = this.fields.every(item => item.valid);\n    const isValid = this.agreeElement.checked && validForm;\n    if (isValid) {\n      this.processElement.removeAttribute('disabled');\n    } else {\n      this.processElement.setAttribute('disabled', true);\n    }\n    return isValid;\n  }\n  processForm() {\n    if (this.validateForm()) {\n      this.fields.forEach(item => {\n        localStorage.setItem(item.name, item.element.value);\n      });\n      location.href = \"#/choice\";\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/form.js?");

/***/ }),

/***/ "./src/components/result.js":
/*!**********************************!*\
  !*** ./src/components/result.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Result: () => (/* binding */ Result)\n/* harmony export */ });\nclass Result {\n  constructor() {\n    document.getElementById('result__score').innerText = localStorage.getItem('score') + '/' + localStorage.getItem('total');\n    document.getElementById('answers').onclick = function () {\n      location.href = '#/answers';\n    };\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/result.js?");

/***/ }),

/***/ "./src/components/test.js":
/*!********************************!*\
  !*** ./src/components/test.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Test: () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Test {\n  constructor() {\n    this.quiz = null;\n    this.currentQuestionIndex = 1;\n    this.questionTitleElement = null;\n    this.optionsElement = null;\n    this.nextButtonElement = null;\n    this.prevButtonElement = null;\n    this.passButtonElement = null;\n    this.progressBarElement = null;\n    this.userResult = [];\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData();\n    const testId = localStorage.getItem('id');\n    if (testId) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", \"https://testologia.ru/get-quiz?id=\" + testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n        this.startQuiz();\n      } else {\n        location.href = '#/';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n  startQuiz() {\n    this.questionTitleElement = document.getElementById('title');\n    this.optionsElement = document.getElementById('options');\n    this.nextButtonElement = document.getElementById('next');\n    this.nextButtonElement.onclick = this.move.bind(this, 'next');\n    this.passButtonElement = document.getElementById('pass');\n    this.passButtonElement.onclick = this.move.bind(this, 'pass');\n    this.prevButtonElement = document.getElementById('prev');\n    this.prevButtonElement.onclick = this.move.bind(this, 'prev');\n    this.progressBarElement = document.getElementById('progress-bar');\n    document.getElementById('pre-title').innerText = this.quiz.name;\n    this.prepareProgressBar();\n    this.showQuestion();\n    const timerElement = document.getElementById('timer');\n    let seconds = 59;\n    const interval = setInterval(function () {\n      seconds--;\n      timerElement.innerText = seconds;\n      if (seconds === 0) {\n        clearInterval(interval);\n        this.complete();\n      }\n    }.bind(this), 1000);\n  }\n  prepareProgressBar() {\n    for (let i = 0; i < this.quiz.questions.length; i++) {\n      const itemElement = document.createElement('div');\n      itemElement.className = 'test__progressBar-item ' + (i === 0 ? 'active' : '');\n      const itemCircleElement = document.createElement('div');\n      itemCircleElement.className = 'item-circle';\n      const itemTextElement = document.createElement('div');\n      itemTextElement.className = 'item-text';\n      itemTextElement.innerText = 'Вопрос ' + (i + 1);\n      itemElement.appendChild(itemCircleElement);\n      itemElement.appendChild(itemTextElement);\n      this.progressBarElement.appendChild(itemElement);\n    }\n  }\n  showQuestion() {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ': </span> ' + activeQuestion.question;\n    this.optionsElement.innerHTML = '';\n    const that = this;\n    const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);\n    activeQuestion.answers.forEach(answer => {\n      const optionElement = document.createElement('div');\n      optionElement.className = 'question__option';\n      const inputId = 'answer-' + answer.id;\n      const inputElement = document.createElement('input');\n      inputElement.className = 'option__input';\n      inputElement.setAttribute('id', inputId);\n      inputElement.setAttribute('type', 'radio');\n      inputElement.setAttribute('name', 'answer');\n      inputElement.setAttribute('value', answer.id);\n      if (chosenOption && chosenOption.chosenAnswerId === answer.id) {\n        inputElement.setAttribute('checked', 'checked');\n      }\n      inputElement.onchange = function () {\n        that.chooseAnswer();\n      };\n      const labelElement = document.createElement('label');\n      labelElement.setAttribute('for', inputId);\n      labelElement.innerText = answer.answer;\n      optionElement.appendChild(inputElement);\n      optionElement.appendChild(labelElement);\n      this.optionsElement.appendChild(optionElement);\n    });\n    if (chosenOption && chosenOption.chosenAnswerId) {\n      this.nextButtonElement.removeAttribute('disabled');\n    } else {\n      this.nextButtonElement.setAttribute('disabled', 'disabled');\n    }\n    if (this.currentQuestionIndex === this.quiz.questions.length) {\n      this.nextButtonElement.innerText = 'Завершить';\n    } else {\n      this.nextButtonElement.innerText = 'Далее';\n    }\n    if (this.currentQuestionIndex > 1) {\n      this.prevButtonElement.removeAttribute('disabled');\n    } else {\n      this.prevButtonElement.setAttribute('disabled', 'disabled');\n    }\n  }\n  chooseAnswer() {\n    this.nextButtonElement.removeAttribute('disabled');\n  }\n  move(action) {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    const chosenAnswer = Array.from(document.getElementsByClassName('option__input')).find(element => {\n      return element.checked;\n    });\n    let chosenAnswerId = null;\n    if (chosenAnswer && chosenAnswer.value) {\n      chosenAnswerId = Number(chosenAnswer.value);\n    }\n    const existingResult = this.userResult.find(item => {\n      return item.questionId === activeQuestion.id;\n    });\n    if (existingResult) {\n      existingResult.chosenAnswerId = chosenAnswerId;\n    } else {\n      this.userResult.push({\n        questionId: activeQuestion.id,\n        chosenAnswerId: chosenAnswerId\n      });\n    }\n    if (action === 'next' || action === 'pass') {\n      this.currentQuestionIndex++;\n    } else {\n      this.currentQuestionIndex--;\n    }\n    if (this.currentQuestionIndex > this.quiz.questions.length) {\n      this.complete();\n      return;\n    }\n    Array.from(this.progressBarElement.children).forEach((item, index) => {\n      const currentItemIndex = index + 1;\n      item.classList.remove('complete');\n      item.classList.remove('active');\n      if (currentItemIndex === this.currentQuestionIndex) {\n        item.classList.add('active');\n      } else if (currentItemIndex < this.currentQuestionIndex) {\n        item.classList.add('complete');\n      }\n    });\n    this.showQuestion();\n  }\n  complete() {\n    const id = localStorage.getItem('id');\n    const name = localStorage.getItem('name');\n    const lastName = localStorage.getItem('lastName');\n    const email = localStorage.getItem('email');\n    const xhr = new XMLHttpRequest();\n    xhr.open('POST', 'https://testologia.ru/pass-quiz?id=' + id, false);\n    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');\n    xhr.send(JSON.stringify({\n      name: name,\n      lastName: lastName,\n      email: email,\n      results: this.userResult\n    }));\n    if (xhr.status === 200 && xhr.responseText) {\n      let result = null;\n      try {\n        result = JSON.parse(xhr.responseText);\n        localStorage.setItem('result', xhr.responseText);\n        localStorage.setItem('score', JSON.parse(xhr.responseText).score);\n        localStorage.setItem('total', JSON.parse(xhr.responseText).total);\n        localStorage.setItem('results', JSON.stringify(this.userResult));\n      } catch (e) {\n        location.href = '#/';\n      }\n      if (result) {\n        location.href = '#/result';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/test.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form.js */ \"./src/components/form.js\");\n/* harmony import */ var _components_choice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/choice.js */ \"./src/components/choice.js\");\n/* harmony import */ var _components_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/test.js */ \"./src/components/test.js\");\n/* harmony import */ var _components_result_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/result.js */ \"./src/components/result.js\");\n/* harmony import */ var _components_answers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/answers.js */ \"./src/components/answers.js\");\n\n\n\n\n\nclass Router {\n  constructor() {\n    this.routes = [{\n      route: '#/',\n      title: 'Главная',\n      template: 'templates/index.html',\n      styles: 'styles/index.css',\n      load: () => {}\n    }, {\n      route: '#/form',\n      title: 'Регистрация',\n      template: 'templates/form.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form();\n      }\n    }, {\n      route: '#/choice',\n      title: 'Выбор теста',\n      template: 'templates/choice.html',\n      styles: 'styles/choice.css',\n      load: () => {\n        new _components_choice_js__WEBPACK_IMPORTED_MODULE_1__.Choice();\n      }\n    }, {\n      route: '#/test',\n      title: 'Прохождение теста',\n      template: 'templates/test.html',\n      styles: 'styles/test.css',\n      load: () => {\n        new _components_test_js__WEBPACK_IMPORTED_MODULE_2__.Test();\n      }\n    }, {\n      route: '#/result',\n      title: 'Результат теста',\n      template: 'templates/result.html',\n      styles: 'styles/result.css',\n      load: () => {\n        new _components_result_js__WEBPACK_IMPORTED_MODULE_3__.Result();\n      }\n    }, {\n      route: '#/answers',\n      title: 'Ответы теста',\n      template: 'templates/answers.html',\n      styles: 'styles/answers.css',\n      load: () => {\n        new _components_answers_js__WEBPACK_IMPORTED_MODULE_4__.Answer();\n      }\n    }];\n  }\n  async openRoute() {\n    const newRoute = this.routes.find(item => {\n      return item.route === window.location.hash.split('?')[0];\n    });\n    if (!newRoute) {\n      window.location.href = '#/';\n      return;\n    }\n    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());\n    document.getElementById('styles').setAttribute('href', newRoute.styles);\n    document.getElementById('page-title').innerText = newRoute.title;\n    newRoute.load();\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/router.js?");

/***/ }),

/***/ "./src/utils/url-manager.js":
/*!**********************************!*\
  !*** ./src/utils/url-manager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UrlManager: () => (/* binding */ UrlManager)\n/* harmony export */ });\nclass UrlManager {\n  static checkUserData() {\n    const name = localStorage.getItem(\"name\");\n    const lastName = localStorage.getItem(\"lastName\");\n    const email = localStorage.getItem(\"email\");\n    if (!name || !lastName || !email) {\n      location.href = \"#/\";\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/utils/url-manager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;