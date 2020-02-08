class SidebarController {
    constructor(model, root) {
        new SidebarView(model, root, dish=>model.removeFromMenu(dish),diff=>model.setNumberOfGuests(model.getNumberOfGuests() + diff)).update();

        const plusButton = root.lastElementChild;
        plusButton.addEventListener("click", function(event) {
            //debugger;
            model.setNumberOfGuests(model.getNumberOfGuests() + 1);

        });

        const minusButton = root.firstElementChild;
        minusButton.addEventListener("click", function(event) {
            if (model.getNumberOfGuests() > 1)
                model.setNumberOfGuests(model.getNumberOfGuests() - 1);
                //debugger;
        });
    }
}
