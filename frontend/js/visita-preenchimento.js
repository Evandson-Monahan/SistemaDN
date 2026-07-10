// =============================================
// CONFIGURAÇÃO
// =============================================
const API_URL = 'http://localhost:8084';

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
// BOTÃO CONTINUAR
// =============================================
document.getElementById('btnContinuar').addEventListener('click', function() {

    const estadoEquipamento = document.getElementById('estadoEquipamento').value.trim();
    const servicosRealizados = document.getElementById('servicosRealizados').value.trim();
    const avaliacaoCliente = document.getElementById('avaliacaoCliente').value.trim();

    // Valida campos obrigatórios
    if (estadoEquipamento === '') {
        alert('Preencha o estado em que o equipamento foi encontrado.');
        return;
    }

    if (servicosRealizados === '') {
        alert('Preencha o que foi feito e as medidas tomadas.');
        return;
    }

    // Salva os dados no sessionStorage
    sessionStorage.setItem('estadoEquipamento', estadoEquipamento);
    sessionStorage.setItem('servicosRealizados', servicosRealizados);
    sessionStorage.setItem('avaliacaoCliente', avaliacaoCliente);

    // Navega para a tela de fechamento
    window.location.href = 'visita-fechamento.html';

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