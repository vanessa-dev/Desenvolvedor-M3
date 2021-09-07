let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');
let btnDetalhes = document.querySelectorAll('.filtros__cabecalho .sanfona__titulo');
let btnComprar = document.querySelectorAll('button.produtos__btn__comprar');
let sacola = document.querySelector('.cabecalho__qtd');

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


  