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

    //issue #5
    static send(id1, id2){
        this.save();
        //this.#states.unshift(this.#element.innerText);
        //this.#statesVar1.unshift(this.#var1);
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