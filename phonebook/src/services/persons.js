import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {
        return response.data;
    })
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject);
    return request.then(response => {
        return response.data;
    })
}

const query = (name) => {
    const request = axios.get(`${baseUrl}/query/${name}`)
    return request.then(response => response.data)
}

const deleteId = (id, personObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default { getAll, create, deleteId, update, query }