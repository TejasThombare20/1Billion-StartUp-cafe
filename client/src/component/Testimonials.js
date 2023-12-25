import React from "react";
import { avatar } from "../assets/index";
const Testimonials = () => {
  return (
    <div className="w-full">
      <div className=" w-full flex flex-col justify-center items-center gap-4 ">
        <p className="text-2xl font-semibold text-orange-500 ">Testimonials</p>
        <p className=" text-3xl md:text-5xl md:font-bold">
          What do <span className="text-orange-500">Student</span> think of us ?{" "}
        </p>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="shadow-md bg-primary shadow-gray-400">
            <div className="flex flex-col justify-start items-center px-6 py-6 gap-3">
              <div className=" w-full flex justify-start items-center gap-2">
                <div className="w-14 h-14 overflow-hidden">
                  <img
                    className="w-full h-full rounded-full object-contain "
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-textColor">James Anderson</p>
                  <p className="text-textColor text-[12px]">2020 IMG</p>
                </div>
              </div>
              <div className="text-textColor">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus saepe fugit asperiores vero nulla animi iusto deleniti
                at explicabo, nostrum, veniam consectetur porro enim repudiandae
                odio dignissimos error itaque dolorem!
              </div>
            </div>
          </div>
          <div className="shadow-md bg-primary shadow-gray-400">
            <div className="flex flex-col justify-start items-center px-4 py-4 gap-3">
              <div className=" w-full flex justify-start items-center gap-2">
                <div className="w-14 h-14 overflow-hidden">
                  <img
                    className="w-full h-full rounded-full object-contain "
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-textColor">James Anderson</p>
                  <p className="text-textColor text-[12px]">2020 IMG</p>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus saepe fugit asperiores vero nulla animi iusto deleniti
                at explicabo, nostrum, veniam consectetur porro enim repudiandae
                odio dignissimos error itaque dolorem!
              </div>
            </div>
          </div>
          <div className="shadow-md bg-primary shadow-gray-400">
            <div className="flex flex-col justify-start items-center px-4 py-4 gap-3">
              <div className=" w-full flex justify-start items-center gap-2">
                <div className="w-14 h-14 overflow-hidden">
                  <img
                    className="w-full h-full rounded-full object-contain "
                    src={avatar}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-textColor">James Anderson</p>
                  <p className="text-textColor text-[12px]">2020 IMG</p>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus saepe fugit asperiores vero nulla animi iusto deleniti
                at explicabo, nostrum, veniam consectetur porro enim repudiandae
                odio dignissimos error itaque dolorem!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
