import axios from "axios"

export function callApi(url) {
  return axios.get(
    url, {
      /*オプションがあれば書く*/
    })
}


export function post(url, data) {
  return axios.post(
    url, {
      ...data
    })
}