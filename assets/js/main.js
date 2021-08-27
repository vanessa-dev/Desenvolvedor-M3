let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');
let btnDetalhes = document.querySelectorAll('.filtros__cabecalho .sanfona__titulo');

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


  