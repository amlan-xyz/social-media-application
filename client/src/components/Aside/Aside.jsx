import { Link } from "react-router-dom";
import "./Aside.css";
export const Aside = () => {
  return (
    <div className="aside__container">
      <div className="aside__header">
        <p>Suggested for you</p>
        <Link className="aside__header-link" to="/users">
          See All
        </Link>
      </div>
      <ul className="aside__list">
        <li className="aside__item">
          <div className="aside__item-body">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt="a women profile"
            />
            <div className="aside__item-content">
              <p>Amlan</p>
              <span>@weird</span>
            </div>
          </div>
          <button className="btn__link">Follow</button>
        </li>
        <li className="aside__item">
          <div className="aside__item-body">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt="a women profile"
            />
            <div className="aside__item-content">
              <p>Amlan</p>
              <span>@weird</span>
            </div>
          </div>
          <button className="btn__link">Follow</button>
        </li>
        <li className="aside__item">
          <div className="aside__item-body">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt="a women profile"
            />
            <div className="aside__item-content">
              <p>Amlan</p>
              <span>@weird</span>
            </div>
          </div>
          <button className="btn__link">Follow</button>
        </li>
        <li className="aside__item">
          <div className="aside__item-body">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt="a women profile"
            />
            <div className="aside__item-content">
              <p>Amlan</p>
              <span>@weird</span>
            </div>
          </div>
          <button className="btn__link">Follow</button>
        </li>
        <li className="aside__item">
          <div className="aside__item-body">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt="a women profile"
            />
            <div className="aside__item-content">
              <p>Amlan</p>
              <span>@weird</span>
            </div>
          </div>
          <button className="btn__link">Follow</button>
        </li>
      </ul>
    </div>
  );
};
