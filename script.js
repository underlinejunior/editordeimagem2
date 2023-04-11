const fileInput = document.querySelector(".file-input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img"),
    saveImgBtn = document.querySelector(".save-img");
value_brightness = document.getElementById('brightness');
value_saturation = document.getElementById('saturation');
value_inversion = document.getElementById('inversion');
value_hueRotate = document.getElementById('hueRotate');
value_contrast = document.getElementById('contrast');


let brightness = "100", saturation = "100", inversion = "0", hueRotate = "0", contrast = "1000";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
        document.querySelector('.segment').addEventListener("click", blackAndWhite);
        document.querySelector(".canvas2").classList.remove("disabled");
    });
}

const applyFilter = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) hue-rotate(${hueRotate}deg) contrast(${contrast}%)`;
}

function brightnessValue() {
    brightness = value_brightness.value;
    applyFilter();
}
function saturationValue() {
    saturation = value_saturation.value;
    applyFilter();
}
function inversionValue() {
    inversion = value_inversion.value;
    applyFilter();
}
function hueRotateValue() {
    hueRotate = value_hueRotate.value;
    applyFilter();
}
function contrastValue() {
    contrast = value_contrast.value;
    applyFilter();
}

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; hueRotate = "0"; contrast = "100";
    value_brightness.value = 100; value_saturation.value = 100; value_inversion.value = 0; value_hueRotate.value = 0; value_contrast.value = 100;
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) hue-rotate(${hueRotate}deg) contrast(${contrast}%)`;
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "imagem-editada.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());



