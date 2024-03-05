import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useState } from "react";
const MyEvent = () => {
  const [view, setView] = useState("left");
  const handleView = (event, newAlignment) => {
    setView(newAlignment);
  };
  return (
    <div className="h-full w-full bg-white flex flex-col gap-4 md:p-4">
      <div className="flex justify-between items-center">
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
      <div className="bg-red-400 h-full"></div>
    </div>
  );
};

export default MyEvent;
