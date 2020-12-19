//issue 3

class App{
	constructor(){}
	run(){
		let obj = new leve();
 

class Local{
    lit<Voltar> lista = new ArrayList <Voltar>();

    add(Local estado){
        lista.add(estado);
}
    Voltar get(posicao){
        lista.get(posicao);
    }
    
    class Voltar{
         let estado;

    Voltar(estado){
             this.estado = estado;
    }


    getEstado(){
        estado;
    }


        class origem{
            let string estado;
    
         setEstado(String salvarEstado){
             this.estado = salvarEstado;
        }
   

         getEstado(){
            return this.estado;
    }


    salvarEstado(){
        return new ve(estado);
    }


        estadoSalvo(ve ultimoEstado){                       
            estado = ultmoEstado.getEstado();
    }



class Leve{
    Origem origem = new Origem();
    Local local = new Local();

    origem.setEstado("Estado inicial");
    local.add(origem.salvarEstado());


// issue 4

atualizarVariavel(id,variavel)

    {  
		let vet = [];
            //valor máximo da quantidade de caracteres
 		let max = this.obs.length;
            
		vet = this.obs;
     
		setIntervalo(
			    //plugin editor typescript
            function tss()
                  {
				for(let x of document.getElementById(id).children)
                  {
					if(x.getAttribute('l:bind') != null)
                        {
						for(let i=0; i<max ;i++)    //percorrer String
                            {
          
                                  let str =	vet[i].innerHTML;
                                           if(x.value=="")
                                                {
           		                                        break;
						}
                             let aj = str.replace(variavel,x.value);       // substituir onde tem variavel por valor de x
           
          	                        vet[i].innerHTML = aj;
                                             variavel = x.value;
           
						                    }
					                    }
				                     });
			                    }
	                    	}
//issue 5
comunicacao(){
		let vet = [];
            //valor maximo quantidade de caracteres
		let max = this.obs.length;
		
        vet = this.obs;
		
        setInterval((
			                
                    function r()
                                {
				        for(let x of document.getElementById(this.noticaId()).children)
                                {
					if(x.getAttribute('l:bind') != undefined)
                        {
						document.getElementById("let").addEventListener("click", function() 
                                    {                                   //adiciona um evento ao click do botão 	
							for(let i=0;i<max;i++)  
                                    {
								vet[i].innerHTML = x.value;         //modifica substitui o conteudo html pelo valor do input
							}
						}); 
					}
				}
			}
		),100);    
	}

//issue 6

setHTML(id,textHTML)
{
        let _id = document.getElementById(id);
        _id.innerHTML = textHTML; 
         }



