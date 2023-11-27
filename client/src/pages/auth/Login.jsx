import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../../features/user/userSlice";
import "./Auth.css";

export const Login = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUserAsync({ username, password })).then(() => {
      navigate(location?.state?.from?.pathname || "/");
    });
  };

  const handleGuestLogin = async () => {
    dispatch(loginUserAsync({ username: "guest_user", password: "1234" })).then(
      () => {
        navigate(location?.state?.from?.pathname || "/");
      }
    );
  };

  return (
    <div className="form__container">
      <div className="form__content">
        <div className="form__header">
          <header>Login</header>
          <hr />
        </div>

        <form action="" className="form__body">
          <div className="form__item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
            />
          </div>
          <div className="form__item">
            <label htmlFor="password" className="password__show">
              <span>Password</span>
              <div className="">
                <label htmlFor="show-hide">
                  <small>Show</small>
                </label>
                <input
                  onChange={togglePasswordVisibility}
                  type="checkbox"
                  id="show-hide"
                />
              </div>
            </label>
            <input
              type={passwordType}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
          </div>
          <div className="form__item">
            <button className="submit__btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
        <div className="form__footer">
          <p>
            New user? <Link to="/signup">Signup</Link>
          </p>

          <button onClick={handleGuestLogin} className="btn__link">
            Try Guest Mode
          </button>
        </div>
      </div>
    </div>
  );
};
