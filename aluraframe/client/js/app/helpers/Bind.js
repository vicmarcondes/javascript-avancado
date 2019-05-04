class Bind {
    constructor(model, view, ...props) { // Rest operator '...' - permite passar n parâmetros. ps: passar como ULTIMO param.
        let proxy = ProxyFactory.create(model, props, model => 
            view.update(model));
        
        view.update(model);

        return proxy;
    }
}