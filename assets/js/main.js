let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');
let btnDetalhes = document.querySelectorAll('.filtros__cabecalho .sanfona__titulo');
let btnComprar = document.querySelectorAll('button.produtos__btn__comprar');
let sacola = document.querySelector('.cabecalho__qtd');
let produtos = document.querySelector('.produtos');
let checkboxCores = document.querySelectorAll('.filter__container.cores input');
let filtrosSelecionados = [];

async function filtrarProdutos(filtro){
    var url = window.location.origin + '/dados/produtos.json';
    const response = await fetch(url);
    const dados    = await response.json();
    let itemProduto = '';

    if(filtro.length > 0){
        filtro.forEach((item) =>{
            dados.products.forEach((produto) =>{
                if(item == produto.color) {
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
                }
                
            });
    
            if(itemProduto){
                produtos.innerHTML = itemProduto;
            } else {
                produtos.innerHTML = "<p>Sua busca não encontrou resultado algum :(</p>";
            }
            
        });

        return;
    }
    
   carregarDados();  
};

checkboxCores.forEach((filtrar) => {
    filtrar.onchange = async function filtrar() {
        if(this.checked){
          filtrosSelecionados.push(this.id);
        }else{
            filtrosSelecionados.splice(filtrosSelecionados.indexOf(this.value), 1);
        }

        await filtrarProdutos(filtrosSelecionados);
    }
});


filtros.forEach((filtro) => {
    filtro.onclick = function openFiltro() {
       this.parentNode.classfiltrosSelecionadoos.add("filtros__cabecalho--active");
    }
});

btnClose.forEach((btn) => {
    btn.onclick = function closeFiltro() {
       this.parentNode.classfiltrosSelecionadoos.remove("filtros__cabecalho--active");
    }
});

btnDetalhes.forEach((detalhes) => {
    detalhes.onclick = function toggleDetalhes() {
        if(this.querySelector('i').classfiltrosSelecionadoos.contains('fa-plus')){
            this.nextElementSibling.style.display = "flex";
            this.querySelector('i').classfiltrosSelecionadoos.remove("fa-plus");
            this.querySelector('i').classfiltrosSelecionadoos.add("fa-minus");
            return;
        }

        this.nextElementSibling.style.display = "none";
        this.querySelector('i').classfiltrosSelecionadoos.remove("fa-minus");
        this.querySelector('i').classfiltrosSelecionadoos.add("fa-plus");
        
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

async function carregarDados() {
    var url = window.location.origin + '/dados/produtos.json';
    const response = await fetch(url);
    const dados    = await response.json();
    let itemProduto = '';

    dados.products.forEach((produto)=>{
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
};
 
carregarDados();


  