class Leve {
    constructor(id, var_List){
        this._app = document.getElementById(id);
        this._vars = var_list;

        window.setInterval(this.run, 1000, this);
}
    run(obj){

        for(const k in obj._vars){


            let pos0 = obj._app.innerHTML.indexOf('[[${k}]]');
            if(pos0 == -1) continue;
            let size = '[[${k}]]'.length

            let final = obj._app.innerHTML.slice(0,pos0)
                    +obj.vars[k]+obj._app.innerHTML.slice(pos0+size);
                obj._app.innerHTML = final;
          }
       }
}
