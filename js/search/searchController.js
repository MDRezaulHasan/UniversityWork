class SearchController {
  constructor(model, root, whenDone, onAdd) {
    //new SearchView(model,root).render();
    const view = new SearchView(model, root, whenDone);
    view.render();
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function(event) {
      view.updateSearchResults();
    });

    root.addEventListener("click", function(event) {
      console.log(event.target);
      var clickedDish = view.isDishRepresentation(event.target);
      if (clickedDish) {
        onAdd(clickedDish);
      }
      // return (model.getDishDetails(clickedDish)
      // .then(dish =>
      //     { if(dish)
      //         { console.log("Clicked onADD "+dish);
      //         onAdd(dish);
      //         }
      //     })
      // );
    });
  }
}
