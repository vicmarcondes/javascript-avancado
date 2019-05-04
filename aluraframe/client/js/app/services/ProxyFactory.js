class ProxyFactory {
    static create(obj, props, acao) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {                       
                        console.log(`acessando a prop ${prop}`);  
                        Reflect.apply(target[prop], target, arguments);                 
                        return acao(target);                    
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return retorno;
            }
        });
    }

    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);    
    }
}
