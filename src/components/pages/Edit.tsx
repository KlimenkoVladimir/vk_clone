import { Grid, Box, TextField, Button } from "@mui/material";
import React, { FC, useState } from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import { useAuth } from "../hooks/useAuth";

const Edit: FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.name || "",
    password: "",
  });
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Header></Header>
      <SideBar></SideBar>
      <Box
        display={"flex"}
        sx={{
          flexDirection: "column",
          width: "80%",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Имя"
          variant="outlined"
          size="small"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          sx={{ width: "30%", mt: 2 }}
        />
        {/* <TextField
          label="Email"
          variant="outlined"
          size="small"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          sx={{ width: "30%", mt: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          sx={{ width: "30%", mt: 2 }}
        /> */}
        <Button variant="contained">Сохранить</Button>
      </Box>
    </Grid>
  );
};

export default Edit;
