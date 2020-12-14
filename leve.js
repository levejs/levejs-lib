class Leve {
  static focusOn = undefined;

  constructor(id, state = {}) {
    this._id = id;                    
    this._app = document.getElementById(this._id);
    this._memento = this._app.innerHTML;
    this._state = state;

    for (const variable in this._state) {
      Object.defineProperty(this, `${variable}`, {
        get: () => {
          return this._state[`${variable}`];
        },
        set: (valor) => {
          this._state[`${variable}`] = valor;
          this.reset();
        }
      });
    }

    this.syncBinds();
    this.update();

  }

  reset() {
    Leve.focusOn = document.activeElement.id;
    let save = {};
    let i = 0;

    for (const child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        save[i] = child.value;
        i++;
      }
    }

    this._app.innerHTML = this._memento;
    this.update();

    i = 0;

    for (const child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        child.value = save[i];
        i++;
      }
    }

    if (Leve.focusOn != "") {
      document.getElementById(Leve.focusOn).focus();
    }
  }
  
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

  updateByAttr() {
    for(const child of this._app.children){
      if(child.getAttribute('l:var') != undefined){
          child.innerHTML = this[child.getAttribute('l:var')];
      }
    }
  }

  update() {
    this.updateByMarks();
    this.updateByAttr();
  }

  syncBinds() {
    for (let child of this._app.children) {
      if (child.getAttribute('l:bind') != undefined) {
        child.setAttribute('value', this[child.getAttribute('l:bind')]);
        this._app.addEventListener('input', (event) => {
          child = event.target;
          this[child.getAttribute("l:bind")] = child.value;
        });
      }
    }
  }

}