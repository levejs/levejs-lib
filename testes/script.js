class Leve{
    #element;
    #var1;
    #states;
    #statesVar1;
    #span;
    constructor(id){
        this.#element = document.querySelector(id);
        this.#span = this.#element.querySelector('span')
        this.#var1 = '[[var1]]'
        this.#statesVar1 = [];
        this.#states = [];
    }

    // issue #1
    subs(str){
        this.save();
        //this.#states.unshift(this.#element.innerText);
        //this.#statesVar1.unshift(this.#var1);
        this.#element.innerText = this.#element.innerText.replaceAll(this.#var1, str);
        this.#var1 = str;
    }

    //issue #2 (incompleta)
    input(str){   
        this.#span.setAttribute('l:var', str);
    }

    //issue #3
    undo(){
        if(this.#states.length == 0)
            throw "Não exitem estados anteriores a serem restaurados."
        this.#element.innerText = this.#states.shift();
        this.#var1 = this.#statesVar1.shift();
    }

    save(){
        this.#states.unshift(this.#element.innerText);
        this.#statesVar1.unshift(this.#var1);
    }

    //issue #4
    reflect(){
        // definindo um modelo
        var model = {
            input_1: 'Hello World',
            input_2: 'Olá Mundo',
            input_3: 'Vòila'
        };

    (function () {
        // buscando todos os HTMLElement com a diretiva data-value
        let values = document.querySelectorAll("[data-value]")
        // buscando todos os HTMLElement com a diretiva data-html
        let htmls = document.querySelectorAll("[data-html]")
        // criando um indice para os HTMLElements com a diretiva data-value
        values = [].reduce.call(values, function (values, value) {
            if (!values[value.dataset.value])
            values[value.dataset.value] = [];
            values[value.dataset.value].push(value)
            return values
        }, {})
        // criando um indice para os HTMLElements com a diretiva data-html
        htmls = [].reduce.call(htmls, function (htmls, html) {
            if (!htmls[html.dataset.html])
            htmls[html.dataset.html] = [];
            htmls[html.dataset.html].push(html)
            return htmls
        }, {})  

        // criando um evento para os HTMLElements com a diretiva data-value
        // quando o mesmo for atualizado pelo Usuario, deverá refletir no modelo
        // ao refletir no modelo, este deverá ser propagado para o restante da pagina.
        let onValueInput = function (evt) {
            model[this.key] = this.input.value
        }
        Object.keys(values).forEach(function (key) {
            var inputs = values[key]
            inputs.forEach(function (input) {
                input.addEventListener("input", onValueInput.bind({ key, input }))
            })
        })
        // modificando as propriedades de acesso do modelo
        Object.keys(model).forEach(function (key) {
            let _value = model[key]
            Object.defineProperty(model, key, {
                // get: retorna o valor para de uma determinada propriedade do modelo
                get: function () {
                    return _value;
                },
                // set: ao setar algum valor no modelo, deve se propagar o mesmo para os HTMLElements
                // com diretivas associadas a esta propriedade
                set: function (value) {
                    _value = value
                    if (values[key]) {
                        let inputs = values[key]
                        inputs.forEach(function (input) {
                            input.value = _value
                        })
                    }
                    if (htmls[key]) {
                        let spans = htmls[key]
                        spans.forEach(function (span) {
                            span.textContent = _value
                        })
                    }
                }
            })
            // atualizando a pagina com os valores iniciais
            model[key] = _value
        })
    })();

    // atualizando os valores do modelo após 5 segundos (apenas para demonstrar o 2-way data binding)
    window.setTimeout(function () {
        model.input_1 += " - deprecated"
        model.input_2 += " - descontinuado"
        model.input_3 += " - sei lá"
        }, 5000)
    }

    //issue #5
    static send(id1, id2){
        //this.save();
        this.#states.unshift(this.#element.innerText);
        this.#statesVar1.unshift(this.#var1);
        document.querySelector(id2).innerText = 
            document.querySelector(id1).children.texto1.value;
    }
    //issue #6
    insert(new_html){
        this.save();
        //this.#states.unshift(this.#element.innerText);
        //this.#statesVar1.unshift(this.#var1);
        this.#element.innerHTML += '<br>' + new_html;
    }
}