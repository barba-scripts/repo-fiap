const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const saveButton = document.getElementById('save-button');
const startDateError = document.getElementById('start-date-error');
const endDateError = document.getElementById('end-date-error');

// Função para obter data de amanhã no formato YYYY-MM-DD
function getTomorrowDateString() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Função para calcular diferença em dias
function getDaysDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1 + 'T00:00:00');
    const date2 = new Date(dateString2 + 'T00:00:00');
    const diffTime = date2 - date1;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Limpar mensagem de erro
function clearError(errorElement) {
    errorElement.textContent = '';
}

// Mostrar mensagem de erro
function showError(errorElement, message) {
    errorElement.textContent = message;
}

// Validar data de início
function validateStartDate() {
    if (!startDateInput.value) {
        clearError(startDateError);
        return false;
    }

    const tomorrow = getTomorrowDateString();

    if (startDateInput.value < tomorrow) {
        showError(startDateError, 'A data de início deve ser a partir de amanhã');
        return false;
    }

    clearError(startDateError);
    return true;
}

// Validar data de término
function validateEndDate() {
    if (!endDateInput.value) {
        clearError(endDateError);
        return false;
    }

    if (!startDateInput.value) {
        clearError(endDateError);
        return false;
    }

    if (endDateInput.value <= startDateInput.value) {
        showError(endDateError, 'A data de término deve ser posterior à data de início');
        return false;
    }

    const daysDiff = getDaysDifference(startDateInput.value, endDateInput.value);

    if (daysDiff < 14) {
        showError(endDateError, 'O período deve ser de no mínimo 2 semanas (14 dias)');
        return false;
    }

    clearError(endDateError);
    return true;
}

// Atualizar estado do botão
function updateButtonState() {
    const isStartValid = validateStartDate();
    const isEndValid = validateEndDate();

    if (isStartValid && isEndValid) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
}

// Validar em tempo real
startDateInput.addEventListener('change', function () {
    updateButtonState();
});

endDateInput.addEventListener('change', function () {
    updateButtonState();
});

// Estado inicial do botão
updateButtonState();

// Validar ao salvar
saveButton.addEventListener('click', function (e) {
    e.preventDefault();

    const isStartValid = validateStartDate();
    const isEndValid = validateEndDate();

    if (!isStartValid || !isEndValid) {
        return;
    }

    window.location='/gerente-fora-de-ciclo/missionHub/index.html'
});
