class NegociacaoController {   

    constructor() {        
        let $ = document.querySelector.bind(document); // bind: manter o contexto do 'this' que aponta para o document
        let self = this; // guarda a instância do controller
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
       
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{ // cria um proxy (objeto idêntico) para colocar as traps
            get(target, prop, receiver) { // todo método em JS para por um getter
                if(["adiciona","esvazia"].includes(prop) && typeof(target[prop]) == typeof(Function)){ // se conter o método faz..
                    return function() {
                        console.log(`A prop ${prop} foi chamada`); // imprime o nome do método                        
                        Reflect.apply(target[prop], target, arguments); // (chama o método, passa a referência dele mesmo, argumentos)
                        self._negociacoesView.update(target); // faz o update da view
                    }
                }
                return Reflect.get(target, prop, receiver); // se o método não for os escolhidos, apenas faça o get padrão
            }
        });
        this._negociacoesView = new NegociacoesView($('#tabela'));
        this._negociacoesView.update(this._listaNegociacoes);
       
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();         
        this._listaNegociacoes.adiciona(this._criaNegociacao());  

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();    
    }

    esvazia() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "A lista de negociações foi esvaziada!";
        this._mensagemView.update(this._mensagem);
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