const app = Vue.createApp({
  data() {
    return {
      materiais: [],
      filtro: '',
      materialSelecionado: null,
      novoMaterial: {
        nome: '',
        descricao: '',
        quantidade: 0,
        local: '',
        tipo: ''
      }
    };
  },
  computed: {
    materiaisFiltrados() {
      const termo = this.filtro.toLowerCase();
      return this.materiais.filter(mat =>
        mat.nome.toLowerCase().includes(termo) ||
        mat.descricao.toLowerCase().includes(termo) ||
        mat.local.toLowerCase().includes(termo) ||
        mat.tipo.toLowerCase().includes(termo)
      );
    }
  },
  mounted() {
    this.carregarMateriais();
  },
  methods: {
    carregarMateriais() {
      const dados = localStorage.getItem('materiais');
      if (dados) {
        this.materiais = JSON.parse(dados);
      }
    },
    guardarMateriais() {
      localStorage.setItem('materiais', JSON.stringify(this.materiais));
    },
    adicionarMaterial() {
      if (this.novoMaterial.nome && this.novoMaterial.descricao && this.novoMaterial.local && this.novoMaterial.tipo) {
        this.materiais.push({ ...this.novoMaterial });
        this.guardarMateriais();
        this.limparFormulario();
        
      }
    },
    removerMaterial(index) {
      if (confirm('Tem a certeza que deseja apagar este material?')) {
        this.materiais.splice(index, 1);
        this.guardarMateriais();
        if (this.materialSelecionado === index) this.materialSelecionado = null;
      }
    },
    selecionarMaterial(index) {
      this.materialSelecionado = index;
    },
    guardarAlteracoes() {
      this.guardarMateriais();
      this.materialSelecionado = null;
    },
    cancelarEdicao() {
      this.carregarMateriais();
      this.materialSelecionado = null;
    },
    limparFormulario() {
      this.novoMaterial = {
        nome: '',
        descricao: '',
        quantidade: 0,
        local: '',
        tipo: ''
      };
    }
  }
});

app.mount('#app');
