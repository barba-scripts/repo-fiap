const userField = document.querySelector(".manager-info h1");
const roleField = document.querySelector(".manager-info p")
const avatar = document.querySelector(".avatar")
const storeField = document.querySelector("#store")
const phoneField = document.querySelector("#phone p")
const emailField = document.querySelector("#email p")
const birthdayField = document.querySelector("#birthday p")

axios.get("./mock.json")
    .then(response => {
        const data = response.data;
        
        console.log(data.birthday)

        setupIdentifier(userField, data.username)
        setupIdentifier(roleField, data.role)
        setupIdentifier(avatar, getInitials(data.username))
        setupIdentifier(storeField, data.store)
        setupIdentifier(phoneField, data.phone)
        setupIdentifier(emailField, data.email)
        setupIdentifier(birthdayField, data.birthday)
    })
    .catch(error => {
        console.error("Erro ao carregar JSON:", error);
    });

function setupIdentifier(element, text) {
    element.innerHTML = text
}

function getInitials(name) {
  let names = name.split(" "), initals = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initals += names[names.length - 1].substring(0, 1).toUpperCase()
  }

  return initals
}