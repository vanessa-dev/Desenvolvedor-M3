let filtros = document.querySelectorAll('.filtros__cabecalho .filtros__titulo');
let btnClose = document.querySelectorAll('.filtros__cabecalho .filtros__fechar');

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


  