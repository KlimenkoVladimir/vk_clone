import { TextField, InputAdornment, IconButton } from "@mui/material";
import React, { FC, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TypeSetState } from "../../types";

const MySearch: FC<{
  textContent: string;
  setTextContent: TypeSetState<string>;
}> = ({ textContent, setTextContent }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  return (
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
  );
};

export default MySearch;
