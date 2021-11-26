import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IPost } from "../routes/PostList";
import CommentList from "./CommentList";

interface IProps {
  item: IPost;
  propsMessage: string;
}

function PostItem({ item, propsMessage }: IProps) {
  const history = useHistory();
  const componentName = "PostItem";

  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ textDecoration: "none" }}>
          <h5 className="card-title">Title: {item.title}</h5>
          <p className="card-text">Post: {item.body}</p>
          {item.user?.id ? (
            <p>User: {item.user.name}</p>
          ) : (
            <p>User undefined</p>
          )}
          <CommentList item={item} key={item.id} />
        </div>
        <button
          className="btn btn-info btn-bg"
          onClick={() => {
            history.push(`/posts/${item.id}`);
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
}

export default PostItem;
