import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { ChangeEvent, useEffect, useState } from "react";
import { CommentProps, PostProps } from "../interface";
import { Comments } from "./Comments";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useSelectStore } from "../store/SelectStore";
import { useGetComments } from "../hooks/useGetComments";

interface Props {
  post: PostProps;
}

export const Post = ({ post }: Props) => {
  const { loading, comments } = useGetComments(post.id);
  const isAllSelected = useSelectStore((state) => state.isAllSelected);
  const selectAll = useSelectStore((state) => state.selectAll);
  const unSelectAll = useSelectStore((state) => state.unSelectAll);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    target.checked ? selectAll(comments) : unSelectAll();
  };

  const label = { inputProps: { "aria-label": `${post.title}` } };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginTop: "3em",
        boxShadow: 3,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                color="error"
                onChange={handleChange}
                checked={isAllSelected}
              />
            </Stack>
            <Stack sx={{ minWidth: 0 }}>
              <Typography noWrap>{post.title}</Typography>
            </Stack>
          </Stack>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`Comentarios ${post.id}`} sx={{ pl: 7 }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <>
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Comments key={post.id} comments={comments} />
              )}
            </>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
