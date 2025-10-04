import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {

   const isLoggedIn = useSelector((state) => state.login.isLoggedIn);


   return <>{isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</>

}

export default PrivateRoute