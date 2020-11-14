class Leve {
    constructor(id, dynamic_props={}){
        this._app = document.getElementById(id);
        this._d_state = dynamic_props;  // Propriedades reativas
        
        // Uma forma de vincular os atributos à instância
        // de forma não reativa
        //Object.assign(this, var_list);
        
        // Do jeito abaixo conseguimos usar algo
        // parecido ao padrão Listener
        // para reagir a atualizações nos valores
        for(const n in this._d_state){
            Object.defineProperty(this, `${n}`, {
                set: function(value) { 
                    this._d_state[`${n}`] = value;
                    this.reset();
                },
                get: function() { 
                    return this._d_state[`${n}`];
                }
            });
        }
        
        
        // Abaixo armazeno o estado original do app,
        // para fins de restauração quando necessário atualizar a tela.
        this._memento = this._app.innerHTML;
        
        this.update();
    }
    update(){
        this.update_by_marks();
        this.update_by_attributes();
    }
    update_by_attributes(){
        for(const el of this._app.children){
            if(el.getAttribute('l:var') != undefined){
                el.innerHTML = this[el.getAttribute('l:var')];
            }
        }
    }
    update_by_marks(){
        let end = false;
        while(end == false){
            for(const k in this._d_state){
                let pos0 = this._app.innerHTML.indexOf(`[[${k}]]`);
                if(pos0 == -1) {
                    end = true;
                    continue;
                } else {
                    end = false;
                }
                let size = `[[${k}]]`.length;
                
                let final = this._app.innerHTML.slice(0,pos0)
                    +this[k]+this._app.innerHTML.slice(pos0+size);
                this._app.innerHTML = final;
            }
        }
        //window.setInterval(this.run, 1000, this);
    }
    reset(){
        this._app.innerHTML = this._memento;
        this.update();
    }
    run(obj){
        
    }
    
}

/*
    {'var1': 'Reperquilson é o cara', 'var2': 1984}
*/

