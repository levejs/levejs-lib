class Leve{
    #element;
    #var1;
    #states;
    #statesVar1;
    #span;
    constructor(id){
        this.#element = document.querySelector(id);
        this.#span = this.#element.querySelector('span');
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
        this.#element.innerHTML = this.#states.shift();
        this.#var1 = this.#statesVar1.shift();
    }

    save(){
        this.#states.unshift(this.#element.innerHTML);
        this.#statesVar1.unshift(this.#var1);
    }

    //issue #4
    /*
        Fontes: 
        https://pt.stackoverflow.com/questions/297795/como-%C3%A9-o-processo-do-two-way-data-binding-com-js-puro
        https://medium.com/criciumadev/two-way-data-binding-fd5d71712d28
    */
    reflect(model){
        this.save();

        let newHTML = "";

        for(let key in model)
            newHTML += `<span data-html=\"${key}\">[[${key}]]</span><br />`;

        for(let key in model){
            newHTML += `<br />${key[0].toUpperCase() + key.substr(1)}`;
            newHTML += `: <input type="text" data-value=\"${key}\" /><br />`;
        }

        this.insert(newHTML);

        let values = document.querySelectorAll("[data-value]");
        let htmls = document.querySelectorAll("[data-html]");

        values = [].reduce.call(values, function (values, value){
            if (!values[value.dataset.value])
                values[value.dataset.value] = [];
            values[value.dataset.value].push(value);

            return values;
        }, {});

        htmls = [].reduce.call(htmls, function (htmls, html){
            if (!htmls[html.dataset.html])
                htmls[html.dataset.html] = [];
            htmls[html.dataset.html].push(html);

            return htmls;
        }, {});  

        let onValueInput = function (){
            model[this.key] = this.input.value;
        }

        Object.keys(values).forEach(function (key){
            var inputs = values[key];
            inputs.forEach(function (input) {
                input.addEventListener("input", onValueInput.bind());
            });
        });

        Object.keys(model).forEach(function (key){
            let value = model[key];
            Object.defineProperty(model, key,{
                get: function (){
                    return value;
                },
                set: function (newValue){
                    value = newValue;

                    if (values[key]){
                        let inputs = values[key];
                        inputs.forEach(function (input){
                            input.value = value;
                        });
                    }
                    if (htmls[key]){
                        let spans = htmls[key];
                        spans.forEach(function (span){
                            span.textContent = value;
                        })
                    }
                }
            })
            model[key] = value;
        })
    }

    //issue #5
    static send(id1, id2){
        //this.save();
        //this.#states.unshift(this.#element.innerText);
        //this.#statesVar1.unshift(this.#var1);
        document.querySelector(id2).innerText = 
            document.querySelector(id1).children.texto1.value;
    }

    //issue #6
    insert(newHTML){
        if(newHTML != undefined){
            this.save();
            //this.#states.unshift(this.#element.innerText);
            //this.#statesVar1.unshift(this.#var1);
            this.#element.innerHTML += '<br />' + newHTML;
        }
    }
}