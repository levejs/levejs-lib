
class App {
	constructor(){}
  
	run(){
		let obj= new Alterar();
    obj.armazenarEstado('app');   
	}
}

class Alterar {

	constructor(){}
  
//#issue 1
	mudarId( id,mudanca){
		document.getElementById(id).innerHTML=mudanca;
	}
     
//#issue 2
	mudarVariavel(id,variavel,mudanca){
		let str = document.getElementById(id).innerHTML; 
		let res = str.replace(variavel, mudanca);
		document.getElementById(id).innerHTML = res;
	}
  
 //#issue 3
  armazenarEstado(id){
		let vetor=[];
  	setInterval(
    	function armazenar(){
      	for(var i=0;i<10;i++){
   				if(vetor[i]==null){
      			vetor[i]=document.getElementById(id).innerHTML; 
        		break;
     			}
      	}
    	},15000);
  }
  
}


window.onload = function() {
	app = new App();
	app.run();
}

