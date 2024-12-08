document.addEventListener("DOMContentLoaded", function() {
  const novoConteiner = document.getElementById('novo-container');

  fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(noticia => {
        const aside = document.createElement('aside');
        aside.innerHTML = `
          <img src="${noticia.img}" alt="${noticia.title}">
          <h2>${noticia.title}</h2>
          <p class="resumo">${noticia.contents}</p> <!-- Exibe diretamente o conteúdo completo -->
        `;

        // Remover o código relacionado ao botão Veja Mais
        // Não há mais necessidade de selecionar ou adicionar event listeners para o botão

        novoConteiner.appendChild(aside);
      });
    })
    .catch(error => console.error('Erro ao subir noticias:', error));
});
