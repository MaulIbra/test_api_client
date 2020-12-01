import axios from "axios";

const BASE_URL = "/user"

const postUser = async function (value, token) {
    let response = await axios.post(
        BASE_URL,
        value,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const updateUser = async function (id, value, token) {
    let response = await axios.put(
        BASE_URL + '/' + id,
        value,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getUser = async function (page, limit, token) {
    let response = await axios.get(
        BASE_URL + '/' + page + "/" + limit,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const deleteUser = async function (id, token) {
    let response = await axios.delete(
        BASE_URL + '/' + id,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getJobs = async function (token) {
    let response = await axios.get(
        '/job',
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getEducation = async function (token) {
    let response = await axios.get(
        '/education',
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

export {postUser, getUser, updateUser, deleteUser, getJobs, getEducation}