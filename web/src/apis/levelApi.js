import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const LevelApi = {
  get: async function (levelId, cancel = false) {
    const response = await api.request({
      url: `/levels/` + levelId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/levels/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (level, cancel = false) {
    const response = await api.request({
      url: `/levels`,
      method: "POST",
      data: level,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (levelId, level, cancel = false) {
    await api.request({
      url: `/levels/` + levelId,
      method: "PUT",
      data: level,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (levelId, cancel = false) {
    const response = await api.request({
      url: `/levels/` + levelId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(LevelApi)