// Classe que permitirá manipular o HTML.
class Leve {
    // O método construtor receberá o id que será manipulado e um objeto que contém um "mapa de variáveis".
    constructor(id, objeto) {
        this._element = document.getElementById(id);   // Armazena o elemento.
        this._memento = this._element.innerHTML;       // Armazena o estado original do elemento para fins de restauração quando necessário.
        this._variaveis = objeto;                       // Armazena o mapa de variáveis do objeto.

        // Percorre os nomes das variáveis.
        for (let varcollection of Object.keys(this._variaveis)) {
            // Vincula cada variável à instância atual, permitindo obter (get), atualizar (set) e renderizar "this.atualizarElemento()" o seu valor ao ocorrerem mudanças nas variáveis.
            Object.defineProperty(this, varcollection, {
                get: () => {
                    return this._variaveis[varcollection];
                },
                set: (value) => {
                    if (value == '') {
                        this._variaveis[varcollection] = 'Nenhum valor digitado';
                        this.atualizarElemento();
                    } else {

                        this._variaveis[varcollection] = value;
                        this.atualizarElemento();
                    }
                }
            });
        }

        this.sincronizarInputs();

        this.atualizarElemento();

    }

    // Sincroniza o valor das variáveis do elemento com o conteúdo dos inputs de texto.
    sincronizarInputs() {
        let pai = this._element;
        let filhos = pai.getElementsByTagName("input");
        //utilizando o event
        pai.addEventListener("input", (evento) => {
            filhos = evento.target;
            this[filhos.getAttribute("l:bind")] = filhos.value;
        });

    }

    // Executa os métodos de renderização de variáveis, mantendo o foco no input de texto utilizado pelo usuário.
    atualizarElemento() {
        
        // Isso deve ser feito para que o foco no input de texto seja restaurado mais tarde.
        let focus = document.activeElement.id;

        let pai = this._element;
        let filhos = pai.getElementsByTagName("input");
        
        // Armazena o conteúdo dos inputs de texto num array, antes de renderizar a mudança numa variável.
        // Isso deve feito para que o conteúdo digitado pelo usuário seja restaurado mais tarde.
        let conteudoInputs = [];
        for (let input of filhos) {
            if (input.getAttribute("l:bind") != undefined) {
                conteudoInputs.push(input.value);
            }
        }

        // Restaura o estado original do elemento para que o método "substituirVariaveisMarcadas()" funcione corretamente.
        this._element.innerHTML = this._memento;

        // Métodos de renderização das variáveis.
        this.substituirVariaveisMarcadas();
        this.substituirVariaveisSpan();

        // Restaura o conteúdo dos inputs de texto, a medida que a mudança numa variável é renderizada. Com isso, o conteúdo já digitado pelo usuário irá permanecer no input de texto enquanto ele está digitando.
        let i = 0;
        for (let input of filhos) {
            if (input.getAttribute("l:bind") != undefined) {
                input.value = conteudoInputs[i];
                i++;
            }
        }

        // Restaura o foco, a medida que a mudança numa variável esta sendo renderizada.
        if (focus != '') {
            document.getElementById(focus).focus();
        }

    }

    // Substitui o conteudo antigo pelo atual.
    substituirConteudo(conteudoatual) {
        this._element.innerHTML = conteudoatual;
    }

    // Renderiza os valores das variáveis no lugar de variáveis marcadas com colchetes "[[variavel]]" que possuírem o mesmo nome da variável.
    substituirVariaveisMarcadas() {
        // Percorre os nomes das variáveis.
        for (let varcollection of Object.keys(this._variaveis)) {

            let conteudoAtualizado = this._element.innerHTML.replaceAll(`[[${varcollection}]]`, this[varcollection]);

            this.substituirConteudo(conteudoAtualizado);
        }

    }

    
    substituirVariaveisSpan() {
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