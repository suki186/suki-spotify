import { Box } from "@mui/material";

import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import ProfileCard from "../../common/components/ProfileCard";

const Navbar = () => {
  // 로그인 여부
  const { data: userProfile } = useGetCurrentUserProfile();

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    window.location.href = "/";
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      padding="8px"
    >
      {userProfile ? (
        <ProfileCard userProfile={userProfile} onLogout={logout} />
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
