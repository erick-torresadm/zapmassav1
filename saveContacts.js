function newButton(text, callback, position) {
    var a = document.createElement('button');
    a.innerHTML = text;
    a.style.backgroundColor = '#44c767';
    a.style.backgroundImage = 'linear-gradient(#44c767, #64e787)';
    a.style.borderRadius = '28px';
    a.style.border = '1px solid #18ab29';
    a.style.display = 'inline-block';
    a.style.color = '#ffffff';
    a.style.fontSize = '17px';
    a.style.padding = '11px 31px';
    a.style.position = 'fixed';
    a.style.right = `${10 + ((150 + 15) * (position - 1))}px`;
    a.style.width = '150px';
    a.style.top = '7px';
    a.style.zIndex = '999999'; // Aumentei o z-index
    document.body.appendChild(a);
    a.addEventListener('click', callback);
}

function getContent(nameBase) {
    let content = 'Name;Mobile Phone\n';
    let counter = 1;
    
    for (let phone in window.sContacts) {
        // Limpa o número de telefone de caracteres especiais
        let cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        content += `${nameBase}${counter};${cleanPhone}\n`;
        counter++;
    }
    
    return content;
}

function download(content) {
    // Criar um Blob com o conteúdo
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    
    // Criar URL para o Blob
    const url = window.URL.createObjectURL(blob);
    
    // Criar elemento de link temporário
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contacts.csv');
    
    // Adicionar o link ao documento
    document.body.appendChild(link);
    
    // Simular clique no link
    link.click();
    
    // Limpar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function init() {
    newButton('Salvar Contatos', () => {
        let nameBase = prompt('Com qual nome deseja salvar os contatos?');
        if (nameBase) {
            download(getContent(nameBase));
        }
    }, 1);
    getNumbers();
    document.querySelector('#pane-side').addEventListener('scroll', getNumbers);
}

function getNumbers() {
    if (window.sContacts === undefined) window.sContacts = {};
    document.querySelectorAll('span[title]').forEach(element => {
        let phone = element.innerText || element.getAttribute('title');
        if (/^\+?\d[\d\s\-\(\)]+$/.test(phone)) {
            phone = phone.trim().replace(/\s+/g, ' ');
            window.sContacts[phone] = phone;
            element.style.backgroundColor = '#00ff00';
        } else {
            element.style.backgroundColor = 'inherit';
        }
    });
}

// Adicionar um pequeno delay antes de iniciar
setTimeout(init, 1000);