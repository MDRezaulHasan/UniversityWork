class SidebarView{
    constructor(model, root, onDeleteClicked,changeInteger){
        this.root=root;//the DOM object corresponding to the HTML root element (the DIV) which the view will populate.
        this.model=model;
        this.onDeleteClicked= onDeleteClicked;
        this.changeInteger=changeInteger;
        model.addObserver(x => this.update(x));
    }
    render(){
        h("div",
            h("div",(this.model.getNumberOfGuests()<=1)?h("button",{disabled:true},"-"): h("button", {onClick: e=> this.changeInteger(-1)}, "-"),this.model.getNumberOfGuests(),h("button", {onClick: e=> this.changeInteger(1)}, "+")),
            h("div",
                h("div",
                    h("table",{class:"priceTable",border:"1"},
                    h("tr",h("th",{width: "350px"},"Dish Name"),h("th",{width: "50px"},"Dish Price")),this.model.getMenu().sort(function(a,b){
                        return this.sortPriority(a)>this.sortPriority(b)?-1:1
                    }.bind(this)).map(dish=> h("tr",{border:"1"},
                            h("td",{className:"td",width: "350px"},dish.title), h("td",{width: "50px"},(dish.dishPrice*this.model.getNumberOfGuests()).toFixed(2)),h("button", { onClick: event=> this.onDeleteClicked(dish)}, "delete"))  //parameter passed in sidebarController
                        ),h("tr",h("th",{width: "350px"}," "),h("th",{width: "50px"},"Total: "+ model.getTotalPrice(this.model.getMenu()).toFixed(2))),
                    )
                ),
           ),
       )
       .render(this.root);
    }
    update(whatHappened){
        this.render();
    }

    sortPriority(dish){
        var priority=0;
        if(dish.dishTypes.includes("starter")){
            priority=3;
        }else if(dish.dishTypes.includes("main course")){
            priority=2;
        }else if(dish.dishTypes.includes("dessert")){
            priority=1;
        }else{
            priority=0;
        }
        return priority;
    }
}
