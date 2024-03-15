import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import vi from "date-fns/locale/vi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReorderIcon from "@mui/icons-material/Reorder";
import React, { Fragment, useEffect, useState } from "react";
import { API_LISTEvents } from "../../fakeApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import {
  format,
  subHours,
  startOfMonth,
  startOfToday,
  parse,
  eachDayOfInterval,
  endOfMonth,
  add,
  isSameDay,
  parseISO,
  isEqual,
  isToday,
  isSameMonth,
  getDay,
} from "date-fns";
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
} from "@zach.codes/react-calendar";
import { API_MyEvents } from "../../fakeApi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CallApiMyListEvents } from "../../store/eventsSlice";
const Meeting = ({ meeting }) => {
  let startDateTime = parseISO(meeting.from);
  const authToken = localStorage.getItem("token");
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  let endDateTime = parseISO(meeting.to);
  const handleCancel = (event) => {
    const updatedParticipants = event.participants.filter(
      (item) => item.id !== userDetail.id
    );
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/events/" + event.id,
        {
          participants: updatedParticipants,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(
          CallApiMyListEvents({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.media}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.title}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.from}>{format(startDateTime, "h:mm a")}</time>{" "}
          -{" "}
          <time dateTime={meeting.to}>
            {format(endDateTime, "h:mm a dd/MM")}
          </time>
        </p>
      </div>
      <div className="flex items-center">
        <button
          className="px-3 py-1 bg-red-700 text-white cursor-pointer rounded-[12px]"
          onClick={() => handleCancel(meeting)}
        >
          Hủy
        </button>
      </div>
    </li>
  );
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const FirstView = (props) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const theme = useTheme();
  const [dataEdit, setDataEdit] = useState({});
  const [nameEditEvent, setNameEditEvent] = useState("");
  const [descEditEvent, setDescEditEvent] = useState("");
  const dispatch = useDispatch();
  const [amountEditEvent, setAmountEditEvent] = useState("");
  const [editDateEvent, setEditDateEvent] = useState([]);
  const [editEventId, setEditEventId] = useState();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const authToken = localStorage.getItem("token");
  const userDetail = useSelector((state) => state.user.userDetail);
  const handleClickOpen = (data) => () => {
    setOpen(true);
    setDataEdit(data);
    setNameEditEvent(data.title);
    setDescEditEvent(data.conent);
    setAmountEditEvent(data.limit);
    setEditDateEvent([data.from, data.to]);
    setEditEventId(data.id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditDate = (newvalue) => {
    setEditDateEvent(newvalue);
  };
  const handleEdit = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/events/" + editEventId,
        {
          title: nameEditEvent,
          content: descEditEvent,
          limit: amountEditEvent,
          // from: moment(editDateEvent[0].$d),
          // to: moment(editDateEvent[1].$d)
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setNameEditEvent(dataEdit.title);
    setDescEditEvent(dataEdit.conent);
    setAmountEditEvent(dataEdit.limit);
    setEditDateEvent();
  }, [dataEdit]);
  const handleDeleteEvent = (eventId) => {
    axios
      .delete(import.meta.env.VITE_APP_BASE_URL + "/events/" + eventId, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(
          CallApiMyListEvents({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = (event) => {
    const updatedParticipants = event.participants.filter(
      (item) => item.id !== props.userDetail.id
    );
    axios
      .put(
        import.meta.env.VITE_APP_BASE_URL + "/events/" + event.id,
        {
          participants: updatedParticipants,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(
          CallApiMyListEvents({
            headers: { authorization: `Bearer ${authToken}` },
            id: userDetail.id,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {props.events.map((event) => {
        return (
          <div className="border" key={event.id}>
            <img
              src={event.media}
              alt=""
              className="w-full h-[200px] object-cover object-center"
            />
            <div className="flex flex-col w-full p-4 gap-4">
              <h3 className="text-[16px] font-bold">{event.title}</h3>
              <p>Người tổ chức: {event.author.fullname}</p>
              <div className="flex flex-col md:flex-row w-full md:items-center">
                <p className="w-full md:w-2/3 flex justify-start items-center">
                  Thời gian: {moment(event.from).format("DD/MM/YYYY HH:mm A")} -{" "}
                  {moment(event.to).format("DD/MM/YYYY HH:mm A")}
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
              <div className="w-full flex justify-end items-center gap-3">
                {event.author.id !== userDetail.id ? (
                  <button
                    className="px-3 py-2 bg-red-700 text-white hover:bg-white hover:text-red-700 border border-red-700 rounded-lg"
                    onClick={() => handleCancel(event)}
                  >
                    Huỷ tham gia
                  </button>
                ) : (
                  <>
                    <button
                      className="px-3 py-2 bg-red-700 text-white hover:bg-white hover:text-red-700 border border-red-700 rounded-lg"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Xóa sự kiện
                    </button>
                    <button
                      className="px-3 py-2 bg-mainColor text-white hover:bg-white hover:text-mainColor border border-mainColor rounded-lg"
                      onClick={handleClickOpen(event)}
                    >
                      Chỉnh sửa
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Chỉnh sửa thông tin sự kiện
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <div className=" flex flex-col gap-3">
              <img
                src={dataEdit && dataEdit.imageUrl}
                className="md:w-[500px] h-[200px] w-full object-cover object-center"
              />
              <div className="flex flex-col w-full justify-center items-start">
                <label htmlFor="nameEvent" className="cursor-pointer">
                  Tên sự kiện
                </label>
                <input
                  id="nameEvent"
                  value={nameEditEvent}
                  placeholder={nameEditEvent}
                  onChange={(e) => setNameEditEvent(e.target.value)}
                  className="w-full px-2 py-2 outline-none border"
                />
              </div>
              <div className="flex flex-col w-full justify-center items-start">
                <label htmlFor="desEvent" className="cursor-pointer">
                  Mô tả sự kiện
                </label>
                <textarea
                  id="desEvent"
                  className="w-full px-2 py-2 outline-none border resize-none h-[100px] overflow-y-scroll"
                  value={descEditEvent}
                  placeholder={descEditEvent}
                  onChange={(e) => setDescEditEvent(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full justify-center items-start">
                <label htmlFor="amountEvent" className="cursor-pointer">
                  Số lượng người tham dự
                </label>
                <input
                  type="number"
                  id="amountEvent"
                  className="w-full px-2 py-2 outline-none border"
                  value={amountEditEvent}
                  placeholder={amountEditEvent}
                  onChange={(e) => setAmountEditEvent(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full justify-center items-start">
                <label htmlFor="dateEvent" className="cursor-pointer">
                  Thời gian diễn ra sự kiện
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MultiInputDateTimeRangeField
                    value={editDateEvent}
                    onChange={handleEditDate}
                    slotProps={{
                      textField: ({ position }) => ({
                        label: position === "start" ? "Bắt đầu" : "Kết thúc",
                      }),
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleClose}
              className="px-2 py-2 bg-white rounded-md text-mainColor border border-mainColor"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-2 bg-mainColor rounded-md text-white"
            >
              Cập nhật
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
const SecondView = (props) => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const myListEvents = useSelector((state) => state.events.myListEvents);
  const userDetail = useSelector((state) => state.user.userDetail);
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = myListEvents.filter((meeting) =>
    isSameDay(parseISO(meeting.from), selectedDay)
  );
  return (
    <>
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900 uppercase">
                  {format(firstDayCurrentMonth, "MMMM yyyy", { locale: vi })}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <WestIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <EastIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>CN</div>
                <div>Hai</div>
                <div>Ba</div>
                <div>Tư</div>
                <div>Năm</div>
                <div>Sáu</div>
                <div>Bảy</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {myListEvents.some((meeting) =>
                        isSameDay(parseISO(meeting.from), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                Sự kiện trong{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "dd/MM", { locale: vi })}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))
                ) : (
                  <p>Không có sự kiện trong ngày.</p>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

const MyEvent = () => {
  const [view, setView] = useState("left");
  const dispatch = useDispatch();
  const handleView = (event, newAlignment) => {
    setView(newAlignment);
  };

  const userDetail = useSelector((state) => state.user.userDetail);
  const myListEvents = useSelector((state) => state.events.myListEvents);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    dispatch(
      CallApiMyListEvents({
        headers: { authorization: `Bearer ${authToken}` },
        id: userDetail.id,
      })
    );
  }, [authToken, dispatch, userDetail]);
  console.log("My List Events", myListEvents);
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 md:p-4">
      <div className="flex justify-between items-center md:p-0 p-4">
        <h3 className="text-[18px] font-semibold">Danh sách sự kiện của tôi</h3>
        <div className="flex gap-3">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleView}
            aria-label="view"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <ReorderIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <CalendarMonthIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {view === "left" ? (
        <FirstView events={myListEvents} userDetail={userDetail} />
      ) : (
        <SecondView />
      )}
    </div>
  );
};
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
export default MyEvent;
