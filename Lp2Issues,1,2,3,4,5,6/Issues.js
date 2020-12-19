class Leve {
    //O método construtor receberá o id que será manipulado e um objeto que contém um "mapa de variáveis".
    constructor(id, objeto) {
        this._element = document.getElementById(id);   // Armazena o elemento.
        this._memento = this._element.innerHTML;       // Armazena o estado original do elemento para restauração, se necessário.
        this._variaveis = objeto;                      // Armazena o mapa de variáveis do objeto.

        // Percorre os nomes das variáveis.
        for (let varcollection of Object.keys(this._variaveis)) {
           
            
            
            Object.defineProperty(this, varcollection, {
                get: () => {
                    return this._variaveis[varcollection];
                },
                set: (value) => {
                    if (value == '') {
                        this._variaveis[varcollection] = 'Sem valor';
                        this.attElemento();
                    } else {

                        this._variaveis[varcollection] = value;
                        this.attElemento();
                    }
                }
            });
        }

        this.sincronizarInputs();

        this.attElemento();

    }

    
    sincronizarInputs() {
        let pai = this._element;
        let filhos = pai.getElementsByTagName("input");
        //utilizando o evento
        pai.addEventListener("input", (evento) => {
            filhos = evento.target;
            this[filhos.getAttribute("l:bind")] = filhos.value;
        });

    }

    
    attElemento() {
        
       
        let focus = document.activeElement.id;
        let pai = this._element;
        let filhos = pai.getElementsByTagName("input");
        let conteudoInputs = [];
        for (let input of filhos) {
            if (input.getAttribute("l:bind") != undefined) {
                conteudoInputs.push(input.value);
            }
        }

        this._element.innerHTML = this._memento;

        this.subsVariaveisMarcadas();
        this.subsVariaveisSpan();

        // Mantem o conteúdo dos inputs de texto, enquanto a mudança numa variável é renderizada. 
        let i = 0;
        for (let input of filhos) {
            if (input.getAttribute("l:bind") != undefined) {
                input.value = conteudoInputs[i];
                i++;
            }
        }

        
        if (focus != '') {
            document.getElementById(focus).focus();
        }

    }

    
    subsConteudo(conteudoAtual) {
        this._element.innerHTML = conteudoAtual;
    }
    
    subsVariaveisMarcadas() {
        // Percorre os nomes das variáveis.
        for (let varcollection of Object.keys(this._variaveis)) {

            let conteudoAtualizado = this._element.innerHTML.replaceAll(`[[${varcollection}]]`, this[varcollection]);

            this.subsConteudo(conteudoAtualizado);
        }

    }

    
    subsVariaveisSpan() {
        let pai = this._element;
        let filhos = pai.getElementsByTagName("span");

        // Percorre cada tag <span> "filha" de um elemento "pai".
        for (let spans of filhos) {
            // Percorre os nomes das variáveis.
            for (let varcollection of Object.keys(this._variaveis)) {
                // Se o valor do atributo "l:var" de uma tag <span> for igual ao nome de uma variável.
                if (spans.getAttribute("l:var") == varcollection) {
                    // O conteúdo daquela tag <span> é atualizado com valor daquela variável.
                    spans.innerHTML = this[varcollection];
                }
            }

        }

    }
    //Issue #6
    setHTML(id,textHTML){
        let _id = document.getElementById(id);
        _id.innerHTML = textHTML; 
         }

}