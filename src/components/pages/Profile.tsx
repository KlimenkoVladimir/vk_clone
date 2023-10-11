import {
  Grid,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import Header from "../Header";
import Posts from "../Posts";
import SideBar from "../SideBar";
import { firstPost } from "../../data";
import { IPost } from "../../types";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      <Box sx={{ width: "80%", pt: 5, pl: 10, pr: 30, bgcolor: "#dce1e6" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={
              user?.avatar ||
              "https://sun9-60.userapi.com/impg/UX2_E5ThtE3SALToW-dsA_f33QQP6mog8dN8wA/d6lQbJAhvuc.jpg?size=1680x1668&quality=95&sign=cc46c79ed47eda96e34f1c5c20d1b5c0&c_uniq_tag=03Hv-GAfPgWiOMTvUz0A822O7hIMZfTlaar7ic76Ij8&type=album"
            }
            title="green iguana"
          />

          <CardActions>
            <Button size="small" onClick={() => navigate("/edit")}>
              Редактировать профиль
            </Button>
          </CardActions>
        </Card>
        <Posts posts={posts}></Posts>
      </Box>
    </Grid>
  );
};

export default Profile;
