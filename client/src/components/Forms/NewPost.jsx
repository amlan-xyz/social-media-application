import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../../features/post/postSlice";
import "./NewPost.css";

export const NewPost = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      createPostAsync({
        caption,
        image,
      })
    );
    setCaption("");
    setImage("");
  };

  return (
    <div className="new__post-container">
      <form className="new__post-body">
        <div className="new__post-item">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />
        </div>
        <div className="new__post-item">
          <label htmlFor="image">New Image</label>
          <input
            type="text"
            id="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </div>
        <div className="new__post-item">
          <button onClick={handleForm}>Submit</button>
        </div>
      </form>
    </div>
  );
};
