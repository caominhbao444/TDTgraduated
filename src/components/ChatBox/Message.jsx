import { Avatar } from "@mui/material";
import React from "react";

const Message = () => {
  return (
    <>
      <div className="flex w-full justify-end">
        <div className="z-10 md:w-[60%] w-full  flex flex-row-reverse">
          <div className="md:w-[90%] w-[80%] ">
            <div className="w-full bg-white text-justify p-2 rounded-t-lg rounded-bl-lg">
              Sint nisi laborum cillum enim duis qui aliquip dolore veniam ut
              aute nulla.Officia dolor ad non sint aliquip cupidatat irure. Ex
              nisi sunt laboris aliqua labore culpa sit sunt. Ea ullamco sit
              esse e
            </div>
            <div className="text-[13px] text-right pr-2">
              Đã gửi ngày 3/3/2024
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <div className="z-10 md:w-[70%] w-full flex ">
          <div className="flex items-start justify-end pr-2">
            <Avatar
              alt="Remy Sharp"
              src="http://res.cloudinary.com/djhhzmcps/image/upload/v1710595194/h5ciy7ec1caco9vh4xqn.png"
              sx={{ width: 40, height: 40 }}
            />
          </div>
          <div className="md:w-[95%] w-[80%] ">
            <div className="max-w-full bg-white text-justify p-2 rounded-tr-lg rounded-b-lg">
              Sint nisi laborumaboris aliqua labore culpa sit sunt. Ea ullamco
              sit esse eCupidatat Lorem adipisicing exercitation laboris ullamco
              ea. Adipisicing minim incididunt sint ullamco. Qui officia commodo
              exercitation aliqua mollit excepteur mollit do quis ex. Commodo
              minim excepteur proident amet tempor ipsum occaecat nostrud
              excepteur aliqua. Reprehenderit labore incididunt est cillum
              tempor enim cillum. Commodo ipsum magna officia tempor occaecat
              nulla esse sint. Veniam occaecat pariatur ea qui consectetur magna
              aliqua cillum sunt minim voluptate dolore. Ut voluptate
              consectetur minim ipsum pariatur aute commodo ex adipisicing irure
              proident ad. Pariatur pariatur eu labore quis cillum qui elit
              cillum deserunt qui anim cillum exercitation est. Laborum eiusmod
              exercitation culpa esse ad proident cillum voluptate aliqua duis.
              Dolor anim do velit cupidatat enim magna. Incididunt deserunt
              nostrud commodo eu amet ea et non pariatur ut sit sunt ut
              excepteur. Duis nisi enim ex consectetur dolor voluptate ex ipsum.
              Voluptate incididunt quis nulla ullamco minim consequat. Eu duis
              esse fugiat aute excepteur nulla elit consectetur proident do do
              veniam cupidatat labore.
            </div>
            <div className="text-left text-[13px] pl-2">
              Đã gửi ngày 3/3/2024
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
