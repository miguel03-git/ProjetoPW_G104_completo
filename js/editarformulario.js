const { createApp } = Vue;

createApp({
  data() {
    return {
      submenuAberto: true,
      index: null,
      perito: {
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        genero: '',
        email: '',
        telemovel: '',
        area: ''
      }
    };
  },
  methods: {
    toggleSubmenu() {
      this.submenuAberto = !this.submenuAberto;
    },
    carregarPerito() {
      this.index = localStorage.getItem("peritoEditar");
      const peritos = JSON.parse(localStorage.getItem("peritos")) || [];
      if (this.index !== null && peritos[this.index]) {
        this.perito = { ...peritos[this.index] };
      } else {
        alert("Erro ao carregar perito.");
        window.location.href = "editarperito.html";
      }
    },
    guardarAlteracoes() {
      const peritos = JSON.parse(localStorage.getItem("peritos")) || [];
      if (this.index !== null && peritos[this.index]) {
        peritos[this.index] = { ...this.perito };
        localStorage.setItem("peritos", JSON.stringify(peritos));
        alert("Perito atualizado com sucesso!");
        window.location.href = "editarperito.html";
      }
    }
  },
  mounted() {
    this.carregarPerito();
  }
}).mount('#app');
