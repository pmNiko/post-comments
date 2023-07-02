import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useGetComments } from "../hooks/useGetComments";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  postId: number;
  likeAll: () => void;
  setIsAllChecked: Dispatch<SetStateAction<boolean>>;
  checkAll: boolean;
}

interface LikeComments {
  [key: string]: string;
}

export const Comments = ({
  postId,
  likeAll,
  setIsAllChecked,
  checkAll,
}: Props) => {
  const [likeComments, setLikeComments] = useState({} as LikeComments);
  const { loading, comments } = useGetComments(postId);

  const commentIsLiked = (id: string) => Object.keys(likeComments).includes(id);

  const selectAllComents = () => {
    const likes = comments.reduce(
      (obj, comment) => ({ ...obj, [comment.id]: comment.email }),
      {}
    );
    setLikeComments({ ...likes });
  };

  const resetLikeComments = () => setLikeComments({});

  const isAllCommentSelected = () => comments.length === countLikeComments();

  const countLikeComments = () => Object.entries(likeComments).length;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setLikeComments({ ...likeComments, [target.id]: target.value });
    } else {
      const { [target.id]: toDelete, ...restLiked } = likeComments;
      setLikeComments({ ...restLiked });
    }
  };

  useEffect(() => {
    if (comments.length > 0) {
      isAllCommentSelected() && likeAll();
      setIsAllChecked(isAllCommentSelected());
    }
  }, [likeComments]);

  useEffect(() => {
    checkAll ? selectAllComents() : resetLikeComments();
  }, [checkAll]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <FormGroup>
          {comments.map(({ id, name, email }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  id={`${id}`}
                  name={`${name}`}
                  value={`${email}`}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  color="error"
                  onChange={handleChange}
                  checked={commentIsLiked(`${id}`)}
                />
              }
              label={name}
            />
          ))}
        </FormGroup>
      )}
    </>
  );
};
