const { createApp } = Vue;

createApp({
  data() {
    return {
      avaliacoes: [],
      ultimaAvaliacao: 0 // <- para mostrar estrelas coloridas
    };
  },
  computed: {
    mediaEstrelas() {
      if (this.avaliacoes.length === 0) return "⭐ 0.0";
      const media = this.avaliacoes.reduce((a, b) => a + b, 0) / this.avaliacoes.length;
      return `⭐ ${media.toFixed(1)}`;
    }
  },
  methods: {
    avaliar(valor) {
      this.avaliacoes.push(valor);
      this.ultimaAvaliacao = valor;
      localStorage.setItem("avaliacoes", JSON.stringify(this.avaliacoes));
      alert(`Obrigado pela sua avaliação de ${valor} estrela(s)!`);
    },
    carregarAvaliacoes() {
      this.avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    }
  },
  mounted() {
    this.carregarAvaliacoes();
  }
}).mount('#app');
