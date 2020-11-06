// classe que permitirá manipular o HTML
class ManipularHTML {
    // retorna um elemento
    obterElemento(id) {
        return document.getElementById(id);
    }

    // substitui todo o conteúdo de um elemento por um novo conteúdo
    substituirConteudo(id, novoConteudo) {
        this.obterElemento(id).innerHTML = novoConteudo;
    }

    // substitui (dentro de um elemento de id informado) todas as ocorrências de determinado trecho por um novo conteúdo
    substituirVariaveis(id, variavelInicial, novaVariavel) {
        let conteudoInicial = this.obterElemento(id).innerHTML;

        let novoConteudo = conteudoInicial.replaceAll(variavelInicial, novaVariavel);

        this.substituirConteudo(id, novoConteudo);
    }

    // utilizando o padrão Mustache, renderiza (dentro de um elemento de id informado) as variáveis de um objeto no lugar de variáveis mustache {{variavel}} de mesmo nome
    substituirVariaveisMustache(id, objeto) {
        let template = this.obterElemento(id).innerHTML;

        let novoConteudo = Mustache.render(template, objeto);

        this.substituirConteudo(id, novoConteudo);
    }

    // utilizando tags <span>, renderiza (dentro de um elemento de id informado) a variável informada pelo usuário dentro do conteúdo de variáveis <span> que possuírem o atributo também informado pelo usuário
    substituirVariaveisSpan(id, valorAtributo, variavel) {
        let pai = this.obterElemento(id);
        let filhos = pai.getElementsByTagName("span");
        
        for (let tags of filhos) {
            for (let atributos of tags.attributes) {
                if (atributos.value == valorAtributo) {
                    tags.innerHTML = variavel;
                }
            }
        }
    }
}