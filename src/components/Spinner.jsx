import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
const Spinner = () => {
  return (
    <div style={{ position: "absolute", left: "45%" }}>
      <CircularProgress />
    </div>
  );
}

export default Spinner