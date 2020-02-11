function DishDetailsView({dish, 
    addControl:[addAction, addMessage], 
    onCancel:[cancelAction, cancelMessage], 
    price, 
    guests, 
    inMenu}){ 

        // return h("div", /*h("span", {className:"dishDisplay", id: dish.id, title:dish.title},*/
        // h("img",{className:"dishImg",src: dish.image}),
        // h("p",{className:"dishText"},dish.title),
        return h("div",
                    h("div",
                         h("div",(inMenu)?h("button",{className:"Nav", disabled: true}, addMessage): h("button",{className:"Nav", onClick: e=> addAction()}, addMessage),h("button",{className:"Nav", onClick: e=> cancelAction()}, cancelMessage))),
                        //  h("button",{className:"navigationButton",onClick: e=> addAction()}, addMessage),
                        //  h("button",{className:"navigationButton",onClick: e=> cancelAction()}, cancelMessage)),
                        h("div",h("button",{className:"Nav",onClick: e=> window.open(dish.sourceUrl)},"Learn More")),
                        h("p",{className:"detailsTitle"},dish.title),
                        h("img",{className:"detailsImg",src:dish.image}), 
                        h("div",{className:"detailsViewInfoText"},"Dish Price  ",price.toFixed(2),"$"),
                        h("div","Dish Type  ",dish.dishTypes.map(dishtype=>h("div",dishtype))),
                        h("p"," "),
                        h("div", h("table",{border:"1"},
                            h("tr",
                                h("th",{className:"td"},"Ingredients"),h("th",{className:"td"},"Supermarket Aisle")),dish.extendedIngredients.sort(function(a,b){
                                return a.aisle.localeCompare(b.aisle)|| a.name.localeCompare(b.name)
                                }.bind(this)).map(ingrdient=> h("tr",{border:"1"},
                                h("td",{className:"td"},ingrdient.name),h("td",{className:"td"},ingrdient.aisle))))),
                        h("p"," "),
                        h("div", "Dinner for ", guests, " people, total price: "+ (price*guests).toFixed(2)),
                  
                   ); 
       
        
    // )    
    //     console.log("insde details View");
    }
    