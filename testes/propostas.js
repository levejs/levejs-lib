class Leve{
	//ISSUE 1
	pegarElemento(id){
  	let elemento = document.getElementById(id);
    return elemento
  }
  
 	substituirTexto(elemento, palavra){
 		let ele = this.pegarElemento(elemento);
    
    ele.innerHTML = palavra;
 	}
  
  substituirElemento(id, elementoInicial, novoElemento){
  	let ele = this.pegarElemento(id).innerHTML;
    let novoConteudo = ele.replace(elementoInicial, novoElemento);
    
    this.substituirTexto(id, novoConteudo);
  }
  
    
  //ISSUE 2 
  mudarVarMarcada(id, atributo, variavel){
  	let ele = this.pegarElemento(id);
    let subEle = ele.getElementsByTagName("span");
    
    for(let tags of filhos){
    	for(let atributos of tags.attributes){
      	if(atributos.value == atributo)
        	tags.innerHTML = variavel;
      }
    }
  }
  
  //ISSUE 3
  
  
}