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

interface PostsProps {
  posts: IPost[];
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {posts.map((post) => (
        <Box
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
              {post.author.name}
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
          {/* <ImageList sx={{ mt: 2 }} variant="quilted" cols={2}>
            <ImageListItem cols={2}>
              <img
                src="https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663432147_8-mykaleidoscope-ru-p-dostoprimechatelnosti-yaponii-fudziyama-pi-8.jpg"
                alt=" "
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem cols={1}>
              <img
                src="https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-cc1b1357-a8ce-494b-b57a-e0e3ecceecad"
                alt=" "
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem cols={1}>
              <img
                src="https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkmZEXkMbapSVAlF74OQB1ZqaKTM5SRkZCeTgDn6uOyic"
                alt=" "
                loading="lazy"
              />
            </ImageListItem>
          </ImageList> */}
        </Box>
      ))}
    </Box>
  );
};

export default Posts;
