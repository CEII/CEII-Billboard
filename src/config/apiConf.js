import axios from 'axios/index';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
