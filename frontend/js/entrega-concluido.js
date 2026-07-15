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
async function salvarEntrega() {
    const dadosEntregaJson = sessionStorage.getItem('dadosEntrega');

    if (!dadosEntregaJson) {
        window.location.href = 'home.html';
        return;
    }

    const dados = JSON.parse(dadosEntregaJson);

    try {
        const resposta = await fetch(`${API_URL}/api/entrega`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            document.getElementById('iconeLoading').style.display = 'none';
            document.getElementById('alertaAtendido').style.display = 'block';

            sessionStorage.removeItem('dadosEntrega');
            sessionStorage.removeItem('listaEquipamentos');
            sessionStorage.removeItem('ticketId');
            sessionStorage.removeItem('ticketTitulo');
            sessionStorage.removeItem('ticketCorpo');
            sessionStorage.removeItem('unidadeId');
            sessionStorage.removeItem('unidadeNome');
            sessionStorage.removeItem('smsNome');

            setTimeout(function() {
                window.location.href = 'home.html';
            }, 3000);

        } else {
            document.getElementById('iconeLoading').style.display = 'none';
            alert('Erro ao salvar o chamado. Tente novamente.');
            window.location.href = 'entrega-fechamento.html';
        }

    } catch (erro) {
        document.getElementById('iconeLoading').style.display = 'none';
        alert('Erro ao conectar com o servidor. Verifique se o sistema está ativo.');
        window.location.href = 'entrega-fechamento.html';
    }
}

// =============================================
// INICIALIZAÇÃO
// =============================================
verificarLogin();
exibirData();
salvarEntrega();