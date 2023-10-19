import { Grid, Box } from "@mui/material";

import { FC } from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import Chat from "../Chat";

const Messages: FC = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Header></Header>
        <SideBar></SideBar>
        <Box sx={{ width: "80%", pt: 5, pl: 10, pr: 30, bgcolor: "#dce1e6" }}>
          <Chat></Chat>
        </Box>
      </Grid>
    </div>
  );
};

export default Messages;
