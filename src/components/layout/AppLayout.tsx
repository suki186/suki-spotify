import { Box, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import NavList from "./components/NavList";
import LibraryHeader from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
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
  gap: "8px",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper, // theme.ts
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList />
        </ContentBox>
        <ContentBox height="100%">
          <LibraryHeader />
          <Library />
        </ContentBox>
      </Sidebar>
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
