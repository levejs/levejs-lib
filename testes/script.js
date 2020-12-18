class App{
	constructor(){}
	run(){
		let obj= new leve();
 
    
		//issue #1
		//obj.mudarId("app1","df");
		//issue #2
		//obj.mudarVariavel("app1","1","Mudança");
		//issue #3
		//obj.armazenar("app5");
		//issue #4
		//obj.addObservador("app10");
		 //obj.addObservador("app3");
		 //obj.mudarEmTempo("app2","var2");
		//issue #5
		//obj.addObservador('app10');
		//obj.addObservador('app9');
		//obj.comunicacaoComponentes("app2");
		//issue #6
		//obj.addObservador('app3');
		//obj.injetarHTML("app2");
		//obj.testeTestando();
	}
}


class leve{
	constructor(){
		this.obs=[];// Armazena os observadores
		this.armazem=[];//Armazena o estado dos objetos
    
    
    
	}
  
	//Issue 1# como parâmetro  a mudança a ser realizada
	mudarId( id,mudanca) {
		document.getElementById(id).innerHTML = mudanca;
	}
  
	//Issue 2# Recebendo como parâmetro a variavel a ser modificada e a mudança a ser realizada
	mudarVariavel(id, variavel, mudanca) {
		let str = document.getElementById(id).innerHTML;
		let res = str.replace(variavel, mudanca);
		document.getElementById(id).innerHTML = res;
	}
  
	//Issue 3# percorre o vetor armazem e armazena o objeto requerido quando encontra um espaço vazio
	armazenar(id){
		let i=0;
		let b=false;
		while(b==false){
			if(this.armazem[i]==undefined){
				this.armazem[i]= document.getElementById(id);
				b=true;
			}
			i++;
		}
	}
	
	//Issue 4# Recebe o  a mudança requerida
	mudarEmTempo(id,va){  
		let v=[];//vetor auxiliar
		let max=this.obs.length;//obtem o tamanho atual do vetor obs
		v=this.obs;// atribui o vetor obs ao vetor auxiliar v
		 setInterval((//Intervalo com um tempo de 100 para continuar chamando a função tss 
			function tss(){
				for(let e of document.getElementById(id).children){//Percorre os elementos filhos do elemento que teve seu id informado
					if(e.getAttribute('l:bind') != undefined){//Se há um input com l:bind entra no if
						if(e.value==""){//se o input estiver vazio as variaveis não são substituidas
							break;
						}
						for(let i=0;i<max; i++){//percorre o vetor auxiliar v realizando as modificações
							let str=	v[i].innerHTML;
							let rts= str.replace(va,e.value);
							v[i].innerHTML=rts;
							if(i==max-1){
								va=e.value;  
							}
						}
					}
				}
			}
		),100);
	}
	
	//Issue 5# recebe o id do elemento observado
	comunicacaoComponentes(id){
		let v=[];
		let max=this.obs.length;
		v=this.obs;
		setInterval((
			function r(){
				for(let e of document.getElementById(id).children){
					if(e.getAttribute('l:bind') != undefined){
						document.getElementById("let").addEventListener("click", function() {//adiciona um evento ao click do botão com id let	
							for(let i=0;i<max;i++){
								v[i].innerHTML = e.value;//modifica substitui o conteudo html pelo valor do input
							}
						}); 
					}
				}
			}
		),100);    
	}
	
	//Issue 6# recebe o id do eemento observado e  
	injetarHTML(id){
		let v=[];
		let max=this.obs.length;
		v=this.obs;
		setInterval((
			function tss(){
				for(let e of document.getElementById(id).children){
					if(e.getAttribute('l:bind') != undefined){
						document.getElementById("let").addEventListener("click", function() {	
							for(let i=0;i<max;i++){
								v[i].innerHTML=e.value;
							}
						}); 
					}
				}
			}
		),100);  
	}
	
	//Adiciona observador ao vetor obs
	addObservador(id){
		let aux1=true;
		let max=this.obs.length;
    
       	for(let i=0;i<max;i++){
     			if(this.obs[i]==""){
      				this.obs[i]=document.getElementById(id);
        			aux1=false;
        			break;
      			}
		}
    		if(aux1==true){
    			(this.obs).push(document.getElementById(id));
    		}
   	
	}
	
	//remove observador de acordo com o id passado
	removeObservador(id){
		let aux1;
      		let v=[];
		let max=this.obs.length;
		v=this.obs;
        	for(let i=0;i<max;i++){
        		if(this.obs[i]==document.getElementById(id)){
             			this.obs[i]="";
         	 	}
		}
    
	}
	  
	noticaId(){
		return this._id;
	}
	
	testeTestando(){
		console.log(this.noticaObservador());
	}
}

window.onload= function(){
	app=new App();
	app.run();
}
