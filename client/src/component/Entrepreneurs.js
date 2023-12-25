import { motion } from "framer-motion";
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import {buttonClick} from '../animation'


const Entrepreneurs = () => {
  return (
    <>
    <div>
      <div className="flex flex-col justify-start max-w-screen-md gap-6 py-4">
        <div className="text-4xl font-bold  ">
          Amazing{" "}
          <span className="text-orange-500"> Student Loyalty Program!</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex  justify-start  items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Topper's Reward</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Gift Vouchers</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Discount Coupons</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Purchase Points</p>
          </div>
        </div>

        <motion.button {...buttonClick}
          className='bg-gradient-to-bl max-w-fit from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'>
          Explore
        </motion.button>
      </div>
    </div>
    <div>
      <div className="flex flex-col justify-start max-w-screen-md gap-6 py-4">
        <div className="text-4xl font-bold  ">
          Marvellous{" "}
          <span className="text-orange-500"> Events & Programs!</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex  justify-start  items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Live Music Concerts</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Seniors Meetups</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Industry Leading Speakers Sessions</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Fun Activities & More</p>
          </div>
        </div>

        <motion.button {...buttonClick}
          className='bg-gradient-to-bl max-w-fit from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'>
          Explore
        </motion.button>
      </div>
    </div>
    <div>



      <div className="flex flex-col justify-start max-w-screen-md gap-6 py-4">
        <div className="text-4xl font-bold  ">
          1billion helps{" "}
          <span className="text-orange-500"> entrepreneurs!</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex  justify-start  items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Idea Generation</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Team Building</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Right Mentorship</p>
          </div>
          <div className="flex  justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500">
              <FcCheckmark className="text-xl p-[2px]" />
            </div>
            <p className=" text-2xl font-semibold">Turning Idea into Reality</p>
          </div>
        </div>

        <motion.button {...buttonClick}
          className='bg-gradient-to-bl max-w-fit from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'>
          Register Now
        </motion.button>
      </div>
    </div>
    
    </>
  );
};

export default Entrepreneurs;
