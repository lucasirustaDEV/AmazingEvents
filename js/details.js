const currentDate = data.currentDate;
const events = data.events;

/* const event = events.filter(event => event._id === id); */

function loadDetails(events, id) {
    const tagToUpdate = document.getElementById("details");
    let body = ``;
    const eventDetails = events.filter(event => event._id === id);
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
                <p class="card-text lead mt-5 text-center advert">Evento Finalizado</p>
            </div>
        </div>
        `;
      } else {
        body += `
            </div>
        </div>
        `;
      }
    tagToUpdate.innerHTML = body; 
    console.log(eventDetails);
    console.log(eventDetails[0].name);
  }

  loadDetails(events, 1);