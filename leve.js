class Leve {
  // Mantem o foco no elemnto utiizado
  static focusOn = undefined; 

  // Inicializa a instância do app
  constructor(id, state = {}) {
    this._id = id;
    this._app = document.getElementById(this._id); // Salva elemento HTML referente ao app
    this._memento = this._app.innerHTML;  // Salva o estado original do app
    this._state = state;  // Inicializa o estado do app

    // Percorre o mapa de variáveis do estado e vincula à instância atual
    for (const variable in this._state) {
      // Forma parecida com padrão Listener, para reagir a atualização nas variáveis
      Object.defineProperty(this, `${variable}`, {
        get: () => { // Define o método para pegar o valor das variáveis
          return this._state[`${variable}`];
        },
        set: (value) => { // Define o método para atualizar o valor das variáveis
          this._state[`${variable}`] = value;
          // Reage a atualização do valor da variável e chama a função de renderização
          this.render();
        }
      });
    }

    this.syncBinds();
    this.update();

  }

  // Chama os métodos que faram as atulizações no conteúdo do app
  update() {
    this.updateByMarks();
    this.updateByAttr();
  }

  // Renderiza o valor das variáveis no lugar das variáveis marcadas ( [[var]] )
  updateByMarks() {
    let end = false;
    while(end == false){
      for(const variable in this._state){
        if(this._app.innerHTML.indexOf(`[[${variable}]]`) != -1) {
          end = false;
          let change = this._app.innerHTML.replaceAll(`[[${variable}]]`, this[`${variable}`]);
          this._app.innerHTML = change;
        } else {
          end = true;
        }  
      }
    }
  }

  // Renderiza o valor das variaveis no conteúdo dos elementos que possuem o atributo ( l:var="var" )
  updateByAttr() {
    for(const child of this._app.children){
      if(child.getAttribute('l:var') != undefined){
          child.innerHTML = this[child.getAttribute('l:var')];
      }
    }
  }

  // Método usado para salvar o foco, o estado e renderizar as aterações
  render() {
    // Salva o elemento em foco antes de renderizar as alterações
    Leve.focusOn = document.activeElement.id;
    
    // Salva o estado dos elementos de input com atributo l:bind antes de renderizar as alterações
    let save = {};
    let i = 0;

    for (const child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        save[i] = child.value;
        i++;
      }
    }

    // Reinicia o app para seu estado original antes de renderizar as alterações
    this._app.innerHTML = this._memento;

    // Chama os métodos responsaveis por redenrizar as alterações
    this.update();

    // Restaura o estado dos elementos de input com atributo l:bind após renderização
    i = 0;

    for (const child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        child.value = save[i];
        i++;
      }
    }

    // Restaura o elemento em foco após renderização
    if (Leve.focusOn != "") {
      document.getElementById(Leve.focusOn).focus();
    }
  }

  // Sincroniza o valor dos elementos de input com atributo l:bind à suas respectivas variáveis
  syncBinds() {
    for (let child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        // Alterar o valor do elemento de input para o da variável
        child.setAttribute('value', this[child.getAttribute('l:bind')]);
        // Adiciona uma escuta para atualizar o valor da variávell a cada novo evento do tipo input
        this._app.addEventListener('input', (event) => {
          child = event.target;
          this[child.getAttribute("l:bind")] = child.value;
        });
      }
    }
  }

}