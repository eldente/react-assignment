import { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { IPost } from "./PostList";

interface IParams {
  id?: string;
}

function PostPage({ history, propsMessage }: any) {
  const { id } = useParams<IParams>();
  const [item, setItem] = useState<IPost>();
  const componentName = "Post";

  // const history = useHistory();

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
  }, []);

  const fetchItem = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const item: IPost = await data.json();
    setItem(item);

    console.log();
  };

  return (
    <>
      {item?.id ? (
        <div className="card">
          <div key={item.id} className="card-body">
            <h5 className="card-title">Title: {item.title}</h5>
            <p className="card-text">Post: {item.body}</p>
            <button
              className="btn btn-info btn-bg"
              onClick={() => {
                history.push(`/posts`);
              }}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="card-text">Post not found</p>
          <button
            className="btn btn-info btn-bg"
            onClick={() => {
              history.push(`/posts`);
            }}
          >
            Back
          </button>
        </div>
      )}
    </>
  );
}

export default withRouter(PostPage);
