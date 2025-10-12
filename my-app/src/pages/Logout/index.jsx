import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { deleteAllCookies } from "../../helpers/cookie.js";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteAllCookies();

    setTimeout(() => navigate("/login"), 0);
  }, [dispatch, navigate]);

  return <></>;
};

export default Logout;
