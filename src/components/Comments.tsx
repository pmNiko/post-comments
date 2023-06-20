import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useGetComments } from "../hooks/useGetComments";

export const Comments = ({ postId }: { postId: number }) => {
  const { loading, comments } = useGetComments(postId);

  console.log(`Comment ${postId} cargado`);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <FormGroup>
          {comments.map((comment) => (
            <FormControlLabel
              key={comment.id}
              control={<Checkbox />}
              label={comment.email}
            />
          ))}
        </FormGroup>
      )}
    </>
  );
};
