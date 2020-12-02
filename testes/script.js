
class App {
	constructor(){}
  
	run(){
    let estado =false;
    
		let obj= new Alterar();
    obj.refletirEstado('app');
    obj.mudarVariavel('app2','var1','SUCESSO');   

	}
}

class Alterar {

	constructor(){	let idRefletor,mudanca1,variavel1;}
  
//#issue 1
	mudarId( id,mudanca){
    this.mudanca1=mudanca;
		document.getElementById(id).innerHTML=mudanca;
    this.refletirEstado1();
      //  teste=mudanca;
    
	}
     
//#issue 2
	mudarVariavel(id,variavel,mudanca){
    this.mudanca1=mudanca;
    this.variavel1=variavel;

		let str = document.getElementById(id).innerHTML; 
		let res = str.replace(variavel, mudanca);
		document.getElementById(id).innerHTML = res;
    this.refletirEstado2();

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
  
  //#issue 4
	refletirEstado(idRefletido){
  	this.idRefletor=idRefletido;
    
		if(this.idRefletor !=null){
    	this.estado=true;
    }   
	} 
  
  refletirEstado1(){
  	if(this.estado==true){
    	document.getElementById(this.idRefletor).innerHTML=this.mudanca1;
    }
  }
  
  refletirEstado2(){
  	if(this.estado==true){
    	let str = document.getElementById(this.idRefletor).innerHTML; 
			let res = str.replace(this.variavel1, this.mudanca1);
			document.getElementById(this.idRefletor).innerHTML = res;
    }
  }
}




window.onload = function() {
	app = new App();
	app.run();
}
