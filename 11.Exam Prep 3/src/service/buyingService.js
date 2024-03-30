import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030"

const endpoints = {
    buyItem: `/data/bought`,
    countBought:(itemId) => `/data/bought?where=productId%3D%22${itemId}%22&distinct=_ownerId&count`,
    didUserBuy: (itemId, userId) => `/data/bought?where=productId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function postBuyItem(productId) {
    await api.post(BASE_URL+endpoints.buyItem, {productId})

}

export async function getCountBought(itemId) {
   
    let response = await api.get(BASE_URL+endpoints.countBought(itemId))
    return response;

}

export async function getDidUserBuyIt(itemId,userId) {

    let response = await api.get(BASE_URL+endpoints.didUserBuy(itemId,userId))
    return response;

}