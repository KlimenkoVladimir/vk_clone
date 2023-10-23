import { Grid, Box, Avatar, Button, Typography } from "@mui/material";

import { FC, useEffect, useState } from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import MySearch from "../UI/MySearch";
import { getAuth } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { IUser } from "../../types";
import { useNavigate } from "react-router-dom";

const Friends: FC = () => {
  const [textContent, setTextContent] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // const data = (await getDoc(doc(db, "users"))).data();
      // if (data) {
      //   setUsers(data as IUser[]);
      // } else {
      //   console.log("Нет пользователей");
      // }

      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const usersList: any[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.name.toLowerCase().includes(textContent.toLowerCase())) {
          usersList.push(userData);
        }
      });

      setUsers(usersList as IUser[]);
    };

    fetchData();
  }, [textContent]);

  console.log(users, textContent);

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
        <MySearch
          textContent={textContent}
          setTextContent={setTextContent}
        ></MySearch>
        <Box>
          {users.map((user) => (
            <Grid container key={user.id}>
              <Button
                onClick={() => {
                  navigate(`/profile/${user.id}`);
                }}
                sx={{
                  color: "black",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar src={user.avatar} sx={{ width: 90, height: 90 }} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {user.name}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Friends;
