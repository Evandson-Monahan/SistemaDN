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
// SALVAR OS DADOS NO BACKEND
// =============================================
async function salvarVisita() {
    const dadosVisitaJson = sessionStorage.getItem('dadosVisita');

    if (!dadosVisitaJson) {
        window.location.href = 'home.html';
        return;
    }

    const dados = JSON.parse(dadosVisitaJson);

    try {
        const resposta = await fetch(`${API_URL}/api/visita`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            // Esconde o loading e exibe o alerta de sucesso
            document.getElementById('iconeLoading').style.display = 'none';
            document.getElementById('alertaAtendido').style.display = 'block';

            // Limpa os dados da visita do sessionStorage
            sessionStorage.removeItem('dadosVisita');
            sessionStorage.removeItem('ticketId');
            sessionStorage.removeItem('ticketTitulo');
            sessionStorage.removeItem('ticketCorpo');
            sessionStorage.removeItem('unidadeId');
            sessionStorage.removeItem('unidadeNome');
            sessionStorage.removeItem('smsNome');
            sessionStorage.removeItem('estadoEquipamento');
            sessionStorage.removeItem('servicosRealizados');
            sessionStorage.removeItem('avaliacaoCliente');

            // Aguarda 3 segundos e retorna para a tela inicial
            setTimeout(function() {
                window.location.href = 'home.html';
            }, 3000);

        } else {
            document.getElementById('iconeLoading').style.display = 'none';
            alert('Erro ao salvar o chamado. Tente novamente.');
            window.location.href = 'visita-fechamento.html';
        }

    } catch (erro) {
        document.getElementById('iconeLoading').style.display = 'none';
        alert('Erro ao conectar com o servidor. Verifique se o sistema está ativo.');
        window.location.href = 'visita-fechamento.html';
    }
}

// =============================================
// INICIALIZAÇÃO
// =============================================
verificarLogin();
exibirData();
salvarVisita();