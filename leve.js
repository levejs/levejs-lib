class Leve {
    // Registro do Leve é estático
    // Precisei criar para facilitar os eventListeners
    // conseguirem alterar estados.
    // focuson serve para manter o foco no input
    // que está em uso pelo usuário.
    static focuson = undefined;
    static leve_reg = {};
    
    static register(el){
        Leve.leve_reg[el._id] = el;
    }
    
    static by_id(id){
        return Leve.leve_reg[id];
    }

    // Métodos e propriedades de instância
    // connections: [{'attp': 'nome', 'idr': 'app2', 'attr': 'oi'}]
    constructor(id, dynamic_props={}, conections=[]){
        this._id = id;
        this._app = document.getElementById(id);
        this._d_state = dynamic_props;  // Propriedades reativas
        this._conns = conections;
        this._obs = [];
        
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
        
        this.put_binds();
        
        Leve.register(this);
        
        this.update();
    }
    
    registrarNosObservados(){
        for(let conf of this._conns){
            let componente = Leve.by_id(conf['idr']);
            componente.addObservador(this);
        }
    }
    
    addObservador(observador){    
        this._obs.push(observador);
    }
    
    notifyObservadores(){
        for(let obs of this._obs){
            obs.update_obs(this);
        }
    }
    
    update_obs(vigiado){
        for(let conf of this._conns){
            if(conf['idr'] == vigiado._id){
                this[conf['attp']] = vigiado[conf['attr']]
            }
        }
    }
    
    // Métodos para vínculos entre elementos
    
    put_binds(){
        for(let el of this._app.children){
            if(el.getAttribute('l:bind') != undefined){
                el.setAttribute('value', this[el.getAttribute('l:bind')]);
                
                //console.log('Tentando adicionar o evento');
                
                this._app.addEventListener('input', function(evt){
                    let el = evt.target;
                    
                    // Por enquanto estamos limitados
                    // a campos na raiz do app.
                    if(el.parentElement != null){
                        const ep = Leve.by_id(el.parentElement.id);

                        ep[el.getAttribute('l:bind')] = el.value;
                        Leve.register(ep);
                    }
                });
            }
        }
    }
    
    // Métodos para renderizar a tela
    
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
        
    }
    reset(){
        // Quem possuia o foco do usuário antes do render?
        Leve.focuson = document.activeElement.id;
        
        // Salvando estado dos inputs antes de renderizar.
        let save = {};
        let i = 0;
        for(const el of this._app.children){
            if(el.getAttribute('l:bind') != undefined){
                save[i] = el.value;
                i++;
            }
        }
    
        this._app.innerHTML = this._memento;
        this.update();
        
        // Restaurando estado dos inputs
        i = 0;
        for(const el of this._app.children){
            if(el.getAttribute('l:bind') != undefined){
                el.value = save[i];
                i++;
            }
        }
        
        // Restaurando o foco no elemento
        if(Leve.focuson != '')
            document.getElementById(Leve.focuson).focus();
            
        this.notifyObservadores();
    }
    
    // Método para ações de timeout ou interval
    run(obj){
        console.log('Lista: ', this._obs)
    }
    
}

/*
    {'var1': 'Reperquilson é o cara', 'var2': 1984}
*/