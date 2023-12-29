let progress = 0;
let itemCost = 10;

document.getElementById('buy-btn').addEventListener('click', function() {
    // Adicione aqui o código para verificar se o usuário tem progresso suficiente para comprar o item
    if (progress >= itemCost) {
        progress -= itemCost;
        itemCost *= 2;
        updateProgress();
        alert('Item comprado! Progresso atualizado.');
    } else {
        
    }
});

// Adicione este código para redirecionar para a página da loja quando o botão for pressionado
document.getElementById('buy-btn').addEventListener('click', function() {
    window.location.href = 'loja.html'; // Substitua 'loja.html' pelo nome da sua página de loja
});