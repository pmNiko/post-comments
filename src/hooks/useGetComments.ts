import { useEffect, useState } from "react";
import { CommentProps } from "../interface";
import getCommentsFromPostID from "../api/comments";

export const useGetComments = (postID: number) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([] as CommentProps[]);

  const getComments = async () => {
    try {
      setLoading(true);

      const data = await getCommentsFromPostID(postID);

      setComments(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return {
    loading,
    comments,
  };
};
