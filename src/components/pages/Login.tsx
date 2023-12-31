import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  TextField,
  Stack,
  Button,
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
    } catch (error: any) {
      error.message && setError(error.message);
    }
    console.log(userData);
  };
  const handleRegister = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
    } catch (error: any) {
      error.message && setError(error.message);
    }

    console.log("Reg");
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      navigate("/news");
    }
  });

  return (
    <Box
      display={"flex"}
      sx={{
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        size="small"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        sx={{ width: "30%", mt: 2 }}
      />
      {/* <TextField
        label="Password"
        variant="outlined"
        size="small"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        sx={{ width: "30%", mt: 2 }}
      /> */}
      <FormControl sx={{ width: "30%", mt: 2 }} variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          size="small"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleLogin}>
          Войти
        </Button>
        <Button variant="outlined" onClick={() => navigate("/register")}>
          Регистрация
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
