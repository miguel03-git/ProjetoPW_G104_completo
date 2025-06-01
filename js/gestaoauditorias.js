const { createApp } = Vue;

createApp({
  data() {
    return {
      filtro: '',
      submenuAberto: true,
      auditorias: [
        {
          nome: "Auditoria de Segurança",
          descricao: "Verificação de equipamentos de segurança",
          local: "Fábrica A",
          equipa: "Equipa 1",
          data: "2025-04-01",
          materiais: "Checklists, Equipamentos de medição"
        },
        {
          nome: "Auditoria Ambiental",
          descricao: "Avaliação de impacto ambiental",
          local: "Fábrica B",
          equipa: "Equipa 2",
          data: "2025-04-10",
          materiais: "Relatórios, Sensores"
        }
      ],
      auditoriaSelecionada: null,
      novaAuditoria: {
        nome: '',
        descricao: '',
        local: '',
        equipa: '',
        data: '',
        materiais: ''
      }
    };
  },
  computed: {
    auditoriasFiltradas() {
      return this.auditorias.filter(a =>
        a.nome.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  },
  methods: {
    toggleSubmenu() {
      this.submenuAberto = !this.submenuAberto;
    },
    selecionarAuditoria(index) {
      this.auditoriaSelecionada = index;
    },
    guardarAlteracoes() {
      alert("Alterações guardadas com sucesso!");
      this.auditoriaSelecionada = null;
    },
    removerAuditoria(index) {
      this.auditorias.splice(index, 1);
      alert("Auditoria removida com sucesso!");
    },
    adicionarAuditoria() {
      this.auditorias.push(this.novaAuditoria);
      alert("Auditoria adicionada com sucesso!");
      this.limparFormulario();
    },
    limparFormulario() {
      this.novaAuditoria = {
        nome: '',
        descricao: '',
        local: '',
        equipa: '',
        data: '',
        materiais: ''
      };
    }
  }
}).mount("#app"); 