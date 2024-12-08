document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const itemsContainer = document.querySelector('.items');
    const noResults = document.getElementById('no_results');

    let products = [];

    // Carregar os produtos do JSON
    fetch('produtos2.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));

    // Renderizar os produtos
    function renderProducts(products) {
        itemsContainer.innerHTML = ''; // Limpa a lista
        products.forEach(product => {
            const item = document.createElement('li');
            item.classList.add('item');
            item.innerHTML = `
                <div class="item-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="item-content">
                    <h2 class="item-title">${product.title}</h2>
                    <p class="item-description">${product.description}</p>
                </div>
            `;
            itemsContainer.appendChild(item);
        });
    }

    // Função de busca
    searchInput.addEventListener('input', (event) => {
        const value = formatString(event.target.value);

        const filteredProducts = products.filter(product =>
            formatString(product.title).includes(value) || 
            formatString(product.description).includes(value)
        );

        if (filteredProducts.length > 0) {
            noResults.style.display = 'none';
            renderProducts(filteredProducts);
        } else {
            noResults.style.display = 'block';
        }
    });

    // Função para formatar strings
    function formatString(value) {
        return value
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
});
