let tableBody = document.querySelector("#crew-table tbody")
let total = document.querySelectorAll("tfoot tr td span")[1]
let suitabilityTotal = document.querySelector(".suitabilities h2")
let suitabilityPercent = document.querySelector("#percent")

axios.get("./mock.json")
  .then(response => {
    const data = response.data;
    wSuitabilityForm = data.filter(crewMember => crewMember.hasSuitability)

    let percent = wSuitabilityForm.length / data.length * 100

    data.forEach(crewMember => {
      console.log(crewMember)
      setupTableRow(tableBody, crewMember)
    })

    setupIdentifier(total, `${data.length} missões`)
    setupIdentifier(suitabilityTotal, wSuitabilityForm.length)
    setupIdentifier(suitabilityPercent, `${percent}%`)
  })
  .catch(error => {
    console.error("Erro ao carregar JSON:", error);
  });

function setupIdentifier(element, text) {
  element.innerHTML = text
}

function setupTableRow(tableBody, item) {
    let row = document.createElement("tr")

    let name = item.name
    let suitabilityFlag = item.hasSuitability
    let ticketMedio = item.ticketMedio

    row.innerHTML = `
    <td>
    <div class="crew-member">
    <div class="cell">
    <div class="avatar">${getInitials(name)}</div>
    <div class="text-content">${name}</div>
    </div>
    </div>
    </td>
    <td>
    <div class="crew-suit">
    <input type="checkbox" disabled ${suitabilityFlag ? "checked" : ""}>
    </div>
    </td>
    <td>
    <div class="text-content">${ticketMedio}</div>
    </td>
    `
    tableBody.appendChild(row)
}


function getInitials(name) {
  let names = name.split(" "), initals = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initals += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initals
}