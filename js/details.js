const API_URL_EVENTS = "https://mindhub-xj03.onrender.com/api/amazing";
//const currentDate = data.currentDate;
//const events = data.events;
const tagDetails = document.getElementById("details");

const queryString = location.search;

const params = new URLSearchParams(queryString);
const eventId = params.get('eventId');

/* let origen = location.search; */
/* console.log(origen); */
/* let eventId = origen.split('=')
console.log(eventId[1]);
console.log(events.find(event => event._id === Number(eventId[1]))); */

const getEvents = async () => {
  const response = await fetch(API_URL_EVENTS);
  const dataEvents = await response.json();
  //console.log("current date", dataEvents.currentDate);
  //console.log("array de eventos", dataEvents.events);
  events = dataEvents.events;
  currentDate = dataEvents.currentDate;
  
  if (events.find(event => event._id == eventId) ===  undefined) {
    loadNoResults();
  }else {
    loadDetails(events, Number(eventId));
  }
  
};

let events = [];
let currentDate = "";
getEvents();


/* if (events.find(event => event._id == eventId) ===  undefined) {
  loadNoResults();
}else {
  loadDetails(events, Number(eventId));
} */

function loadDetails(events, id) {
    /* console.log(id);
    console.log(events); */
    //const tagToUpdate = document.getElementById("details");
    let body = ``;
    const eventDetails = events.filter(event => event._id === id);
    /* console.log(eventDetails); */
      body += ` 
        <div class="card row flex-row p-4 pb-lg-5 pe-lg-0 pt-lg-5 rounded-3 border shadow-lg">
            <img class="col-lg-4 card-img-start img-fluid p-0 shadow-lg" src=${eventDetails[0].image} />
            <div class="col-lg-8 card-body p-3 p-lg-5 pt-lg-3">
                <h1 class="card-title display-5 fw-bold lh-1 mb-4">${eventDetails[0].name}</h1>
                <p class="card-text lead">${eventDetails[0].description}</p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <p class="card-text lead">Place: ${eventDetails[0].place}</p>
                    <p class="card-text lead">Category: ${eventDetails[0].category}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <small class="text-muted">Price: $${eventDetails[0].price}</small>
                    <small class="text-muted">Date: ${eventDetails[0].date}</small>
                </div>

      `;
      if (eventDetails[0].date < currentDate) {
        body += `
                <p class="card-text lead mt-5 text-center advert">Event Finished</p>
            </div>
        </div>
        `;
      } else {
        body += `
            </div>
        </div>
        `;
      }
    //tagToUpdate.innerHTML = body; 
    /* console.log(eventDetails);
    console.log(eventDetails[0].name); */
    tagDetails.innerHTML = body;
  }

  function loadNoResults() {
    /* alert('No results found'); */
    //const tagToUpdate = document.getElementById("details");
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
    //tagToUpdate.innerHTML = body;
    tagDetails.innerHTML = body; 
  }

