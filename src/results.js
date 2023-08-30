import axios from 'axios';
export default axios.create(
    {
        baseURL:'https://typing-test-5bc1f-default-rtdb.firebaseio.com/'
    }
)