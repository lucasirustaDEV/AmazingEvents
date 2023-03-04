const currentDate = data.currentDate;

function dateFilter(array, date, future) {
  let eventsFilterDate = [];
  for (let event of array.events) {
    if (event.date > date && future) {
      eventsFilterDate.push(event);
    } else if (event.date < date && !future) {
      eventsFilterDate.push(event);
    }
  }
  return eventsFilterDate;
}

function categoryFilter(array, category) {
  let eventsFilterCategory = [];
  for (let event of array.events) {
    if (event.category === category) {
      eventsFilterCategory.push(event);
    }
  }
  return eventsFilterCategory;
}

function priceFilter(array, priceFrom, priceTo) {
    let eventsFilterPrice = [];
    for (let event of array.events) {
        if (event.price >= priceFrom && event.price <= priceTo) {
            eventsFilterPrice.push(event);
        }
    }
    return eventsFilterPrice;
}

console.log(categoryFilter(data, "Museum"));
console.log("--------------------------------");
console.log(dateFilter(data, data.currentDate, false));
console.log("--------------------------------");
console.log(priceFilter(data, 100, 200));