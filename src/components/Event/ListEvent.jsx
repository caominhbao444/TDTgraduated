import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const ListEvent = () => {
  const [events, setEvents] = useState();
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + '/events',{
      headers: {
        Authorization: `Bearer ` + localStorage.getItem('token')
      },
    }).then((res) => {
      setEvents(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  const handleJoin = (event) => {
    axios.put(import.meta.env.VITE_APP_BASE_URL + '/events/' + event.id,{
      participants: userDetail.id
    },{
      headers: {
        Authorization: `Bearer ` + localStorage.getItem('token')
      },
    }).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  if(!events){
    return null
  }
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 md:p-4">
      <div className="flex justify-between items-center md:p-0 p-4">
        <h3 className="text-[18px] font-semibold">Danh sách sự kiện</h3>
      </div>
      {events && events.map((event) => {
        return (
          <div className="border" key={event.id}>
            <img
              src={event.media || "https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6"}
              alt=""
              className="w-full h-[200px] object-cover object-center"
            />
            <div className="flex flex-col w-full p-4 gap-4">
              <h3 className="text-[16px] font-bold">{event.title}</h3>
              <p>Người tổ chức: {event.author.fullname}</p>
              <div className="flex flex-col md:flex-row w-full md:items-center">
                <p className="w-full md:w-2/3 flex justify-start items-center">
                  Thời gian: {moment(event.from).format("DD/MM/YYYY HH:mm A")} - {moment(event.to ).format("DD/MM/YYYY HH:mm A")}
                </p>
                <p className="w-full md:w-1/3 flex justify-end items-center">
                  Số lượng: {event.participants.length}/{event.limit}
                </p>
              </div>
              <div className="w-full">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Chi tiết
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>Hình thức tổ chức : {event.method}</p>
                    <p>Nội dung: {event.content}</p>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="w-full flex justify-end items-center">
                <button disabled={event.participants.filter(el => el.id == userDetail.id).length > 0 ? true : false} 
                  className={event.participants.filter(el => el.id == userDetail.id).length > 0 
                    ? 'bg-gray-200 px-3 py-2 border rounded-lg'  
                    : 'bg-mainColor text-white hover:bg-white hover:text-mainColor px-3 py-2 border border-mainColor rounded-lg'}
                  onClick={() => handleJoin(event)}
                >
                  Tham gia
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListEvent;
