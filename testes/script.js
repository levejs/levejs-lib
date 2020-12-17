class App {
	constructor() {}

	run() {
		let obj = new Leve('app');
   
    //obj.onclick(console.log("qq"));
		//obj.mudarEmTempo("");
    //issue 1
    //obj.mudarId("app1","df");
    
    //issue 2
   // obj.mudarVariavel("app1","1","Mudança");
    
    //issue 3
   	//obj.armazenar('app5');

    //issue 4
   // obj.armazenar('app3');

   // obj.mudarEmTempo("app2","Teste");
    //issue 5
   // obj.armazenar('app7');
   //	obj.comunicacaoComponentes("app2");
    obj.injetarHTML("app2","app3");

    
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
    console.log(res);
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

	mudarEmTempo(id,va){  
		let v=[];
 		let max=this.obs.length;
		v=this.obs;
     
		setInterval((
			function tss(){
				for(let e of document.getElementById(id).children){
					if(e.getAttribute('l:bind') != undefined){
						for(let i=0;i<max;i++){
            let str=	v[i].innerHTML;
            if(e.value==""){
           		break;
						}
            let rts= str.replace(va,e.value);
           
          	v[i].innerHTML=rts;
            va=e.value;
           
						}
					}
				}
			}),100);
		}
    
    
   //#issue5
   
   comunicacaoComponentes(id){
   		let v=[];
      let max=this.obs.length;

			v=this.obs;
			setInterval((
				function r(){
					for(let e of document.getElementById(id).children){
						if(e.getAttribute('l:bind') != undefined){
  						document.getElementById("let").addEventListener("click", function() {	
	 							for(let i=0;i<max;i++){
  								v[i].innerHTML = e.value;
  							}
  					}); 
					}
			}
   }),100);    
	}
  
  //#issue6
  
  injetarHTML(id1,id2){
 
     
		setInterval((
			function tss(){
						for(let e of document.getElementById(id1).children){
						if(e.getAttribute('l:bind') != undefined){
  						document.getElementById("let").addEventListener("click", function() {	
	 						if(e.value==''){
           		
						}
              document.getElementById(id2).innerHTML=e.value;
  							
  					}); 
					}
			}
   }),100);  
  }
}   
    
window . onload  =  function ( )  {
	app  =  new  App ( ) ;
	app . run ( ) ;
}

