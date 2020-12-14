class App {
	constructor() {}

	run() {
		let obj = new Leve('app');
    obj.armazenar('texto4');
   	obj.comunicacaoComponentes("app2");
    //obj.onclick(console.log("qq"));
		//obj.armazenar('app5');
		//obj.mudarEmTempo();
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

	mudarEmTempo(id){  
		let v=[];
 		let max=this.obs.length;
		v=this.obs;
     
		setInterval((
			function tss(){
				for(let e of document.getElementById(id).children){
					if(e.getAttribute('l:bind') != undefined){
						for(let i=0;i<max;i++){
						v[i].innerHTML=e.value;
						}
					}
				}
			}),100);
		}
    
    
   //#issue5
   
   comunicacaoComponentes(id){
   		let v=[];
			v=this.obs;
			setInterval((
				function r(){
					for(let e of document.getElementById(id).children){
						if(e.getAttribute('l:bind') != undefined){
  						document.getElementById("let").addEventListener("click", function() {	
	 							for(let i=0;i<1;i++){
  								v[i].placeholder = e.value;
  							}
  					}); 
					}
			}
   }),1000);    
	}
}   
    
window . onload  =  function ( )  {
	app  =  new  App ( ) ;
	app . run ( ) ;
}

