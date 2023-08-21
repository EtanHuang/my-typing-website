import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://typing-test-5bc1f-default-rtdb.firebaseio.com/'

});

export default instance;