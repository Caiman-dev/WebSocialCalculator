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
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 20, 20, 19, 18, 18, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 800, 900, 1300, 1600, 1900, 2200, 2500, 3000, 3700, 4000, 4500, 18, 17, 17, 16, 16, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 20, 20, 19, 18, 18, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 20, 20, 19, 17, 16, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 800, 900, 1300, 1600, 1900, 2200, 2500, 3000, 3700, 4000, 4500, 18, 17, 17, 16, 16, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 20, 20, 19, 18, 18, 130000],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1700, 2100, 2400, 2900, 3300, 3600, 4100, 4500, 5000, 20, 20, 19, 17, 16, 130000],
    [300, 500, 300, 400, 500, 600, 700, 800, 900, 1100, 1300, 2000, 2500, 3100, 3500, 3800, 4400, 5400, 6200, 7000, 28, 28, 26, 23, 22, 150000],
    [200, 300, 200, 200, 200, 200, 200, 200, 300, 300, 400, 600, 700, 800, 1000, 1200, 1200, 1600, 1800, 2200, 8.8, 5.8, 4.4, 2.9, 2.2, 12600],
    [250, 350, 250, 250, 250, 250, 300, 400, 500, 600, 800, 1500, 2400, 2500, 2800, 3100, 3100, 3800, 4300, 5000, 22, 20, 18, 18, 18, 120000],
    [300, 400, 400, 400, 400, 400, 500, 500, 700, 700, 1000, 1800, 2300, 2500, 2800, 3100, 3100, 3800, 4000, 4500, 18, 16, 14, 13, 13, 115000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 30, 29, 26, 24, 215000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [250, 350, 250, 250, 250, 250, 300, 400, 500, 600, 800, 1500, 2400, 2500, 2800, 3100, 3100, 3800, 4300, 5000, 22, 20, 18, 18, 18, 120000],
    ["нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета"],
    [400, 600, 500, 500, 500, 500, 600, 600, 900, 900, 1200, 2400, 3300, 3500, 4000, 4400, 5000, 6100, 7000, 7800, 34, 33, 32, 31, 30, 235000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 31, 31, 30, 28, 28, 225000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1000, 1100, 1800, 2300, 2700, 3500, 4000, 4500, 5500, 6500, 7500, 29, 28, 27, 26, 26, 225000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 31, 31, 30, 28, 28, 225000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 31, 31, 30, 28, 28, 225000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1000, 1100, 1800, 2300, 2700, 3500, 4000, 4500, 5500, 6500, 7500, 29, 28, 27, 26, 26, 225000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 31, 31, 30, 28, 28, 225000],
    [350, 600, 350, 450, 500, 600, 700, 800, 900, 1200, 1300, 2200, 2800, 3200, 3900, 4500, 5200, 6600, 7700, 8500, 33, 31, 30, 28, 28, 225000],
    [400, 700, 400, 500, 600, 700, 800, 900, 1000, 1300, 1400, 2500, 3100, 4000, 4900, 5500, 5900, 8100, 8900, 9500, 39, 37, 35, 34, 32, 270000],
    [300, 400, 400, 400, 400, 400, 500, 500, 700, 700, 1000, 1800, 2300, 2500, 2800, 3100, 3100, 3800, 4000, 4500, 18, 16, 14, 13, 13, 115000],
    [400, 600, 500, 500, 500, 500, 600, 600, 900, 900, 1200, 2400, 3300, 3500, 4000, 4400, 5000, 6100, 7000, 7800, 34, 33, 32, 31, 30, 235000],
    ["нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета", "нет расчета"],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [200, 300, 300, 300, 300, 300, 350, 400, 400, 500, 650, 800, 800, 1100, 1400, 1600, 1600, 2000, 2100, 2400, 9.6, 6.4, 4.8, 3.2, 2.4, 13800],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [400, 700, 700, 700, 700, 700, 800, 800, 1000, 1300, 1500, 1800, 2100, 2600, 3000, 3200, 3200, 3800, 3900, 4600, 18.4, 12.2, 9.2, 6.1, 4.6, 26300],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 22, 20, 20, 20, 20, 160000],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [200, 300, 300, 300, 300, 300, 350, 400, 400, 500, 650, 800, 800, 1100, 1400, 1600, 1600, 2000, 2100, 2400, 9.6, 6.4, 4.8, 3.2, 2.4, 13800],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [400, 700, 700, 700, 700, 700, 800, 800, 1000, 1300, 1500, 1800, 2100, 2600, 3000, 3200, 3200, 3800, 3900, 4600, 18.4, 12.2, 9.2, 6.1, 4.6, 26300],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 800, 900, 1300, 1600, 1900, 2200, 2500, 3000, 3700, 4000, 4500, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1000, 1100, 1800, 2300, 2700, 3500, 4000, 4500, 5500, 6500, 7500, 22, 20, 20, 20, 20, 160000],
    [200, 300, 300, 300, 300, 300, 350, 400, 400, 500, 650, 800, 800, 1100, 1400, 1600, 1600, 2000, 2100, 2400, 9.6, 6.4, 4.8, 3.2, 2.4, 13800],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 400, 450, 450, 450, 350, 500, 500, 500, 650, 800, 1000, 1100, 1400, 1500, 1700, 1700, 2250, 2350, 2700, 10.8, 7.2, 5.4, 3.6, 2.7, 15500],
    [400, 750, 800, 800, 800, 700, 900, 900, 1050, 1300, 1550, 1900, 2200, 2700, 3000, 3200, 3200, 4050, 4150, 4700, 18.8, 12.5, 9.4, 6.2, 4.7, 26900],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 22, 20, 20, 20, 20, 160000],
    [200, 300, 300, 300, 300, 300, 350, 400, 400, 500, 650, 800, 800, 1100, 1400, 1600, 1600, 2000, 2100, 2400, 9.6, 6.4, 4.8, 3.2, 2.4, 13800],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 400, 450, 450, 450, 350, 500, 500, 500, 650, 800, 1000, 1100, 1400, 1500, 1700, 1700, 2250, 2350, 2700, 10.8, 7.2, 5.4, 3.6, 2.7, 15500],
    [400, 750, 800, 800, 800, 700, 900, 900, 1050, 1300, 1550, 1900, 2200, 2700, 3000, 3200, 3200, 4050, 4150, 4700, 18.8, 12.5, 9.4, 6.2, 4.7, 26900],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 22, 20, 20, 20, 20, 160000],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [250, 450, 500, 500, 500, 400, 550, 550, 600, 800, 1000, 1200, 1200, 1600, 1900, 2100, 2100, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [450, 800, 850, 850, 850, 750, 950, 950, 1150, 1450, 1750, 2100, 2300, 2900, 3400, 3600, 3600, 4600, 4700, 5200, 20.8, 13.8, 10.4, 6.9, 5.2, 29800],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 800, 900, 1300, 1600, 1900, 2200, 2500, 3000, 3700, 4000, 4500, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 30, 29, 26, 24, 215000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1000, 1100, 1800, 2300, 2700, 3500, 4000, 4500, 5500, 6500, 7500, 22, 20, 20, 20, 20, 160000],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [250, 450, 500, 500, 500, 400, 550, 550, 600, 800, 1000, 1200, 1200, 1600, 1900, 2100, 2100, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [450, 800, 850, 850, 850, 750, 950, 950, 1150, 1450, 1750, 2100, 2300, 2900, 3400, 3600, 3600, 4600, 4700, 5200, 20.8, 13.8, 10.4, 6.9, 5.2, 29800],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1500, 1900, 2200, 2500, 2800, 3400, 4100, 4500, 5000, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1700, 2100, 2500, 3000, 3500, 4500, 5500, 6500, 7000, 30, 29, 28, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 650, 700, 800, 1100, 1300, 2100, 2600, 3000, 3700, 4300, 5100, 6100, 7200, 8000, 22, 20, 20, 20, 20, 160000],
    [200, 350, 350, 350, 350, 350, 400, 400, 450, 650, 750, 900, 1000, 1300, 1500, 1700, 1700, 2000, 2100, 2600, 10.4, 6.9, 5.2, 3.4, 2.6, 14900],
    [200, 400, 450, 450, 450, 350, 500, 500, 500, 650, 800, 1000, 1100, 1400, 1500, 1700, 1700, 2250, 2350, 2700, 10.8, 7.2, 5.4, 3.6, 2.7, 15500],
    [250, 450, 500, 500, 500, 400, 550, 550, 600, 800, 1000, 1200, 1200, 1600, 1900, 2100, 2100, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [150, 250, 200, 200, 200, 200, 300, 300, 300, 400, 500, 700, 700, 900, 1300, 1500, 1500, 1700, 1900, 2000, 8, 5.3, 4, 2.6, 2, 11500],
    [300, 550, 500, 500, 500, 500, 600, 600, 750, 950, 1150, 1300, 1500, 1900, 2200, 2400, 2400, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [250, 400, 250, 350, 400, 500, 600, 650, 700, 900, 1000, 1700, 2100, 2400, 2900, 3300, 3600, 4100, 4500, 5000, 12, 10, 10, 10, 10, 65000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [350, 600, 350, 450, 500, 600, 700, 800, 900, 1200, 1300, 2200, 2800, 3200, 3900, 4500, 5200, 6600, 7700, 8500, 22, 20, 20, 20, 20, 160000],
    [400, 700, 700, 700, 700, 700, 800, 800, 1000, 1300, 1500, 1800, 2100, 2600, 3000, 3200, 3200, 3800, 3900, 4600, 18.4, 12.2, 9.2, 6.1, 4.6, 26300],
    [400, 750, 800, 800, 800, 700, 900, 900, 1050, 1300, 1550, 1900, 2200, 2700, 3000, 3200, 3200, 4050, 4150, 4700, 18.8, 12.5, 9.4, 6.2, 4.7, 26900],
    [450, 800, 850, 850, 850, 750, 950, 950, 1150, 1450, 1750, 2100, 2300, 2900, 3400, 3600, 3600, 4600, 4700, 5200, 20.8, 13.8, 10.4, 6.9, 5.2, 29800],
    [300, 550, 500, 500, 500, 500, 600, 600, 750, 950, 1150, 1300, 1500, 1900, 2200, 2400, 2400, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [300, 550, 500, 500, 500, 500, 600, 600, 750, 950, 1150, 1300, 1500, 1900, 2200, 2400, 2400, 2800, 2900, 3200, 12.8, 8.5, 6.4, 4.2, 3.2, 18300],
    [300, 500, 300, 400, 500, 600, 700, 800, 900, 1100, 1300, 2000, 2500, 3100, 3500, 3800, 4400, 5400, 6200, 7000, 20, 18, 18, 18, 18, 150000],
    [300, 500, 250, 350, 450, 550, 650, 700, 700, 900, 1000, 1500, 1800, 2000, 2500, 3000, 3500, 4500, 6000, 6500, 26, 26, 26, 24, 24, 200000],
    [400, 700, 400, 500, 600, 700, 800, 900, 1000, 1300, 1400, 2500, 3100, 4000, 4900, 5500, 5900, 8100, 8900, 9500, 39, 37, 35, 34, 32, 270000]
];

//заполняем города
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data: {
            "Донецк": null,
            "Макеевка": null,
            "Горловка": null,
            "Енакиево": null,
            "Шахтерск": null,
            "Снежное": null,
            "Красный Луч": null,
            "Алчевск": null,
            "Луганск": null,
            "Стаханов": null,
            "Мариуполь": null,
            "Бердянск": null,
            "Мелитополь": null,
            "Ростов-на-Дону": null,
            "Москва": null,
            "Евпатория": null,
            "Севастополь": null,
            "Симферополь": null,
            "Ялта": null
        },
        minLength: 0,
    });

    $('#sender').on('keyup', function () {
        if (instances[0].count === 0) {
            $('#reciever').val('');
        }
    })

    $('#reciever').on('keyup', function () {
        if (instances[0].count === 0) {
            $('#reciever').val('');
        }
    })
});

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

