class Mensagem {

    constructor(mensagem = '') {
        this._texto = mensagem;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }

}