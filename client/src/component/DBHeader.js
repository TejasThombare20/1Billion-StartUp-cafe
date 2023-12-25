import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, BsToggles2, BsFillBellFill, MdLogout } from '../assets/icons'
import { motion } from 'framer-motion';
import { buttonClick } from '../animation';
import { avatar } from '../assets';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import {  setusernull } from '../context/actions/userAction';





const DBHeader = () => {
    const user = useSelector((state) => state.user);
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    const signoutFunc = () => {
        firebaseAuth.signOut().then(() => {
            dispatch(setusernull());
            navigate('/login', { replace: true });
        })
    }
    return (
        <div className='w-full flex items-center justify-between  gap-3'>
            <p className=' text-2xl text-headingColor  px-12'>Welcome to 1Billion
                {user?.name && <span className='block text-base text-gray-500'>{` Hello ${user?.name}...!`}</span>}
            </p>

            <div className='flex items-center justify-center gap-4 '>
                <div className='flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md '>
                    <MdSearch className='text-gray-400 text-2xl' />
                    <input type="text" placeholder='Search Here...' className='border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor' />
                    <BsToggles2 className='text-gray-400 text-2xl' />

                </div>

                <motion.div {...buttonClick}
                    className='w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex  items-center justify-center   ' >
                    <BsFillBellFill className='text-gray-400 text-xl' />
                </motion.div>

                    < motion.div {...buttonClick}
                        className=' w-12 h-12   rounded-full shadow-md bg-lightOverlay border  cursor-pointer flex items-center justify-center'>
                           
                        <motion.img src={user.picture ? user?.picture : avatar}
                            whileHover={{ scale: 1.5 }} alt='profile_image'
                            referrerPolicy='no-referrer'
                            className='w-full h-full object-cover ' />
                    </motion.div>
              

                <motion.div {...buttonClick} onClick={signoutFunc}
                    className=' flex items-center justify-center px-2 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3' >
                    <MdLogout className='text-2xl text-textColor group-hover:text-headingColor ' />
                    <p className='text-textColor text-base group-hover:text-headingColor'></p>
                </motion.div>

            </div>
        </div>
    )
}

export default DBHeader