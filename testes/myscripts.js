class PegarElementoid{
	constructor(){
  }
  getElement(){
  }
  setChange(){
  }
}
class PegarNomeid extends PegarElementoid{
	constructor(){
  	super();
  }
  getElement(elemento){
  	var list = document.getElementById(elemento);
    if(list.id == elemento){
        list.innerHTML = `${this.setChange()}`;
    }	
}
    setChange(){
        return 'nessa funcao modifica o que voce quer';
    }
}

let teste = new PegarNomeid();
teste.getElement('testeChange');


class ChangeElement{
	constructor(){
  }
  setValue(){
  }
}
class ChangeValue extends ChangeElement{
	constructor(){
  super();
  }
  setValue(id,value){
  let dado = {var1: value}; 
  let template = document.getElementById("Mustache_Template").innerHTML;
  let html = Mustache.to_html(template,dado);
  let element = document.getElementById(id);
  setInterval(function() {
    element.innerHTML = html;
}, 1000);
 
  }
}
let changevalue = new ChangeValue();
changevalue.setValue("app","mudanca-acontecendo");