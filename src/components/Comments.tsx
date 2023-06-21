import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useGetComments } from "../hooks/useGetComments";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  postId: number;
  toggleChecked: () => void;
}

interface LikeComments {
  [key: number]: string;
}

export const Comments = ({ postId, toggleChecked }: Props) => {
  const [likeComments, setLikeComments] = useState({} as LikeComments);
  const { loading, comments } = useGetComments(postId);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const comment = comments.filter(
      (element) => element.id.toString() === target.name
    )[0];

    if (target.checked) {
      setLikeComments({
        ...likeComments,
        [comment.id]: comment.name,
      });
    } else {
      const { [comment.id]: toDelete, ...restLiked } = likeComments;

      setLikeComments({
        ...restLiked,
      });
    }
  };

  useEffect(() => {
    console.table(likeComments);
  }, [likeComments]);

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
                  name={comment.id.toString()}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  color="error"
                  onChange={handleChange}
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
