chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "validateKey") {
        validateAndInitialize(request.key);
    } else if (request.action === "downloadContacts") {
        // Lógica para baixar contatos
        downloadContacts();
    }
});

async function validateAndInitialize(key) {
    const API_URL = 'https://script.google.com/macros/s/...';
    try {
        const response = await fetch(`${API_URL}?key=${key}`);
        const data = await response.json();
        
        if (data.valid) {
            alert('Chave válida! Você pode baixar os contatos.');
            // Aqui você pode inicializar o ContactSaver ou qualquer outra lógica necessária
        } else {
            alert('Chave inválida ou já utilizada!');
        }
    } catch (error) {
        console.error('Erro ao validar chave:', error);
        alert('Erro ao validar chave. Por favor, tente novamente.');
    }
}

function downloadContacts() {
    // Lógica para gerar e baixar o arquivo CSV
    const csvContent = generateCSV(); // Função que você deve implementar para gerar o CSV
    const filename = `contatos_${new Date().toISOString().slice(0, 10)}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Contatos baixados com sucesso!');
}

function generateCSV() {
    // Implemente a lógica para gerar o CSV a partir dos contatos
    return 'Name;Mobile Phone\nJohn Doe;123456789\nJane Doe;987654321'; // Exemplo
}