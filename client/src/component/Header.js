import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logo } from '../assets'
import { isActiveStyles, isNotActiveStyles } from '../utils.js/style'
import { motion } from 'framer-motion';
import { buttonClick, slidetop } from '../animation'
import { MdShoppingCart } from '../assets/icons'
import { useDispatch, useSelector } from 'react-redux';
import { avatar } from '../assets';
import { Link } from 'react-router-dom';
import { MdLogout } from '../assets/icons'
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { setusernull } from '../context/actions/userAction';
import { setCartOn} from  '../context/actions/displayCartAction'



const Header = () => {

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [menu, setmenu] = useState(false);
  const firebaseAuth  =getAuth(app);
  const dispatch =useDispatch();
  const navigate = useNavigate()
 
  const signoutFunc =()=>
  {
     firebaseAuth.signOut().then(()=>{
            dispatch(setusernull());
            navigate('/login',{replace:true});
     })
  }
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6 ">
      <NavLink to="/" className="flex items-center justify-center gap-4 w-44 h-16 ">
        <img src={logo} alt="" className='w-full h-full' />
        {/* <p className='font-semibold text-xl'>1Billion</p> */}
      </NavLink>
      <nav className='flex items-center justify-center gap-8 '>
        <ul className='hidden md:flex items-center justify-center gap-5'>
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to="/menu">Menu</NavLink>
          {/* <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to="/services">Services</NavLink> */}
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to="/aboutus">About Us</NavLink>
        </ul>

        <motion.div {...buttonClick}  onClick={() =>{dispatch(setCartOn())}} 
         className='relative cursor-pointer'>
          <MdShoppingCart className='text-5xl text-textColor ' />
          { cart?.length >0 && (<div className='w-6 h-6  rounded-full bg-orange-500 items-center justify-center absolute -top-3 -right-1 '>
            <p className='text-primary text-base font-semibold text-center'>{cart?.length}</p>
          </div>)}     
        </motion.div>

        {
          user ? (<>
            <div className='relative cursor-pointer ' onMouseEnter={()=> setmenu(true)}>
              <div className=' rounded-full shadow-md cursor-pointer overflow-hidden bg-green-300 '>

                < motion.div {...buttonClick}
                  className=' w-12 h-12   rounded-full shadow-md bg-lightOverlay border  cursor-pointer flex items-center justify-center'>
                  <motion.img src={user.picture ? user?.picture : avatar}
                    whileHover={{ scale: 1.5 }} alt='profile_image'
                    referrerPolicy='no-referrer'
                    className='w-full h-full object-cover ' />
                </motion.div>
              </div>

              {
                menu &&

                (<motion.div  {...slidetop}
                onMouseLeave={()=>setmenu(false)} className=' px-3 py-3 w-48 bg-white shadow-md absolute top-12 right-0 flex flex-col gap-3'>
                  <Link to={'/dashboard/home'}
                    className='hover:text-orange-500 text-xl text-textColor'>
                    Dashboard
                  </Link>

                  <Link to={'/dashboard/myProfile'}
                    className='hover:text-orange-500 text-xl text-textColor'>
                    My Profile
                  </Link>

                  <Link to={'/dashboard/Order'}
                    className='hover:text-orange-500 text-xl text-textColor'>
                    order
                  </Link>
                  <hr />
                  <motion.div {...buttonClick} onClick={signoutFunc}
                    className=' flex items-center justify-center px-2 py-1 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3' >
                    <MdLogout className='text-2xl text-textColor group-hover:text-headingColor ' />
                    <p className='text-textColor text-base group-hover:text-headingColor'> Sign Out </p>
                  </motion.div>
                </motion.div>)
              }


            </div>



          </>)
            :
            (<>
              <NavLink to={'/login'}>
                <motion.button  {...buttonClick}
                  className='px-2 py-1 rounded-md shadow-md bg-lightOverlay border  border-orange-400 cursor-pointer'>
                  login
                </motion.button>

              </NavLink>

            </>)
        }

      </nav>
    </header >

  )
}

export default Header