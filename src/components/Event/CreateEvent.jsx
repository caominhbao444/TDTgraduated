import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import { Avatar, CircularProgress, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const CreateEvent = () => {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [Urlimg, setUrlimg] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [imageUrl, setImageUrl] = useState(
    "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"
  );
  const [organizer, setOrganizer] = useState("Cao Minh Bao");
  const [nameEvent, setNameEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [amount, setAmount] = useState(0);
  const [detail, setDetail] = useState("");
  const authToken = localStorage.getItem("token");
  const userDetail = useSelector((state) => state.user.userDetail);

  function handleFileChange(event) {
    setLoading(true);
    const selectedFile = event.target.files[0];
    uploadImageToCloudinary(selectedFile)
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pzoe2lzh"); // replace with your Cloudinary upload preset

    return axios
      .post("https://api.cloudinary.com/v1_1/djhhzmcps/image/upload", formData)
      .then((response) => {
        setUrlimg(response.data.url);
        return response.data.url; // return the URL of the uploaded image
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
  const handleMethod = (e) => {
    setMethod(e.target.value);
  };
  const handleDateChange = (newvalue) => {
    setDateEvent(newvalue);
  };
  const handleCreateEvent = (e) => {
    e.preventDefault();
    var dateStart = new Date(dateEvent[0].$d);
    var dateEnd = new Date(dateEvent[1].$d);
    // const data = {
    //   id: 10,
    //   image: imageUrl,
    //   dateEvent: dateEvent,
    //   date_start: dateStart,
    //   date_end: dateEnd,
    //   organizer: organizer,
    //   name: nameEvent,
    //   event_method: method,
    //   guest_current: 0,
    //   guest_limit: amount,
    //   desc: detail,
    // };
    // const updateArray = [...API_LISTEvents, data];
    // API_LISTEvents.push(data);
    // console.log("Data is", API_LISTEvents);
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/events",
        {
          author: userDetail.id,
          title: nameEvent,
          from: dateStart,
          to: dateEnd,
          method: method,
          content: detail,
          media: imageUrl,
          limit: amount,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Thành công",
          text: "Đã tạo sự kiện thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-full w-full bg-white">
      <div className="w-full h-[200px] relative">
        {loading ? (
          <>
            <img
              src={imageUrl}
              width="100%"
              alt="bag photos"
              style={{
                display: "block",
                height: "200px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover object-center z-0"
            />
          </>
        )}
        <div className="flex absolute right-3 bottom-3 z-10 cursor-pointer gap-1 bg-white p-2 rounded-xl ">
          <input
            type="file"
            className="opacity-0 flex absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-xl z-10"
            onChange={handleFileChange}
          />
          <AddPhotoAlternateIcon className="cursor-pointer" />
          <span className="cursor-pointer">Thêm ảnh</span>
        </div>
      </div>
      <div className="w-full flex justify-start items-center px-4 py-2 border-b">
        <div className="flex gap-3 justify-center items-center">
          <Avatar alt="Ted talk" src={userDetail.image} />
          <div className="flex flex-col justify-center">
            <span className="text-[15px] text-black font-medium">
              {userDetail.fullname}
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
          value={nameEvent}
          onChange={(e) => setNameEvent(e.target.value)}
          id="nameEvent"
          className="w-full outline-none border p-3"
          placeholder="Nhập tên sự kiện..."
        />
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <h3>Thời gian diễn ra sự kiện</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiInputDateTimeRangeField
            value={dateEvent}
            onChange={handleDateChange}
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
          <MenuItem value={"Online"}>Tổ chức Online</MenuItem>
          <MenuItem value={"Offline"}>Tổ chức Offline</MenuItem>
        </Select>
      </div>
      <div className="w-full px-4 py-2 flex flex-col gap-3">
        <label htmlFor="amount" className="cursor-pointer">
          Số lượng người tham gia
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          id="detail"
          className="w-full outline-none border p-3 resize-none h-[100px]"
          placeholder="Nhập số lượng người tham gia"
          type="number"
        />
      </div>
      <div className="w-full px-4 pt-2 pb-4 flex flex-col items-end gap-3">
        <button
          className="px-4 py-2 rounded bg-mainColor text-white"
          onClick={handleCreateEvent}
        >
          Tạo sự kiện
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
