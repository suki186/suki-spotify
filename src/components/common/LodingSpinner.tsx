import React from "react";
import { HashLoader } from "react-spinners";
import { useTheme } from "@mui/material/styles";

const LodingSpinner = () => {
  const theme = useTheme();

  return (
    <div>
      <HashLoader color={theme.palette.primary.main} size={30} />
    </div>
  );
};

export default LodingSpinner;
