import axios from "axios";

const req = axios.create({
    baseURL: '/api'
});

export default req