import { useEffect, useState } from "react";
import { IPost } from "../routes/PostList";

interface IProps {
  item: IPost;
}

interface IComment {
  id: number;
  name: string;
  body: string;
}

function CommentList({ item }: IProps) {
  const [commentList, setCommentList] = useState<IComment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${item.id}`
    );
    const commentData: IComment[] = await data.json();
    setCommentList(commentData);
  };

  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Show/Hide Comments
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              {commentList.map((comment) => (
                <div className="card comment-card" key={comment.id}>
                  <p>Comment subject: {comment.name}</p>
                  <p>Comment text: {comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentList;
