// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api', // sesuaikan dengan URL backend
// });

// export default api;

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Ambil URL dari .env
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error(`API Error:`, error.response || error.message);
        return Promise.reject(error);
    } 
)
export default api;