import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
const ChatListHeader = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="px-4 py-2 flex gap-2 justify-start items-center h-[58px]">
      <KeyboardReturnIcon
        fontSize="small"
        className="cursor-pointer"
        onClick={handleBack}
      />
      <h3 className="text-[18px] font-bold">Trò chuyện</h3>
    </div>
  );
};

export default ChatListHeader;
