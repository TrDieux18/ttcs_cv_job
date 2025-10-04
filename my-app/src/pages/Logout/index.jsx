import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login.js";
import { deleteAllCookies } from "../../components/helpers/cookie.js";

const Logout = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      deleteAllCookies();
      dispatch(checkLogin(false, null));
      setTimeout(() => navigate("/login"), 0);
   }, [dispatch, navigate]);

   return <></>;
}

export default Logout;
