const firstAward = document.getElementById("first-place")
const secondAward = document.getElementById("second-place")
const thirdAward = document.getElementById("third-place")
const submitButton = document.querySelector("button.button.normal")

function validateInputs() {
    const isValid = firstAward.value.trim() !== "" &&
        secondAward.value.trim() !== "" &&
        thirdAward.value.trim() !== ""

    submitButton.disabled = !isValid
}

// Adiciona listeners para validar em tempo real
firstAward.addEventListener("input", validateInputs)
secondAward.addEventListener("input", validateInputs)
thirdAward.addEventListener("input", validateInputs)

// Valida no carregamento da página
validateInputs()

function submitAwards(event) {
    event.preventDefault()
    const obj = {
        firstAward: firstAward.value,
        secondAward: secondAward.value,
        thirdAward: thirdAward.value
    }
    console.log(obj);

    firstAward.value = ""
    secondAward.value = ""
    thirdAward.value = ""

    window.location.href = "../create-cycle/index.html";
}

function back() {
    history.back();
}