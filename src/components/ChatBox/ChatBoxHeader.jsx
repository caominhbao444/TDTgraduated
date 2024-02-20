import { Avatar, IconButton } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
const ChatBoxHeader = (props) => {
  return (
    <div className="px-4 py-2 flex gap-2 justify-between items-center h-[58px] bg-white border-l">
      <div className="flex gap-2 items-center">
        <div className="md:hidden">
          <KeyboardReturnIcon
            fontSize="small"
            className="cursor-pointer md:hidden"
            onClick={() => props.handleBack(false)}
          />
        </div>
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 30, height: 30 }}
        />
        <div className="flex flex-col gap justify-center">
          <h3 className="text-[14px] font-bold">Cao Minh Bảo</h3>
          <span className="text-[13px]">Online</span>
        </div>
      </div>
      <IconButton aria-label="settings" className="relative">
        <MoreVertOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default ChatBoxHeader;
