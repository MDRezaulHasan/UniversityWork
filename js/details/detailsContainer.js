class DishDetailsContainer{
    constructor(model, root, onAdd, onCancel)
    {this.model = model;
    this.root = root;
    this.onAdd = onAdd;
    this.onCancel = onCancel; 
    }
 
    // temporary code, for testing purposes:
    render(id){ h("span", "Here we will show the dish with id: ", id).render(this.root); }
 }