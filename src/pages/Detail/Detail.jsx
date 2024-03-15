import React, { useEffect, useState } from "react";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import Header from "../../components/DetailItems/Header";
import Body from "../../components/DetailItems/Body";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CallApiInforUser } from "../../store/users2Slice";

const Detail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const authToken = localStorage.getItem("token");
  const { id } = useParams();

  const inforUser = useSelector((state) => state.user2.inforUser);
  const dispatch = useDispatch();
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    dispatch(
      CallApiInforUser({
        headers: { authorization: `Bearer ${authToken}` },
        id: id,
      })
    );
  }, [id, dispatch, authToken]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7]">
      <main className="md:col-span-7 flex flex-col md:gap-3 md:py-4 mt-[42px] md:mt-[58px] md:pl-8">
        <Header handleActiveTab={handleActiveTab} user={inforUser} />
        <Body activeTab={activeTab} id={id} />
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Detail;
