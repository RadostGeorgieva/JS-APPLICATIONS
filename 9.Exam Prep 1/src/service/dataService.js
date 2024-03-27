import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030"

const endpoints = {
    //myEvents: (userId) => `/data?where=_ownerId%3D%22${userId}%22`,
    event: "/data/events"
}

async function createEvent(data) {
    return await api.post(BASE_URL + endpoints.event, data)
}

async function getAllEvents() {
    return await api.get(BASE_URL + endpoints.event+`?sortBy=_createdOn%20desc`)
}

async function getEventDetails(id) {
    return await api.get(BASE_URL + endpoints.event +`/${id}`)
}
async function deleteEvent(id) {
    return await api.del(BASE_URL + endpoints.event + `/${id}`)
}

// async function getMyEvents(userId) {


//     return await api.get(BASE_URL + endpoints.myEvents(userId))
// }
async function updateEvent(id,data) {
    return await api.put(BASE_URL + endpoints.event + `/${id}`, data)
}

export const dataService = {
    createEvent,
    getAllEvents,
    getEventDetails,
    deleteEvent,
    //getMyEvents,
    updateEvent
}

/*
Create event (POST): http://localhost:3030/data/catalog
All event (GET): http://localhost:3030/data/catalog
event Details (GET): http://localhost:3030/data/catalog/:id
Update event (PUT): http://localhost:3030/data/catalog/:id
Delete event (DELETE): http://localhost:3030/data/catalog/:id
My event (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
*/