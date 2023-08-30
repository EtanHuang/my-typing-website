import axios from 'axios';
export default axios.create(
    {
        baseURL:'https://my-typing-test-286a2-default-rtdb.firebaseio.com/'
    }
)