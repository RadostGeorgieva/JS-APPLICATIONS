import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030/data"

const endpoints = {
    myFurniture: (userId) => `/catalog?where=_ownerId%3D%22${userId}%22`,
    furniture: "/catalog"
}

async function createFurniture(data) {
    return await api.post(BASE_URL + endpoints.furniture, data)
}

async function getAllFurniture() {
    return await api.get(BASE_URL + endpoints.furniture)
}

async function getFurnitureDetails(id) {
    return await api.get(BASE_URL + endpoints.furniture + `/${id}`)
}
async function deleteFurniture(id) {
    return await api.del(BASE_URL + endpoints.furniture + `/${id}`)
}

async function getMyFurniture(userId) {
    return await api.get(BASE_URL + endpoints.myFurniture(userId))
}
async function updateFurniture(id,data) {
    return await api.put(BASE_URL + endpoints.furniture + `/${id}`, data)
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    getFurnitureDetails,
    deleteFurniture,
    getMyFurniture,
    updateFurniture
}

/*
Create Furniture (POST): http://localhost:3030/data/catalog
All Furniture (GET): http://localhost:3030/data/catalog
Furniture Details (GET): http://localhost:3030/data/catalog/:id
Update Furniture (PUT): http://localhost:3030/data/catalog/:id
Delete Furniture (DELETE): http://localhost:3030/data/catalog/:id
My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
*/