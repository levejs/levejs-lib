class Manipulation {
    element_manipulation(id, content, seg) {
        let element = document.getElementById(id);
        setTimeout( () => {
            element.innerHTML = `${content} <br/> <b>Mudou o conteúdo com ${seg} segundo(s)</b>`;
        }, seg*1000);
    }

    convert_var(id, var_ini, new_var) {
        const content = document.getElementById(id).innerHTML;
        const new_content = content.replaceAll(var_ini, new_var);
        document.getElementById(id).innerHTML = new_content;
    }

    change_var(id, data) {
        const content = document.getElementById(id).innerHTML;
        const novoConteudo = Mustache.render(content, data);
        document.getElementById(id).innerHTML = novoConteudo;
    }

    change_span(id, attr, data) {
        const element = document.getElementById(id);
        let children = element.getElementsByTagName("span");
        for (let tags of children) {
            for (let attrs of tags.attributes) {
                if (attrs.value == attr) {
                    tags.innerHTML = data;
                }
            }
        }
    }
}