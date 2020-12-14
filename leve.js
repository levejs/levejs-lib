class Leve {
    static foco = undefined;    //Serve para manter o foco no elemento que está sendo utilizado.

    constructor(id, estado = {}) {  //Método Construtor inicializa a instância do app. 
        this._id = id;
        this._app = document.getElementById(this._id);
        this._estado = estado;  //Armazena o mapa das variáveis.

        for (const variavel in this._estado) { //Percorre todas as variáveis e vincula à instância atual.
            Object.defineProperty(this, `${variavel}`, {
                get: () => {    //Estabelece o get para poder pegar o valor de cada variável.
                    return this._estado[`${variavel}`];
                },
                set: (valor) => {   //Estabelece o set para atualizar o valor de cada variável.
                    this._estado[`${variavel}`] = valor;
                    this.renderizar();  //Chama o método para renderizar as alterações na tela.
                }
            });
        }

        this._memento = this._app.innerHTML;   //Salva o estado inicial do app.
        this.sincronizarBinds();
        this.atualizarMarcacao();
        this.atualizarAtributo();

    }

    sincronizarBinds() {    //Sincroniza o valor das variáveis com o input.
        for (let filho of this._app.children) {
            if (filho.getAttribute('l:bind') != undefined) {
                filho.setAttribute('value', this[filho.getAttribute('l:bind')]);
                this._app.addEventListener('input', (evento) => {
                    filho = evento.target;
                    this[filho.getAttribute("l:bind")] = filho.value;
                });
            }
        }
    }

    atualizarMarcacao() {   //Renderiza o valor das variáveis nas suas respectivas marcações.
        let end = false;
        while (end == false) {
            for (const variavel in this._estado) {
                if (this._app.innerHTML.indexOf(`[[${variavel}]]`) != -1) {
                    end = false;
                    let change = this._app.innerHTML.replaceAll(`[[${variavel}]]`, this[`${variavel}`]);
                    this._app.innerHTML = change;
                } else {
                    end = true;
                }
            }
        }
    }

    atualizarAtributo() {   //Renderiza o valor da variável no elemento que possuir o atributo l:var.
        for (const filho of this._app.children) {
            if (filho.getAttribute('l:var') != undefined) {
                filho.innerHTML = this[filho.getAttribute('l:var')];
            }
        }
    }

    renderizar() {  //Método usado para salvar o foco e o estado antes de renderizar as novas informações.
        Leve.foco = document.activeElement.id;  //Salva o foco para depois da renderização retornar o foco.
        let salvar = {};
        let i = 0;

        for (const filho of this._app.children) {   //Salva o estado.
            if (filho.getAttribute('l:bind') != undefined) {
                salvar[i] = filho.value;
                i++;
            }
        }

        this._app.innerHTML = this._memento;    //Retorna o app ao seu estado inicial.
        this.atualizarMarcacao();
        this.atualizarAtributo();

        i = 0;

        for (const filho of this._app.children) {   //Restaura o estado.
            if (filho.getAttribute('l:bind') != undefined) {
                filho.value = salvar[i];
                i++;
            }
        }

        if (Leve.foco != "") {  //Restaura o foco.
            document.getElementById(Leve.foco).focus();
        }
    }
}