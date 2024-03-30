import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030"

const endpoints = {
    event: "/data/products"
}

async function createItem(data) {
    return await api.post(BASE_URL + endpoints.event, data)
}

async function getAllItems() {
    return await api.get(BASE_URL + endpoints.event+`?sortBy=_createdOn%20desc`)
}

async function getItemDetails(id) {
    return await api.get(BASE_URL + endpoints.event +`/${id}`)
}
async function deleteItem(id) {
    return await api.del(BASE_URL + endpoints.event + `/${id}`)
}

async function updateItem(id,data) {
    return await api.put(BASE_URL + endpoints.event + `/${id}`, data)
}

export const dataService = {
    createItem,
    getAllItems,
    getItemDetails,
    deleteItem,
    updateItem
}

/*
Create event (POST): http://localhost:3030/data/catalog
All event (GET): http://localhost:3030/data/catalog
event Details (GET): http://localhost:3030/data/catalog/:id
Update event (PUT): http://localhost:3030/data/catalog/:id
Delete event (DELETE): http://localhost:3030/data/catalog/:id
My event (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
*/