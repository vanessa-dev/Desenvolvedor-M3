let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');
let btnDetalhes = document.querySelectorAll('.filtros__cabecalho .sanfona__titulo');
let btnComprar = document.querySelectorAll('button.produtos__btn__comprar');
let sacola = document.querySelector('.cabecalho__qtd');
let produtos = document.querySelector('.produtos');
let checkboxTamanho = document.querySelectorAll('.filter__container.tamanhos input');
let filtrosInput = document.querySelectorAll('.filter__container input');
let filtrosCores = [];
let filtroTamanho = "";
let filtrosPreco = [];

async function filtrarProdutos(cores,tamanho,preco){
    var url = window.location.origin + '/dados/produtos.json';
    const response = await fetch(url);
    const dados    = await response.json();
    let itemProduto = "";
    let prods = [];

    if(cores.length > 0){
        cores.forEach((item) =>{
            dados.products.forEach((produto) =>{
                if (produto.color  == item)  {
                    prods.push(produto);
                }
                
            });
        });
    } else if (preco.length > 0) {
        preco.forEach((item) =>{
            dados.products.filter((produto) =>{
                if (produto.price >= item[0] && produto.price <= item[1]) {
                    prods.push(produto);
                }
                
            });
            
        });
    } else if (tamanho) {
        dados.products.filter((produto) => {
            if (produto.size ==  tamanho) {
                prods.push(produto);
            }  
        });
    }
    console.log(prods);
    if (prods.length > 0) {
       prods.forEach((produto) => {
            itemProduto += `
                <div class="produtos__item">
                    <div class="produtos__imagem">
                        <img src="${produto.src}" alt="Blusa"/>
                    </div>
                    <div class="produtos__descricao">
                        <p class="produtos__nome">${produto.title}</p>
                        <p class="produtos__preco">${produto.price}</p>
                        <p class="produtos__desconto">até ${produto.installments.times}x de R$ ${produto.installments.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                    </div>
                    <button class="produtos__btn__comprar">Comprar</button>
                </div>
            `;
       });

       produtos.innerHTML = itemProduto;
    } else {
        produtos.innerHTML = "<p>Sua busca não encontrou resultado algum :(</p>"; 
    }
    
//    carregarDados();  
};

filtrosInput.forEach((filtrar) => {
    filtrar.onchange = async function filtrar() {
        let name = this.getAttribute("name");
        if(name == "tamanho") {
            if (this.checked){
                filtroTamanho= this.value;
            }
        } else if( name.includes("faixa")) {
            if (this.checked){
                filtrosPreco.push([this.min,this.max]);
            } else {
                filtrosPreco.splice(filtrosPreco.indexOf(this.value), 1);
            }
        }  else{
            if (this.checked){
                filtrosCores.push(this.id);
            } else {
                filtrosCores.splice(filtrosCores.indexOf(this.value), 1);
            }
        }      

        await filtrarProdutos(filtrosCores,filtroTamanho,filtrosPreco);
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

checkboxTamanho.forEach((input) => {
    input.onclick = function active () {
        checkboxTamanho.forEach((removerClass) => {
            removerClass.parentNode.classList.remove("item-ativo");
        });

        if(this.checked){
            this.parentNode.classList.add("item-ativo");
        }
    
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
                    <p class="produtos__preco">R$ ${produto.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                    <p class="produtos__desconto">até ${produto.installments.times}x de R$ ${produto.installments.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                </div>
                <button class="produtos__btn__comprar">Comprar</button>
            </div>
        `;
    });
    produtos.innerHTML = itemProduto;
};
 
carregarDados();


  