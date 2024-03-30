import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030"

const endpoints = {
    //myEvents: (userId) => `/data?where=_ownerId%3D%22${userId}%22`,
    event: "/data/motorcycles"
}

async function createMotorcycle(data) {
    return await api.post(BASE_URL + endpoints.event, data)
}

async function getAllMotorcycles() {
    return await api.get(BASE_URL + endpoints.event + `?sortBy=_createdOn%20desc`)
}

async function getMotorcycleDetails(id) {
    return await api.get(BASE_URL + endpoints.event + `/${id}`)
}
async function deleteMotorcycle(id) {
    return await api.del(BASE_URL + endpoints.event + `/${id}`)
}

async function search(query) {
    return await api.get(BASE_URL + `/data/motorcycles?where=model%20LIKE%20%22${query}%22`)
}
async function updateMotorcycle(id, data) {
    return await api.put(BASE_URL + endpoints.event +`/${id}`, data)
}

export const dataService = {
    createMotorcycle,
    getAllMotorcycles,
    getMotorcycleDetails,
    deleteMotorcycle,
    search,
    updateMotorcycle
}

/*
Create event (POST): http://localhost:3030/data/catalog
All event (GET): http://localhost:3030/data/catalog
event Details (GET): http://localhost:3030/data/catalog/:id
Update event (PUT): http://localhost:3030/data/catalog/:id
Delete event (DELETE): http://localhost:3030/data/catalog/:id
My event (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
*/