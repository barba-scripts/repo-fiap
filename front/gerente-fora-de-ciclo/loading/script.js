document.addEventListener('DOMContentLoaded', () => {
    const loadingText = document.getElementById('loadingText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successCircle = document.getElementById('successCircle');

    // Sequência de loading
    setTimeout(() => {
        // Após 2 segundos: muda para "Estamos finalizando"
        loadingText.textContent = 'Estamos finalizando';
    }, 2000);

    setTimeout(() => {
        // Após 6 segundos (2s + 4s): mostra o estado de sucesso
        loadingSpinner.style.display = 'none';
        successCircle.classList.add('show');
        loadingText.textContent = 'Sucesso!';
    }, 6000);

    setTimeout(() => {
        // Após 8 segundos (2s + 4s + 2s): redireciona para home
        window.location.href = '../../gerente-em-ciclo/home/index.html';
    }, 8000);
});
