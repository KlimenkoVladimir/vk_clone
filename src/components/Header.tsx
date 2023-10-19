import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isInputActive, setIsInputActive] = useState(false);
  const [textContent, setTextContent] = useState("");
  console.log(user);

  return (
    <Box
      sx={{
        py: "8px",
        px: 10,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
      display={"flex"}
    >
      <img
        height={"24px"}
        src="https://japan25.ru/images/VK_Full_Logo.png"
        alt="logo"
      />
      <TextField
        size="small"
        sx={{ backgroundColor: "#edeef0", borderRadius: "5px" }}
        onClick={() => setIsInputActive(true)}
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // addPostHandler();
            setTextContent("");
            setIsInputActive(false);
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            //Проблемы с размером TextField
            setIsInputActive(false);
          }, 200);
        }}
        label="Поиск"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {!isInputActive && (
                <>
                  <IconButton
                    sx={{ m: 0, p: 0 }}
                    aria-label="delete"
                    size="medium"
                  >
                    <SearchIcon></SearchIcon>
                  </IconButton>
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
      {user ? (
        <Box>
          <Button
            onClick={() => {
              navigate(`/profile/${user.id}`);
            }}
            sx={{ color: "black" }}
          >
            <Avatar
              src={
                user.avatar ||
                "https://sun9-60.userapi.com/impg/UX2_E5ThtE3SALToW-dsA_f33QQP6mog8dN8wA/d6lQbJAhvuc.jpg?size=1680x1668&quality=95&sign=cc46c79ed47eda96e34f1c5c20d1b5c0&c_uniq_tag=03Hv-GAfPgWiOMTvUz0A822O7hIMZfTlaar7ic76Ij8&type=album"
              }
            ></Avatar>
          </Button>
          <Button onClick={() => signOut(auth)}>Выйти</Button>
        </Box>
      ) : (
        <Box>
          <Button onClick={() => navigate("/login")}>Войти</Button>
          <Button onClick={() => navigate("/register")}>Регистрация</Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
