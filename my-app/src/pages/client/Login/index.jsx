import { useNavigate } from "react-router-dom";
import { login } from "@services/common/AuthService";
import { useDispatch } from "react-redux";
import "./Login.scss";

import { setError, setUser } from "@store/UserReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    const password = formData.get("password");
    const user = {
      username: username,
      password: password,
    };
    console.log("user", user);

    const response = await login(user);

    if (response.success && response.data) {
      console.log(response);
      dispatch(setUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } else {
      dispatch(setError(true));
    }
  };
  return (
    <div className="in-regis">
      <form onSubmit={handleSubmit}>
        <h2 className="in-regis__title">Login</h2>
        <div className="in-regis__email">
          <input type="text" placeholder="Tên tài khoản" name="username" />
        </div>
        <div className="in-regis__password">
          <input type="password" placeholder="Password" name="password" />
        </div>
        <button className="btn in-regis__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
