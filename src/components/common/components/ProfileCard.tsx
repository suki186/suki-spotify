import React, { useState } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import theme from "../../../theme";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
  gap: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

interface UserProfile {
  display_name?: string;
  images?: { url: string }[];
}

interface ProfileCardProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ProfileContainer>
      <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>
        {userProfile.display_name}
      </Typography>
      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar
          src={
            userProfile.images && userProfile.images.length > 0
              ? userProfile.images[0].url
              : "/images/default_user.jpg"
          }
          alt={userProfile.display_name}
        />
      </IconButton>
      <ProfileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        <ProfileMenuItem
          onClick={() => {
            handleMenuClose();
            onLogout();
          }}
        >
          Log out
        </ProfileMenuItem>
      </ProfileMenu>
    </ProfileContainer>
  );
};

export default ProfileCard;
