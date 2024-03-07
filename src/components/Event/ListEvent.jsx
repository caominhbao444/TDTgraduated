import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_LISTEvents } from "../../fakeApi";
const ListEvent = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 md:p-4">
      <div className="flex justify-between items-center md:p-0 p-4">
        <h3 className="text-[18px] font-semibold">Danh sách sự kiện</h3>
      </div>
      {API_LISTEvents.map((event) => {
        return (
          <div className="border" key={event.id}>
            <img
              src={event.imageUrl}
              alt=""
              className="w-full h-[200px] object-cover object-center"
            />
            <div className="flex flex-col w-full p-4 gap-4">
              <h3 className="text-[16px] font-bold">{event.name}</h3>
              <p>Người tổ chức: {event.organizer}</p>
              <div className="flex flex-col md:flex-row w-full md:items-center">
                <p className="w-full md:w-2/3 flex justify-start items-center">
                  Thời gian: {event.date_start} - {event.date_end}
                </p>
                <p className="w-full md:w-1/3 flex justify-end items-center">
                  Số lượng: {event.guest_current}/{event.guest_limit}
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
                    <p>Hình thức tổ chức : {event.event_method}</p>
                    <p>Nội dung: {event.desc}</p>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="w-full flex justify-end items-center">
                <button className="px-3 py-2 bg-mainColor text-white hover:bg-white hover:text-mainColor border border-mainColor rounded-lg">
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
