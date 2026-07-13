// =============================================
// CONFIGURAÇÃO
// =============================================
const API_URL = 'http://localhost:8084';
let listaEquipamentos = [];

// =============================================
// EXIBIR DATA ATUAL
// =============================================
function exibirData() {
    const agora = new Date();
    const opcoes = {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('dataAtual').textContent = dataFormatada;
}

// =============================================
// VERIFICAR SE O USUÁRIO ESTÁ LOGADO
// =============================================
function verificarLogin() {
    const nomeExibicao = sessionStorage.getItem('nomeExibicao');
    if (!nomeExibicao) {
        window.location.href = 'login.html';
    }
}

// =============================================
// EXIBIR NOME DA UNIDADE NO SUBTÍTULO
// =============================================
function exibirUnidade() {
    const unidadeNome = sessionStorage.getItem('unidadeNome');
    const ticketId = sessionStorage.getItem('ticketId');
    if (unidadeNome && ticketId) {
        document.getElementById('subtituloUnidade').textContent =
            unidadeNome + ' — Ticket #' + ticketId;
    }
}

// =============================================
// RENDERIZAR A LISTA DE EQUIPAMENTOS NA TELA
// =============================================
function renderizarLista() {
    const listaDiv = document.getElementById('listaEquipamentos');

    if (listaEquipamentos.length === 0) {
        listaDiv.textContent = '';
        return;
    }

    listaDiv.innerHTML = '';

    listaEquipamentos.forEach(function(equip) {
        const linha = document.createElement('div');
        linha.textContent =
            equip.patrimonio + ' | ' +
            equip.equipamento + ' | ' +
            equip.marca + ' | ' +
            equip.modelo + ' | ' +
            equip.setorAlocado + ' | ' +
            equip.verificado;
        linha.style.borderBottom = '1px solid #cccccc';
        linha.style.paddingBottom = '6px';
        linha.style.marginBottom = '6px';
        listaDiv.appendChild(linha);
    });
}

// =============================================
// BOTÃO ADICIONAR
// =============================================
document.getElementById('btnAdicionar').addEventListener('click', function() {

    const patrimonio = document.getElementById('patrimonio').value.trim();
    const equipamento = document.getElementById('equipamento').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const setorAlocado = document.getElementById('setorAlocado').value.trim();
    const verificado = document.getElementById('verificado').value.trim();

    if (patrimonio === '' || equipamento === '' || marca === '' ||
        modelo === '' || setorAlocado === '' || verificado === '') {
        alert('Preencha todos os campos do equipamento antes de adicionar.');
        return;
    }

    listaEquipamentos.push({
        patrimonio: patrimonio,
        equipamento: equipamento,
        marca: marca,
        modelo: modelo,
        setorAlocado: setorAlocado,
        verificado: verificado
    });

    // Limpa os campos após adicionar
    document.getElementById('patrimonio').value = '';
    document.getElementById('equipamento').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('setorAlocado').value = '';
    document.getElementById('verificado').value = '';

    renderizarLista();

});

// =============================================
// BOTÃO CONTINUAR
// =============================================
document.getElementById('btnContinuar').addEventListener('click', function() {

    if (listaEquipamentos.length === 0) {
        alert('Adicione pelo menos um equipamento antes de continuar.');
        return;
    }

    sessionStorage.setItem('listaEquipamentos', JSON.stringify(listaEquipamentos));
    window.location.href = 'entrega-fechamento.html';

});

// =============================================
// BOTÃO VOLTAR
// =============================================
document.getElementById('btnVoltar').addEventListener('click', function() {
    window.location.href = 'home.html';
});

// =============================================
// INICIALIZAÇÃO
// =============================================
verificarLogin();
exibirData();
exibirUnidade();