import React from "react";
import { Button, Box, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";

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
  return (
    <HeaderContainer>
      <Box display="flex" alignItems="center">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <HeaderAddButton>
        <AddIcon />
      </HeaderAddButton>
    </HeaderContainer>
  );
};

export default LibraryHeader;
