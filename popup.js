document.getElementById('activate').addEventListener('click', async function() {
    const key = prompt("Digite sua chave de ativação:");
    if (!key) return;

    try {
        const url = 'https://script.google.com/macros/s/AKfycbzQXlz7JjaMcQFZrMOgceB2cPWfg_eMILixKAVciopS11CmS9zLCdmHXxWfDlFEld3p/exec';
        const response = await fetch(`${url}?key=${encodeURIComponent(key)}`);

        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }

        const data = await response.text();
        console.log('Resposta do servidor:', data); // Para debug

        if (data.includes('true')) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['saveContacts.js']
                });
            });
            alert("Chave válida! Script ativado.");
            window.close();
        } else {
            alert("Chave inválida! Por favor, tente novamente.");
        }
    } catch (error) {
        console.error('Erro:', error);
        alert("Erro ao validar a chave. Por favor, tente novamente.");
    }
});