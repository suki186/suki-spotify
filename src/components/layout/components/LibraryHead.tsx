import React from "react";
import { Button, Box, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../../utils/auth";

const HeaderContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "12px",
  justifyContent: "space-between",
});

const HeaderAddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const LibraryHeader = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const token = localStorage.getItem("access_token");

  // 플레이리스트 만들기
  const handleCreatePlaylist = () => {
    if (token) {
      createPlaylist({ name: "My Playlist" });
    } else {
      getSpotifyAuthUrl(); // 로그인하기
    }
  };

  return (
    <HeaderContainer>
      <Box display="flex" alignItems="center">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <HeaderAddButton>
        <AddIcon onClick={handleCreatePlaylist} />
      </HeaderAddButton>
    </HeaderContainer>
  );
};

export default LibraryHeader;
