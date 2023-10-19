import {
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  Avatar,
  IconButton,
} from "@mui/material";
import React, { FC, SyntheticEvent, useRef, useState } from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { PhotoCamera } from "@mui/icons-material";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";

const Edit: FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.name || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const changeProfileHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser!, {
        displayName: userData.name,
      });
      if (selectedFile) {
        const storageRef = ref(
          storage,
          `avatars/${user?.id}/${selectedFile.name}`
        );
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(auth.currentUser!, {
          photoURL: downloadURL,
        });
      }
    } catch (error: any) {
      error.message && setError(error.message);
    }
  };

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
        <Avatar
          alt="User Avatar"
          src={
            user?.avatar ||
            "https://sun9-60.userapi.com/impg/UX2_E5ThtE3SALToW-dsA_f33QQP6mog8dN8wA/d6lQbJAhvuc.jpg?size=1680x1668&quality=95&sign=cc46c79ed47eda96e34f1c5c20d1b5c0&c_uniq_tag=03Hv-GAfPgWiOMTvUz0A822O7hIMZfTlaar7ic76Ij8&type=album"
          }
          sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
        />
        <label htmlFor="avatar-input">
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button variant="contained" onClick={changeProfileHandler}>
          Сохранить
        </Button>
      </Box>
    </Grid>
  );
};

export default Edit;
