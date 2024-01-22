import { Avatar, Card } from "@mui/material";

const FirstAside = () => {
  const AnnounceItem = () => {
    return (
      <Card className="flex justify-between items-center cursor-pointer">
        <div className="flex justify-start items-center gap-1">
          <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          />
          <div className="flex flex-col">
            <span className="text-[14px] text-black">Cao Minh Bao</span>
            <p className="text-textLightColor text-[13px]">
              Hom nay thu 7 ....
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center text-[13px]">1g</div>
      </Card>
    );
  };
  return (
    <div className="h-[40%] w-full p-2 border-b">
      <header className="uppercase font-[400] text-[15px] h-[20%] flex justify-start items-center">
        Thông báo mới
      </header>
      <div className="flex w-full flex-col mt-1 gap-2  overflow-hidden h-[70%]">
        <AnnounceItem />
        <AnnounceItem />
        <AnnounceItem />
      </div>
      <footer className="text-center h-[10%] flex justify-center items-center text-[13px] cursor-pointer">
        Xem tất cả
      </footer>
    </div>
  );
};

export default FirstAside;
