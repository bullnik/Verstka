"use strict";

const IMAGE_SIZE_ERROR = "Неверный размер изображения";
const IMAGE_FORMAT_ERROR = "Неверный формат изображения";
const MISSING_TEXT_ERROR = "Введите текст новости";
const LIMIT_EXCEEDED_TEXT_ERROR = "Слишком большое количество символов";

let inputTextarea = document.querySelector(".add-form__textarea");
let textareaInfo = document.querySelector(".add-form__textarea-info");
let inputFile = document.querySelector(".add-form__upload-img");
let newsSubmit = document.querySelector(".add-form__submit");
let dropImage = document.querySelector(".add-form__drop-img");

const imagePreview = { 
    global: document.querySelector(".add-form__uploaded-img"),
    icon: document.querySelector(".add-form__uploaded-img-icon"),
    filename: document.querySelector(".add-form__uploaded-img-filename")
};

const errors = {
    formatError: document.querySelector(".add-form__format-error"),
    sizeError: document.querySelector(".add-form__error"),
    textError: document.querySelector(".add-form__error")
};

const imageData = {
    url: null,
    filename: null
};

let fileReader = new FileReader();
let image = new Image();

inputTextarea.onkeyup = () => {
    textareaInfo.innerHTML = `Символов: ${inputTextarea.value.length}/250`;
};

//Добавление новости
newsSubmit.addEventListener("click", () => {
    if (inputTextarea.value < 1) {
        errors.textError.innerHTML = MISSING_TEXT_ERROR;
    }else if (inputTextarea.value.length > 250){
        errors.textError.innerHTML = LIMIT_EXCEEDED_TEXT_ERROR;
    }else {
        resetErrors();
    }
});

//Удаление изображения
dropImage.addEventListener("click", () => {
    imagePreview.global.style.display = "none";
    inputFile.value = null;
    imageData.filename = null;
    imageData.url = null;
});

const resetErrors = () => {
    for (let key in errors) {
        errors[key].innerHTML = "";
    }
};

//Добавление файла
inputFile.addEventListener("change", () => {
    let file = inputFile.files[0];
    resetErrors();

    //Проверка расширения файла
    if (file.type && file.type.search("image/+(jpeg|png)") != -1) {
        fileReader.readAsDataURL(file);
        imageData.filename = file.name;

        // Обрезка длинного названия файла
        if (file.name.length > 20) {
            imageData.filename = imageData.filename.slice(0, 20) + "..." + file.type.match("jpeg|png");
        }
    } else {
        errors.formatError.innerHTML = IMAGE_FORMAT_ERROR;
    }
});

fileReader.addEventListener("load", (e) => {
    let url = e.target.result;
    image.src = url;
    imageData.url = url;
});

const displayImagePreview = () => {
    imagePreview.icon.src = imageData.url;
    imagePreview.global.style.display = "flex";
    imagePreview.filename.innerHTML = imageData.filename;
};

image.addEventListener("load", function() {
    let width = this.width;
    let height = this.height;

    //Проверка размеров файла
    if (width && height && width <= 270 && height <= 270) {
        displayImagePreview();
    } else {
        errors.sizeError.innerHTML = IMAGE_SIZE_ERROR;
    }
});