class ListaNegociacoes {

    constructor() {
        this._negociacoes = []
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacaoes() {
        return [].concat(this._negociacoes); // programação defensiva, retorna uma cópia da lista
    }
}