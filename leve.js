
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

    origem.setEstado("Proximo estado");
    local.add(origem.salvarEstado());

    origem.setEstado("Estado atual");
    window.print("Estado atual");
    console.log(origem.getEstado());

    origem.getEstadoSalvo(local.get(0));
    window.print("Estado incial");
    console.log(origem.getEstado());
    
    origem.getEstadoSalvo(local.get(1));
    window.print("proximo estado");
    console.log(origem.getEstado());

}





}
    
