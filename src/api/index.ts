import axios from "axios";

const Main_url= axios.create({
    baseURL:'http://3.68.219.212:3000'
})

Main_url.interceptors.request.use((req) => {
    let token =localStorage.getItem("token")
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    return req;                                                                                                                        
  });
export default Main_url;

