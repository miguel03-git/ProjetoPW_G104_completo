const { createApp } = Vue;

createApp({
  data() {
    return {
      submenuAberto: false,
      perito: {
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        genero: 'masculino',
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
    registarPerito() {
      const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
      peritos.push({ ...this.perito });
      localStorage.setItem('peritos', JSON.stringify(peritos));
      alert("Perito registado com sucesso!");
      this.perito = {
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        genero: 'masculino',
        email: '',
        telemovel: '',
        area: ''
      };
    }
  }
}).mount('#app');
