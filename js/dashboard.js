let chartOcorrenciasMes, chartTiposOcorrencia, chartResolvidas, chartMateriais;

// Atualiza os cartões de resumo (peritos, áreas, etc.)
function atualizarCards(dados) {
  const total = dados.length;
  document.getElementById('total-peritos-value').textContent = total;

  const areas = {};
  dados.forEach(p => {
    if (p.area) {
      areas[p.area] = (areas[p.area] || 0) + 1;
    }
  });

  const areasDiv = document.getElementById('areas-values');
  if (Object.keys(areas).length === 0) {
    areasDiv.innerHTML = `<span class="card-value">-</span>`;
  } else {
    areasDiv.innerHTML = Object.entries(areas)
      .map(([area, count]) => `<span><strong>${area}:</strong> ${count}</span>`)
      .join("<br>");
  }
}

// Atualiza dados principais e tabela de peritos
async function atualizarDashboard() {
  const dados = JSON.parse(localStorage.getItem("peritos")) || [];
  document.getElementById('saudacao').textContent = "Bem-vindo!";
  document.getElementById('data').textContent = new Date().toLocaleDateString('pt-PT');
  document.getElementById('hora').textContent = new Date().toLocaleTimeString('pt-PT');

  document.getElementById('tabela-dados').innerHTML = gerarTabela(dados);
  atualizarCards(dados);
}

// Gera tabela de peritos
function gerarTabela(dados) {
  if (!dados.length) {
    return `<tr><td colspan="6" class="text-center text-muted">Nenhum perito registado.</td></tr>`;
  }
  return dados.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.nome ?? ''}</td>
      <td>${item.sobrenome ?? ''}</td>
      <td>${item.email ?? ''}</td>
      <td>${item.telemovel ?? ''}</td>
      <td>${item.area ?? ''}</td>
    </tr>`).join('');
}

// Atualiza dados de ocorrências, auditorias e materiais
function atualizarResumoDashboard() {
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  const auditorias = JSON.parse(localStorage.getItem("auditorias")) || [];
  const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

  document.getElementById("total-ocorrencias-value").textContent = ocorrencias.length;
  document.getElementById("total-auditorias-value").textContent = auditorias.length;
  document.getElementById("total-materiais-value").textContent = materiais.length;

  document.getElementById("ocorrencias-recentes").innerHTML = ocorrencias.slice(-3).reverse().map(o =>
    `<li class="list-group-item"><strong>${o.tipo || 'Tipo'}</strong> em ${o.local || 'Local'} <span class="text-muted">(${o.data || ''})</span></li>`
  ).join('') || '<li class="list-group-item text-muted">Sem ocorrências recentes.</li>';

  document.getElementById("auditorias-recentes").innerHTML = auditorias.slice(-3).reverse().map(a =>
    `<li class="list-group-item"><strong>${a.nome || 'Auditoria'}</strong> em ${a.local || 'Local'} <span class="text-muted">(${a.data || ''})</span></li>`
  ).join('') || '<li class="list-group-item text-muted">Sem auditorias recentes.</li>';

  document.getElementById("materiais-recentes").innerHTML = materiais.slice(-3).reverse().map(m =>
    `<li class="list-group-item"><strong>${m.nome || 'Material'}</strong> (${m.quantidade || 0}) <span class="text-muted">${m.local || ''}</span></li>`
  ).join('') || '<li class="list-group-item text-muted">Sem materiais recentes.</li>';
}

// Inicializa os gráficos
function inicializarGraficos() {
  chartOcorrenciasMes = new Chart(document.getElementById('chart-ocorrencias-mes'), {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Ocorrências', data: [], backgroundColor: '#0d6efd' }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  chartTiposOcorrencia = new Chart(document.getElementById('chart-tipos-ocorrencia'), {
    type: 'pie',
    data: { labels: [], datasets: [{ data: [], backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'] }] },
    options: { responsive: true }
  });

  chartResolvidas = new Chart(document.getElementById('grafico-linhas-resolvidas'), {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Resolvidas', data: [], borderColor: '#0d6efd', tension: 0.3 }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  chartMateriais = new Chart(document.getElementById('grafico-barras-materiais'), {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Materiais Usados', data: [], backgroundColor: '#198754' }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

// Atualiza os dados dos gráficos
function atualizarGraficos() {
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

  const ocorrenciasPorMes = {};
  const tiposOcorrencia = {};
  const resolvidasPorMes = {};
  const materiaisPorMes = {};

  ocorrencias.forEach(o => {
    if (!o.data) return;
    const [d, m, a] = o.data.split('/');
    const chave = `${m}/${a}`;
    ocorrenciasPorMes[chave] = (ocorrenciasPorMes[chave] || 0) + 1;

    const tipo = o.tipo || 'Outro';
    tiposOcorrencia[tipo] = (tiposOcorrencia[tipo] || 0) + 1;

    if (o.estado === 'Resolvido') {
      resolvidasPorMes[chave] = (resolvidasPorMes[chave] || 0) + 1;
    }
  });

materiais.forEach(m => {
  const quantidade = parseInt(m.quantidade);
  if (!isNaN(quantidade)) {
    // Se tiver data, usa; senão assume "01/01/2025"
    const dataStr = m.data || "01/01/2025";
    const [dia, mes, ano] = dataStr.split('/');
    const chave = `${mes}/${ano}`;
    materiaisPorMes[chave] = (materiaisPorMes[chave] || 0) + quantidade;
  }
});


  chartOcorrenciasMes.data.labels = Object.keys(ocorrenciasPorMes);
  chartOcorrenciasMes.data.datasets[0].data = Object.values(ocorrenciasPorMes);
  chartOcorrenciasMes.update();

  chartTiposOcorrencia.data.labels = Object.keys(tiposOcorrencia);
  chartTiposOcorrencia.data.datasets[0].data = Object.values(tiposOcorrencia);
  chartTiposOcorrencia.update();

  chartResolvidas.data.labels = Object.keys(resolvidasPorMes);
  chartResolvidas.data.datasets[0].data = Object.values(resolvidasPorMes);
  chartResolvidas.update();

  chartMateriais.data.labels = Object.keys(materiaisPorMes);
  chartMateriais.data.datasets[0].data = Object.values(materiaisPorMes);
  chartMateriais.update();
}

// Filtro de pesquisa por nome de perito
document.getElementById('search-peritos').addEventListener('input', function () {
  const filtro = this.value.toLowerCase();
  document.querySelectorAll('#tabela-peritos tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(filtro) ? '' : 'none';
  });
});

// Inicialização
window.onload = function () {
  atualizarDashboard();
  atualizarResumoDashboard();
  inicializarGraficos();
  atualizarGraficos();
};

// Atualiza tudo a cada 1 segundo
setInterval(() => {
  atualizarDashboard();
  atualizarGraficos();
}, 1000);
