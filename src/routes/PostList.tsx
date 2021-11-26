import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

interface IProps {
  propsMessage: string;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: IUser;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

function PostList({ propsMessage }: IProps) {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const componentName = "PostList";

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(`${propsMessage} ${componentName}`);
  }, []);

  const fetchItems = async () => {
    const data = await fetch(`
    https://jsonplaceholder.typicode.com/posts`);
    const postList: IPost[] = await data.json();

    const usersData = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const userData: IUser[] = await usersData.json();
    // setUser(userData);

    postList.map((item) => {
      if (item.userId) {
        const foundUser = userData.find((user) => {
          return item.userId === user.id;
        });

        if (foundUser) {
          item.user = foundUser;
        }
      }

      return item;
    });

    setPostList(postList);
  };

  console.log(searchValue);
  console.log(postList);

  return (
    <>
      <h1 className="h1">Post List</h1>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label"></label>
        <input
          className="form-control"
          type="text"
          id="formFile"
          placeholder="Type here..."
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      <div>
        {postList
          .filter(
            (item) =>
              item.user?.name
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.user?.email.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <PostItem key={item.id} item={item} propsMessage={propsMessage} />
          ))}
      </div>
    </>
  );
}

export default PostList;
