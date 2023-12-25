import React from 'react'
import Menulist1 from '../assets/Album/BillionsMenu1.png'
import Menulist2 from '../assets/Album/BillionsMenu2.png'
import {Header} from '../component'

const Menu = () => {
  return (

    <div className='w-full px-1 py-2'> 
      <Header/>
     <div className='w-screen '>
      <img className=' w-full pt-20 pb-1' src={Menulist1} alt="" />
     </div>
     <div>
      <img src={Menulist2} alt="" />
     </div>
    </div>
  )
}

export default Menu