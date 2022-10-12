import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const PlayerApi = {
  get: async function (playerId, cancel = false) {
    const response = await api.request({
      url: `/players/:playerId`,
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
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(PlayerApi)