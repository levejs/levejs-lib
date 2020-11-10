// Classe que permitirá manipular o HTML
class ManipularHTML {
    // O método construtor receberá o id do elemento que será manipulado.
    constructor(id) {
        this.id = id;
        this.historicoDeEstados = [];   // Array que armazenará o histórico de mudanças que ocorrerem em um elemento.
        this.historicoDeEstados.push(this.obterElemento().innerHTML);   // Adiciona o estado inical de um elemento no histórico.
    }

    // Retorna um elemento
    obterElemento() {
        return document.getElementById(this.id);
    }

    // Substitui todo o conteúdo de um elemento pelo conteúdo informado (novoConteudo).
    substituirConteudo(novoConteudo) {
        this.obterElemento().innerHTML = novoConteudo;
        this.historicoDeEstados.push(this.obterElemento().innerHTML);    // Adiciona a mudança na última posição do histórico.
    }

    // Utilizando <string>.replaceALL(). Substitui, dentro de um elemento, todas as ocorrências de determinado trecho (variavelInicial) pelo conteúdo informado (novaVariavel).
    substituirVariaveis(variavelInicial, novaVariavel) {
        let conteudoInicial = this.obterElemento().innerHTML;        

        let novoConteudo = conteudoInicial.replaceAll(variavelInicial, novaVariavel);

        this.substituirConteudo(novoConteudo);
    }

    // Utilizando o padrão Mustache. Renderiza, dentro de um elemento, os valores dos atributos de um objeto informado (objeto) no lugar de variáveis mustache que possuírem o mesmo nome daquele atributo.
    substituirVariaveisMustache(objeto) {
        let template = this.obterElemento().innerHTML;

        let novoConteudo = Mustache.render(template, objeto);

        this.substituirConteudo(novoConteudo);
    }

    // Utilizando tags <span>. Renderiza, dentro de um elemento, o conteúdo informado (variavel) dentro do conteúdo de tags <span> que possuírem o atributo informado (valorAtributo).
    substituirVariaveisSpan(valorAtributo, variavel) {
        let pai = this.obterElemento();
        let filhos = pai.getElementsByTagName("span");

        for (let tags of filhos) {
            for (let atributos of tags.attributes) {
                if (atributos.value == valorAtributo) {
                    tags.innerHTML = variavel;
                }
            }
        }
        this.historicoDeEstados.push(pai.innerHTML);     // Adiciona a mudança na última posição do histórico.        
    }

    // Restaura determinado estado (estadoDoElemento) do histórico de mudanças de um elemento. O estado inicial será representado pelo valor 1, e as mudanças que ocorreram serão os valores 2, 3, 4 e assim por diante.
    restaurarEstado(estadoDoElemento) {
        // Se o valor recebido for menor que 1, ou maior que a quantidade de estados presentes no histórico...
        if (estadoDoElemento < 1 || estadoDoElemento > this.historicoDeEstados.length) {
            console.log("Estado inválido.");
        }
        // Se o atual estado do elemento for igual ao estado correspondente do valor recebido...
        else if (this.obterElemento().innerHTML == this.historicoDeEstados[estadoDoElemento - 1]) {
            console.log("Você digitou o valor correspondente ao atual estado do elemento.")
        }
        // O conteúdo do elemento torna-se o estado correspondente ao valor recebido.
        else {
            this.obterElemento().innerHTML = this.historicoDeEstados[estadoDoElemento - 1];
        }
    }
}