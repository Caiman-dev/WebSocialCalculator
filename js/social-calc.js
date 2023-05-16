//запуск select'ов
$(document).ready(function () {
    $('select').formSelect();
    GetDate();
});

let cargoType = '';
let senderCity = '';
let recieverCity = '';

const type = document.getElementById("type");
const sender = document.getElementById("sender");
const reciever = document.getElementById("reciever");
const weight = document.getElementById("weight");
const volume = document.getElementById("volume");
const length = document.getElementById("length");
const width = document.getElementById("width");
const height = document.getElementById("height");
const resultField = document.getElementById("result-field");

let row, col,
    weightValue, volumeValue, maxValue,
    result;

let isValidWeight = false, isValidVolume = false, isValidLenght = false, isValidWidth = false, isValidHeight = false;

let tarif = [
    [250, 350, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1400, 1700, 2000, 2500, 3000, 3400, 4000, 4600, 5500, 26, 24, 23, 23, 22, 105000],
    [250, 400, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1500, 1800, 2100, 2700, 3200, 3600, 4100, 4800, 5750, 26, 24, 23, 23, 22, 110000],
    [300, 450, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1600, 1900, 2300, 2900, 3400, 3800, 4300, 5000, 6000, 28, 26, 25, 25, 24, 115000],
    [300, 450, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1600, 1900, 2300, 2900, 3400, 3800, 4300, 5000, 6000, 26, 24, 24, 24, 22, 105000],
    [350, 550, 300, 400, 450, 550, 800, 900, 1000, 1100, 1300, 1900, 2300, 2700, 3400, 4000, 4500, 5100, 6000, 7250, 32, 30, 28, 28, 28, 135000],
    [200, 300, 300, 300, 300, 300, 400, 400, 600, 600, 900, 1300, 1600, 1900, 2100, 2300, 2500, 2700, 3000, 3500, 16, 15, 14, 14, 13, 115000],
    [150, 250, 250, 250, 250, 250, 450, 550, 650, 750, 950, 1400, 1800, 2100, 2300, 2600, 3000, 3400, 3800, 4000, 18, 17, 16, 16, 15, 120000],
    [100, 200, 100, 100, 100, 100, 100, 100, 200, 200, 200, 300, 300, 300, 300, 350, 400, 400, 600, 800, 3.2, 2.1, 1.6, 1, 0.8, 4600],
    [450, 650, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2700, 3300, 3900, 4600, 5300, 5900, 6700, 7600, 9000, 42, 40, 39, 39, 38, 220000],
    [450, 700, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2800, 3400, 4000, 4800, 5500, 6100, 6800, 7800, 9250, 42, 40, 39, 39, 38, 225000],
    [500, 750, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2900, 3500, 4200, 5000, 5700, 6300, 7000, 8000, 9500, 44, 42, 41, 41, 40, 230000],
    [500, 750, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2900, 3500, 4200, 5000, 5700, 6300, 7000, 8000, 9500, 42, 40, 40, 40, 38, 220000],
    [550, 850, 600, 700, 750, 850, 1200, 1300, 1600, 1700, 2200, 3200, 3900, 4600, 5500, 6300, 7000, 7800, 9000, 10750, 48, 46, 44, 44, 44, 250000],
    ['нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета'],
    [300, 500, 500, 500, 500, 500, 700, 800, 1100, 1200, 1700, 2500, 3100, 3700, 4100, 4500, 5000, 5400, 6000, 6500, 34, 32, 30, 30, 28, 235000],
    [200, 300, 300, 300, 300, 300, 400, 400, 600, 600, 900, 1300, 1600, 1900, 2100, 2300, 2500, 2700, 3000, 3500, 16, 15, 14, 14, 13, 115000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [350, 600, 450, 550, 600, 700, 950, 1150, 1350, 1550, 1950, 2700, 3300, 3900, 4700, 5400, 6100, 6800, 7800, 8750, 40, 39, 39, 39, 39, 203000],
    [400, 650, 450, 550, 600, 700, 950, 1150, 1350, 1550, 1950, 2800, 3400, 4100, 4900, 5600, 6300, 7000, 8000, 9000, 42, 41, 41, 41, 41, 208000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [300, 500, 500, 500, 500, 500, 700, 800, 1100, 1200, 1700, 2500, 3100, 3700, 4100, 4500, 5000, 5400, 6000, 6500, 34, 32, 30, 30, 28, 235000],
    ['нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета'],
    [150, 250, 250, 250, 250, 250, 450, 550, 650, 750, 950, 1400, 1800, 2100, 2300, 2600, 3000, 3400, 3800, 4000, 18, 17, 16, 16, 15, 120000],
    [150, 250, 200, 200, 200, 200, 300, 300, 400, 400, 500, 600, 700, 700, 900, 1000, 1100, 1300, 1400, 1600, 6.4, 4.26, 3.2, 2.13, 1.6, 9200],
    [150, 300, 250, 250, 250, 250, 350, 350, 450, 450, 650, 700, 800, 800, 1100, 1200, 1300, 1400, 1600, 1850, 7.4, 4.93, 3.7, 2.46, 1.85, 10600],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [400, 700, 650, 650, 650, 650, 800, 800, 1100, 1300, 1500, 1600, 1800, 2000, 2600, 2800, 3000, 3200, 3600, 4200, 16.8, 11.2, 8.4, 5.6, 4.2, 24000],
    [450, 650, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2700, 3300, 3900, 4600, 5300, 5900, 6700, 7600, 9000, 42, 40, 39, 39, 38, 220000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [250, 350, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1400, 1700, 2000, 2500, 3000, 3400, 4000, 4600, 5500, 26, 24, 23, 23, 22, 105000],
    [150, 300, 250, 250, 250, 250, 350, 350, 450, 450, 650, 700, 800, 800, 1100, 1200, 1300, 1400, 1600, 1850, 7.4, 4.93, 3.7, 2.46, 1.85, 10600],
    [150, 250, 200, 200, 200, 200, 300, 300, 400, 400, 500, 600, 700, 700, 900, 1000, 1100, 1300, 1400, 1600, 6.4, 4.26, 3.2, 2.13, 1.6, 9200],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [200, 400, 350, 350, 350, 350, 500, 500, 600, 600, 900, 1000, 1200, 1200, 1600, 1800, 2000, 2200, 2600, 3100, 12.4, 8.26, 6.2, 4.13, 3.1, 17800],
    [400, 750, 700, 700, 700, 700, 900, 900, 1150, 1250, 1650, 1800, 2100, 2200, 2900, 3200, 3500, 3800, 4400, 5200, 20.8, 13.86, 10.4, 6.93, 5.2, 29800],
    [450, 700, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2800, 3400, 4000, 4800, 5500, 6100, 6800, 7800, 9250, 42, 40, 39, 39, 38, 225000],
    [350, 600, 450, 550, 600, 700, 950, 1150, 1350, 1550, 1950, 2700, 3300, 3900, 4700, 5400, 6100, 6800, 7800, 8750, 40, 39, 39, 39, 39, 203000],
    [250, 400, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1500, 1800, 2100, 2700, 3200, 3600, 4100, 4800, 5750, 26, 24, 23, 23, 22, 110000],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [150, 250, 200, 200, 200, 200, 300, 300, 400, 400, 500, 600, 700, 700, 900, 1000, 1100, 1300, 1400, 1600, 6.4, 4.26, 3.2, 2.13, 1.6, 9200],
    [250, 450, 400, 400, 400, 400, 550, 550, 700, 800, 1000, 1100, 1300, 1400, 1800, 2000, 2200, 2400, 2800, 3350, 13.4, 8.93, 6.7, 4.46, 3.35, 19200],
    [450, 800, 750, 750, 750, 750, 950, 950, 1250, 1450, 1750, 1900, 2200, 2400, 3100, 3400, 3700, 4000, 4600, 5450, 21.8, 14.53, 10.9, 7.26, 5.45, 31200],
    [500, 750, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2900, 3500, 4200, 5000, 5700, 6300, 7000, 8000, 9500, 44, 42, 41, 41, 40, 230000],
    [400, 650, 450, 550, 600, 700, 950, 1150, 1350, 1550, 1950, 2800, 3400, 4100, 4900, 5600, 6300, 7000, 8000, 9000, 42, 41, 41, 41, 41, 208000],
    [300, 450, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1600, 1900, 2300, 2900, 3400, 3800, 4300, 5000, 6000, 28, 26, 25, 25, 24, 115000],
    [200, 350, 300, 300, 300, 300, 400, 400, 550, 650, 750, 800, 900, 1000, 1300, 1400, 1500, 1600, 1800, 2100, 8.4, 5.6, 4.2, 2.8, 2.1, 12000],
    [200, 400, 350, 350, 350, 350, 500, 500, 600, 600, 900, 1000, 1200, 1200, 1600, 1800, 2000, 2200, 2600, 3100, 12.4, 8.26, 6.2, 4.13, 3.1, 17800],
    [250, 450, 400, 400, 400, 400, 550, 550, 700, 800, 1000, 1100, 1300, 1400, 1800, 2000, 2200, 2400, 2800, 3350, 13.4, 8.93, 6.7, 4.46, 3.35, 19200],
    [150, 250, 200, 200, 200, 200, 300, 300, 400, 400, 500, 600, 700, 700, 900, 1000, 1100, 1300, 1400, 1600, 6.4, 4.26, 3.2, 2.13, 1.6, 9200],
    [300, 550, 500, 500, 500, 500, 600, 600, 850, 950, 1150, 1200, 1300, 1400, 1900, 2000, 2100, 2200, 2400, 2700, 10.8, 7.2, 5.4, 3.6, 2.7, 15500],
    [500, 750, 550, 650, 700, 800, 1050, 1150, 1450, 1550, 2050, 2900, 3500, 4200, 5000, 5700, 6300, 7000, 8000, 9500, 42, 40, 40, 40, 38, 220000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [300, 450, 250, 350, 400, 500, 650, 750, 850, 950, 1150, 1600, 1900, 2300, 2900, 3400, 3800, 4300, 5000, 6000, 26, 24, 24, 24, 22, 105000],
    [400, 700, 650, 650, 650, 650, 800, 800, 1100, 1300, 1500, 1600, 1800, 2000, 2600, 2800, 3000, 3200, 3600, 4200, 16.8, 11.2, 8.4, 5.6, 4.2, 24000],
    [400, 750, 700, 700, 700, 700, 900, 900, 1150, 1250, 1650, 1800, 2100, 2200, 2900, 3200, 3500, 3800, 4400, 5200, 20.8, 13.85, 10.4, 6.93, 5.2, 29800],
    [450, 800, 750, 750, 750, 750, 950, 950, 1250, 1450, 1750, 1900, 2200, 2400, 3100, 3400, 3700, 4000, 4600, 5450, 21.8, 14.53, 10.9, 7.26, 5.45, 31200],
    [300, 550, 500, 500, 500, 500, 600, 600, 850, 950, 1150, 1200, 1300, 1400, 1900, 2000, 2100, 2200, 2400, 2700, 10.8, 7.2, 5.4, 3.6, 2.7, 15500],
    ['нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета', 'нет расчета'],
    [550, 850, 600, 700, 750, 850, 1200, 1300, 1600, 1700, 2200, 3200, 3900, 4600, 5500, 6300, 7000, 7800, 9000, 10750, 48, 46, 44, 44, 44, 250000],
    [300, 500, 400, 500, 550, 650, 800, 1000, 1200, 1400, 1800, 2400, 2900, 3500, 4200, 4800, 5400, 6000, 6800, 7500, 38, 37, 36, 36, 35, 188000],
    [350, 550, 300, 400, 450, 550, 800, 900, 1000, 1100, 1300, 1900, 2300, 2700, 3400, 4000, 4500, 5100, 6000, 7250, 32, 30, 28, 28, 28, 135000]
];

//запись выбранных городов в переменные
$("#sender").on('change', function () {
    senderCity = sender.value;
});

$("#reciever").on('change', function () {
    recieverCity = reciever.value;
});

//запись веса в переменные +++
$("#weight").on('change', function () {
    weightValue = weight.value;
});

$("#volume").on('change', function () {
    volumeValue = volume.value;
});

//расчет обьема из Д х Ш х В
$("#length").on('change', function () {
    if (length.value != "" && length.value != "" &&
        length.value != "0" && length.value != "0" &&
        width.value != "" && width.value != "" &&
        width.value != "0" && width.value != "0" &&
        height.value != "" && height.value != "" &&
        height.value != "0" && height.value != "0") {
        var volValue = length.value * width.value * height.value / 4000;
        if (volValue > volume.value) {
            volume.value = volValue;
            volumeValue = volValue;
        }
    }
});

$("#width").on('change', function () {
    if (length.value != "" && length.value != "" &&
        length.value != "0" && length.value != "0" &&
        width.value != "" && width.value != "" &&
        width.value != "0" && width.value != "0" &&
        height.value != "" && height.value != "" &&
        height.value != "0" && height.value != "0") {
        var volValue = length.value * width.value * height.value / 4000;
        if (volValue > volume.value) {
            volume.value = volValue;
            volumeValue = volValue;
        }
    }
});

$("#height").on('change', function () {
    if (length.value != "" && length.value != "" &&
        length.value != "0" && length.value != "0" &&
        width.value != "" && width.value != "" &&
        width.value != "0" && width.value != "0" &&
        height.value != "" && height.value != "" &&
        height.value != "0" && height.value != "0") {
        var volValue = length.value * width.value * height.value / 4000;
        if (volValue > volume.value) {
            volume.value = volValue;
            volumeValue = volValue;
        }
    }
});

//блокировка ненужных полей при выборе конверта +++
$("#type").on('change', function () {
    SetResultFieldToDefault()
    cargoType = type.value;

    if (cargoType == "Письмо" || cargoType == "Документы") {
        weight.disabled = true;
        volume.disabled = true;
        length.disabled = true;
        width.disabled = true;
        height.disabled = true;
    }
    else {
        weight.disabled = false;
        volume.disabled = false;
        length.disabled = false;
        width.disabled = false;
        height.disabled = false;
    }
});

//обнулить результат +++
SetResultFieldToDefault = () => {
    resultField.innerHTML = ""
}

//обнулить результат при изменении input'ов +++
$("#weight").on('change', function () {
    SetResultFieldToDefault()
});

$("#volume").on('change', function () {
    SetResultFieldToDefault()
});

$("#length").on('change', function () {
    SetResultFieldToDefault()
});

$("#width").on('change', function () {
    SetResultFieldToDefault()
});

$("#height").on('change', function () {
    SetResultFieldToDefault()
});

//валидация weight +++
document.getElementById("weight").addEventListener("keyup", CheckWeight);
document.getElementById("weight").addEventListener("keyup", CheckInputs);
function CheckWeight() {
    if (!weight.value || !weight.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(weight.value)) {
        weight.classList.remove("valid");
        weight.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidWeight = false;
    } else {
        weight.classList.remove("invalid");
        weight.classList.add("valid");
        isValidWeight = true;
    }
}

//валидация volume +++
document.getElementById("volume").addEventListener("keyup", CheckVolume);
document.getElementById("volume").addEventListener("keyup", CheckInputs);
function CheckVolume() {
    if (!volume.value || !volume.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(volume.value)) {
        volume.classList.remove("valid");
        volume.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidVolume = false;
    } else {
        volume.classList.remove("invalid");
        volume.classList.add("valid");
        isValidVolume = true;
    }
}

//валидация length +++
document.getElementById("length").addEventListener("keyup", CheckLength);
document.getElementById("length").addEventListener("keyup", CheckInputs);
function CheckLength() {
    if (!length.value || !length.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(length.value)) {
        length.classList.remove("valid");
        length.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidLenght = false;
    } else {
        length.classList.remove("invalid");
        length.classList.add("valid");
        isValidLenght = true;
    }
}

//валидация width +++
document.getElementById("width").addEventListener("keyup", CheckWidth);
document.getElementById("width").addEventListener("keyup", CheckInputs);
function CheckWidth() {
    if (!width.value || !width.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(width.value)) {
        width.classList.remove("valid");
        width.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidWidth = false;
    } else {
        width.classList.remove("invalid");
        width.classList.add("valid");
        isValidWidth = true;
    }
}

//валидация height +++
document.getElementById("height").addEventListener("keyup", CheckHeight);
document.getElementById("height").addEventListener("keyup", CheckInputs);
function CheckHeight() {
    if (!height.value || !height.value.length) {
        return;
    }
    var regex = /^\d+(\.\d{1,4})?$/;
    if (!regex.test(height.value)) {
        height.classList.remove("valid");
        height.classList.add("invalid");
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
        isValidHeight = false;
    } else {
        height.classList.remove("invalid");
        height.classList.add("valid");
        isValidHeight = true;
    }
}

//блокировка кнопки, если вес или обьем пустые +++
function CheckInputs() {
    if (!weight.value.length || weightValue == '' || weightValue == '0' ||
        !volume.value.length || volumeValue == '' || volumeValue == '0') {
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
    }
    else {
        $('#result-btn').addClass("waves-effect waves-light submit").removeClass('disabled');
    }
}

//получить дату +++
GetDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy + ' г.';
    const date = document.getElementById("date");
    date.innerHTML = today;
}

//выбор нужной строки в зависимости от городов
function GetRow() {
    if (senderCity == 'Ростов-на-Дону') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 0;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 1;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 2;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 3;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 4;
        }
        else if (recieverCity == 'Москва') {
            row = 5;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 6;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 7;
        }
    }
    else if (senderCity == 'Москва') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 8;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 9;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 10;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 11;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 12;
        }
        else if (recieverCity == 'Москва') {
            row = 13;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 14;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 15;
        }
    }
    else if (senderCity == 'Симферополь' || senderCity == 'Севастополь' || senderCity == 'Евпатория' || senderCity == 'Ялта') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 16;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 17;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 18;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 19;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 20;
        }
        else if (recieverCity == 'Москва') {
            row = 21;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 22;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 23;
        }
    }
    else if (senderCity == 'Макеевка' || senderCity == 'Донецк') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 24;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 25;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 26;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 27;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 28;
        }
        else if (recieverCity == 'Москва') {
            row = 29;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 30;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 31;
        }
    }
    else if (senderCity == 'Горловка' || senderCity == 'Енакиево' || senderCity == 'Шахтерск' || senderCity == 'Снежное') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 32;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 33;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 34;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 35;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 36;
        }
        else if (recieverCity == 'Москва') {
            row = 37;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 38;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 39;
        }
    }
    else if (senderCity == 'Луганск' || senderCity == 'Стаханов' || senderCity == 'Алчевск') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 40;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 41;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 42;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 43;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 44;
        }
        else if (recieverCity == 'Москва') {
            row = 45;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 46;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 47;
        }
    }
    else if (senderCity == 'Мариуполь') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 48;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 49;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 50;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 51;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 52;
        }
        else if (recieverCity == 'Москва') {
            row = 53;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 54;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 55;
        }
    }
    else if (senderCity == 'Бердянск' || senderCity == 'Мелитополь') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 56;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное') {
            row = 57;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 58;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 59;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 60;
        }
        else if (recieverCity == 'Москва') {
            row = 61;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 62;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 63;
        }
    }
}

