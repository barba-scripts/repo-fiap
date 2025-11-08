const user = document.querySelector("#heading span");
const store = document.querySelector("#store")

axios.get("./mock.json")
    .then(response => {
        const data = response.data;
        setupIdentifier(user, data.username)
        setupIdentifier(store, data.store)
    })
    .catch(error => {
        console.error("Erro ao carregar JSON:", error);
    });

function setupIdentifier(element, text) {
    element.innerHTML = text
}