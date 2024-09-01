import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    let isLogin = localStorage.getItem("x-auth-token")  
    return (
    isLogin ? <Outlet/> :  <Navigate  replace  to={'/'}/>
    );
}

export default Auth;
