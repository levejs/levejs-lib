class ManipulaHTML {
  /*Manipular elemento de ID informado #1
  Precisamos de uma classe capaz de buscar e manipular conteúdo do objeto que tiver um ID informado.*/

  getElement(id) {
    let el = document.getElementById(id);
    return el;
  }

  replaceElement(id, initialContent, newContent) {
    let el = this.getElement(id).innerHTML;
    let newValue = el.replace(initialContent, newContent);
    document.getElementById(id).innerHTML = newValue;
  }

  /* Modificação de variáveis "marcadas" no HTML #2
  Precisamos de uma forma de marcar uma variável dentro do elemento alvo, e substituir este texto pelo valor da variável com o mesmo nome. */
  
  changeTagSpan(id, data, attributeValue, newValue) {
    let el = this.getElement(id).innerHTML;
    let render = Mustache.render(el, data);
    document.getElementById(id).innerHTML = render;

    let tag = document.getElementsByTagName("span");

    for (let tags of tag) {
      for (let att of tags.attributes) {
        if (att.value == attributeValue) {
          tags.innerHTML = newValue;
        }
      }
    }
  }
}