let colaboradores = [
  { nome: "Paula Correa", hasSuitability: true },
  { nome: "Bruno Silva", hasSuitability: false },
  { nome: "Cátia Almeida", hasSuitability: false },
  { nome: "Roberto Ferreira", hasSuitability: false },
]

wOutSuitabilityForm = colaboradores.filter(crewMember => !crewMember.hasSuitability)

setupTable(wOutSuitabilityForm)
setupDropdown(wOutSuitabilityForm)

function setupTable(members) {
  let tableBody = document.querySelector("#crew-table tbody")

  members.forEach(crewMember => {

    let row = document.createElement("tr")

    row.innerHTML = `
    <td>
      <div class="crew-member">
        <div class="avatar">${getInitials(crewMember.nome)}</div>
        <span class="name">${crewMember.nome}</span>
      </div>
    </td>
    `
    tableBody.appendChild(row)
  })

  let total = document.querySelectorAll("tfoot tr td span")[1]

  total.textContent = `${members.length} colaboradores`
}

function setupDropdown(members) {
  let form = document.querySelector(".form-select")

  let defaultOption = document.createElement("option")
  defaultOption.textContent = "Selecionar Colaborador"
  defaultOption.selected = true

  form.appendChild(defaultOption)

  members.forEach(crewMember => {
    let option = document.createElement("option")

    option.textContent = crewMember.nome

    form.appendChild(option)
  })
}

function getInitials(name) {
  let names = name.split(" "), initals = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initals += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initals
}
