import {
  Box,
  Avatar,
  Typography,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import { FC } from "react";

import { IPost } from "../types";
import { cols } from "../data";
import { useAuth } from "./hooks/useAuth";

interface PostsProps {
  posts: IPost[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  const { user } = useAuth();
  return (
    <Box sx={{ mt: 3 }}>
      {posts.map((post) => (
        <Box
          key={post.data}
          sx={{
            mt: 1,
            px: 3,
            py: 2,
            border: "1px solid gray",
            bgcolor: "white",
            borderRadius: "10px",
          }}
        >
          <Button onClick={() => {}} sx={{ color: "black" }}>
            <Avatar src={post.author.avatar}></Avatar>
            <Typography variant="h6" sx={{ ml: 4 }}>
              {user?.name || post.author.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ ml: 2 }}>
              {post.data}
            </Typography>
          </Button>
          <Typography variant="subtitle1">{post.text}</Typography>
          <Typography variant="subtitle1">
            {post.hashtags?.join(" ")}
          </Typography>
          {post.images.length !== 0 && (
            <ImageList
              sx={{ mt: 2 }}
              variant="quilted"
              cols={cols[post.images.length - 1].columns}
            >
              {post.images.map((image, index) => (
                <ImageListItem
                  key={image}
                  cols={cols[post.images.length - 1].index[index]}
                  sx={{ maxHeight: "300px" }}
                >
                  <img src={image} alt=" " loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Posts;
