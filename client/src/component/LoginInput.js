import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from '../animation';


const LoginInput = ({ placeholder, icon, type, isSignUp, inputState, inputstateFunc }) => {

  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div {...fadeInOut}
      className={`flex items-center justify-center gap-6 bg-lightOverlay backdrop-blur-md rounded-md w-full  py-2 px-2 my-2  ${isFocus ? "shadow-lg shadow-red-400" : "shadow-none"}  `} >
      {icon}
      <input type={type}
        placeholder={placeholder}
        className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'
        value={inputState}
        onChange={(e) => inputstateFunc(e.target.value)}
        onFocus={() => { setIsFocus(true) }}
        onBlur={() => { setIsFocus(false) }}
      />
    </motion.div>
  )
}

export default LoginInput 