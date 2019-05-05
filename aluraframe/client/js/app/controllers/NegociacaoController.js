class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
        let self = this; // guarda a instância do controller
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
       
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),  new NegociacoesView($('#tabela')) , 'adiciona', 'esvazia'); 
        // cria uma class bind que chama um proxy
       
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
    }

    adiciona(event) {
        event.preventDefault();         
        this._listaNegociacoes.adiciona(this._criaNegociacao());  
        this._mensagem.texto = 'Negociação adicionada com sucesso!';    
        this._limpaFormulario();    
    }

    esvazia() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'A lista de negociações foi esvaziada!';
    }

    importaNegociacoes() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.send();

        /*
                0: requisição ainda não iniciada

                1: conexão com o servidor estabelecida
                
                2: requisição recebida
                
                3: processando requisição
                
                4: requisição está concluída e a resposta está pronta
        */

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {                           
                if(xhr.status == 200) {
                    console.log('Buscando os dados...');
                } else {
                    console.log('Erro ao buscar os dados');
                }
            }
        }
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = '0.0';
        
        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}