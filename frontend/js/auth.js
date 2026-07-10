// =============================================
// CONFIGURAÇÃO DA URL BASE DO BACKEND
// =============================================
const API_URL = 'http://localhost:8084';

// =============================================
// FUNÇÃO PRINCIPAL DE LOGIN
// =============================================
document.getElementById('btnEntrar').addEventListener('click', async function () {

    const login = document.getElementById('inputLogin').value.trim();
    const senha = document.getElementById('inputSenha').value.trim();
    const mensagemErro = document.getElementById('mensagemErro');

    // Esconde a mensagem de erro anterior, se houver
    mensagemErro.style.display = 'none';

    // Valida se os campos estão preenchidos
    if (login === '' || senha === '') {
        mensagemErro.textContent = 'Preencha o login e a senha.';
        mensagemErro.style.display = 'block';
        return;
    }

    try {
        // Envia as credenciais para o backend
        const resposta = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: login, senha: senha })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            // Salva os dados do usuário no sessionStorage
            // para serem usados nas telas seguintes
            sessionStorage.setItem('usuarioId', dados.usuarioId);
            sessionStorage.setItem('nomeExibicao', dados.nomeExibicao);
            sessionStorage.setItem('nomeCompleto', dados.nomeCompleto);
            sessionStorage.setItem('nomeMovidesk', dados.nomeMovidesk);
            sessionStorage.setItem('cargo', dados.cargo);

            // Redireciona para a tela inicial
            window.location.href = 'home.html';

        } else {
            mensagemErro.textContent = 'Login ou senha inválidos.';
            mensagemErro.style.display = 'block';
        }

    } catch (erro) {
        mensagemErro.textContent = 'Erro ao conectar com o servidor. Verifique se o sistema está ativo.';
        mensagemErro.style.display = 'block';
    }

});

// =============================================
// PERMITE PRESSIONAR ENTER PARA FAZER LOGIN
// =============================================
document.getElementById('inputSenha').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('btnEntrar').click();
    }
});