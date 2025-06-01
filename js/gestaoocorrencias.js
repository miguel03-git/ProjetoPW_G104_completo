const { createApp } = Vue;

createApp({
  data() {
    return {
      filtro: '',
      submenuAberto: true,
      ocorrencias: [],  // Array vazio, sem exemplos
      ocorrenciaSelecionada: null,
      novaOcorrencia: {
        titulo: '',
        descricao: '',
        estado: 'Em aberto',
        icon: '../clock.png'
      }
    };
  },
  computed: {
    ocorrenciasFiltradas() {
      return this.ocorrencias.filter(o =>
        o.titulo.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  },
  methods: {
    toggleSubmenu() {
      this.submenuAberto = !this.submenuAberto;
    },
    selecionarOcorrencia(index) {
      this.ocorrenciaSelecionada = index;
    },
    guardarAlteracoes() {
      alert("Alterações guardadas com sucesso!");
      this.ocorrenciaSelecionada = null;
    },
    removerOcorrencia(index) {
      this.ocorrencias.splice(index, 1);
      alert("Ocorrência removida com sucesso!");
    },
    adicionarOcorrencia() {
      const nova = { ...this.novaOcorrencia, id: this.ocorrencias.length + 1 };
      nova.icon = nova.estado === "Em aberto" ? "../clock.png" :
                  nova.estado === "Em análise" ? "../warning.png" : "../check.png";
      this.ocorrencias.push(nova);
      alert("Ocorrência adicionada com sucesso!");
      this.limparFormulario();
    },
    limparFormulario() {
      this.novaOcorrencia = {
        titulo: '',
        descricao: '',
        estado: 'Em aberto',
        icon: '../clock.png'
      };
    }
  }
}).mount("#app");
