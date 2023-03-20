const API_URL_EVENTS = "https://mindhub-xj03.onrender.com/api/amazing";

const tagEventsStats = document.getElementById("eventsStats");
const tagUpCatStats = document.getElementById("upCatStats");
const tagPastCatStats = document.getElementById("pastCatStats");

let events = [];
let currentDate = "";

async function getEvents() {
    try {
        const response = await fetch(API_URL_EVENTS);
        const dataEvents = await response.json();
        //console.log("current date", dataEvents.currentDate);
        //console.log("array de eventos", dataEvents.events);
        events = dataEvents.events;
        currentDate = dataEvents.currentDate;

        eventsStats(eventWithHPofAtt(events), eventWithLPofAtt(events), eventWithLargerCapacity(events));
        pastCategoriesStats(events);
        upCategoriesStats(events);
    }catch (error) {
        console.log(error.message);
    }
}

getEvents();

function eventWithLargerCapacity(events){
    events.sort((a, b) => b.capacity - a.capacity);
    //console.log(events[0]);
    return events[0];
}

function eventWithHPofAtt(events) {
    const eventoMayorAsistencia = events.reduce((eventoMayor, eventoActual) => {
        const porcentajeActual = (eventoActual.assistance / eventoActual.capacity) * 100;
        const porcentajeMayor = (eventoMayor.assistance / eventoMayor.capacity) * 100;
        
        if (porcentajeActual > porcentajeMayor) {
            return eventoActual;
        } else {
            return eventoMayor;
        }
    });
    //console.log(eventoMayorAsistencia);
    return eventoMayorAsistencia;
}

function eventWithLPofAtt(events) {
    const eventoMenorAsistencia = events.reduce((eventoMenor, eventoActual) => {
        const porcentajeActual = (eventoActual.assistance / eventoActual.capacity) * 100;
        const porcentajeMenor = (eventoMenor.assistance / eventoMenor.capacity) * 100;
        
        if (porcentajeActual < porcentajeMenor) {
            return eventoActual;
        } else {
            return eventoMenor;
        }
    });
    //console.log(eventoMenorAsistencia);
    return eventoMenorAsistencia;
}

function eventsStats(stats01, stats02, stats03) {
    let body = ``;
    body = ` 
        <tr>
            <td>${stats01.name} (${((stats01.assistance/stats01.capacity)*100).toFixed(2)}%)</td>
            <td>${stats02.name} (${((stats02.assistance/stats02.capacity)*100).toFixed(2)}%)</td>
            <td>${stats03.name} (${stats03.capacity})</td>
        </tr>
        `;
    tagEventsStats.innerHTML = body;
}

function getCategories(events) {
    let categories = [];
    events.forEach(event => {
        if (!categories.includes(event.category)){ 
            categories.push(event.category);
        }
    });
    return categories.sort();
}

function getEventsByCategory(category, events) {
    return events.filter(event => event.category.includes(category));
}

function getAttendanceByCategory(eventsByCategory){
    let attandeance = 0;
    eventsByCategory.forEach(event => { 
        attandeance += (event.assistance / event.capacity) * 100;
    });
    attandeance = (attandeance/eventsByCategory.length).toFixed(2);
    return attandeance;
}

function getPastRevenuesByCategory(eventsByCategory){
    let revenues = 0;
    eventsByCategory.forEach(event => { 
        revenues += (event.assistance * event.price);
    });
    revenues = Math.trunc(revenues);
    return revenues;
}

function getUpAttendanceByCategory(eventsByCategory){
    let attandeance = 0;
    eventsByCategory.forEach(event => { 
        attandeance += (event.estimate / event.capacity) * 100;
    });
    attandeance = (attandeance/eventsByCategory.length).toFixed(2);
    return attandeance;
}

function getUpRevenuesByCategory(eventsByCategory){
    let revenues = 0;
    eventsByCategory.forEach(event => { 
        revenues += (event.estimate * event.price);
    });
    revenues = Math.trunc(revenues);
    return revenues;
}

function pastCategoriesStats(events) {
    let pastEvents = events.filter(event => event.date < currentDate);
    let arrayCategories = getCategories(pastEvents);
    let body = ``;
    arrayCategories.forEach(category => {
        let eventsByCategory = getEventsByCategory(category, pastEvents);
        let pastRevenuesByCategory = getPastRevenuesByCategory(eventsByCategory);
        let attendanceByCategory = getAttendanceByCategory(eventsByCategory);
        body += ` 
            <tr>
                <td>${category}</td>
                <td class="stats">$${pastRevenuesByCategory}</td>
                <td class="stats">${attendanceByCategory}%</td>
            </tr>
        `;
      })
      tagPastCatStats.innerHTML = body;
}

function upCategoriesStats(events) {
    let upEvents = events.filter(event => event.date > currentDate);
    let arrayCategories = getCategories(upEvents);
    let body = ``;
    arrayCategories.forEach(category => {
        let eventsByCategory = getEventsByCategory(category, upEvents);
        let upRevenuesByCategory = getUpRevenuesByCategory(eventsByCategory);
        let attendanceByCategory = getUpAttendanceByCategory(eventsByCategory);
        body += ` 
            <tr>
                <td>${category}</td>
                <td class="stats">$${upRevenuesByCategory}</td>
                <td class="stats">${attendanceByCategory}%</td>
            </tr>
        `;
      })
      tagUpCatStats.innerHTML = body;
}
