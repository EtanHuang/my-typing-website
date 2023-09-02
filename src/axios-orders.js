import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-typing-test-286a2-default-rtdb.firebaseio.com/'

});

export default instance;