class Leve {

    constructor(id, variaveis = {}, conexoes = []) {
        this._el = document.getElementById(id);   // Pega o elemento por ID
        this._memento = this._el.innerHTML;       // Salva o estado original do elemento para ser utilizado se necessario a restauração
        this._variaveis = variaveis;              // Armazena toda a lista de variaveis do objeto.        
        this._conexoes = conexoes;
        this._observadores = [];

        // Percorre os nomes das variáveis.
        for (let percorreVars of Object.keys(this._variaveis)) {
            // Vincula cada variável à instância atual, permitindo obter (get), atualizar (set) e renderizar "this.atualizarElemento()" o seu valor ao ocorrerem mudanças nas variáveis.
            Object.defineProperty(this, percorreVars, {
                get: function() {
                    return this._variaveis[percorreVars];
                },
                set: function(value) {
                    this._variaveis[percorreVars] = value;
                    this.atualizarElemento();
                }
            });
        }

        this.sincronizarInputs();
        this.atualizarElemento();
    }

    // Executa os métodos de renderização de variáveis, mantendo o foco no input de texto utilizado pelo usuário.
    atualizarElemento() {

        // Isso deve ser feito para que o foco no input de texto seja restaurado mais tarde.
        let foco = document.activeElement.id;

        let pai = this._el;
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
        this._el.innerHTML = this._memento;

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
        if (foco != '') {
            document.getElementById(foco).focus();
        }

        this.atualizarObservador();
    }

    // Sincroniza o valor das variáveis do elemento com o conteúdo dos inputs de texto.
    sincronizarInputs() {
        let pai = this._el;
        let filhos = pai.getElementsByTagName("input");

        //utilizando o event
        pai.addEventListener("input", (evento) => {
            filhos = evento.target;
            this[filhos.getAttribute("l:bind")] = filhos.value;
        });

    }

    // Substitui o conteudo antigo pelo atual.
    substituirConteudo(novo) {
        this._el.innerHTML = novo;
    }

    // Renderiza os valores das variáveis no lugar de variáveis marcadas com colchetes "[[variavel]]" que possuírem o mesmo nome da variável.
    substituirVariaveisMarcadas() {
        // Percorre os nomes das variáveis.
        for (let percorreVars of Object.keys(this._variaveis)) {

            let conteudoAtualizado = this._el.innerHTML.replaceAll(`[[${percorreVars}]]`, this[percorreVars]);

            this.substituirConteudo(conteudoAtualizado);
        }

    }


    substituirVariaveisSpan() {
        let pai = this._el;
        let filhos = pai.getElementsByTagName("span");

        // Percorre cada tag <span> "filha" de um elemento "pai".
        for (let spans of filhos) {
            // Percorre os nomes das variáveis.
            for (let percorreVars of Object.keys(this._variaveis)) {
                // Se o valor do atributo "l:var" de uma tag <span> for igual ao nome de uma variável.
                if (spans.getAttribute("l:var") == percorreVars) {
                    // O conteúdo daquela tag <span> é atualizado com valor daquela variável.
                    spans.innerHTML = this[percorreVars];
                }
            }

        }

    }

    // Adiciona os "elementos observadores" na lista de observadores dos "elementos vigiados".
    estaObservando() {
        // Percorre cada mapa de conexões dos "elementos observadores".
        for (let conexao of this._conexoes) {
            let vigiado = Leve.registro[conexao["idVigiado"]];
            vigiado._observadores.push(this);
        }

    }

    // Atualiza um "elemento observador" quando ocorrer uma mudança numa "variável vigiada" por ele.
    atualizarObservador() {
        // Percorre cada "elemento observador" da lista de observadores de um "elemento vigiado".
        for (let obs of this._observadores) {
            obs.atualizar(this);
        }

    }

    atualizar(vigiado) {
        // Percorre cada mapa de conexões dos "elementos observadores".
        for (let conexao of this._conexoes) {
            // Se o id presente no mapa de conexões for igual ao id de um "elemento vigiado".
            if (conexao["idVigiado"] == vigiado._id && vigiado[conexao["varVigiada"]] != undefined) {
                // O valor da "variável do observador" torna-se o valor da "variável vigiada".
                this[conexao["varObservador"]] = vigiado[conexao["varVigiada"]];
            }
        }

    }

    setHTML(id, textHTML) {
        let _id = document.getElementById(id);
        _id.innerHTML = textHTML;
    }

}