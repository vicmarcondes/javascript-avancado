class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
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
        let service = new NegociacaoService();
        
        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoes => { // negociacoes retorna 3 arrays; 1 de cada semana
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array),[]) // concatena os 3 arrays em um 
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        })
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