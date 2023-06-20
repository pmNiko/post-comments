import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useGetComments } from "../hooks/useGetComments";

export const Comments = ({ postId }: { postId: number }) => {
  const { loading, comments } = useGetComments(postId);

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
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  color="error"
                />
              }
              label={comment.name}
            />
          ))}
        </FormGroup>
      )}
    </>
  );
};
