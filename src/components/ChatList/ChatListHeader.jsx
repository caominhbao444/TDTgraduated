import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
const ChatListHeader = () => {
  return (
    <div className="bg-red-700 px-4 py-2 flex gap-1 justify-start items-center">
      <KeyboardReturnIcon fontSize="small" />
      <h3>Trò chuyện</h3>
    </div>
  );
};

export default ChatListHeader;
