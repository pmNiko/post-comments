import { CommentProps } from "../interface";

const uri = "https://jsonplaceholder.typicode.com/posts";

const getCommentsFromPostID = async (id: number): Promise<CommentProps[]> => {
  const resp = await fetch(`${uri}/${id}/comments`);

  const data = await resp.json();

  return data;
};

export default getCommentsFromPostID;
