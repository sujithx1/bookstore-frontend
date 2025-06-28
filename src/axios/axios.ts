import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL, 
  withCredentials: true,
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // or from cookies / redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - redirecting to login")
      localStorage.removeItem('token')
       window.location.href = "/login"
    }else if(error.response?.status === 403|| error.response.message=="Token required"){
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log(user["role"]);
      
      api.post(`/refresh/${user.role}`).then((res)=>{
        console.log(res.data.accessToken);
        localStorage.setItem('token',res.data.accessToken)
        
      })

    } 
    return Promise.reject(error)
  }
)
