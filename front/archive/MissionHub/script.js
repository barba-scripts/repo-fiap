const container = document.getElementById("items");
const totalElement = document.querySelector(".list-collaborators .footer div:nth-child(2)");
const titleElement = document.querySelector(".list-collaborators .title");

axios.get("./mock.json")
    .then(response => {
        const items = response.data.items;
        if (items.length === 0) {
            titleElement.style.display = "none";
        }
        // Renderiza os itens
        items.forEach(item => {
            const divItem = document.createElement("div");
            divItem.classList.add("item");

            const divPhoto = document.createElement("div");
            divPhoto.classList.add("photo");
            divPhoto.style.backgroundImage = `url(${item.photo})`;

            const h3 = document.createElement("h3");
            h3.classList.add("name");
            h3.textContent = item.name;

            divItem.appendChild(divPhoto);
            divItem.appendChild(h3);

            container.appendChild(divItem);
        });

        // Atualiza o total na footer
        totalElement.textContent = `${items.length} ${items.length > 1 || items.length == 0 ? "colaboradores" : "colaborador"}`;

    })
    .catch(error => {
        console.error("Erro ao carregar JSON:", error);
    });

function makeBottomSheet({
    title = "Título",
    message = "Mensagem",
    cancelText = "Cancelar",
    confirmText = "Confirmar",
    onCancel = () => { },
    onConfirm = () => { }
}) {
    const sheet = document.getElementById("bottomSheet");
    const titleEl = sheet.querySelector("h2");
    const messageEl = sheet.querySelector("p");
    const btnCancel = sheet.querySelector(".buttons button:nth-child(1)");
    const btnConfirm = sheet.querySelector(".buttons button:nth-child(2)");
    const btnClose = sheet.querySelector("header i");

    titleEl.textContent = title;
    messageEl.textContent = message;
    btnCancel.textContent = cancelText;
    btnConfirm.textContent = confirmText;

    // Remove handlers antigos e adiciona novos
    btnCancel.onclick = () => { onCancel(); sheet.classList.remove("show"); };
    btnConfirm.onclick = () => { onConfirm(); sheet.classList.remove("show"); };
    btnClose.onclick = () => { sheet.classList.remove("show"); };

    // Abre a bottom sheet com animação
    sheet.classList.add("show");
}

// Seleciona o primeiro botão da navbar (ícone de voltar)
const btnVoltar = document.getElementById("nav-voltar");

btnVoltar.addEventListener("click", () => {    
    makeBottomSheet({
        title: "Deseja salvar suas alterações?",
        message: "No caso de sair sem salvar as alterações serão perdidas.",
        cancelText: "Sair",
        confirmText: "Salvar",
        onCancel: () => {
            document.getElementById("bottomSheet").classList.remove("show");
            history.back();
        },
        onConfirm: () => postMissions("back")
    });
});

const btnContinuar = document.getElementById("continue-button");

btnContinuar.addEventListener("click", () => {    
    makeBottomSheet({
        title: "Deseja finalizar a criação do ciclo?",
        message: "Tem certeza que deseja finalizar a criação do ciclo?",
        cancelText: "Cancelar",
        confirmText: "Finalizar",
        onCancel: () => {},
        onConfirm: () => postMissions("next")
    });
});

function postMissions(route) {
    // fazer o post das missoes

    if (route === "back") {
        document.getElementById("bottomSheet").classList.remove("show");
        history.back();
    }

    if (route === "next") {
        // ir pra tela de sucesso
    }   
}
