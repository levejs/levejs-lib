class Leve {
    constructor(id, var_list){
        this._app = document.getElementById(id);
        this._vars = var_list;
        
        window.setInterval(this.run, 1000, this);
    }
    run(obj){
        //obj._app.innerHTML = new Date();
        
        for(const k in obj._vars){
            // [[k]] `[[${k}]]`
            
            let pos0 = obj._app.innerHTML.indexOf(`[[${k}]]`);
            if(pos0 == -1) continue;
            let size = `[[${k}]]`.length
            
            let final = obj._app.innerHTML.slice(0,pos0)
                +obj._vars[k]+obj._app.innerHTML.slice(pos0+size);
            obj._app.innerHTML = final;
        }
    }
}

/*
    {'var1': 'Reperquilson é o cara', 'var2': 1984}
*/

