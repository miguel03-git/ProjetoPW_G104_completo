
const { createApp } = Vue;

createApp({
  data() {
    return {
      peritos: [],
      indiceAEliminar: null,
      mostrarModal: false
    };
  },
  methods: {
    carregarPeritos() {
      const guardados = localStorage.getItem("peritos");
      this.peritos = guardados ? JSON.parse(guardados) : [];
    },
    confirmarEliminacao(index) {
      this.indiceAEliminar = index;
      this.mostrarModal = true;
    },
    eliminar() {
      this.peritos.splice(this.indiceAEliminar, 1);
      localStorage.setItem("peritos", JSON.stringify(this.peritos));
      this.mostrarModal = false;
      this.indiceAEliminar = null;
    },
    cancelar() {
      this.mostrarModal = false;
      this.indiceAEliminar = null;
    }
  },
  mounted() {
    this.carregarPeritos();
  }
}).mount('#app');
