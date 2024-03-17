import { useState } from "react";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  return (
    <div className="w-full h-screen flex justify-center items-center bg-mainColor">
      <div className="md:w-[300px] w-full flex flex-col bg-white p-4 gap-3 rounded-lg">
        <h3 className="text-center font-bold">Quên mật khẩu</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="cursor-pointer">
            Email
          </label>
          <input id="email" className="outline-none border px-4 py-2"></input>
        </div>
        <div className="flex flex-col">
          <button className="px-2 py-2 border bg-mainColor text-white border-mainColor hover:bg-white hover:text-mainColor">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
