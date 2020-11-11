
class Alterar{
			//issue 1
  	 mudarId( id,mudanca){
   	 		document.getElementById(id).innerHTML=mudanca;
 		 }
     
     //issue 2
  	 mudarVariavel(id,variavel,mudanca){
			  var str = document.getElementById("app").innerHTML; 
			  var res = str.replace(variavel, mudanca);
  			document.getElementById(id).innerHTML = res;
   	 }
}



class App {
    constructor(){
    }
    
    run(){
		let obj= new Alterar();
    obj.mudarVariavel('app','var1','Mudou');

	}
}
window.onload = function() {
app = new App();
app.run();
}
