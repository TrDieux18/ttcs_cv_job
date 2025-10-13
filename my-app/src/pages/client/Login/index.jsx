import { useNavigate } from "react-router-dom";
import { login } from "@services/client/UserService";
import { useDispatch } from "react-redux";
import "./Login.scss";

import { setCookie } from "@helpers/cookie";
import { setError, setUser } from "@store/UserReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    const password = formData.get("password");
    const user = {
      email: email,
      password: password,
    };

    const response = await login(user);

    if (response.length > 0) {
      console.log(response[0]);
      setCookie("token", response[0].token);
      dispatch(setUser(response[0]));
      navigate("/");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
      dispatch(setError(true));
    }
  };
  return (
    <div className="in-regis">
      <form onSubmit={handleSubmit}>
        <h2 className="in-regis__title">Login</h2>
        <div className="in-regis__email">
          <input type="email" placeholder="Email" name="email" />
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
