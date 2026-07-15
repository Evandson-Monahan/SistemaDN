# 🖥️ Sistema DN — Gestão de Chamados e Documentos Normativos

> Sistema Web Progressivo (PWA) desenvolvido para otimizar o fluxo de trabalho de técnicos em infraestrutura de TI que atuam em campo, integrando o gerenciamento de chamados e o preenchimento de Documentos Normativos (DNs) em uma única plataforma mobile-first.

---

## 📋 Sobre o Projeto

O **Sistema DN** nasceu da necessidade de modernizar e digitalizar um processo que era feito inteiramente de forma manual: todos os dias, técnicos precisavam imprimir relatórios de chamados em Excel, preencher Documentos Normativos à mão e, depois, registrar manualmente a baixa de cada chamado na plataforma **Movidesk (Zenvia)**.

Com o Sistema DN, todo esse processo passa a ser feito diretamente pelo celular ou tablet do técnico, em campo, de forma integrada e automática — desde a consulta dos chamados abertos até a coleta da assinatura digital do responsável pela unidade de saúde atendida.

O sistema atende às equipes de infraestrutura de TI da **ECO Sistemas**, empresa que presta serviços de software e infraestrutura às Secretarias Municipais de Saúde de **Cabo Frio** e **São Pedro da Aldeia**, no estado do Rio de Janeiro, cobrindo todas as suas unidades de saúde (UPAs, ESFs, UBSs, hospitais e outros).

---

## 🎯 Objetivo

Permitir que técnicos de infraestrutura:

- Consultem chamados abertos via API do Movidesk diretamente pelo celular
- Preencham Documentos Normativos (DNs) de forma digital, sem papel
- Coletem assinaturas digitais dos responsáveis das unidades via touchscreen
- Deem baixa automática nos chamados via API ao concluir o atendimento
- Gerem documentos em PDF para impressão quando necessário
- Mantenham um histórico completo de todos os atendimentos realizados

---

## ⚙️ Funcionalidades

O sistema centraliza **6 tipos de Documentos Normativos** utilizados pela equipe de infraestrutura:

| Código | Documento Normativo |
|--------|-------------------|
| DN-25 | Relatório de Visita Técnica |
| DN-75 | Entrega de Equipamentos |
| DN-75 | Recolha de Equipamentos |
| DN-75 | Retirada de Equipamentos |
| DN-75B | Substituição de Equipamentos |
| DN-75C | Movimentação de Equipamentos |

### Destaques

- 🔗 **Integração com Movidesk (Zenvia):** Consulta de chamados abertos e baixa automática via API REST
- ✍️ **Assinatura Digital:** Módulo nativo de coleta de assinatura via touchscreen, com canvas HTML5
- 📄 **Geração de PDF:** Documentos gerados automaticamente com todos os dados do atendimento, incluindo assinatura, prontos para impressão
- 📱 **Design Responsivo:** Interface otimizada para celulares, tablets e desktops
- 🔒 **Autenticação:** Sistema de login com controle de acesso por usuário
- 🏥 **Multi-SMS:** Suporte às Secretarias Municipais de Saúde de Cabo Frio e São Pedro da Aldeia
- 💾 **Histórico completo:** Todos os atendimentos ficam salvos no banco de dados

---

## 🏗️ Arquitetura do Projeto

O projeto é dividido em dois blocos independentes que se comunicam via API REST:
sistemadn/
├── backend/          ← API REST em Java + Spring Boot
│   └── src/
│       └── main/
│           └── java/
│               └── com/ecosistemas/sistemadn/
│                   ├── config/       ← Configurações (segurança, CORS)
│                   ├── controller/   ← Endpoints da API
│                   ├── model/        ← Entidades do banco de dados
│                   ├── repository/   ← Acesso ao banco de dados
│                   └── service/      ← Regras de negócio
└── frontend/         ← Interface web (HTML + CSS + JavaScript)
├── css/          ← Estilos globais
├── js/           ← Lógica de cada tela
└── assets/       ← Logotipos e imagens

---

## 🛠️ Stack Tecnológica

### Backend
- **Java 25** com **Spring Boot**
- **Spring Data JPA** — comunicação com o banco de dados
- **Spring Security** — autenticação e controle de acesso
- **Lombok** — redução de código repetitivo
- **Maven** — gerenciamento de dependências

### Frontend
- **HTML5** — estrutura das telas
- **CSS3** — estilização e responsividade
- **JavaScript (Vanilla)** — lógica e integração com a API
- **Canvas HTML5** — módulo de assinatura digital

### Banco de Dados
- **MySQL** — armazenamento de usuários, unidades de saúde e registros de atendimento

### Infraestrutura
- **Vercel** — hospedagem do frontend
- **IntelliJ IDEA** — IDE principal de desenvolvimento

---

## 🗄️ Modelo de Dados

As principais tabelas do banco de dados são:

| Tabela | Descrição |
|--------|-----------|
| `usuarios` | Técnicos cadastrados no sistema |
| `sms` | Secretarias Municipais de Saúde |
| `unidades_saude` | Unidades de saúde de cada SMS, com aliases para variações de nome |
| `visitas_tecnicas` | Registros de Relatórios de Visita Técnica |

> As tabelas das demais DNs serão adicionadas conforme o desenvolvimento avança.

---

## 🔄 Fluxo de uma Requisição
Técnico (celular)
↓
Frontend (HTML/JS)
↓ fetch() → API REST
Backend (Spring Boot)
↓
Service (regras de negócio)
↓
Repository (JPA)
↓
Banco de Dados (MySQL)

---

## 👥 Equipe

| Nome | Cargo |
|------|-------|
| Evandson Vieira Silva de Oliveira | Técnico em Infraestrutura de TI |
| Breno Pazito do Nascimento | Técnico em Infraestrutura de TI |
| Carlos Vinícius Mendonça dos Santos | Técnico em Infraestrutura de TI |
| Gleison Pereira de Medeiros | Analista em Infraestrutura de TI |

---

## 📍 Municípios Atendidos

- 🏙️ **Cabo Frio** — Rio de Janeiro
- 🏙️ **São Pedro da Aldeia** — Rio de Janeiro

---

## 🚧 Status do Projeto

> ⚠️ **Este sistema encontra-se em fase de desenvolvimento ativo e contínuo.**

O desenvolvimento está sendo conduzido de forma incremental, DN por DN, garantindo que cada funcionalidade seja testada e validada antes de avançar para a próxima.

### Progresso atual

- [x] Estrutura do projeto (backend + frontend)
- [x] Banco de dados configurado
- [x] Sistema de autenticação (login)
- [x] Tela Inicial com seleção de SMS, unidade e ticket
- [x] DN-25 — Relatório de Visita Técnica
- [x] DN-75 — Entrega de Equipamentos (frontend concluído)
- [ ] DN-75 — Recolha de Equipamentos
- [ ] DN-75 — Retirada de Equipamentos
- [ ] DN-75B — Substituição de Equipamentos
- [ ] DN-75C — Movimentação de Equipamentos
- [ ] Integração com API do Movidesk
- [ ] Geração de PDF para impressão
- [ ] Deploy em produção

---

*Desenvolvido para uso interno da ECO Sistemas — Cabo Frio, Rio de Janeiro.*
