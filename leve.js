// Classe que permitirá manipular o HTML
class Leve {
    // O método construtor receberá o id do elemento que será manipulado, e um objeto com um "mapa de variáveis".
    constructor(id, mapaDeVariaveis) {
        this._elemento = document.getElementById(id);       //Armazena o elemento de id informado.
        this._memento = this._elemento.innerHTML;           //Armazena o estado original daquele elemento.
        this._variaveis = mapaDeVariaveis;                  //Armazena o mapa de variáveis (propriedades) de um objeto.

        // Percorre os nomes das variáveis.
        for(let nomeVar of Object.keys(this._variaveis)){
            // Vincula cada variável à instância atual, permitindo obter e atualizar o seu valor quando ocorrer alguma mudança.
            Object.defineProperty(this, nomeVar, {
                get: () => {
                    return this._variaveis[nomeVar];
                },
                set: (valor) => { 
                    this._variaveis[nomeVar] = valor;
                    this.substituirVariaveis();
                }
            });
        }

        this.substituirVariaveis();

    }

    // Executa os métodos de substituição de variáveis.
    substituirVariaveis() {
        this.substituirVariaveisMustache();
        this.substituirVariaveisSpan();
    }

    // Substitui todo o conteúdo de um elemento.
    substituirConteudo(novoConteudo) {
        this._elemento.innerHTML = novoConteudo;
    }

    // Renderiza os valores das variáveis no lugar de variáveis Mustache que possuírem o mesmo nome da variável.
    substituirVariaveisMustache() {
        let template = this._memento;

        let conteudoAtualizado = Mustache.render(template, this._variaveis);

        this.substituirConteudo(conteudoAtualizado);
    }

    // Renderiza os valores das variáveis dentro do conteúdo de tags <span> que possuírem o valor do atributo "l:var" igual ao nome da variável.
    substituirVariaveisSpan() {
        let pai = this._elemento;
        let filhos = pai.getElementsByTagName("span");
        
        // Percorre cada tag <span> "filha" de um elemento "pai".
        for (let span of filhos) {
            // Percorre os nomes das variáveis.
            for (let nomeVar of Object.keys(this._variaveis)) {
                // Se o valor do atributo "l:var" de uma tag <span> for igual ao nome de uma variável.
                if (span.getAttribute("l:var") == nomeVar) {
                    // O conteúdo daquela tag <span> torna-se o valor daquela variável.
                    span.innerHTML = this._variaveis[nomeVar];
                }
            }
        }

    }

}