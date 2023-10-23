import {
  Grid,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Avatar,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Header from "../Header";
import Posts from "../Posts";
import SideBar from "../SideBar";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { IUser } from "../../types";
import { addFriend } from "../../utils";
import { log } from "console";

const Profile: FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUser>();
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  console.log(db);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getDoc(doc(db, "users", params.id!))).data();
      if (data) {
        setProfile(data as IUser);
      } else {
        console.log("error");
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const userSnapshot = await getDoc(doc(db, "friends", user?.id!));
        console.log("2");

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const friends = userData.friends || [];
          console.log(userData);
          console.log("3");

          setIsFriend(friends.includes(params.id));
        }
      } catch (error) {
        console.error("Ошибка при проверке друзей:", error);
      }
    };

    checkFriendStatus();
  }, [params.id, user?.id]);

  console.log(isFriend);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Header></Header>
      <SideBar></SideBar>
      {/* <Box sx={{ width: "80%", pt: 5, pl: 10, pr: 30, bgcolor: "#dce1e6" }}>
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
        <Posts></Posts>
      </Box> */}
      <Box p={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar
                alt="User Avatar"
                src={
                  profile?.avatar ||
                  "https://sun9-60.userapi.com/impg/UX2_E5ThtE3SALToW-dsA_f33QQP6mog8dN8wA/d6lQbJAhvuc.jpg?size=1680x1668&quality=95&sign=cc46c79ed47eda96e34f1c5c20d1b5c0&c_uniq_tag=03Hv-GAfPgWiOMTvUz0A822O7hIMZfTlaar7ic76Ij8&type=album"
                }
                sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
              />
              <Typography variant="h5" align="center">
                {profile?.name}
              </Typography>
              <Typography variant="subtitle1" align="center">
                Описание пользователя
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {user?.id === profile?.id ? (
                  <Button
                    sx={{ p: 3 }}
                    variant="contained"
                    onClick={() => navigate("/edit")}
                  >
                    Редактировать профиль
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        if (user && profile) {
                          addFriend(user.id, profile.id);
                        }
                      }}
                      sx={{ p: 3 }}
                      variant="contained"
                    >
                      {isFriend ? "В друзьях" : "Добавить в друзья"}
                    </Button>
                    <Button sx={{ p: 3 }} variant="contained">
                      Написать сообщение
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              {/* Здесь может быть блок с постами, фотографиями, информацией о пользователе и т.д. */}
              {/* Пример: */}
              {/* <Box mb={2}>
                <Typography variant="h6">Мои посты</Typography>
                
              </Box> */}
              <Box mb={2}>
                <Typography variant="h6">Мои фотографии</Typography>
                {/* Компонент с фотографиями */}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Profile;
