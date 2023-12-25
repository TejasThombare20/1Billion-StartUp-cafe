import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/orderaction";
import OrdersData from "./OrdersData";

const UserOrder = () => {

    const user = useSelector((state)=> state.user) 
    const orders = useSelector((state)=>state.orders)
    const [userOrders, setuserOrders] = useState(null)
    const dispatch = useDispatch();

      
    useEffect(()=>{
        if(!orders){
            getAllOrder().then((data)=>{
                dispatch(setOrders(data));
            })
        }else{ 
            setuserOrders(orders.filter(data=>data.userId === user?.user_id))
        }
    },[orders])

  return (
    <main className="w-screen min-h-screen flex flex-col  justify-start items-center bg-primary ">
      <Header  />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-20 2xl:px-96 gap-12 pb-24 ">
      { 
        userOrders?.length > 0 ? (userOrders.map((item , i)=>(
            <OrdersData key={i} index={i} data={item} admin={false}/>
          ))) : (<h1 className="text-[72px] text-headingColor font-bold ">No Data </h1>)
        }
      </div>
    </main>
  );
};

export default UserOrder;
