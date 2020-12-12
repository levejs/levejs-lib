// Classe que permitirá manipular o HTML.
class Leve {
    static registro = {};       // Armazena os elementos que utilizarem o Leve.

    // O método construtor recebe o id do elemento que será manipulado, um objeto que contém um "mapa de variáveis" e um array de objetos que contém um ou mais "mapas de conexões".
    // variaveis = { <var1>: "---", <var2>: "---", <var3>: "---", ... }
    // conexoes = [ { varObservador: "---", idVigiado: "---", varVigiada: "---" }, {...}, ... ]
    constructor(id, variaveis={}, conexoes=[]) {
        this._id = id;                                  // Armazena o id deste elemento.
        this._elemento = document.getElementById(id);   // Armazena este elemento.
        this._memento = this._elemento.innerHTML;       // Armazena o estado original deste elemento para fins de restauração quando necessário.
        this._variaveis = variaveis;                    // Armazena um mapa de variáveis.
        this._conexoes = conexoes;                      // Armazena os mapas de conexões.
        this._observadores = [];                        // Armazena os "elementos observadores" deste elemento.
        
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

        Leve.registro[this._id] = this;

    }

    // Sincroniza o valor das variáveis do elemento com o conteúdo dos inputs de texto.
    sincronizarInputs() {
        let pai = this._elemento;
        let filhos = pai.getElementsByTagName("input");
        
        // Adiciona um evento de "input" aos inputs de texto.
        pai.addEventListener("input", (evento) => {
            filhos = evento.target;
            // O valor de determinada varíavel torna-se o conteúdo do input de texto.
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

        // Armazena o conteúdo dos inputs de texto num objeto, antes de renderizar a mudança numa variável.
        // Isso deve feito para que o conteúdo digitado pelo usuário seja restaurado mais tarde.
        let conteudoInputs = {};
        let i = 0;
        for(let input of filhos) {
            if(input.getAttribute("l:bind") != undefined) {
                conteudoInputs[i] = input.value;
                i++;
            }
        }
        
        // Restaura o estado original do elemento para que a renderização do método "substituirVariaveisMarcadas()" funcione corretamente.
        this.substituirConteudo(this._memento);

        // Métodos de renderização de variáveis.
        this.substituirVariaveisMarcadas();
        this.substituirVariaveisSpan();
        this.atualizarObservador();

        // Restaura o conteúdo dos inputs de texto, a medida que a mudança numa variável é renderizada. Com isso, o conteúdo já digitado pelo usuário irá permanecer no input de texto enquanto ele está digitando.
        i = 0;
        for(let input of filhos) {
            if(input.getAttribute("l:bind") != undefined) {
                input.value = conteudoInputs[i];
                i++;
            }
        }
        
        // Restaura o foco no elemento, a medida que a mudança numa variável é renderizada. Com isso, o input de texto irá permanecer em foco enquanto o usuário está digitando.
        if(foco != "") {
            document.getElementById(foco).focus();
        }

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

    // Adiciona os "elementos observadores" na lista de observadores dos "elementos vigiados".
    estaObservando() {
        // Percorre cada mapa de conexões dos "elementos observadores".
        for(let conexao of this._conexoes) {
            let vigiado = Leve.registro[conexao["idVigiado"]];
            vigiado._observadores.push(this);
        }

    }

    // Atualiza um "elemento observador" quando ocorrer uma mudança numa "variável vigiada" por ele.
    atualizarObservador() {
        // Percorre cada "elemento observador" da lista de observadores de um "elemento vigiado".
        for(let obs of this._observadores) {
            obs.atualizar(this);
        }

    }
    
    // Atualiza a variável do "elemento observador" de acordo com as conexões feitas pelo usuário.
    atualizar(vigiado) {
        // Percorre cada mapa de conexões dos "elementos observadores".
        for(let conexao of this._conexoes) {
            // Se o id presente no mapa de conexões for igual ao id de um "elemento vigiado".
            if(conexao["idVigiado"] == vigiado._id && vigiado[conexao["varVigiada"]] != undefined) {
                // O valor da "variável do observador" torna-se o valor da "variável vigiada".
                this[conexao["varObservador"]] = vigiado[conexao["varVigiada"]];
            }
        }

    }

    // Substitui todo o conteúdo de um elemento por um novo conteúdo.
    substituirConteudo(novoConteudo) {
        this._elemento.innerHTML = novoConteudo;
    }
    
}