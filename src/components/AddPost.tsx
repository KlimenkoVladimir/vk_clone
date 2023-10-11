import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { FC, useState } from "react";
import { IPost, TypeSetState } from "../types";

interface SetPostsProps {
  setPosts: TypeSetState<IPost[]>;
}

const AddPost: FC<SetPostsProps> = ({ setPosts }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [textContent, setTextContent] = useState("");

  const addPostHandler = () => {
    console.log("ok");

    setPosts((prev) => [
      {
        author: {
          id: "1",
          name: "Vladimir",
          email: "facke@email",
          avatar:
            "https://parfum-asmodeus.ru/wp-content/uploads/a/1/7/a179b5d0cee30059a54aad7fe3c892ca.jpeg",
        },
        data: "5 минут назад",
        text: textContent,
        images: [],
      },

      ...prev,
    ]);
  };
  return (
    <Box sx={{ mx: 10, bgcolor: "white", borderRadius: "5px" }}>
      <TextField
        onClick={() => setIsInputActive(true)}
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addPostHandler();
            setTextContent("");
            setIsInputActive(false);
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsInputActive(false);
          }, 200);
        }}
        fullWidth
        label="Что у вас нового?"
        id="fullWidth"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isInputActive && (
                <>
                  <IconButton sx={{ mx: 2 }} aria-label="delete" size="medium">
                    <AddPhotoAlternateIcon />
                  </IconButton>

                  <Button
                    onClick={() => {
                      addPostHandler();
                      setTextContent("");
                      // setIsInputActive(false);
                    }}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Опубликовать
                  </Button>
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AddPost;
