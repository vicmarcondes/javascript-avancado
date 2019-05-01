class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
    }

    adiciona(event) {
        event.preventDefault();     

        console.log(this._data.value);

        let data = DateHelper.textoParaData(this._data.value);
    
        let negociacao = new Negociacao(
            data, 
            this._quantidade.value,
            this._valor.value
        );
        console.log(negociacao.data);
        console.log(DateHelper.dataParaTexto(data));
    }
}