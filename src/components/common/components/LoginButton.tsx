import { Button } from "@mui/material";
import React from "react";
import { getSpotifyAuthUrl } from "../../../utils/auth";

const LoginButton = () => {
  const login = () => {
    getSpotifyAuthUrl();
  };
  return (
    <Button variant="outlined" size="large" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;
