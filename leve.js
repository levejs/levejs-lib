class Leve {
    static foco = undefined;    //Serve para manter o foco no elemento que está sendo utilizado.
    static leve_reg = {};

    static registro(elemento) {
        Leve.leve_reg[elemento._id] = elemento;
    }

    static byId(id) {
        return Leve.leve_reg[id];
    }

    constructor(id, estado = {}, conexao = []) {  //Método Construtor inicializa a instância do app. 
        this._id = id;
        this._app = document.getElementById(this._id);
        this._estado = estado;  //Armazena o mapa das variáveis.
        this._conexao = conexao;
        this._observadores = [];

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
        Leve.registro(this);
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
        this.notificaObs();
        let salvar = {};
        let i = 0;

        for (const filho of this._app.children) {   //Salva o estado.
            if (filho.getAttribute('l:bind') != undefined) {
                salvar[i] = this[filho.getAttribute('l:bind')];
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

    registrarObs() { // Registra os Obs.
        for (let con of this._conexao) {
            let obs = Leve.byId(con['idr']);
            obs._observadores.push(this);
        }
    }

    notificaObs() { //Notifica a mudança no Obs.
        for (let obs of this._observadores) {
            obs.atualizaObs(this);
        }
    }

    atualizaObs(obs) {  //Atualiza o valor da variável do Obs.
        for (let con of this._conexao) {
            if (con['idr'] == obs._id) {
                this[con['attp']] = obs[con['attr']];
            }
        }
    }

    injetarHTML(textHTML) {  //Método para injetar html no app
        this._app = document.getElementById(this._id);
        this._app.innerHTML = textHTML; // Injeta o html no app
        this._memento = this._app.innerHTML;
        this.sincronizarBinds();
        this.atualizarMarcacao();
        this.atualizarAtributo();
    }
}