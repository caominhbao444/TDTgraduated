import { Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
const SecondAside = () => {
  const Friend = () => {
    return (
      <Link
        to={`/message/${1}`}
        className="flex justify-between items-center p-2 cursor-pointer"
      >
        <div className="flex justify-start items-center gap-2">
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            sx={{ width: 30, height: 30 }}
          />
          <span>Cao Minh Bao</span>
        </div>
        <div className="flex justify-center items-center">
          <CircleIcon color="success" sx={{ fontSize: "12px" }} />
        </div>
      </Link>
    );
  };
  return (
    <div className="h-[100%] w-full box-border">
      <header className="font-bold bg-mainColor text-white text-[15px] h-[10%] flex justify-start items-center box-border p-2">
        Trực tuyến
      </header>
      <div className="h-[90%] w-full overflow-y-auto  overflow-x-hidden scrollbar-thin scrollbar-thumb-transparent no-scrollbar">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </div>
    </div>
  );
};

export default SecondAside;
