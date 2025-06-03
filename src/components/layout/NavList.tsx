import React from "react";
import { styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

// Home, Search 묶음
const NavListContainer = styled("ul")({
  listStyle: "none",
  padding: "12px",
  margin: 0,
});

// Home 하나, Search 하나
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none", // 링크 밑줄 삭제
  padding: "5px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary, // 선택 안됨
  "&:hover": {
    color: theme.palette.text.primary, // 호버
  },
  "&:active": {
    color: theme.palette.text.primary, // 선택 됨
  },
  "&.active": {
    color: theme.palette.text.primary, // 클릭 상태
  },
}));

const NavList = () => {
  return (
    <NavListContainer>
      <StyledNavLink to="/" end>
        <HomeIcon />
        <Typography variant="h2" fontWeight={700} color="inherit">
          Home
        </Typography>
      </StyledNavLink>
      <StyledNavLink to="/search">
        <SearchIcon />
        <Typography variant="h2" fontWeight={700} color="inherit">
          Search
        </Typography>
      </StyledNavLink>
    </NavListContainer>
  );
};

export default NavList;
