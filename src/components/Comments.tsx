import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { ChangeEvent, useEffect } from "react";
import { CommentProps } from "../interface";
import { useSelectStore } from "../store/SelectStore";

interface Props {
  comments: CommentProps[];
}

export const Comments = ({ comments }: Props) => {
  const loadMaxLikes = useSelectStore((state) => state.loadMaxLikes);
  const check = useSelectStore((state) => state.check);
  const uncheck = useSelectStore((state) => state.uncheck);
  const likeComments = useSelectStore((state) => state.likeComments);

  const isLiked = (id: string) => Object.keys(likeComments).includes(id);

  const handleChange = ({
    target: { checked, id, value },
  }: ChangeEvent<HTMLInputElement>) => {
    checked ? check(id, value) : uncheck(id);
  };

  useEffect(() => {
    loadMaxLikes(comments.length);
  }, [comments]);

  return (
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
              checked={isLiked(`${id}`)}
            />
          }
          label={name}
        />
      ))}
    </FormGroup>
  );
};