//блокировка ненужных полей при выборе конверта
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

//обнулить результат
SetResultFieldToDefault = () => {
    resultField.innerHTML = ""
}

//обнулить результат при изменении input'ов
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

//валидация weight
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

//валидация volume
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

//валидация length
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

//валидация width
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

//валидация height
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

//блокировка кнопки, если вес или обьем пустые
function CheckInputs() {
    if (!weight.value.length || weightValue == '' || weightValue == '0' ||
        !volume.value.length || volumeValue == '' || volumeValue == '0') {
        $('#result-btn').removeClass("waves-effect waves-light submit").addClass('disabled');
    }
    else {
        $('#result-btn').addClass("waves-effect waves-light submit").removeClass('disabled');
    }
}

//получить дату
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
        if (recieverCity == 'Донецк') {
            row = 0;
        }
        else if (recieverCity == 'Макеевка') {
            row = 1;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево') {
            row = 2;
        }
        else if (recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 3;
        }
        else if (recieverCity == 'Луганск') {
            row = 4;
        }
        else if (recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 5;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 6;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 7;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 8;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 9;
        }
        else if (recieverCity == 'Москва') {
            row = 10;
        }
    }
    else if (senderCity == 'Симферополь' || senderCity == 'Севастополь' || senderCity == 'Евпатория' || senderCity == 'Ялта') {
        if (recieverCity == 'Донецк') {
            row = 11;
        }
        else if (recieverCity == 'Макеевка') {
            row = 12;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево') {
            row = 13;
        }
        else if (recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 14;
        }
        else if (recieverCity == 'Луганск') {
            row = 15;
        }
        else if (recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 16;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 17;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 18;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 19;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 20;
        }
        else if (recieverCity == 'Москва') {
            row = 21;
        }
    }
    else if (senderCity == 'Москва') {
        if (recieverCity == 'Донецк') {
            row = 22;
        }
        else if (recieverCity == 'Макеевка') {
            row = 23;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево') {
            row = 24;
        }
        else if (recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 25;
        }
        else if (recieverCity == 'Луганск') {
            row = 26;
        }
        else if (recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 27;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 28;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 29;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 30;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 31;
        }
        else if (recieverCity == 'Москва') {
            row = 32;
        }
    }
    else if (senderCity == 'Донецк') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 33;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 34;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 35;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 36;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 37;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 38;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 39;
        }
        else if (recieverCity == 'Москва') {
            row = 40;
        }
    }
    else if (senderCity == 'Макеевка') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 41;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 42;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 43;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 44;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 45;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 46;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 47;
        }
        else if (recieverCity == 'Москва') {
            row = 48;
        }
    }
    else if (senderCity == 'Горловка' || senderCity == 'Енакиево') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 49;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 50;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 51;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 52;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 53;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 54;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 55;
        }
        else if (recieverCity == 'Москва') {
            row = 56;
        }
    }
    else if (senderCity == 'Шахтерск' || senderCity == 'Снежное' || senderCity == 'Красный Луч') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 57;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 58;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 59;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 60;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 61;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 62;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 63;
        }
        else if (recieverCity == 'Москва') {
            row = 64;
        }
    }
    else if (senderCity == 'Луганск') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 65;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 66;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 67;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 68;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 69;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 70;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 71;
        }
        else if (recieverCity == 'Москва') {
            row = 72;
        }
    }
    else if (senderCity == 'Стаханов' || senderCity == 'Алчевск') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 73;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 74;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 75;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 76;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 77;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 78;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 79;
        }
        else if (recieverCity == 'Москва') {
            row = 80;
        }
    }
    else if (senderCity == 'Мариуполь') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 81;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 82;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 83;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 84;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 85;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 86;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 87;
        }
        else if (recieverCity == 'Москва') {
            row = 88;
        }
    }
    else if (senderCity == 'Бердянск' || senderCity == 'Мелитополь') {
        if (recieverCity == 'Макеевка' || recieverCity == 'Донецк') {
            row = 89;
        }
        else if (recieverCity == 'Горловка' || recieverCity == 'Енакиево' || recieverCity == 'Шахтерск' || recieverCity == 'Снежное' || recieverCity == 'Красный Луч') {
            row = 90;
        }
        else if (recieverCity == 'Луганск' || recieverCity == 'Стаханов' || recieverCity == 'Алчевск') {
            row = 91;
        }
        else if (recieverCity == 'Мариуполь') {
            row = 92;
        }
        else if (recieverCity == 'Бердянск' || recieverCity == 'Мелитополь') {
            row = 93;
        }
        else if (recieverCity == 'Ростов-на-Дону') {
            row = 94;
        }
        else if (recieverCity == 'Симферополь' || recieverCity == 'Севастополь' || recieverCity == 'Евпатория' || recieverCity == 'Ялта') {
            row = 95;
        }
        else if (recieverCity == 'Москва') {
            row = 96;
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
        else if (maxValue > 10 && maxValue <= 20) {
            col = 11;
        }
        else if (maxValue > 20 && maxValue <= 30) {
            col = 12;
        }
        else if (maxValue > 30 && maxValue <= 40) {
            col = 13;
        }
        else if (maxValue > 40 && maxValue <= 60) {
            col = 14;
        }
        else if (maxValue > 60 && maxValue <= 80) {
            col = 15;
        }
        else if (maxValue > 80 && maxValue <= 100) {
            col = 16;
        }
        else if (maxValue > 100 && maxValue <= 150) {
            col = 17;
        }
        else if (maxValue > 150 && maxValue <= 200) {
            col = 18;
        }
        else if (maxValue > 200 && maxValue <= 250) {
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
    console.log(`cargoType = ${cargoType}, senderCity = ${senderCity}, recieverCity = ${recieverCity}, weightValue = ${weightValue}, volumeValue = ${volumeValue}, maxValue = ${maxValue}, row = ${row}, col = ${col}`);

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