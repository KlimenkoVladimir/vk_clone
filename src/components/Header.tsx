import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [textContent, setTextContent] = useState("");
  const navigate = useNavigate();
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
      <Button onClick={() => navigate("/auth")}>Войти</Button>
    </Box>
  );
};

export default Header;
