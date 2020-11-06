class Alterar{
   mudar( id,mudanca){
   	 document.getElementById(id).innerHTML=mudanca;
  }
}
let obj= new Alterar();
obj.mudar('app','Mudou');

