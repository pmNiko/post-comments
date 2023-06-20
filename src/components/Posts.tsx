import { useGetPosts } from "../hooks/useGetPosts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Post } from "./Post";

export const Posts = () => {
  const { loading, posts } = useGetPosts();

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} mt={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={10}>
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};
