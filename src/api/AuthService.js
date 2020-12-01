import axios from 'axios'

const BASE_URL = "/account"

const login = async function (value) {
    const response = await axios.post(BASE_URL+'/login', value)
    return response
}

const register = async function(value){
    const response = await axios.post(BASE_URL+'/register', value)
    return response
}

export {login,register}