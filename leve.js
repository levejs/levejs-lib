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
