let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');
let btnDetalhes = document.querySelectorAll('.filtros__cabecalho .sanfona__titulo');
let btnComprar = document.querySelectorAll('button.produtos__btn__comprar');
let sacola = document.querySelector('.cabecalho__qtd');
let produtos = document.querySelector('.produtos');

filtros.forEach((filtro) => {
    filtro.onclick = function openFiltro() {
       this.parentNode.classList.add("filtros__cabecalho--active");
    }
});

btnClose.forEach((btn) => {
    btn.onclick = function closeFiltro() {
       this.parentNode.classList.remove("filtros__cabecalho--active");
    }
});

btnDetalhes.forEach((detalhes) => {
    detalhes.onclick = function toggleDetalhes() {
        if(this.querySelector('i').classList.contains('fa-plus')){
            this.nextElementSibling.style.display = "flex";
            this.querySelector('i').classList.remove("fa-plus");
            this.querySelector('i').classList.add("fa-minus");
            return;
        }

        this.nextElementSibling.style.display = "none";
        this.querySelector('i').classList.remove("fa-minus");
        this.querySelector('i').classList.add("fa-plus");
        
    }
});

btnComprar.forEach((pedido) => {
    pedido.onclick = function comprar() {
       qtd = + sacola.dataset.pedidos;
       qtd ++;
    
       sacola.innerText = qtd;
       sacola.dataset.pedidos = qtd;

    }
});

(async function carregarDados() {
    var url = window.location.origin + '/dados/produtos.json';
    const response = await fetch(url);
    const dados    = await response.json();
    let itemProduto = '';

    dados.products.forEach((produto)=>{
        console.log(produto.src);
        itemProduto += `
            <div class="produtos__item">
                <div class="produtos__imagem">
                    <img src="${produto.src}" alt="Blusa"/>
                </div>
                <div class="produtos__descricao">
                    <p class="produtos__nome">${produto.title}</p>
                    <p class="produtos__preco">${produto.price}</p>
                    <p class="produtos__desconto">até 3x de R$ 9,33</p>
                </div>
                <button class="produtos__btn__comprar">Comprar</button>
            </div>
        `;
    });
    produtos.innerHTML = itemProduto;
})();
  


  