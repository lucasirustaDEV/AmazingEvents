const currentDate = data.currentDate;
const events = data.events;
const tagCards = document.getElementById("card-js");
const tagCheckboxs = document.getElementById("category-js");
const search = document.getElementById('search'); 

search.addEventListener('input', crossFilter) 

tagCheckboxs.addEventListener('change', crossFilter);

/* tagCheckboxs.addEventListener('change', () =>{
    let arrayFiltrado = filterCategory(events);
    arrayFiltrado = filterText(arrayFiltrado, search.value);
    loadCards(arrayFiltrado);
}); */

loadCategories(events);
window.addEventListener("load", (event) => {
    crossFilter();
});

function filterText(array, text) {
    let arrayFiltrado = array.filter(event => event.name.toLowerCase().includes(text.toLowerCase()));
    return arrayFiltrado;
}

function filterCategory(array) {
    let chks = document.querySelectorAll('input[type=checkbox]');
    let arrayChecks = Array.from(chks); 
    arrayChecks = arrayChecks.filter(check => check.checked); //checked TRUE
    if (arrayChecks.length === 0){
        return array;
    }else {
        arrayChecks = arrayChecks.map(check => check.id);
        //console.log(arrayChecks);
        let arrayFiltrado = array.filter(event => arrayChecks.includes(event.category));
        return arrayFiltrado;
    }

}

function loadCategories(array) {
    let body = ``;
    array = array.map(event => event.category);
    array = new Set(array.sort((a,b) => {
        if(a>b) {
            return 1;
        }
        if(a<b) {
            return -1;
        }
        return 0;
    }));
    array.forEach(category => {
      body += ` 
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="${category}">
          <label class="form-check-label" for="${category}">${category}</label>
        </div>
      `;
    })
    tagCheckboxs.innerHTML = body;
}
  
function loadCards(array) {
    let body = ``;
    if (array.length == 0) {
      body = ` 
      <section class="py-5 text-center container bg-light ">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">No results found</h1>
          </div>
        </div>
      </section>
      `;
    } else {
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
                    <a class="btn btn-sm btn-outline-event" href="./details.html?eventId=${array[i]._id}" role="button">Details</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
    tagCards.innerHTML = body;
}

function crossFilter() {
    let arrayFiltrado = filterCategory(events);
    arrayFiltrado = filterText(arrayFiltrado, search.value);
    loadCards(arrayFiltrado);  
}

