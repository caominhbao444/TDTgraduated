import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Confirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndNavigate = async () => {
      try {
        await Swal.fire({
          title: "Thành công",
          text: "Tài khoản đã được xác thực thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/");
      } catch (error) {
        console.error("Error confirming account:", error);
      }
    };

    confirmAndNavigate();
  }, [id, navigate]);

  return null; // Or any other UI component you want to render while confirming
};

export default Confirm;
