
const { createApp } = Vue;

createApp({
  data() {
    return {
      peritos: []
    };
  },
  methods: {
    carregarPeritos() {
      const guardados = localStorage.getItem("peritos");
      this.peritos = guardados ? JSON.parse(guardados) : [];
    },
    editarPerito(index) {
      localStorage.setItem("peritoEditar", index);
      window.location.href = "editarformulario.html";
    }
  },
  mounted() {
    this.carregarPeritos();
  }
}).mount('#app');
