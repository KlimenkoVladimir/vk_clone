import { FC, useState } from "react";
import SideBar from "../SideBar";
import Posts from "../Posts";
import { Box, Grid } from "@mui/material";
import { firstPost } from "../../data";
import { IPost } from "../../types";
import AddPost from "../AddPost";
import Header from "../Header";

const News: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([firstPost]);
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Header></Header>
      <SideBar></SideBar>
      <Box sx={{ width: "80%", pt: 5, pl: 5, pr: 30, bgcolor: "#dce1e6" }}>
        <AddPost setPosts={setPosts}></AddPost>
        <Posts posts={posts}></Posts>
      </Box>
    </Grid>
  );
};

export default News;
