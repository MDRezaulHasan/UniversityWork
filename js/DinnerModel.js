class DinnerModel {
  constructor(guests = 2, dishes = []) {
    // this.numberOfGuests = 1;
    this.numberOfGuests = guests;
    this.subscribers = [];
    //this.dishes = [];
    this.dishes = dishes;
    this.ingredients = [];
  }
  setNumberOfGuests(x) {
    this.numberOfGuests = x; // TODO
    this.notifyObservers({ guests: x });
  }
  getNumberOfGuests() {
    return this.numberOfGuests; // TODO
  }
  addObserver(callback) {
    this.subscribers.push(callback);
  }
  notifyObservers(whatHappened) {
    for (let i = 0; i < this.subscribers.length; i++) {
      let callback = this.subscribers[i];
      //callback(whatHappened);
      callback(whatHappened);
      // TODO call the callback with the whatHappened payload
    }
  }
  searchDishes(dishType, freeText) {
    return this.connectAPI(
      "recipes/search?query=" + freeText + "&type=" + dishType
    )
      .then(data => data.results) // leave out the unimportant parts of the response data ?
      .catch(console.error);
  }

  addToMenu(dish) {
    if (this.dishes.some(el => el.id === dish.id)) {
      console.error("Dish alreay exists!");
    } else {
      var price = this.getDishPrice(dish);
      Object.assign(dish, { dishPrice: price });
      this.dishes.push(dish);
      this.checkIngredient(dish);
      this.notifyObservers({ add_dish: dish });
    }
  }

  removeFromMenu(dish) {
    this.dishes = this.dishes.filter(currDish => currDish.id !== dish.id);
    console.log(this.dishes);
    this.notifyObservers({ remove_dish: dish });
  }

  checkIngredient(dish) {
    for (var i = 0; i < dish.extendedIngredients.length; i++) {
      if (
        this.ingredients.some(el => el.id === dish.extendedIngredients[i].id)
      ) {
        let obj = this.ingredients.find(
          o => o.id === dish.extendedIngredients[i].id
        );
        let index = this.ingredients.indexOf(obj);
        this.ingredients[index].amount += dish.extendedIngredients[i].amount;
        console.log(
          "amount of" +
            this.ingredients[index].name +
            ": " +
            this.ingredients[index].amount
        );
      } else {
        this.ingredients.push(dish.extendedIngredients[i]);
      }
    }
  }
  getMenu() {
    let dishesCopy = Array.from(this.dishes); //a deep copy
    return dishesCopy;
  }
  isInMenu(dish) {
    if (this.dishes.some(el => el.id === dish.id)) return true;
    else return false;
  }
  getIngredients() {
    let ingredientCopy = Array.from(this.ingredients);
    return ingredientCopy;
  }
  handleHTTPError(response) {
    if (response.ok) return response;
    throw Error(response.statusText);
  }

  getDishDetails(id) {
    return this.connectAPI("recipes/" + id + "/information").catch(
      console.error
    );
  }

  connectAPI(endPointDetail) {
    return fetch(ENDPOINT + endPointDetail, {
      method: "GET",
      headers: {
        "X-Mashape-Key": API_KEY
      }
    })
      .then(this.handleHTTPError)
      .then(response => response.json()); //from headers to response data
  }
  getDishPrice(dish) {
    var sum = 0;
    for (var i = 0; i < dish.extendedIngredients.length; i++) {
      sum += dish.extendedIngredients[i].amount;
    }
    return sum * this.getNumberOfGuests();
  }
  getTotalPrice(dishes) {
    if (dishes.length !== 0) {
      //The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.
      let reducer = (accumulator, currentValue) =>
        accumulator + currentValue.dishPrice; //accumulator stores value in each iteration
      var sum = dishes.reduce(reducer, 0); //initial current value 0
      return sum * this.getNumberOfGuests();
    } else {
      return 0;
    }
  }
  getTotalPriceSum(ingredients) {
    // Calculate total price to display in Summary view
    if (ingredients.length !== 0) {
      var sum = 0;
      for (var i = 0; i < ingredients.length; i++) {
        sum += ingredients[i].amount;
      }
      return sum * this.getNumberOfGuests();
    } else {
      return 0;
    }
  }
}
