class SummaryController{
  constructor(model, root, whenDone){
    const update= ()=> h("SummaryView", {ingredients:model.getIngredients(), guests:model.getNumberOfGuests(),Totalprice:model.getTotalPriceSum(model.getIngredients()),whenDone}).render(root);
    model.addObserver(update);
    update();
    }
}
