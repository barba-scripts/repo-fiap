const user = document.querySelector("#heading span");
const tableBody = document.querySelector("#mission-table tbody");

let controle = 0;
let data;

axios.get("./perguntas_suitability.json")
    .then(response => {
        data = response.data;
        user.textContent = data.name;
        setupForm(controle, data.questions);
    })
    .catch(error => {
        console.error("Erro ao carregar JSON:", error);
    });

let back = document.querySelector("#back");
let send = document.querySelector("#send");

function checkSelectionAndUpdateButton() {
    let surveyContainer = document.querySelector("#survey-question");
    const hasSelection = surveyContainer.querySelector(".option-item.selected") !== null ||
        surveyContainer.querySelector("input:checked") !== null;

    if (hasSelection) {
        send.disabled = false;
        send.style.opacity = "1";
        send.style.cursor = "pointer";
    } else {
        send.disabled = true;
        send.style.opacity = "0.5";
        send.style.cursor = "not-allowed";
    }
}

send.addEventListener("click", () => {
    if (send.disabled) return;

    if (controle < data.questions.length - 1) {
        controle++;
        setupForm(controle, data.questions);
    } else {
        window.location.href = "/gerente-fora-de-ciclo/crew-list-suitability/index.html";
    }
});

back.addEventListener("click", () => {
    if (controle > 0) {
        controle--;
        setupForm(controle, data.questions);
    }
});

function setupForm(stepIndex, suitabilitySurvey) {
    let step = document.querySelector("#step");
    let surveyContainer = document.querySelector("#survey-question");
    let question = document.querySelector("#question");

    back.style.visibility = stepIndex === 0 ? "hidden" : "visible";

    if (stepIndex === suitabilitySurvey.length - 1) {
        send.textContent = "Finalizar";
    } else {
        send.textContent = "Continuar";
    }

    step.textContent = `${stepIndex + 1}/${suitabilitySurvey.length}`;
    question.textContent = suitabilitySurvey[stepIndex].question;
    surveyContainer.textContent = "";

    // Desabilita o botão inicialmente
    checkSelectionAndUpdateButton();

    if (suitabilitySurvey[stepIndex].answerType === "single") {
        surveyContainer.className = "single";

        suitabilitySurvey[stepIndex].options.forEach((option, optionIndex) => {
            let optionContainer = document.createElement("div");
            optionContainer.className = "option-item";

            let inputId = `radio-${stepIndex}-${optionIndex}`;

            optionContainer.innerHTML = `
        <input class="form-check-input me-3" type="radio" 
        name="listGroupRadio-${stepIndex}" 
        id="${inputId}">
        <label class="form-check-label" for="${inputId}">${option}</label>
      `;

            optionContainer.addEventListener("click", () => {
                surveyContainer.querySelectorAll(".option-item").forEach(el => {
                    el.classList.remove("selected");
                    el.querySelector("input").checked = false;
                });

                optionContainer.classList.add("selected");
                optionContainer.querySelector("input").checked = true;
                checkSelectionAndUpdateButton();
            });

            surveyContainer.appendChild(optionContainer);
            surveyContainer.appendChild(document.createElement("br"));
        });
    } else {
        surveyContainer.className = "multi";

        suitabilitySurvey[stepIndex].options.forEach((option) => {
            let optionContainer = document.createElement("button");
            optionContainer.type = "button";
            optionContainer.className = "option-item";
            optionContainer.textContent = option;

            optionContainer.addEventListener("click", () => {
                const selectedItems = surveyContainer.querySelectorAll(".option-item.selected");

                if (optionContainer.classList.contains("selected")) {
                    optionContainer.classList.remove("selected");
                } else {
                    if (selectedItems.length < 2) {
                        optionContainer.classList.add("selected");
                    }
                }
                checkSelectionAndUpdateButton();
            });
            surveyContainer.appendChild(optionContainer);
        });
    }
}
