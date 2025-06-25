document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const cepInput = document.getElementById('cep');

  // Restaurar dados do localStorage ao carregar
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    for (const field in formData) {
      const input = document.getElementById(field);
      if (input) input.value = formData[field];
    }
  }

  // Buscar endereço automaticamente ao digitar o CEP
  cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch(() => {
          alert('Erro ao buscar o CEP.');
        });
    }
  });

  // Salvar dados no localStorage ao enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      nome: document.getElementById('nome').value,
      cep: document.getElementById('cep').value,
      rua: document.getElementById('endereco').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Dados salvos com sucesso!');
  });
});
