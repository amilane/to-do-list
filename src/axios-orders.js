import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-to-do-edc2d.firebaseio.com/'
});

export default instance;