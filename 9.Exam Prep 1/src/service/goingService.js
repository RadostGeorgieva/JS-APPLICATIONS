import { api } from "../utility/requester.js"

const BASE_URL = "http://localhost:3030"

const endpoints = {
    goToEvent: `/data/going`,
    visitorsBtEventId:(eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    isGoing: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function goToEvent(eventId) {
    await api.post(BASE_URL+endpoints.goToEvent, {eventId})

}

export async function getVisitorsByEventId(eventId) {
   
    let response = await api.get(BASE_URL+endpoints.visitorsBtEventId(eventId))
    return response;

}

export async function getIsGoing(eventId,userId) {

    let response = await api.get(BASE_URL+endpoints.isGoing(eventId,userId ))
    return response;

}