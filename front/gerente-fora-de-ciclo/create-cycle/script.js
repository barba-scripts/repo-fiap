function back() {
	window.history.back();
}

// Carregar e renderizar as ações
async function loadActions() {
	try {
		const response = await fetch('mock.json');
		const data = await response.json();

		const itemsContainer = document.querySelector('.items');
		itemsContainer.innerHTML = '';

		data.actions.forEach(action => {
			const item = createActionItem(action);
			itemsContainer.appendChild(item);
		});

		// Verificar e atualizar o estado do botão
		updateButtonState(data.actions);
	} catch (error) {
		console.error('Erro ao carregar actions:', error);
	}
}

// Atualizar estado do botão baseado nos status
function updateButtonState(actions) {
	const button = document.querySelector('main button');
	const allCompleted = actions.every(action => action.status === 3);

	if (allCompleted) {
		button.disabled = false;
		button.classList.remove('disabled');
	} else {
		button.disabled = true;
		button.classList.add('disabled');
	}
}

// Criar elemento de item de ação
function createActionItem(action) {
	const item = document.createElement('div');
	item.className = 'item';
	item.style.cursor = 'pointer';

	// Adicionar evento de clique para redirecionar
	item.addEventListener('click', () => {
		window.location.href = action.screen;
	});

	// Definir o ícone baseado no status
	const icon = getIconByStatus(action.status);

	// Definir o texto do status
	const statusText = getStatusText(action.status);

	item.innerHTML = `
        <div class="item-header">
            ${icon}
            <h4>${action.title}</h4>
        </div>
        <p>${statusText}</p>
    `;

	return item;
}

// Obter ícone baseado no status
function getIconByStatus(status) {
	switch (status) {
		case 1: // Não iniciado - Info azul/cinza
			return `
                <svg class="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" />
                    <path d="M8 7.33333V11.3333M8 4.66667H8.00667" stroke="currentColor" stroke-width="1.2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
		case 2: // Incompleto - Info laranja
			return `
                <svg class="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg" style="color: #F97316;">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" />
                    <path d="M8 7.33333V11.3333M8 4.66667H8.00667" stroke="currentColor" stroke-width="1.2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
		case 3: // Feito - Check verde
			return `
                <svg class="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg" style="color: #22C55E;">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" />
                    <path d="M5 8L7 10L11 6" stroke="currentColor" stroke-width="1.2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
		default:
			return '';
	}
}

// Obter texto do status
function getStatusText(status) {
	switch (status) {
		case 1:
			return 'Não iniciado';
		case 2:
			return 'Incompleto';
		case 3:
			return 'Feito';
		default:
			return '';
	}
}

// Carregar as ações quando a página carregar
document.addEventListener('DOMContentLoaded', loadActions);
