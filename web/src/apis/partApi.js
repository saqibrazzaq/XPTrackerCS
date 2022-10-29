import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const PartApi = {
  get: async function (partId, cancel = false) {
    const response = await api.request({
      url: `/parts/` + partId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/parts/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  count: async function (cancel = false) {
    const response = await api.request({
      url: "/parts/count",
      method: "GET",
      signal: cancel ? cancelApiObject[this.count.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (part, cancel = false) {
    const response = await api.request({
      url: `/parts`,
      method: "POST",
      data: part,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (partId, part, cancel = false) {
    await api.request({
      url: `/parts/` + partId,
      method: "PUT",
      data: part,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (partId, cancel = false) {
    const response = await api.request({
      url: `/parts/` + partId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(PartApi)