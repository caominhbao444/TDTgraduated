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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatBoxHeader = (props) => {
  const [open, setOpen] = useState(false);
  const [isParam, setIsParam] = useState(false);
  const navigate = useNavigate();
  // const { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
    navigate("/message");
    props.handleParam(false);
    props.handleClicked(false);
  };
  useEffect(() => {
    if (props.id) {
      setIsParam(true);
    } else {
      setIsParam(false);
    }
  }, [props.id]);
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
          {isParam ? (
            <>
              <Avatar
                alt="Remy Sharp"
                src="http://res.cloudinary.com/djhhzmcps/image/upload/v1710595194/h5ciy7ec1caco9vh4xqn.png"
                sx={{ width: 30, height: 30 }}
              />
              <div className="flex flex-col gap justify-center">
                <h3 className="text-[14px] font-bold">
                  Nguyễn Lê Quốc Cường Update
                </h3>
                <span className="text-[13px]">Online</span>
              </div>
            </>
          ) : (
            <>
              <Skeleton variant="circular" width={30} height={30} />
            </>
          )}
        </div>
        {isParam && (
          <IconButton
            aria-label="settings"
            className="relative"
            onClick={handleClickOpen}
          >
            <DeleteIcon />
          </IconButton>
        )}
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
          <Button onClick={handleDelete}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatBoxHeader;
