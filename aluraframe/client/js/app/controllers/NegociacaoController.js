class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
    }

    adiciona(event) {
        event.preventDefault(); 
        this._listaNegociacoes.adiciona(this._criaNegociacao());    
        this._limpaFormulario();    
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