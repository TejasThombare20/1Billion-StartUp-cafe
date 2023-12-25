import React from "react";
import { footerBG } from "../assets";
import { logo, Twitter, Instagram, facebook, Linkedin } from "../assets";
import { BsInstagram  } from 'react-icons/bs'
import { FaFacebookSquare } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { BsTwitter } from 'react-icons/bs'

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-[350px] py-10 relative overflow-hidden flex  ">
      {/* <img
        src={footerBG}
        alt=""
        className="w-full h-full object-cover absolute top-0 left-0  hidden md:inline "
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 z-10 font-semibold">
        <div className=" flex flex-col items-start justify-start gap-5 ">
          <div className=" h-12 w-30 ">
            <img className="h-full w-full" src={logo} alt="" />
          </div>
          {/* <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            delectus neque, consectetur ab eos debitis voluptatem assumenda nemo
            quasi consequuntur!
          </div> */}
          <div className=" w-full flex justify-start items-center gap-2">
            <div >
              <a  href="">
                {" "}
                <BsInstagram size={25}/>
              </a>
            </div>
            <div >
              <a  href="">
                {" "}
                <FaFacebookSquare size={25}/>
              </a>
            </div>
            <div >
              <a  href="">
                {" "}
                <ImLinkedin size={25}/>
              </a>
            </div>
            <div>
              <a  href="">
                {" "}
                <BsTwitter size={25}/>
              </a>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-5 ">
          <div className="flex gap-2 justify-start items-center">
            <p className="text-xl font-semibold">Contact Info</p>
            <p className="text-orange-500 h-4 w-8 "></p>
          </div>

          <p>+91-9588771635</p>
          <a href="mailto:kuldeepmangla2002@gmail.com"
          >
            {" "}
            kuldeepmangla2002@gmail.com{" "}
          </a>
          <p>ABV-IIITM Gwalior, MP</p>
          <p>Pin - 474015</p>
        </div>

        <div className="  flex flex-col items-start justify-start gap-5  ">
          <p className="font-bold text-xl"> Opening Hour </p>
          <p>11:00 AM - 10:00 PM </p>
          <p>Monday - Sunday</p>
        </div>
        <div className="flex flex-col items-start justify-start gap-5 ">
         <p>Terms And Conditon</p> 
          <p>Privacy Policy</p>
          <p>Return & Refund Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