//выбор столбца в зависимости от веса
function GetCol() {
    if (cargoType == 'Письмо') {
        col = 0;
    }
    else if (cargoType == 'Документы') {
        col = 1;
    }
    else if (cargoType == 'Груз') {

        maxValue = 0;
        if (Number(weightValue) > Number(volumeValue)) {
            maxValue = Number(weightValue);
        }
        else if (Number(weightValue) < Number(volumeValue)) {
            maxValue = Number(volumeValue);
        }
        else if (Number(weightValue) == Number(volumeValue)) {
            maxValue = Number(weightValue);
        }

        if (maxValue > 0 && maxValue <= 0.1) {
            col = 2;
        }
        else if (maxValue > 0.1 && maxValue <= 0.2) {
            col = 3;
        }
        else if (maxValue > 0.2 && maxValue <= 0.5) {
            col = 4;
        }
        else if (maxValue > 0.5 && maxValue <= 1.5) {
            col = 5;
        }
        else if (maxValue > 1.5 && maxValue <= 2.5) {
            col = 6;
        }
        else if (maxValue > 2.5 && maxValue <= 3.5) {
            col = 7;
        }
        else if (maxValue > 3.5 && maxValue <= 5.5) {
            col = 8;
        }
        else if (maxValue > 5.5 && maxValue <= 7.5) {
            col = 9;
        }
        else if (maxValue > 7.5 && maxValue <= 10) {
            col = 10;
        }
        else if (maxValue > 10 && maxValue <= 15) {
            col = 11;
        }
        else if (maxValue > 15 && maxValue <= 20) {
            col = 12;
        }
        else if (maxValue > 20 && maxValue <= 30) {
            col = 13;
        }
        else if (maxValue > 30 && maxValue <= 40) {
            col = 14;
        }
        else if (maxValue > 40 && maxValue <= 60) {
            col = 15;
        }
        else if (maxValue > 60 && maxValue <= 80) {
            col = 16;
        }
        else if (maxValue > 80 && maxValue <= 100) {
            col = 17;
        }
        else if (maxValue > 100 && maxValue <= 150) {
            col = 18;
        }
        else if (maxValue > 150 && maxValue <= 250) {
            col = 19;
        }
        else if (maxValue > 250 && maxValue <= 500) {
            col = 20;
        }
        else if (maxValue > 500 && maxValue <= 1000) {
            col = 21;
        }
        else if (maxValue > 1000 && maxValue <= 2000) {
            col = 22;
        }
        else if (maxValue > 2000 && maxValue <= 3000) {
            col = 23;
        }
        else if (maxValue > 3000 && maxValue <= 5000) {
            col = 24;
        }
        else if (maxValue > 5000 && maxValue <= 10000) {
            col = 25;
        }
    }
}

//общий рачет
function GetResult() {
    row = 0;
    col = 0;
    GetRow();
    GetCol();
    console.log(cargoType, senderCity, recieverCity, weightValue, volumeValue, maxValue, row, col);

    let resultField = document.getElementById("result-field");

    if (senderCity != '' && recieverCity != '' && (cargoType == 'Письмо' || cargoType == 'Документы')) {
        resultField.innerHTML = tarif[row][col] + " р.";
    }
    else if (senderCity != '' && recieverCity != '' && cargoType == 'Груз' &&
        weight.value.length && weightValue != '' && weightValue != '0' &&
        volume.value.length && volumeValue != '' && volumeValue != '0') {
        if (maxValue <= 250 || maxValue > 5000 && maxValue <= 10000) {
            resultField.innerHTML = tarif[row][col] + " р.";
        }
        else if (maxValue > 250 && maxValue <= 5000) {
            let result = maxValue * tarif[row][col];
            resultField.innerHTML = Math.round(result / 50) * 50 + " р.";
        }
        else {
            alert("Расчет производится только до 10т");
        }
    }
    else {
        alert("Все поля должны быть заполнены!");
    }
}