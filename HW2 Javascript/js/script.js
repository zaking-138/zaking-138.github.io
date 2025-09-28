
let promoField = document.querySelector("#promo-code");
let casePrice = 180.99;
let cpuPrice = 436.99;
let gpuPrice = 504.99;

initialization();

function initialization() {
    document.querySelector(".add-btn").addEventListener("click", sumTotal);
    document.querySelector(".add-btn1").addEventListener("click", sumTotal);
    document.querySelector(".add-btn2").addEventListener("click", sumTotal);

    let colorBtns = document.querySelectorAll(".color-btn");
    for (const button of colorBtns) {
        button.addEventListener("input", setCaseImg);
    }
    let cpuBtns = document.querySelectorAll(".cpu-btn");
    for (const button of cpuBtns) {
        button.addEventListener("input", setCPUImg);
    }
    let gpuBtns = document.querySelectorAll(".gpu-btn");
    for (const button of gpuBtns) {
        button.addEventListener("input", setGPUImg);
    }
}
function sumTotal() {
    let output = document.querySelector("#subtotal");
    let promo = findPromo();

    let caseQuantity = document.querySelector("#case-quantity").value;
    let cpuQuantity = document.querySelector("#cpu-quantity").value;
    let gpuQuantity = document.querySelector("#gpu-quantity").value;

    generateCart(caseQuantity, cpuQuantity, gpuQuantity);

    let caseSubtotal = caseQuantity * casePrice;
    let cpuSubtotal = cpuQuantity * cpuPrice;
    let gpuSubtotal = gpuQuantity * gpuPrice;
    let total = caseSubtotal + cpuSubtotal + gpuSubtotal;
    total -= (total * promo);

    output.textContent = total.toFixed(2);
}

function findPromo() {
    if (promoField.value === "promo20") {
        return 0.20;
    } else if (promoField.value === "promo40") {
        return 0.40;
    } else {
        return 0;
    }
}

function generateCart(caseQ, cpuQ, gpuQ) {
    let cart = document.querySelector("#cart");
    cart.innerHTML = "";
    if (gpuQ > 0) {
        let gpus = document.createElement("p");
        gpus.textContent = "GPU x" + gpuQ;
        cart.appendChild(gpus);
    }
    if (cpuQ > 0) {
        let cpus = document.createElement("p");
        cpus.textContent = "CPU x" + cpuQ;
        cart.appendChild(cpus);
    }
    if (caseQ > 0) {
        let cases = document.createElement("p");
        cases.textContent = "Case x" + caseQ;
        cart.appendChild(cases);
    }
}

function setCaseImg() {
    let colorBtn = document.querySelector('input[name="color-choice"]:checked').value;

    switch (colorBtn) {
        case "black":
            document.querySelector("#case-img1").src = "img/black-pc.png"
            break;
        case "white":
            document.querySelector("#case-img1").src = "img/white-pc.png"
            break;
        case "blue":
            document.querySelector("#case-img1").src = "img/blue-pc.png"
            break;
        default:
            break;
    }
}

function setCPUImg() {
    let cpuBtn = document.querySelector('input[name="cpu-choice"]:checked').value;

    switch (cpuBtn) {
        case "amd":
            document.querySelector("#cpu-img").src = "img/ryzen-cpu.jpg"
            break;
        case "intel-i9":
            document.querySelector("#cpu-img").src = "img/intel-i9-cpu.jpg"
            break;
        case "intel-i7":
            document.querySelector("#cpu-img").src = "img/intel-i7-cpu.jpg"
            break;
        default:
            break;
    }
}
function setGPUImg() {
    let gpuBtns = document.querySelector('input[name="gpu-choice"]:checked').value;

    switch (gpuBtns) {
        case "gigabyte":
            document.querySelector("#gpu-img").src = "img/gigabyte-gpu.jpg"
            break;
        case "nvidia":
            document.querySelector("#gpu-img").src = "img/nvidia-gpu.png"
            break;
        case "intel":
            document.querySelector("#gpu-img").src = "img/intel-gpu.jpg"
            break;
        default:
            break;
    }
}