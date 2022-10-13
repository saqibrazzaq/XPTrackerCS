import { api } from "./axiosconfig"
import { defineCancelApiObject } from "./axiosUtils"

export const AchievementApi = {
  get: async function (achievementId, cancel = false) {
    const response = await api.request({
      url: `/achievements/` + achievementId,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  list: async function (partId, cancel = false) {
    const response = await api.request({
      url: "/achievements/list/" + partId,
      method: "GET",
      signal: cancel ? cancelApiObject[this.list.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (achievement, cancel = false) {
    const response = await api.request({
      url: `/achievements`,
      method: "POST",
      data: achievement,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  update: async function (achievementId, achievement, cancel = false) {
    await api.request({
      url: `/achievements/` + achievementId,
      method: "PUT",
      data: achievement,
      signal: cancel ? cancelApiObject[this.update.name].handleRequestCancellation().signal : undefined,
    })
  },
  delete: async function (achievementId, cancel = false) {
    const response = await api.request({
      url: `/achievements/` + achievementId,
      method: "DELETE",
      // retrieving the signal value by using the property name
      signal: cancel ? cancelApiObject[this.delete.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
}


// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(AchievementApi)