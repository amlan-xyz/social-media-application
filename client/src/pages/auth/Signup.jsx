import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUserAsync, signupUserAsync } from "../../features/user/userSlice";
import "./Auth.css";

export const Signup = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleGuestLogin = () => {
    dispatch(loginUserAsync({ username: "guest_user", password: "guest" }));
    navigate(location?.state?.from?.pathname || "/");
  };
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUserAsync(form));
  };
  return (
    <div className="form__container">
      <div className="form__content">
        <div className="form__header">
          <header>Signup</header>
          <hr />
        </div>

        <form className="form__body">
          <div className="form__item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) =>
                setForm((form) => ({ ...form, username: e.target.value }))
              }
              value={form.username}
            />
          </div>

          <div className="form__item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              onChange={(e) =>
                setForm((form) => ({ ...form, name: e.target.value }))
              }
              value={form.name}
            />
          </div>

          <div className="form__item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              onChange={(e) =>
                setForm((form) => ({ ...form, email: e.target.value }))
              }
              value={form.email}
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
              placeholder="Enter your password"
              onChange={(e) =>
                setForm((form) => ({ ...form, password: e.target.value }))
              }
              value={form.password}
            />
          </div>

          <div className="form__item">
            <button className="submit__btn" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </form>
        <div className="form__footer">
          <p>
            Have account? <Link to="/login">Login</Link>
          </p>

          <button onClick={handleGuestLogin} className="btn__link">
            Try Guest Mode
          </button>
        </div>
      </div>
    </div>
  );
};
