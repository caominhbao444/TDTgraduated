import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Confirm = () => {
  const { id } = useParams();
  console.log("id", id);
  return <></>;
};

export default Confirm;
