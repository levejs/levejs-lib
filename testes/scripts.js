//Issue 1#

class PegarElemento{
	constructor(){
  }
  getNameElement(){
  }
  setMudanca(){
  
  }
}

class PegarNomeElemento extends PegarElemento{
	constructor(){
  	super();
  }
  getNameElement(element,valor){
  	var list = document.getElementsByTagName(element);
		var collectionId = [];

    for(let i of list ){
      collectionId.push(i.id);
    }
    
    for(let i = 0; i < collectionId.length ; i++ ){
    	if(collectionId[i] == valor){
   var el = document.getElementById(collectionId[i]);
   	el.innerHTML = `${this.setMudanca()}`;
   }
    }
  }
  setMudanca(){
      return "Aqui implementa a mudança!";
    }
}



let teste = new PegarNomeElemento();
teste.getNameElement("div","teste_mudanca");


//end region



//Issue 2#

//classe
class MudarElement{
	constructor(){
  }
  setNome(){
  }
}

class MudarValor extends MudarElement{
	constructor(){
  super();
  }
  //metodo que pega o id e o valor e altera
  setNome(id,valor){
  let dado = {var1: valor}; // recebe o valor passado como parâmetro
  //pega a seção que tem esse id, que é onde interliga o uso do  Mustache.js, para que essas interpolações {{}} funcionem com o     javascript puro.
  let template = document.getElementById("Mustache_Template").innerHTML;
  console.log(template);
  //aqui serve como uma renderização na tela, com o uso da biblioteca mustache.js
  let html = Mustache.to_html(template,dado);
  let element = document.getElementById(id);
  //altera o valor em tempo de execução como pedido
  setInterval(function() {
    element.innerHTML = html;
}, 1000);
 
  }
}

let _mudarvalor = new MudarValor();
_mudarvalor.setNome("app","teste");

//end region