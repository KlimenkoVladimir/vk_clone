import { FC } from "react";
import SideBar from "../SideBar";
import Posts from "../Posts";
import { Box, Grid } from "@mui/material";
import AddPost from "../AddPost";
import Header from "../Header";

const News: FC = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Header></Header>
      <SideBar></SideBar>
      <Box sx={{ width: "80%", pt: 5, pl: 10, pr: 30, bgcolor: "#dce1e6" }}>
        <AddPost></AddPost>
        <Posts></Posts>
      </Box>
    </Grid>
  );
};

export default News;
