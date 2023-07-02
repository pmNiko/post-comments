import { PostProps } from "../interface";

const uri = "https://jsonplaceholder.typicode.com/posts?_limit=1";

const getPosts = async (): Promise<PostProps[]> => {
  const resp = await fetch(uri);

  const data = await resp.json();

  return data;
};

export default getPosts;
