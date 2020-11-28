import axios from "axios";

const BASE_URL = "/user"

const getUser = async function (page, limit) {
    let response = await axios.get(
        BASE_URL + '/' + page + "/" + limit,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const deleteUser = async function (id) {
    let response = await axios.delete(
        BASE_URL + '/' + id,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

export {getUser,deleteUser}