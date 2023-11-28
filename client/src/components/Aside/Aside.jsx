import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAsync } from "../../features/user/userSlice";
import "./Aside.css";
export const Aside = () => {
  const { users, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const excludeLoggedInUser = users.filter(
    ({ username }) => username !== user.username
  );

  const filterdUsers = excludeLoggedInUser.filter(
    ({ followers }) =>
      !followers.some(({ username }) => username === user.username)
  );

  const handleFollow = (userId) => {
    dispatch(followUserAsync(userId));
  };

  return (
    <div className="aside__container">
      <div className="aside__header">
        <p>Suggestions</p>
      </div>
      <ul className="aside__list">
        {filterdUsers?.map((user) => (
          <li key={user._id} className="aside__item">
            <div className="aside__item-body">
              <img
                src={user.profile_img ? user.profile_img : "/images/demo.png"}
                alt={user.username}
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
