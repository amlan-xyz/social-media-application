import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signupUserAsync } from "../../features/user/userSlice";
import "./Auth.css";

export const Signup = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUserAsync(form));
  };
  return (
    <div className="form__container">
      <h1>Signup Page</h1>
      <Link to="/login">Login</Link>
      <form className="form__body">
        <div className="form__item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
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
            onChange={(e) =>
              setForm((form) => ({ ...form, email: e.target.value }))
            }
            value={form.email}
          />
        </div>
        <div className="form__item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              setForm((form) => ({ ...form, password: e.target.value }))
            }
            value={form.password}
          />
        </div>
        <div className="form__item">
          <button onClick={handleSignup}>Signup</button>
        </div>
      </form>
    </div>
  );
};
