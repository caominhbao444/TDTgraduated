import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import { Avatar, MenuItem, Select } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const CreateEvent = () => {
  const [method, setMethod] = useState(0);
  const handleMethod = (e) => {
    setMethod(e.target.value);
  };
  return (
    <div className="h-full w-full bg-white">
      <div className="w-full h-[200px] relative">
        <img
          src="https://images.unsplash.com/photo-1709380526836-100c551cfc28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover object-center z-0"
        />
        <div className="flex absolute right-3 bottom-3 z-10 cursor-pointer gap-1 bg-white p-2 rounded-xl">
          <AddPhotoAlternateIcon />
          <span>Thêm ảnh</span>
        </div>
      </div>
      <div className="w-full flex justify-start items-center px-4 py-2 border-b">
        <div className="flex gap-3 justify-center items-center">
          <Avatar
            alt="Ted talk"
            src="https://images.unsplash.com/photo-1709380526836-100c551cfc28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="flex flex-col justify-center">
            <span className="text-[15px] text-black font-medium">
              Cao Minh Bao
            </span>
            <span className="text-[14px] text-textLightColor">
              Người tổ chức
            </span>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-2 ">
        <label htmlFor="nameEvent" className="cursor-pointer">
          Tên sự kiện
        </label>
        <input
          id="nameEvent"
          className="w-full outline-none border p-3"
          placeholder="Nhập tên sự kiện..."
        />
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <h3>Thời gian diễn ra sự kiện</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiInputDateTimeRangeField
            slotProps={{
              textField: ({ position }) => ({
                label: position === "start" ? "Bắt đầu" : "Kết thúc",
              }),
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <h3>Hình thức tổ chức sự kiện</h3>
        <Select value={method} onChange={handleMethod} displayEmpty>
          <MenuItem value="">
            <em>Vui lòng chọn hình thức</em>
          </MenuItem>
          <MenuItem value={1}>Tổ chức Online</MenuItem>
          <MenuItem value={2}>Tổ chức Offline</MenuItem>
        </Select>
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <label htmlFor="amount" className="cursor-pointer">
          Số lượng người tham gia
        </label>
        <input
          id="amount"
          className="w-full outline-none border p-3"
          placeholder="Nhập số lượng người tham gia"
          type="number"
        />
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <label htmlFor="detail" className="cursor-pointer">
          Mô tả sự kiện
        </label>
        <textarea
          id="detail"
          className="w-full outline-none border p-3 resize-none h-[100px]"
          placeholder="Nhập số lượng người tham gia"
          type="number"
        />
      </div>
      <div className="w-full px-4 pt-2 pb-4 flex flex-col items-end gap-3">
        <button className="px-4 py-2 rounded bg-mainColor text-white">
          Tạo sự kiện
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
