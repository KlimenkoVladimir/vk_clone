import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { sideBar } from "../data";

const SideBar: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "20%",
        alignSelf: "stretch",
        bgcolor: "#dce1e6",
        pt: 5,
        pl: 5,
      }}
    >
      <nav aria-label="main mailbox folders">
        <List sx={{ p: 0 }}>
          {sideBar.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemIcon>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">{item.title}</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />
    </Box>
  );
};

export default SideBar;
