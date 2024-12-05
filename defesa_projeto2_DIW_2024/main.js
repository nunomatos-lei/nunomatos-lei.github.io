const produtosContainer = document.getElementById('produtos-container');
const cestoContainer = document.getElementById('cesto-container');
const preco1 = document.getElementById('preco');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroPreco = document.getElementById('filtro-preco');
const buscaNome = document.getElementById('busca-nome');
const preco2 = document.getElementById('custo-total');
const compra = document.getElementById('comprar-btn');
const Allin = document.getElementById('allin');
const menosin = document.getElementById('menosInfo');
let produtos = [];

// Global variable for total price
let totalPrice = 0;

// Inicializar cesto
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

    // Update global total price
    totalPrice += parseFloat(item.price);
});

preco1.textContent = totalPrice.toFixed(2) + '$';

// Buscar produtos da API
function buscarProdutos() {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then((response) => response.json())
        .then((data) => {
            produtos = data;
            renderizarProdutos(produtos);
        })
        .catch((error) => console.error('Erro ao buscar produtos:', error));
}

// Renderizar produtos na página
function renderizarProdutos(lista) {
    produtosContainer.innerHTML = '';
    lista.forEach((produto) => {
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

function renderizarProdutosSemInfo(lista) {
    produtosContainer.innerHTML = '';
    lista.forEach((produto) => {
        const artigo = document.createElement('article');
        artigo.innerHTML = `
            <img src="${produto.image}" alt="${produto.title}">
            <h3>${produto.title}</h3>
            <p><strong>Preço:</strong> $${produto.price}</p>
            <button onclick="adicionarAoCesto(${produto.id})">Adicionar ao Cesto</button>
        `;
        produtosContainer.appendChild(artigo);
    });
}

// Adicionar produto ao cesto
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
    cesto.push({ id: produto.id, title: produto.title, price: produto.price });
    localStorage.setItem('cesto', JSON.stringify(cesto));

    // Update global total price
    totalPrice += parseFloat(produto.price);
    atualizarPreco();
}

// Remover produto do cesto
function removerDoCesto(botao, precoProduto, produtoTitle) {
    const itemCesto = botao.parentElement;
    cestoContainer.removeChild(itemCesto);

    // Update global total price
    totalPrice -= precoProduto;
    atualizarPreco();

    let cesto = JSON.parse(localStorage.getItem('cesto'));
    cesto = cesto.filter((item) => item.title !== produtoTitle);
    localStorage.setItem('cesto', JSON.stringify(cesto));
}

// Function to update the displayed price
function atualizarPreco() {
    preco1.textContent = totalPrice.toFixed(2) + '$';
}

compra.addEventListener('click', async () => {
    // Obter dados do formulário
    const isStudent = document.getElementById('estudante-deisi').checked; // Checkbox "És estudante do DEISI?"
    const coupon = document.getElementById('cupao-desconto').value.trim(); // Valor do campo de cupão
    const cesto = JSON.parse(localStorage.getItem('cesto')); // Produtos no cesto
    const address = document.getElementById('address').value.trim();

    // Verificar se o cesto está vazio
    if (cesto.length === 0) {
        alert("Seu cesto está vazio! Adicione produtos antes de comprar.");
        return;
    }

    // Obter IDs dos produtos no cesto
    const productIds = cesto.map(item => item.id);

    try {
        // Chamada à API
        const response = await fetch('https://deisishop.pythonanywhere.com/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products: productIds,
                student: isStudent,
                coupon: coupon,
                address: address
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao processar compra. Verifique os dados e tente novamente.');
        }

        const data = await response.json();

        // Atualizar o custo total com a resposta da API
        document.getElementById('custo-total').textContent = `${data.totalCost}$`;

        // Exibir a referência do pagamento (se existir)
        const respostaCompra = document.getElementById('resposta-compra');
        respostaCompra.textContent = `Compra realizada! Referência: ${data.reference} ${data.address}`;
        respostaCompra.style.color = 'green';
    } catch (error) {
        console.error('Erro na compra:', error);

        const respostaCompra = document.getElementById('resposta-compra');
        respostaCompra.textContent = 'Erro ao processar a compra. Tente novamente.';
        respostaCompra.style.color = 'red';
    }
});


// Filtrar por categoria
filtroCategoria.addEventListener('change', () => {
    const categoria = filtroCategoria.value;
    const filtrados = categoria === 'Todas as categorias'
        ? produtos
        : produtos.filter((p) => p.category === categoria);
    renderizarProdutos(filtrados);
});

// Filtrar por rating
filtroPreco.addEventListener('change', () => {
    const ordem = filtroPreco.value;
    const ordenados = [...produtos].sort((a, b) => {
        return ordem === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    });
    renderizarProdutos(ordenados);
});

// Buscar por nome
buscaNome.addEventListener('input', () => {
    const termo = buscaNome.value.toLowerCase();
    const filtrados = produtos.filter((p) => p.title.toLowerCase().includes(termo) || p.description.includes(termo));
    renderizarProdutos(filtrados);
});

Allin.addEventListener('click', () =>{
  const lista = [...produtos];
  lista.forEach((produto)=>{
    adicionarAoCesto(produto.id);
  })
})

menosin.addEventListener('click', ()=>{
    const lista = [...produtos];
    renderizarProdutosSemInfo(lista);
})

// Inicializar a aplicação
buscarProdutos();
