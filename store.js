document.querySelectorAll('.buy-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-item');
        const itemPrice = getItemPrice(itemId);

        // Adicione aqui a lógica para verificar se o usuário tem progresso suficiente para comprar o item
        if (progress >= itemPrice) {
            progress -= itemPrice;
            updateProgress();
            alert('Item ' + itemId + ' comprado! Progresso atualizado.');
            // Adicione aqui a lógica para conceder o item permanentemente ao usuário
        } else {
            alert('Você não tem progresso suficiente para comprar o item.');
        }
    });
});

document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Substitua 'index.html' pelo nome da sua página principal
});

function getItemPrice(itemId) {
    // Adicione aqui a lógica para obter o preço do item com base no ID
    // Exemplo simples:
    switch (itemId) {
        case '1':
            return 20;
        case '2':
            return 40;
        default:
            return 0;
    }
}

function updateProgress() {
    document.getElementById('user-progress-store').innerText = userProgress;
}