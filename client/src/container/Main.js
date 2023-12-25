import React, { useEffect } from 'react'
import {Header,Home,HomeSlider,FilterSection,Cart,EntrepreneursBlock,Testimonials,Footer} from '../component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productAction'



const Main = () => {
   const product = useSelector ((state)=>state.products);
   const isCart =  useSelector ((state)=>state.isCart)
   const dispatch = useDispatch();

   useEffect(()=>{
    if(!product){
      getAllProducts().then((data)=>{
        dispatch(setAllProducts(data))
      })
    }
   },[])
  return (
    <main className='w-screen min-h-screen flex flex-col  justify-start items-center bg-primary '>
      <Header/>
      <div className='w-full flex flex-col items-start justify-center mt-40 px-6 md:px-20 2xl:px-96 gap-12 pb-24 ' >
        <Home/>
        <FilterSection/>
        {/* <HomeSlider/> */}
        <EntrepreneursBlock/>
        <Testimonials/>
        <Footer/>
      </div>
      {isCart && <Cart/>}

      


    </main>
  ) 
}

export default Main