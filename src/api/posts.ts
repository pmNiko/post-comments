import { PostProps } from "../interface";

const uri = "https://jsonplaceholder.typicode.com/posts?_limit=3";

const getPosts = async (): Promise<PostProps[]> => {
  const resp = await fetch(uri);

  const data = await resp.json();

  return data;
};

export default getPosts;
