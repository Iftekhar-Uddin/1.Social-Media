import { useEffect } from 'react';
import axios from 'axios';

const VarificationRequest = (varif) => {
    const api = process.env.REACT_APP_API_KEY;
    useEffect(() => {
    axios.interceptors.request.use((req) => {
        if(localStorage.getItem("user")){
            req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
        }
        return req;
      });
    },[])

    return (varif, api);
};

export default VarificationRequest;



// const JwtRequest = () => {
//     useEffect(() => {
//         const requestIntercept = API.interceptors.request.use(
//             req => {
//                 if(localStorage.getItem("user")){
//                     req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
//             }
//             return req;
//             },(error) => Promise.reject(error)

//         );
//         return () => {
//             API.interceptors.request.eject(requestIntercept);
//         }

//     },[localStorage.getItem('user')])

//     return JwtRequest;
// }

// export default JwtRequest;