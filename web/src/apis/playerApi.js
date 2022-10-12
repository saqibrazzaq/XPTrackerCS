import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const PlayerApi = {
  get: async function (playerId, cancel = false) {
    console.log("Player id: " + playerId);
    const response = await api.request({
      url: `/players/` + playerId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/players/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (player, cancel = false) {
    const response = await api.request({
      url: `/players`,
      method: "POST",
      data: player,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (playerId, player, cancel = false) {
    await api.request({
      url: `/players/` + playerId,
      method: "PUT",
      data: player,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(PlayerApi)