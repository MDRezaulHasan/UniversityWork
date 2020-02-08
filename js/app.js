const model= new DinnerModel();
const summaryNav=[()=> show("summary"), "Summary"];
const backToSearch=[()=> show("search"), "Back to search"];
new SidebarController(model, document.body.querySelector("#sidebar"));
new SummaryController(model, document.body.querySelector("#summary"), backToSearch);
new SearchController(model, document.body.querySelector("#search"), summaryNav);
const sections=["search", "summary"]

function show(section){
  if(section == sections[1])
  {
  document.body.querySelector("#"+ section).classList.remove("hide");//TODO hide all from the section array, using document.body.querySelector("#"+sectionName).classList add
  document.body.querySelector("#search").classList.add("hide");  // TODO use classList remove() to remove the hide class from the section parameter
}
else {
  document.body.querySelector("#"+ section).classList.remove("hide");//TODO hide all from the section array, using document.body.querySelector("#"+sectionName).classList add
  document.body.querySelector("#summary").classList.add("hide");
}
}
/*function onModuleChange(payload){
    document.body.textContent=payload.guests;
} */

//model.addObserver(onModuleChange);
/*model.addObserver(function(payload){
    document.body.textContent= payload.guests;
 }); */
//document.body.textContent= model.getNumberOfGuests();
