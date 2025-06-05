import { Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../components/common/components/LodingSpinner";
import ErrorMessage from "../../../components/common/components/ErrorMessage";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("data: ", data);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" padding="8px">
        New Released Albums
      </Typography>
    </div>
  );
};

export default NewReleases;
