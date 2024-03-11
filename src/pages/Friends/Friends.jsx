import React, { useEffect, useState } from "react";
import SecondAside from "../../components/HomeItems/SecondAside/SecondAside";
import { Card, Switch } from "@mui/material";
import FriendCard from "../../components/FriendItem/FriendCard";
import { API_MESSAGES } from "../../fakeApi";
import axios from "axios";
const Friends = () => {
  const [checked, setChecked] = useState(false);
  const [friends, setFriends] = useState()
  const handleChange = () => {
    setChecked(!checked);
  };
  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASE_URL + '/friend-list/' + 1)
    .then((res) => {
      console.log(res)
      setFriends(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 md:gap-8 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:pl-8">
        <Card className="w-full h-full bg-white">
          <div className="px-3 py-2 border-b flex justify-between items-center">
            <h3 className="font-bold text-[18px]">Bạn bè</h3>
            <div className="flex gap-1 items-center">
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span className="text-[14px] font-semibold">
                Xếp theo thời gian
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {friends ?  friends.map((friend) => {
              return (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                />
              );
            }): null}
          </div>
        </Card>
      </main>
      <aside className="bg-white md:col-span-2 hidden md:flex flex-col  sticky top-[58px]  h-[calc(100vh-58px)]">
        <SecondAside />
      </aside>
    </div>
  );
};

export default Friends;
