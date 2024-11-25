const produtosContainer = document.getElementById('produtos-container');
const cestoContainer = document.getElementById('cesto-container');
const preco1 = document.getElementById('preco');

if (!localStorage.getItem('cesto')) {
    localStorage.setItem('cesto', JSON.stringify([]));
}

const cesto = JSON.parse(localStorage.getItem('cesto'));
cesto.forEach((item) => {
    const itemCesto = document.createElement('section');
    itemCesto.classList.add('item-cesto');
    itemCesto.innerHTML = `
        ${item.title} - $${item.price}
        <button class="remove-btn" onclick="removerDoCesto(this, ${item.price}, '${item.title}')">x</button>
    `;
    cestoContainer.appendChild(itemCesto);
});

const totalPrice = cesto.reduce((sum, item) => sum + parseFloat(item.price), 0);
preco1.textContent = totalPrice.toFixed(2) + '$';

function renderizarProdutos() {
    produtos.forEach((produto) => {
        const artigo = document.createElement('article');
        artigo.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p>${produto.description}</p>
            <p><strong>Preço:</strong> $${produto.price}</p>
            <button onclick="adicionarAoCesto(${produto.id})">Adicionar ao Cesto</button>
        `;
        produtosContainer.appendChild(artigo);
    });
}

function adicionarAoCesto(produtoId) {
    const produto = produtos.find((p) => p.id === produtoId);

    const itemCesto = document.createElement('section');
    itemCesto.classList.add('item-cesto');
    itemCesto.innerHTML = `
        ${produto.title} - $${produto.price}
        <button class="remove-btn" onclick="removerDoCesto(this, ${produto.price}, '${produto.title}')">x</button>
    `;

    cestoContainer.appendChild(itemCesto);

    const cesto = JSON.parse(localStorage.getItem('cesto'));
    cesto.push({ title: produto.title, price: produto.price });
    localStorage.setItem('cesto', JSON.stringify(cesto));

    const valorAtual = parseFloat(preco1.textContent) || 0;
    const novoPreco = parseFloat(produto.price);
    preco1.textContent = (valorAtual + novoPreco).toFixed(2) + '$';
}

function removerDoCesto(botao, precoProduto, produtoTitle) {
    const itemCesto = botao.parentElement;
    cestoContainer.removeChild(itemCesto);

    const valorAtual = parseFloat(preco1.textContent) || 0;
    preco1.textContent = (valorAtual - precoProduto).toFixed(2) + '$';

    let cesto = JSON.parse(localStorage.getItem('cesto'));
    cesto = cesto.filter((item) => item.title !== produtoTitle);
    localStorage.setItem('cesto', JSON.stringify(cesto));
}

renderizarProdutos();
