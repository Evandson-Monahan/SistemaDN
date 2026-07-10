// =============================================
// CONFIGURAÇÃO
// =============================================
const API_URL = 'http://localhost:8084';
let assinaturaBase64 = null;
let desenhando = false;
let ctx = null;
let canvas = null;

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
// EXIBIR NOME DO CONSULTOR
// =============================================
function exibirConsultor() {
    const nomeExibicao = sessionStorage.getItem('nomeExibicao');
    document.getElementById('campoConsultor').textContent = nomeExibicao;
}

// =============================================
// CONFIGURAR CANVAS DE ASSINATURA
// =============================================
function configurarCanvas() {
    canvas = document.getElementById('canvasAssinatura');
    ctx = canvas.getContext('2d');

    // Define o tamanho do canvas baseado na tela
    const largura = Math.min(window.innerWidth - 48, 600);
    const altura = Math.round(largura * 0.4);
    canvas.width = largura;
    canvas.height = altura;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

// =============================================
// EVENTOS DE DESENHO NO CANVAS (TOUCH E MOUSE)
// =============================================
function obterPosicao(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function iniciarDesenho(e) {
    e.preventDefault();
    desenhando = true;
    const pos = obterPosicao(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function desenhar(e) {
    e.preventDefault();
    if (!desenhando) return;
    const pos = obterPosicao(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function pararDesenho(e) {
    e.preventDefault();
    desenhando = false;
}

function registrarEventosCanvas() {
    // Touch
    canvas.addEventListener('touchstart', iniciarDesenho, { passive: false });
    canvas.addEventListener('touchmove', desenhar, { passive: false });
    canvas.addEventListener('touchend', pararDesenho, { passive: false });

    // Mouse (para testar no computador)
    canvas.addEventListener('mousedown', iniciarDesenho);
    canvas.addEventListener('mousemove', desenhar);
    canvas.addEventListener('mouseup', pararDesenho);
    canvas.addEventListener('mouseleave', pararDesenho);
}

// =============================================
// ABRIR TELA DE ASSINATURA
// =============================================
document.getElementById('btnCaneta').addEventListener('click', function() {
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    if (nomeCliente === '') {
        alert('Preencha o nome do cliente antes de assinar.');
        return;
    }

    const telaAssinatura = document.getElementById('telaAssinatura');
    telaAssinatura.classList.add('ativa');
    configurarCanvas();
    registrarEventosCanvas();
});

// =============================================
// APAGAR ASSINATURA
// =============================================
document.getElementById('btnApagarAssinatura').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    assinaturaBase64 = null;
});

// =============================================
// VOLTAR DA TELA DE ASSINATURA
// =============================================
document.getElementById('btnVoltarAssinatura').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    assinaturaBase64 = null;
    document.getElementById('telaAssinatura').classList.remove('ativa');
});

// =============================================
// CONFIRMAR ASSINATURA
// =============================================
document.getElementById('btnConfirmarAssinatura').addEventListener('click', function() {
    assinaturaBase64 = canvas.toDataURL('image/png');

    // Exibe o preview da assinatura na tela de fechamento
    const previewAssinatura = document.getElementById('previewAssinatura');
    const imagemAssinatura = document.getElementById('imagemAssinatura');
    imagemAssinatura.src = assinaturaBase64;
    previewAssinatura.style.display = 'block';

    document.getElementById('telaAssinatura').classList.remove('ativa');
});

// =============================================
// BOTÃO SALVAR
// =============================================
document.getElementById('btnSalvar').addEventListener('click', async function() {

    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const funcaoCliente = document.getElementById('selectFuncao').value;
    const setorAtendido = document.getElementById('setorAtendido').value.trim();
    const produto = document.getElementById('selectProduto').value;

    // Validações
    if (nomeCliente === '') {
        alert('Preencha o nome do cliente.');
        return;
    }
    if (funcaoCliente === '') {
        alert('Selecione a função do cliente.');
        return;
    }
    if (setorAtendido === '') {
        alert('Preencha o setor atendido.');
        return;
    }
    if (produto === '') {
        alert('Selecione o produto / sistema.');
        return;
    }
    if (!assinaturaBase64) {
        alert('Colete a assinatura do cliente antes de salvar.');
        return;
    }

    // Monta o objeto com todos os dados
    const dados = {
        usuarioId: parseInt(sessionStorage.getItem('usuarioId')),
        unidadeSaudeId: parseInt(sessionStorage.getItem('unidadeId')),
        numeroTicket: sessionStorage.getItem('ticketId'),
        tituloTicket: sessionStorage.getItem('ticketTitulo'),
        corpoTicket: sessionStorage.getItem('ticketCorpo'),
        estadoEquipamento: sessionStorage.getItem('estadoEquipamento'),
        servicosRealizados: sessionStorage.getItem('servicosRealizados'),
        avaliacaoCliente: sessionStorage.getItem('avaliacaoCliente'),
        nomeCliente: nomeCliente,
        funcaoCliente: funcaoCliente,
        setorAtendido: setorAtendido,
        produto: produto,
        assinatura: assinaturaBase64
    };

    // Navega para a tela de fechamento 2 e salva os dados
    sessionStorage.setItem('dadosVisita', JSON.stringify(dados));
    window.location.href = 'visita-concluido.html';

});

// =============================================
// BOTÃO VOLTAR
// =============================================
document.getElementById('btnVoltar').addEventListener('click', function() {
    window.location.href = 'visita-preenchimento.html';
});

// =============================================
// INICIALIZAÇÃO
// =============================================
verificarLogin();
exibirData();
exibirConsultor();