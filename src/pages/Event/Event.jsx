import { useState } from "react";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import CreateEvent from "../../components/Event/CreateEvent";
import ListEvent from "../../components/Event/ListEvent";
import MyEvent from "../../components/Event/MyEvent";
const Event = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [method, setMethod] = useState(0);

  const handleActiveTab = (active) => {
    setActiveTab(active);
  };
  const handleMethod = (e) => {
    setMethod(e.target.value);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-9  min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 mt-[42px] md:mt-[58px] ">
        <div className="flex md:flex-row flex-col w-full h-full">
          <div className="md:w-1/5 w-full bg-white flex md:flex-col md:justify-start md:items-center gap-1 md:sticky md:top-[58px] md:h-[calc(100vh-58px)]">
            <div
              className={`w-full p-2 text-center cursor-pointer md:border-r-2 ${
                activeTab === 0
                  ? "border-mainColor text-black font-medium"
                  : "text-textLightColor"
              }`}
              onClick={() => handleActiveTab(0)}
            >
              Tạo sự kiện
            </div>

            <div
              className={`w-full p-2 text-center cursor-pointer md:border-r-2 ${
                activeTab === 1
                  ? "border-mainColor text-black font-medium"
                  : "text-textLightColor"
              }`}
              onClick={() => handleActiveTab(1)}
            >
              Danh sách sự kiện
            </div>
            <div
              className={`w-full p-2 text-center cursor-pointer md:border-r-2 ${
                activeTab === 2
                  ? "border-mainColor text-black font-medium"
                  : "text-textLightColor"
              }`}
              onClick={() => handleActiveTab(2)}
            >
              Sự kiện của tôi
            </div>
          </div>
          <div className="md:w-4/5 w-full h-full md:p-4">
            {activeTab === 0 && <CreateEvent />}
            {activeTab === 1 && <ListEvent />}
            {activeTab === 2 && <MyEvent />}
          </div>
        </div>
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Event;
