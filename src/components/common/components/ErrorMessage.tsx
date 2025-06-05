import { Alert } from "@mui/material";
import React from "react";

// models에 넣기엔 한번만 쓰임
interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErrorMessage;
