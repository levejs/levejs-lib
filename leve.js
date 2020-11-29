// Classe que permitirá manipular o HTML.
class Leve {
    // O método construtor receberá o id do elemento que será manipulado, e um objeto com um "mapa de variáveis".
    constructor(id, mapaDeVariaveis) {
        this._elemento = document.getElementById(id);       // Armazena o elemento de id informado.
        this._memento = this._elemento.innerHTML;           // Armazena o estado original daquele elemento.
        this._variaveis = mapaDeVariaveis;                  // Armazena o mapa de variáveis (propriedades) de um objeto.
        
        // Percorre os nomes das variáveis.
        for(let nomeVar of Object.keys(this._variaveis)) {
            // Vincula cada variável à instância atual, permitindo obter (get), atualizar (set) e renderizar "this.atualizarElemento()" o seu valor ao ocorrerem mudanças nas variáveis.
            Object.defineProperty(this, nomeVar, {
                get: () => {
                    return this._variaveis[nomeVar];
                },
                set: (valor) => {
                    this._variaveis[nomeVar] = valor;
                    this.atualizarElemento();
                }
            });
        }

        this.sincronizarInputs();

        this.atualizarElemento();
        
    }

    // Sincroniza o conteúdo dos inputs de texto com as variáveis do elemento.
    sincronizarInputs() {
        let pai = this._elemento;
        let filhos = pai.getElementsByTagName("input");

        pai.addEventListener("input", (evento) => {
            filhos = evento.target;
            this[filhos.getAttribute("l:bind")] = filhos.value;
        });
        
    }

    // Executa os métodos de renderização de variáveis, mantendo o foco no input de texto utilizado pelo usuário.
    atualizarElemento() {
        // Armazena o elemento que possuia o foco do usuário, antes de renderizar a mudança numa variável.
        // Isso deve ser feito para que o foco no input de texto seja restaurado mais tarde.
        let foco = document.activeElement.id;

        let pai = this._elemento;
        let filhos = pai.getElementsByTagName("input");

        // Armazena o conteúdo dos inputs de texto num array, antes de renderizar a mudança numa variável.
        // Isso deve feito para que o conteúdo digitado pelo usuário seja restaurado mais tarde.
        let conteudoInputs = [];
        for(let input of filhos) {
            if(input.getAttribute("l:bind") != undefined) {
                conteudoInputs.push(input.value);
            }
        }

        // Restaura o estado original do elemento para que o método "substituirVariaveisMarcadas()" funcione corretamente.
        this._elemento.innerHTML = this._memento;

        // Métodos de renderização de variáveis.
        this.substituirVariaveisMarcadas();
        this.substituirVariaveisSpan();

        // Restaura o conteúdo dos inputs de texto, a medida que a mudança numa variável é renderizada. Com isso, o conteúdo já digitado pelo usuário irá permanecer no input de texto enquanto ele está digitando.
        let i = 0;
        for(let input of filhos) {
            if(input.getAttribute("l:bind") != undefined) {
                input.value = conteudoInputs[i];
                i++;
            }
        }
        
        // Restaura o foco no elemento, a medida que a mudança numa variável é renderizada. Com isso, o input de texto irá permanecer em foco enquanto o usuário está digitando.
        if(foco != '') {
            document.getElementById(foco).focus();
        }
        
    }

    // Substitui todo o conteúdo de um elemento por um novo conteúdo.
    substituirConteudo(novoConteudo) {
        this._elemento.innerHTML = novoConteudo;
    }

    // Renderiza os valores das variáveis no lugar de variáveis marcadas com colchetes "[[variavel]]" que possuírem o mesmo nome da variável.
    substituirVariaveisMarcadas() {
        // Percorre os nomes das variáveis.
        for(let nomeVar of Object.keys(this._variaveis)) {

            let conteudoAtualizado = this._elemento.innerHTML.replaceAll(`[[${nomeVar}]]`, this[nomeVar]);

            this.substituirConteudo(conteudoAtualizado);
        }

    }

    // Renderiza os valores das variáveis dentro do conteúdo de tags <span> que possuírem o valor do atributo "l:var" igual ao nome da variável.
    substituirVariaveisSpan() {
        let pai = this._elemento;
        let filhos = pai.getElementsByTagName("span");
        
        // Percorre cada tag <span> "filha" de um elemento "pai".
        for(let span of filhos) {
            // Percorre os nomes das variáveis.
            for(let nomeVar of Object.keys(this._variaveis)) {
                // Se o valor do atributo "l:var" de uma tag <span> for igual ao nome de uma variável.
                if(span.getAttribute("l:var") == nomeVar) {
                    // O conteúdo daquela tag <span> torna-se o valor daquela variável.
                    span.innerHTML = this[nomeVar];
                }
            }
        }

    }

}