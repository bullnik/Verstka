"use strict";

let enterButton = document.querySelector(".nav-header_right-top__login"); // Кнопка входа
let authPopup = document.querySelector(".authorization-container"); // Форма
let closeButton = document.querySelector(".authorization-form__close"); // Закрытие формы
let submitButton = document.querySelector(".authorization-form__submit"); // Отправка данных с формы
let background = document.querySelector(".authorization-container"); // Бекграунд

let error = document.querySelector(".authorization-form__input-error"); // Ошибка 

const inputData = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    global: document.querySelector(".authorization-form__field")
}

//Сообщение об ошибке
const INVALID_DATA = "Некорректный ввод данных, повторите попытку";

//Кнопка входа
enterButton.onclick = () => {
    authPopup.style.display = "flex";
}

//Закрытие формы
closeButton.onclick = () => {
    authPopup.style.display = "none";
}

background.onmousedown = (e) => {
    if ($(e.target).is(authPopup)){
        authPopup.style.display = "none";
    }
}

//Поля заполненные некорректно
let getInvalidFields = () => {
    let data = [];

    for (let key in inputData) {
        let inp = inputData[key];

        if (!inp.validity.valid) {
            data.push(inp);
        }
    }

    return data;
}

//Отображение полей с некорректными данными
let displayErrors = (data) => {
    error.innerHTML = INVALID_DATA;

    for (let key in data) {
        data[key].style.border = "1px solid red";
    }
}

//Отправка с формы
submitButton.onclick = () => {
    let invFields = getInvalidFields();

    if (invFields.length > 0) {
        displayErrors(invFields);
    } else {
        document.location.href = "../html/admin.html";
        inputData.global.style.border = "1px solid #23415E";
        error.innerHTML = "";
    }
}