import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
const ChatBoxHeader = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
  };
  return (
    <>
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
          {/* <Skeleton variant="circular" width={30} height={30} /> */}
          <div className="flex flex-col gap justify-center">
            <h3 className="text-[14px] font-bold">Cao Minh Bảo</h3>
            <span className="text-[13px]">Online</span>
          </div>
        </div>
        <IconButton
          aria-label="settings"
          className="relative"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa cuộc trò chuyện này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn chắc chắn xóa cuộc trò chuyện này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatBoxHeader;
