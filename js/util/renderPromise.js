function renderPromise(promise, hyperscript, node){
    const spinner=createSpinner();
    spinner.render(node);  // clears the node first!

    promise
    .then(result=>hyperscript(result).render(node)/* TODO call the hyperscript function with result as parameter, render its result on node */ )
    .catch(err=> h(node.append(err)).render(node))
    .finally(()=> spinner.remove());
}
function createSpinner(){
    return h("div",h("img",{className:"spinnerClass",src:"images/Loading.png"} ))
}
