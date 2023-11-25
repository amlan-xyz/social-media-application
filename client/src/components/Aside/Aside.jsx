import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { followUserAsync } from "../../features/user/userSlice";
import "./Aside.css";
export const Aside = () => {
  const { users, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const excludeLoggedInUser = users.filter(
    ({ username }) => username !== user.username
  );

  const handleFollow = (userId) => {
    dispatch(followUserAsync(userId));
  };

  return (
    <div className="aside__container">
      <div className="aside__header">
        <p>Suggestions</p>
        <Link className="aside__header-link" to="/users">
          See All
        </Link>
      </div>
      <ul className="aside__list">
        {excludeLoggedInUser?.map((user) => (
          <li key={user._id} className="aside__item">
            <div className="aside__item-body">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt="a women profile"
              />
              <div className="aside__item-content">
                <p onClick={() => navigate(`/profile/${user.username}`)}>
                  {user.username}
                </p>
                <small>{user.followers.length} followers.</small>
              </div>
            </div>
            <button
              onClick={() => handleFollow(user._id)}
              className="btn__link"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
