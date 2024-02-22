import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full top-0 left-0 right-0 absolute flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
