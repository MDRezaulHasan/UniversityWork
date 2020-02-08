function SummaryView({ingredients,guests,whenDone:[ doneCallback, doneMessage]}){
   return h("div",
            h("div", "Dinner for ", guests, " people"),
            h("div","Total price: "+ model.getTotalPriceSum(ingredients), h("div",{className:"Nav"},h("button", {onClick: e=> doneCallback()},doneMessage)),
            h("div", h("table",{border:"1"}),
                h("tr",
                    h("th",{className:"texthead"},"Ingredients"),h("th",{className:"texthead"},"Supermarket Aisle"),h("th",{className:"texthead"},"Amount")),ingredients.sort(function(a,b){
                return a.aisle.localeCompare(b.aisle)|| a.name.localeCompare(b.name) // returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order.
            }.bind(this)).map(ingrdient=> h("tr",{border:"1"},
                h("td",{className:"td"},ingrdient.name),h("td",{className:"td"},ingrdient.aisle),h("td",{className:"td"},(ingrdient.amount*guests.toFixed(2))))))
        ) )//.render(this.root);
      }
    /*update(whatHappened){
    this.render();
  }
}*/
