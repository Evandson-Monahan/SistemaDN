// =============================================
// CONFIGURAÇÃO
// =============================================
const API_URL = 'http://localhost:8084';

// =============================================
// EXIBIR DATA ATUAL EM PORTUGUÊS
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
// CARREGAR OS SMS NO DROPDOWN
// =============================================
async function carregarSms() {
    try {
        const resposta = await fetch(`${API_URL}/api/sms`);
        const listaSms = await resposta.json();

        const selectSms = document.getElementById('selectSms');

        listaSms.forEach(function(sms) {
            const opcao = document.createElement('option');
            opcao.value = sms.id;
            opcao.textContent = sms.nome;
            selectSms.appendChild(opcao);
        });

    } catch (erro) {
        console.error('Erro ao carregar SMS:', erro);
    }
}

// =============================================
// CARREGAR UNIDADES DE SAÚDE PELO SMS
// =============================================
async function carregarUnidades(smsId) {
    const selectUnidade = document.getElementById('selectUnidade');
    const selectTicket = document.getElementById('selectTicket');
    const selectDn = document.getElementById('selectDn');

    // Reseta os campos dependentes
    selectUnidade.innerHTML = '<option value="">Selecione a Unidade</option>';
    selectUnidade.disabled = true;
    selectTicket.innerHTML = '<option value="">Sem tickets em aberto</option>';
    selectTicket.disabled = true;
    selectDn.disabled = true;
    selectDn.value = '';
    document.getElementById('campoTitulo').textContent = '—';
    document.getElementById('campoCorpo').textContent = '—';
    document.getElementById('btnContinuar').style.display = 'none';

    if (!smsId) return;

    try {
        const resposta = await fetch(`${API_URL}/api/unidades/${smsId}`);
        const listaUnidades = await resposta.json();

        listaUnidades.forEach(function(unidade) {
            const opcao = document.createElement('option');
            opcao.value = unidade.id;
            opcao.textContent = unidade.nome;
            selectUnidade.appendChild(opcao);
        });

        selectUnidade.disabled = false;

    } catch (erro) {
        console.error('Erro ao carregar unidades:', erro);
    }
}

// =============================================
// CARREGAR TICKETS (POR ENQUANTO SIMULADO)
// =============================================
async function carregarTickets(unidadeId) {
    const selectTicket = document.getElementById('selectTicket');
    const selectDn = document.getElementById('selectDn');

    // Reseta campos dependentes
    selectTicket.innerHTML = '<option value="">Sem tickets em aberto</option>';
    selectTicket.disabled = true;
    selectDn.disabled = true;
    selectDn.value = '';
    document.getElementById('campoTitulo').textContent = '—';
    document.getElementById('campoCorpo').textContent = '—';
    document.getElementById('btnContinuar').style.display = 'none';

    if (!unidadeId) return;

    // DADOS SIMULADOS - serão substituídos pela API do Movidesk futuramente
    const ticketsSimulados = [
        {
            id: '155390',
            titulo: 'Impressora não imprime',
            corpo: 'A impressora da recepção parou de funcionar. Já tentamos reiniciar mas não resolveu. Precisamos de suporte urgente.'
        },
        {
            id: '155412',
            titulo: 'Computador lento',
            corpo: 'O computador do consultório 3 está muito lento, travando constantemente durante o atendimento aos pacientes.'
        }
    ];

    ticketsSimulados.forEach(function(ticket) {
        const opcao = document.createElement('option');
        opcao.value = ticket.id;
        opcao.textContent = '#' + ticket.id;
        opcao.dataset.titulo = ticket.titulo;
        opcao.dataset.corpo = ticket.corpo;
        selectTicket.appendChild(opcao);
    });

    selectTicket.disabled = false;
}

// =============================================
// PREENCHER TÍTULO E CORPO AO ESCOLHER TICKET
// =============================================
function aoEscolherTicket() {
    const selectTicket = document.getElementById('selectTicket');
    const opcaoSelecionada = selectTicket.options[selectTicket.selectedIndex];
    const selectDn = document.getElementById('selectDn');

    document.getElementById('campoTitulo').textContent = '—';
    document.getElementById('campoCorpo').textContent = '—';
    document.getElementById('btnContinuar').style.display = 'none';
    selectDn.disabled = true;
    selectDn.value = '';

    if (!selectTicket.value) return;

    document.getElementById('campoTitulo').textContent = opcaoSelecionada.dataset.titulo;
    document.getElementById('campoCorpo').textContent = opcaoSelecionada.dataset.corpo;
    selectDn.disabled = false;
}

// =============================================
// EXIBIR BOTÃO CONTINUAR AO ESCOLHER DN
// =============================================
function aoEscolherDn() {
    const selectDn = document.getElementById('selectDn');
    const btnContinuar = document.getElementById('btnContinuar');

    if (selectDn.value) {
        btnContinuar.style.display = 'block';
    } else {
        btnContinuar.style.display = 'none';
    }
}

// =============================================
// BOTÃO CONTINUAR - NAVEGAR PARA A DN CORRETA
// =============================================
function aoClicarContinuar() {
    const selectDn = document.getElementById('selectDn');
    const selectTicket = document.getElementById('selectTicket');
    const selectUnidade = document.getElementById('selectUnidade');
    const selectSms = document.getElementById('selectSms');

    // Salva os dados da seleção no sessionStorage
    sessionStorage.setItem('ticketId', selectTicket.value);
    sessionStorage.setItem('ticketTitulo', document.getElementById('campoTitulo').textContent);
    sessionStorage.setItem('ticketCorpo', document.getElementById('campoCorpo').textContent);
    sessionStorage.setItem('unidadeId', selectUnidade.value);
    sessionStorage.setItem('unidadeNome', selectUnidade.options[selectUnidade.selectedIndex].textContent);
    sessionStorage.setItem('smsNome', selectSms.options[selectSms.selectedIndex].textContent);

    // Navega para a tela correta conforme a DN escolhida
    const dn = selectDn.value;
    if (dn === 'visita') {
        window.location.href = 'visita-preenchimento.html';
    } else if (dn === 'entrega') {
        window.location.href = 'entrega-preenchimento.html';
    } else if (dn === 'recolha') {
        window.location.href = 'recolha-preenchimento.html';
    } else if (dn === 'retirada') {
        window.location.href = 'retirada-preenchimento.html';
    } else if (dn === 'substituicao') {
        window.location.href = 'substituicao-preenchimento.html';
    } else if (dn === 'movimentacao') {
        window.location.href = 'movimentacao-preenchimento.html';
    }
}

// =============================================
// EVENTOS
// =============================================
document.getElementById('selectSms').addEventListener('change', function() {
    carregarUnidades(this.value);
});

document.getElementById('selectUnidade').addEventListener('change', function() {
    carregarTickets(this.value);
});

document.getElementById('selectTicket').addEventListener('change', function() {
    aoEscolherTicket();
});

document.getElementById('selectDn').addEventListener('change', function() {
    aoEscolherDn();
});

document.getElementById('btnContinuar').addEventListener('click', function() {
    aoClicarContinuar();
});

// =============================================
// INICIALIZAÇÃO
// =============================================
verificarLogin();
exibirData();
carregarSms();