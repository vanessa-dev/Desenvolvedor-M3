let filtros = document.querySelectorAll('.filtros__cabecalho');

filtros.forEach((filtro) => {
    filtro.onclick = function openFiltro() {
       this.classList.add("filtros__cabecalho--active");
    }
});


  