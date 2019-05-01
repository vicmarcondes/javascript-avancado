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

        let data = new Date(... // cada item do array será passado para cada parâmetro recebido pela função 
            this._data.value
                .split('-')
                .map((item, indice) => {
                    if(indice == 1) 
                        return item - 1;    // O construtor de Date conta os meses a partir do 0
                    return item;
                })
        );
        console.log(data);
    }
}