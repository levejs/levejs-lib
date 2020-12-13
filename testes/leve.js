
class App {
	constructor() {}

	run() {
		let obj = new Leve('app');
		//obj.Armazenar('app2');
		obj.armazenar('app5');
		obj.mudarEmTempo();
	}
}


class Leve {

	constructor(){
		this.obs = [];
	}

	
	//#issue 1
	mudarId(id, mudanca) {
		document.getElementById(id).innerHTML = mudanca;
	}

	//#issue 2
	mudarVariavel(id, variavel, mudanca) {
		let str = document.getElementById(id).innerHTML;
		let res = str.replace(variavel, mudanca);
		document.getElementById(id).innerHTML = res;
	}


	//#issue 3
	armazenar(id){
		let i=0;
		let b=false;
		while(b==false){
			if(this.obs[i]==undefined){
				this.obs[i]= document.getElementById(id);
				b=true;
			}
		i++;
		}
	}


	//#issue4

	mudarEmTempo(){  
		let v=[];
		let b=true;
		let max=this.obs.length;
	
		for(let i=0;i<max;i++){
			v[i]=this.obs[i]; 
		}
  		

     
		setInterval((
			function tss(){
				for(let e of document.getElementById('app').children){
					if(e.getAttribute('l:bind') != undefined){
						for(let i=0;i<max;i++){
						v[i].innerHTML=e.value;
						}
					}
				}
			}),100);
		}
	}
    
    
window . onload  =  function ( )  {
	app  =  new  App ( ) ;
	app . run ( ) ;
}
