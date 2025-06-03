import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    // 휴대폰에서는 숨김
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper, // theme.ts
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: " 8px",
}));

// Home, Search 묶음
const NavList = styled("ul")({
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

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
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
          </NavList>
        </ContentBox>
      </Sidebar>
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
