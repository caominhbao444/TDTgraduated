import React from "react";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import { Card } from "@mui/material";

const Friends = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:pl-8">
        <Card className="w-full h-full bg-white">
          <div className="font-bold text-[16px] p-2 border-b">Bạn bè</div>
          <div></div>
        </Card>
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Friends;
