console.log("Arquivo JS carregado!");


// Função para mostrar notificações
function mostrarNotificacao(mensagem, isErro = false) {
  const notificacao = document.createElement('div');
  notificacao.classList.add('notificacao', isErro ? 'erro' : 'sucesso');
  notificacao.innerText = mensagem;
  document.body.appendChild(notificacao);

  setTimeout(() => notificacao.classList.add('mostrar'), 10);
  setTimeout(() => {
    notificacao.classList.remove('mostrar');
    setTimeout(() => notificacao.remove(), 500);
  }, 3000);
}

// Salva um cliente no localStorage
function salvarCliente(cliente) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Remove um cliente do localStorage

function removerCliente(indice) {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.splice(indice, 1);
  localStorage.setItem('clientes', JSON.stringify(clientes));
  carregarClientes();
  mostrarNotificacao('Cliente excluído com sucesso!');
}

// Limpa todos os clientes

function limparTodosClientes() {
  localStorage.removeItem('clientes');
  listaClientes.innerHTML = '';
  mostrarNotificacao('Todos os clientes foram removidos!');
}

// Cria o <li> de um cliente com botão de excluir

function criarItemCliente(cliente, indice) {
  const li = document.createElement('li');
  li.innerHTML = `
    <p><strong>Nome:</strong> ${cliente.nome}</p>
    <p><strong>Telefone:</strong> ${cliente.telefone}</p>
    <p><strong>Email:</strong> ${cliente.email}</p>
    <p><strong>Carro:</strong> ${cliente.carro}</p>
    <p><strong>Última Troca de Óleo:</strong> ${cliente.oleo}</p>
    <p><strong>Última Revisão:</strong> ${cliente.revisao}</p>
  `;
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'Excluir';
  btnExcluir.addEventListener('click', () => removerCliente(indice));
  li.appendChild(btnExcluir);
  return li;
}

// Carrega e renderiza todos os clientes

function carregarClientes() {
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  listaClientes.innerHTML = ''; // limpa antes de renderizar
  clientes.forEach((cliente, idx) => {
    const item = criarItemCliente(cliente, idx);
    listaClientes.appendChild(item);
  });
}

// Seleção de elementos (Qual cliente excluir)

const formulario     = document.querySelector('form');
const listaClientes  = document.getElementById('lista-clientes');
const btnLimparTodos = document.getElementById('limpar-clientes');

// Carregamento ao abrir a página

carregarClientes();

// Envia do formulário

formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  const nome     = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email    = document.getElementById('email').value.trim();
  const carro    = document.getElementById('carro').value.trim();
  const oleo     = document.getElementById('oleo').value;
  const revisao  = document.getElementById('revisao').value;

  if (!nome || !telefone) {
    mostrarNotificacao('Por favor, preencha nome e telefone.', true);
    return;
  }

  const cliente = { nome, telefone, email, carro, oleo, revisao };
  salvarCliente(cliente);
  carregarClientes();
  mostrarNotificacao('Cliente cadastrado com sucesso!');
  formulario.reset();
});


// Limpa todos os clientes!

btnLimparTodos.addEventListener('click', limparTodosClientes);
