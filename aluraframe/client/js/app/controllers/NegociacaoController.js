class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
        let self = this; // guarda a instância do controller
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
       
        this._listaNegociacoes = ProxyFactory
            .create(new ListaNegociacoes(), ["adiciona", "esvazia"], model => this._negociacoesView.update(model)); // cria um proxy (objeto idêntico) para colocar as traps     
        this._negociacoesView = new NegociacoesView($('#tabela'));
        this._negociacoesView.update(this._listaNegociacoes);
       
        this._mensagem = ProxyFactory
            .create(new Mensagem(), ["texto"], model => this._mensagemView.update(model));
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();         
        this._listaNegociacoes.adiciona(this._criaNegociacao());  
        this._mensagem.texto = "Negociação adicionada com sucesso!";    
        this._limpaFormulario();    
    }

    esvazia() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "A lista de negociações foi esvaziada!";
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