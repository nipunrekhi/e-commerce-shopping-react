import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

const Error = ({ title, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
    }, 5000); // hide after 5 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let errorMessage = message;

  if (typeof message === "object") {
    errorMessage = JSON.stringify(message);
  }
  return (
    <>
      {visible && (
        <Alert severity="error">
          <AlertTitle>{title}</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default Error;
