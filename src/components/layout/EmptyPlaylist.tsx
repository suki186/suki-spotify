import React from "react";
import { Card, Button, styled, Typography } from "@mui/material";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  margin: "16px 10px",
  padding: "20px",
  borderRadius: "8px",
}));

const AddPlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <AddPlaylistButton variant="outlined">Create playlist</AddPlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
