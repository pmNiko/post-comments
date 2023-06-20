import { useEffect, useState } from "react";
import getPosts from "../api/posts";
import { PostProps } from "../interface";

export const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PostProps[]>([] as PostProps[]);

  const getPostFromAPI = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostFromAPI();
  }, []);

  return {
    loading,
    posts,
  };
};
