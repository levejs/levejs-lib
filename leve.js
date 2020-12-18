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
