const currentDate = data.currentDate;
const events = data.events;

function dateFilter(array, date, future) {
  let eventsFilterDate = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].date > date && future) {
      eventsFilterDate.push(array[i]);
    } else if (array[i].date < date && !future) {
      eventsFilterDate.push(array[i]);
    }
  }
  return eventsFilterDate;
}

function categoryFilter(array, category) {
  let eventsFilterCategory = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].category === category) {
      eventsFilterCategory.push(array[i]);
    }
  }
  return eventsFilterCategory;
}

function priceFilter(array, priceFrom, priceTo) {
    let eventsFilterPrice = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].price >= priceFrom && array[i].price <= priceTo) {
            eventsFilterPrice.push(array[i]);
        }
    }
    return eventsFilterPrice;
}

function sortEvents(array, orderBy) {
  let temp = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j][orderBy] > array[j + 1][orderBy]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

function obtainCategories(array) {
  let categories = [];
  let repeat = false;
  categories.push(array[0].category)
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < categories.length; j++) {
      if (categories[j] === array[i].category){
        repeat = true;
      }
    }
    if (!repeat) {
      categories.push(array[i].category)
    }
    repeat = false;
  }
  return categories;
}

function loadCategories(array) {
  const tagToUpdate = document.getElementById("category-js");
  let body = ``;
  for (let i = 0; i < array.length; i++) {
    body += ` 
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${array[i]}">
        <label class="form-check-label" for="${array[i]}">${array[i]}</label>
      </div>
    `;
  }
  tagToUpdate.innerHTML = body; 
}

function loadCards(array) {
  const tagToUpdate = document.getElementById("card-js");
  let body = ``;
  for (let i = 0; i < array.length; i++) {
    body += ` 
      <div class="col">
        <div class="card shadow-sm" >                       
          <img src=${array[i].image} class="bd-placeholder-img card-img-top" alt="..." width="100%" height="225">
          <div class="card-body">
            <h5 class="card-title text-center">${array[i].name}</h5>
            <p class="card-text text-center">${array[i].category}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Price $ ${array[i].price}</small>
              <div class="btn-group">
                <a class="btn btn-sm btn-outline-event" href="./details.html" role="button">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  tagToUpdate.innerHTML = body; 
}

/* console.log(sortEvents(events, "capacity")); */
/* console.log(obtainCategories(events)); */
loadCategories(obtainCategories(events));
loadCards(dateFilter(events, currentDate, false));

const chks = document.querySelectorAll('input[type=checkbox]');

chks.forEach(chk => {
  chk.addEventListener('click', filterEvents);
});

const search = document.getElementById('search');

search.addEventListener('keyup', filterEvents);

function filterEvents() {
  let checks = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(check => check.id);
  /* console.log("Valor de búsqueda: " + search.value); */
  let searchText = search.value;
  /* console.log(searchText); */
  /* checks.forEach(check => console.log(check)); */
  /* console.log(checks); */
  let filtro = events.filter(event => {
    return (event.name.toLowerCase().includes(searchText.toLowerCase())) && (checks.length === 0 || checks.includes(event.category));
  })
  /* console.log(filtro); */
  /* console.log(filtro.length); */
  if (filtro.length === 0) {
    loadNoResults();
  } else {
    /* loadCards(filtro); */
    loadCards(dateFilter(filtro, currentDate, false));
  }
}

function loadNoResults() {
  /* alert('No results found'); */
  const tagToUpdate = document.getElementById("card-js");
  let body = ``;
    body = ` 
      <section class="py-5 text-center container bg-light ">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">No results found</h1>
          </div>
        </div>
      </section>
    `;
  tagToUpdate.innerHTML = body; 
}
