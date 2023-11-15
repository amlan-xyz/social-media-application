export const Post = ({ data }) => {
  const { caption, author } = data;
  return (
    <div className="post__container">
      <h3>{caption}</h3>
      <small>by:- {author.username}</small>
    </div>
  );
};
