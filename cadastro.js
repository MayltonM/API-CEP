//função coringa

const pegaID = function(id){
    document.getElementById(id);
}

//chamada de itens

const formulario = function('formulario');
const cepInput = function('cep');
const enderecoInput = function('endereco');
const cidadeInput = function('cidade');
const estadoInput = function('estado');

//preenchimento

cepInput.addEventListener('blur',async() => {
    const cep = cepInput.value.replace(/\D/g,'');
    if(cep.lenght === 8){
        try{
            const response = await fetch('https://viacep.com.br/ws/${cep}/json/');
            const data = await response.json();
            enderecoInput.value = data.logradouro;
            cidadeInput.value = data.localidade;
            estadoInput.value = data.uf;
        }catch (error){
            console.error('Erro ao buscar CEP: ', error);
        }
    }
});

//salvando os dados do web storage e recarregá-los

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        cep: cepInput.value,
        endereco: enderecoInput.value,
        cidade: cidadeInput.value,
        estado: estadoInput.value,
    };
    localStorage.setItem('dados', JSON.stringify(dados));
});

window.onload = () => {
    const dados = localStorage.getItem('dados');
    if(dados){
        const dadosJSON = JSON.parse(dados);
        document.getElementById('nome').value = dadosJSON.nome;
        cepInput.value = dadosJSON.cep;
        enderecoInput.value = dadosJSON.endereco;
        cidadeInput.value = dadosJSON.cidade;
        estadoInput.value = dadosJSON.estado;
    }
};