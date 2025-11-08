const user = document.querySelector("#heading span");
const tableBody = document.querySelector("#mission-table tbody")

axios.get("./mock.json")
	.then(response => {
		const data = response.data

		setupUserIdentifier(user, data.username)
		setupTable(tableBody, data.missions)
	})
	.catch(error => {
		console.error("Erro ao carregar JSON:", error);
	});

attachModalListeners()

function setupUserIdentifier(element, text) {
	element.innerHTML = text
}

function setupTable(tableBody, items) {
	tableBody.innerHTML = ""
	items.forEach(item => {
		let row = document.createElement("tr")
		row.className = "mission"
		let statusColor
		let status

		switch (item.status) {
			case "done":
				statusColor = "green"
				status = "Done"
				break
			case "inprogress":
				statusColor = "yellow"
				status = "In Progress"
				break
			case "pending":
				statusColor = "red"
				status = "Pending"
				break
		}

		row.innerHTML = `
			<td>
			${item.name}
			</div>
			</td>
			<td>
			<span class="status ${statusColor}">${status}</span>
			</td>
		`
		tableBody.appendChild(row)
		row.addEventListener('click', (event) => {

			const row = event.target.closest('tr');
			if (row) {
				openModal('modal-mission');
			}
		});
	})

	let total = document.querySelectorAll("tfoot tr td span")[1]
	total.textContent = `${items.length} missões`
}

function openModal(modalId) {
	document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
	document.getElementById(modalId).classList.remove('show');
}

function attachModalListeners() {
	const createButton = document.querySelector('#create')
	const editButton = document.querySelector("#edit")

	createButton.addEventListener('click', () => {
		openModal('create-mission');
	});

	editButton.addEventListener('click', () => {
		closeModal("modal-mission");
		openModal('mission-edit');
	});

	document.querySelectorAll('.close').forEach(element => {
		element.addEventListener('click', (e) => {
			const modal = e.target.closest('.modal-overlay');
			closeModal(modal.id);
		});
	});

	document.querySelectorAll('.button.outline').forEach(element => {
		element.addEventListener('click', (e) => {
			const modal = e.target.closest('.modal-overlay');
			if (modal) {
				closeModal(modal.id);
			}
		});
	});

	document.querySelectorAll('.badge-selector').forEach(group => {
		group.querySelectorAll('.badge').forEach(btn => {
			btn.addEventListener('click', function () {
				group.querySelectorAll('.badge').forEach(b => b.classList.remove('active'));
				this.classList.add('active');
			});
		});
	});
}