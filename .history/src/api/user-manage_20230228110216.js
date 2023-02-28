import axios from 'axios'

const getUsers = (url, params) => {
    return axios.get(url, params)
}