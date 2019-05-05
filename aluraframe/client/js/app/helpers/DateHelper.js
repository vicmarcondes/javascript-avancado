class DateHelper {

    constructor() {
        throw new Error('A class DateHelper não pode ser instanciada.')
    }

    static textoParaData(texto) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) { // d: dígito; D: qualquer coisa menos dígito; '^': começa com; $: termina com
            throw new Error('O formato da data deve ser yyyy-MM-dd');
        }
        
        let data = new Date(... // cada item do array será passado para cada parâmetro recebido pela função 
            texto.split('-')
                .map((item, indice) => {
                    if(indice == 1) 
                        return item - 1;    // O construtor de Date conta os meses a partir do 0
                    return item;
                })
        );

        return data;
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
} 