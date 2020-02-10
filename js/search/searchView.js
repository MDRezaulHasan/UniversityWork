class SearchView{
    constructor(model, root,whenDone){
        this.root=root;
        this.model=model;
        this.doneCallback=whenDone[0];
        this.doneMessage=whenDone[1];
    }
    render(){
        h("div",
            h("div", // search box
                this.textControl= h("input",{className:"input"}), // free text search box
                this.typeControl= h("select",
                    h("option", {value:""}, "Choose:"),                             // empty first choice
                    // the rest of the SELECT children are generated from an array:
                    ["starter", "main course", "dessert"].map(opt=>h("option",opt) /* TODO generate the option with a text child opt, no attributes*/)   /*TODO, empty for now */), // dish type selector
                h("button",{id:"searchButton",className:"searchButton"},"Search!") // search button
            ), // end of search box
            h("div",{className:"Nav"},h("button", {onClick: e=> this.doneCallback()},this.doneMessage)),
            this.resultDiv= h("div") // empty div for search results
        ).render(this.root);
        this.updateSearchResults(); // initially populate the resultDiv with nice dish images
    }

    updateSearchResults(){
        return renderPromise(
            this.model.searchDishes(this.typeControl.value,this.textControl.value/* TODO: read the params as the values of this.textControl and this.typeControl, in the correct order */),
            dishes=> h("div", dishes.map(dish=>this.createDishDisplay(dish)) /*TODO: for each element in dishes (use map()), call createDishDisplay(dish) */),
            this.resultDiv
         );
    }

    createDishDisplay(dish){
        return h("span", {className:"dishDisplay", id: dish.id, title:dish.title},
            h("img",{className:"dishImg",src:'https://spoonacular.com/recipeImages/'+dish.imageUrls}),
            h("p",{className:"dishText"},dish.title)
        )
    }
    isDishRepresentation(clickedNode){
        if(clickedNode.className.includes("dish")&&(clickedNode.tagName.toLowerCase()=="img"||clickedNode.tagName.toLowerCase()=="p")){
                console.log("Clicked Dish: "+clickedNode.parentElement.id);
                return clickedNode.parentElement.id; 
        }else{
            return null;
        }
    }
}
