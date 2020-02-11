class DishDetailsContainer{
    constructor(model, root, onAdd, onCancel)
    { this.model = model;
    this.root = root;
    this.onAdd = onAdd;
    this.onCancel = onCancel; 
    [this.onAddCallback, this.onAddLabel]=this.onAdd;
    [this.onCancelCallback, this.onCancelLabel]=this.onCancel;
    //model.addObserver(()=> this.currentDish?createDishDisplay(this.currentDish).render(root):null);
    model.addObserver(()=> this.currentDish?this.createDishDisplay(this.currentDish).render(root):null);
    }
    createDishDisplay(dish){
    //const update=()=> h("DishDetailsView",{dish,addControl:[()=>{this.model.addToMenu(),this.onAddCallback()},this.onAddLabel],onCancel:[()=>{this.onCancelCallback(),this.onCancelLabel}],price:this.model.getDishPrice(dish),guests:this.model.getNumberOfGuests(dish),inMenu:this.model.isInMenu(dish)});
       
       return h("DishDetailsView",{dish,addControl:[()=>{this.model.addToMenu(dish),this.onAddCallback()},this.onAddLabel],onCancel:[()=>{this.onCancelCallback()},this.onCancelLabel],price:this.model.getDishPrice(dish),guests:this.model.getNumberOfGuests(dish),inMenu:this.model.isInMenu(dish)});
    }
    render(id){  
        renderPromise(this.model.getDishDetails(id),
              dish => { return this.createDishDisplay(this.currentDish = dish); },
              this.root)
    }}