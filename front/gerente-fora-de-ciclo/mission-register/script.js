const titleName = document.querySelector("main header h3")
const missionsList = document.querySelector(".missions-list")
const missionsArray = []
function renderMissions() {
  missionsList.innerHTML = missionsArray
    .filter(mission => mission.items.length > 0) // só pega os que têm itens
    .map(mission => `
      <div class="nivel${mission.nivel}">
        <p>Nível ${mission.nivel}</p>
        <div class="items">
          ${mission.items.map(item => `
            <div class="item">${item.title}</div>
          `).join("")}
        </div>
      </div>
    `).join("")

  const allItems = missionsArray.flatMap(m => m.items)
  const itemDivs = missionsList.querySelectorAll(".item")

  itemDivs.forEach((el, i) => {
    el.addEventListener("click", () => openDetails(allItems[i]))
  })
}

axios.get("./mock.json")
  .then(res => {
    titleName.textContent = `Cadastrar missões para ${res.data.name}`;
    res.data.missions.forEach((item) => missionsArray.push(item))
    renderMissions()
  })
  .catch(err => {
    titleName.textContent = "Erro ao carregar";
    console.error(err);
  });


const bottomSheet = document.getElementById("bottomSheet")
const confirmationBottomSheet = document.getElementById("confirmationBottomSheet")
const sheetTitle = document.getElementById("sheet-title")
const inputMissionName = document.getElementById("mission-name")
const inputMissionMetric = document.getElementById("mission-metric")
const inputMissionDescription = document.getElementById("mission-description")
const btnCancel = document.getElementById("btn-cancel")
const btnConfirm = document.getElementById("btn-confirm")
const closeIcon = bottomSheet.querySelector("header i:nth-child(2)")
const trashIcon = bottomSheet.querySelector("header i:nth-child(1)")
const nvlButtons = document.querySelectorAll(".nvl-options button")

function openDetails(item) {
  missionEditingId = item.id
  sheetTitle.textContent = "Detalhes da missão"
  inputMissionName.value = item.title
  nvlButtons.forEach((button, index) => {
    if ((item.nivel - 1) === index) {
      button.style.backgroundColor = "rgb(241, 245, 249)"
    } else {
      button.style.backgroundColor = ""
    }
  })
  inputMissionMetric.value = item.metric
  inputMissionDescription.value = item.description
  bottomSheet.classList.add("show")
}

function onClickNivelButton(nivel) {
  nvlButtons.forEach((button, index) => {
    if (index === nivel - 1) {
      button.style.backgroundColor = "rgb(241, 245, 249)"
    } else {
      button.style.backgroundColor = ""
    }
  })
}

function closeSheet() {
  missionEditingId = null
  clearBottomSheet()
  bottomSheet.classList.remove("show")
}

btnCancel.addEventListener("click", closeSheet)
closeIcon.addEventListener("click", closeSheet)
trashIcon.addEventListener("click", deleteMission)

let missionEditingId;

btnConfirm.addEventListener("click", () => {
  let missionNivel = null

  nvlButtons.forEach((button, index) => {
    if (button.style.backgroundColor === "rgb(241, 245, 249)") {
      missionNivel = index + 1
    }
  })

  const obj = {
    id: missionEditingId || crypto.randomUUID(),
    title: inputMissionName.value,
    status: "Não iniciado",
    description: inputMissionDescription.value,
    metric: inputMissionMetric.value,
    nivel: missionNivel
  }

  missionsArray.forEach((nivelObj) => {
    if (nivelObj.nivel === missionNivel) {
      const index = nivelObj.items.findIndex(m => m.id === obj.id)

      if (index !== -1) {
        nivelObj.items[index] = obj
      } else {
        nivelObj.items.push(obj)
      }
    }
  })

  renderMissions()
  // aqui fazer o post para o backend
  closeSheet()
})

const addMissionButton = document.getElementById("add-mission")

function addMission() {
  sheetTitle.textContent = "Criar missão"
  bottomSheet.classList.add("show")
}

function clearBottomSheet() {
  inputMissionName.value = ""
  inputMissionMetric.value = ""
  inputMissionDescription.value = ""
  nvlButtons.forEach((button, index) => {
    button.style.backgroundColor = "white"
  })
}

function getIaMissions() {
  alert("Essa parte é recomendacao de ia. Por não podermos integrar com apis externas, nao foi possivel desenvolver essa parte.")
}

function openConfirmationBottomSheet() {
  confirmationBottomSheet.classList.add("show")
}

function closeConfirmationBottomSheet() {
  confirmationBottomSheet.classList.remove("show")
}

function back() {
  openConfirmationBottomSheet()
}

function backPage() {
  document.getElementById("bottomSheet").classList.remove("show");
  history.back();
} 

function deleteMission() {
  if (!missionEditingId) return

  missionsArray.forEach((nivelObj) => {
    const index = nivelObj.items.findIndex(m => m.id === missionEditingId)
    if (index !== -1) {
      nivelObj.items.splice(index, 1) // remove do array
    }
  })

  renderMissions()
  closeSheet()
}
