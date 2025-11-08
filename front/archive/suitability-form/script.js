let suitabilitySurvey = [
  {
    question: "Há quanto tempo o colaborador trabalha na Swift?",
    answerType: "single",
    options: ["Menos de 3 meses", "De 3 a 6 meses", "De 6 meses a 1 ano", "Mais de 1 ano"]
  },
  {
    question: "Avalie a experiência em vendas deste colaborador",
    answerType: "single",
    options: ["Nenhuma", "Básica", "Intermediária", "Avançada"]
  },
  {
    question: "Quais áreas o colaborador mais se destaca? (Escolha até 2)",
    answerType: "multi",
    options: ["Atendimento ao cliente", "Conhecimento de produtos", "Organização da loja", "Relacionamento com equipe", "Agilidade e execução", "Venda ativa / Cross-sell"]
  },
  {
    question: "O colaborador demonstra engajamento no dia a dia?",
    answerType: "single",
    options: ["Raramente", "Às vezes", "Frequentemente", "Sempre"]
  },
  {
    question: "O quanto esse colaborador demonstra interesse em crescer na empresa?",
    answerType: "single",
    options: ["Nenhum", "Baixo", "Médio", "Alto"]
  },
  {
    question: "Qual estilo de tarefa ele(a) mais se adapta?",
    answerType: "single",
    options: ["Rotinas operacionais", "Atendimento direto ao cliente", "Vendas e metas", "Tarefas variadas"]
  },
  {
    question: "Como você avalia o ritmo de aprendizado desse colaborador?",
    answerType: "single",
    options: ["Lento", "Regular", "Rápido", "Muito rápido"]
  },
  {
    question: "Quais áreas precisam de mais atenção? (Escolha até 2)",
    answerType: "multi",
    options: ["Atendimento ao cliente", "Conhecimento de produtos", "Organização da loja", "Relacionamento com equipe", "Agilidade e execução", "Venda ativa / Cross-sell"]
  }
]

var controle = 0

let back = document.querySelector("#back")
let send = document.querySelector("#send")

setupForm(0)

send.addEventListener("click", () => {
  controle += 1
  setupForm(controle)
})

back.addEventListener("click", () => {
  controle -= 1
  setupForm(controle)
})

function setupForm(stepIndex) {
  let step = document.querySelector("#step")
  let surveyContainer = document.querySelector("#survey-question")
  let question = document.querySelector("#question")

  if (stepIndex == 0) {
    back.style.visibility = "hidden"
  } else {
    back.style.visibility = "visible"
  }

  if (stepIndex == suitabilitySurvey.length) {
    send.textContent = "Finalizar"
    send.onclick = () => {
      window.location.href = "/registrar-missao/index.html"
    }
  }
  step.textContent = `${stepIndex + 1}/${suitabilitySurvey.length + 1}`
  question.textContent = suitabilitySurvey[stepIndex].question
  surveyContainer.textContent = ""

  if (suitabilitySurvey[stepIndex].answerType == "single") {
    suitabilitySurvey[stepIndex].options.forEach((option, optionIndex) => {
      surveyContainer.className = 'single'
      let optionContainer = document.createElement("div")
      optionContainer.className = "option-item"

      let inputId = `radio-${stepIndex}-${optionIndex}`

      optionContainer.innerHTML = `
      <input class="form-check-input me-3" type="radio" 
      name="listGroupRadio-${stepIndex}" 
      id="${inputId}">
      <label class="form-check-label" for="${inputId}">${option}</label>
      `

      optionContainer.addEventListener("click", () => {
        surveyContainer.querySelectorAll(".option-item").forEach(el => {
          el.classList.remove("selected")
          el.querySelector("input").checked = false
        })

        optionContainer.classList.add("selected")
        optionContainer.querySelector("input").checked = true
      })

      surveyContainer.appendChild(optionContainer)
      surveyContainer.appendChild(document.createElement("br"))
    })
  } else {
    suitabilitySurvey[stepIndex].options.forEach((option, optionIndex) => {
      surveyContainer.className = 'multi'
      let optionContainer = document.createElement("button")
      optionContainer.type = "button"
      optionContainer.className = "option-item"
      optionContainer.textContent = option

      optionContainer.addEventListener("click", () => {
        const selectedItems = surveyContainer.querySelectorAll(".option-item.selected")

        if (optionContainer.classList.contains("selected")) {
          optionContainer.classList.remove("selected")
        } else {
          if (selectedItems.length < 2) {
            optionContainer.classList.add("selected")
          }
        }
      })
      surveyContainer.appendChild(optionContainer)
    })
  }
}
