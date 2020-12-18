class App{
	constructor(){}
	run(){
		let obj= new leve();
 
    
		//issue #1
		//obj._id="app1";
		//obj.mudarId("df");
		//issue #2
		//obj._id="app1";
		//obj.mudarVariavel("1","Mudança");
		//issue #3
		//obj._id="app5";
		//obj.armazenar();
		//issue #4
		//obj._id="app2";
		//obj.addObservador("app10");
		// obj.addObservador("app3");
		// obj.mudarEmTempo("var2");
		//issue #5
		//obj._id="app2";
		// obj.addObservador('app10');
		//obj.addObservador('app9');
		//obj.comunicacaoComponentes();
		//issue #6
		//obj._id="app2";
		//obj.addObservador('app3');
		//obj.injetarHTML();
		//obj.testeTestando();
	}
}


class leve{
	constructor(){
		this.obs=[];// Armazena os observadores
		this.armazem=[];//Armazena o estado dos objetos
		this._id;//O Id do do objeto em destaque
	}
  
	//Issue 1# como parâmetro  a mudança a ser realizada
	mudarId( mudanca) {
		document.getElementById(this.noticaId()).innerHTML = mudanca;
	}
  
	//Issue 2# Recebendo como parâmetro a variavel a ser modificada e a mudança a ser realizada
	mudarVariavel( variavel, mudanca) {
		let str = document.getElementById(this.noticaId()).innerHTML;
		let res = str.replace(variavel, mudanca);
		document.getElementById(this.noticaId()).innerHTML = res;
	}
  
	//Issue 3# percorre o vetor armazem e armazena o objeto requerido quando encontra um espaço vazio
	armazenar(){
		let i=0;
		let b=false;
		while(b==false){
			if(this.armazem[i]==undefined){
				this.armazem[i]= document.getElementById(this.noticaId());
				b=true;
			}
			i++;
		}
	}
	
	//Issue 4# Recebe o  a mudança requerida
	mudarEmTempo(va){  
		let v=[];//vetor auxiliar
		let max=this.obs.length;//obtem o tamanho atual do vetor obs
		v=this.obs;// atribui o vetor obs ao vetor auxiliar v
		 setInterval((//Intervalo com um tempo de 100 para continuar chamando a função tss 
			function tss(){
				for(let e of document.getElementById(this.noticaId()).children){//Percorre os elementos filhos do elemento que teve seu id informado
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
	comunicacaoComponentes(){
		let v=[];
		let max=this.obs.length;
		v=this.obs;
		setInterval((
			function r(){
				for(let e of document.getElementById(this.noticaId()).children){
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
	injetarHTML(){
		let v=[];
		let max=this.obs.length;
		v=this.obs;
		setInterval((
			function tss(){
				for(let e of document.getElementById(this.noticaId()).children){
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
	addObservador(){
		(this.obs).push(document.getElementById(this.noticaId()));
	}
	
	//remove observador de acordo com o id passado
	removeObservador(){
		let aux1;
		aux1= this.obs.indexOf(this.noticaId());
		this.obs.splice(aux1,1);
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
