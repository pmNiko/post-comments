import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox, Stack, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState } from "react";
import { PostProps } from "../interface";
import { Comments } from "./Comments";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

interface Props {
  post: PostProps;
}

export const Post = ({ post }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
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
            <Comments key={post.id} postId={post.id} />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
