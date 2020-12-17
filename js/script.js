class Leve {
  static focusOn = undefined; // Mantém o foco no input utilizado

  static leve_reg = {};

  static register(el) {
    Leve.leve_reg[el._id] = el;
  }

  static by_id(id) {
    return Leve.leve_reg[id];
  }

  constructor(id, props = {}, connections = []) {
    this._id = id;
    this._app = document.getElementById(id);

    this._state = props; // Armazena o estado do app
    this._connections = connections; // Armazena mapa de conexões.

    this._observers = []; // Armazena os elementos observedores
    this._memento = this._app.innerHTML; // Armazena o estado original do elemento 

    Leve.register(this);

    // Percorre o nome das variáveis vinculando os atributos à instância atual do app
    for (const k in this._state) {
      Object.defineProperty(this, `${k}`, {
        set: (value) => { // Atualiza o valor das variáveis
          this._state[`${k}`] = value;
          this.render();
        },
        get: () => { // Obtém o valor das variáveis
          return this._state[`${k}`];
        }
      });
    }

    this.setInputValue();
    this.updateAll();
  }

  // Atualiza o valor das variáveis "marcadas" substituindo pelo valor digitado no input
  updateMarkedVariables() {
    for (const k in this._state) {
      let pos0 = this._app.innerHTML.indexOf(`[[${k}]]`);
      if (pos0 == -1) continue;
      let size = `[[${k}]]`.length;

      let final = this._app.innerHTML.slice(0, pos0)
        + this[k] + this._app.innerHTML.slice(pos0 + size);
      this._app.innerHTML = final;
    }
  }

  // Sincroniza o valor digitado no input através do seu atributo l:bind
  setInputValue() {
    for (let el of this._app.children) {
      if (el.getAttribute('l:bind') != undefined) {
        el.setAttribute('value', this[el.getAttribute('l:bind')]);
        this._app.addEventListener('input', function (event) {
          let el = event.target;
          if (el.parentElement != null) {
            const ep = Leve.by_id(el.parentElement.id);

            ep[el.getAttribute('l:bind')] = el.value;
            Leve.register(ep);
          }
        });
      }
    }
  }

  // Renderiza o valor das variáveis em elementos que possuem o atributo "l:var"
  updateAttributes() {
    for (const att of this._app.children) {
      if (att.getAttribute('l:var') != undefined) {
        att.innerHTML = this[att.getAttribute('l:var')];
      }
    }
  }

  // Registra todos os elementos observadores
  observedElements() {
    for (let conf of this._connections) {
      let componente = Leve.by_id(conf['idr']);
      componente.addObserver(this);
    }
  }

  addObserver(obs) {
    this._observers.push(obs);
  }

  // Realiza uma "notifição" quando alguma mudança ocorrer chamando o método para realizar alteração
  notifyObservers() {
    for (let obs of this._observers) {
      obs.updateObservers(this);
    }
  }

  // Atualiza o elemento observador quando ocorrer alguma alteração em um elemento que ele está observando 
  updateObservers(watch) {
    for (let conf of this._connections) {
      if (conf['idr'] == watch._id) {
        this[conf['attp']] = watch[conf['attr']]
      }
    }
  }

  updateAll() {
    this.updateMarkedVariables();
    this.updateAttributes();
  }

  render() {
    Leve.focusOn = document.activeElement.id; // Qual elemento possuía o foco antes de renderizar

    let save = []; // Salva o estado dos inputs antes de renderizar
    let i = 0;
    for (const att of this._app.children) { // percorre os elementos filhos do app "procurando" pelo atributo l:bind e armazena o seu valor no array
      if (att.getAttribute('l:bind') != undefined) {
        save[i] = att.value;
        i++;
      }
    }

    this._app.innerHTML = this._memento; // Retorna ao estado original do app antes de renderizar as alterações
    this.updateAll();  // Chama o método que renderiza as alterações 

    // Restaura o conteúdo dos inputs de texto 
    i = 0;
    for (const att of this._app.children) {
      if (att.getAttribute('l:bind') != undefined) {
        att.value = save[i];
        i++;
      }
    }

    // Restaura o foco no elemento
    if (Leve.focusOn != '')
      document.getElementById(Leve.focusOn).focus();

    this.notifyObservers();
  }

  injectHTML(id, textHTML) {
    let _id = document.getElementById(id);
    _id.innerHTML = textHTML;
  }
}

