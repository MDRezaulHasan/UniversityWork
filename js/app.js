const modelString = localStorage.getItem("dinnerMOdel");
let modelObject = {};
modelObject = JSON.parse(modelString);

const model = new DinnerModel(modelObject);
window.location.hash = "search";

const summaryNav = [() => show("summary"), "Summary"];
const backToSearch = [() => show("search"), "Back to search"];

// console.log("set item: " + setItemInLocalStorage);

new SidebarController(model, document.body.querySelector("#sidebar"));
new SummaryController(
  model,
  document.body.querySelector("#summary"),
  backToSearch
);

new SearchController(
  model,
  document.body.querySelector("#search"),
  summaryNav,
  id => {
    details.render(id);
    show("details");
  }
);

// TODO: show the "details" view!
const addToMenu = [() => show("search"), "Add to menu"];
const details = new DishDetailsContainer(
  model,
  document.body.querySelector("#details"),
  addToMenu,
  backToSearch
);
const sections = ["search", "summary", "details"];

//window.onhashchange = show(window.location.hash);
function show(section) {
  document.body.querySelector("#search").classList.add("hide"); //TODO hide all from the section array, using document.body.querySelector("#"+sectionName).classList add
  document.body.querySelector("#summary").classList.add("hide");
  document.body.querySelector("#details").classList.add("hide"); // TODO use classList remove() to remove the hide class from the section parameter
  document.body.querySelector("#" + section).classList.remove("hide");
  window.location.hash = section;
}

/*function onModuleChange(payload){
    document.body.textContent=payload.guests;
} */

//model.addObserver(onModuleChange);
/*model.addObserver(function(payload){
    document.body.textContent= payload.guests;
 }); */
//document.body.textContent= model.getNumberOfGuests();
