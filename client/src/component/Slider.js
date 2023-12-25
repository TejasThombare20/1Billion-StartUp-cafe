import React, { useEffect, useState } from 'react';
import {  Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import '../assets/css/swiperStyle.css';
import { getAllProducts } from '../api'
import { useSelector } from 'react-redux';
import { SliderCart } from '../component'

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    // console.log(fruits);

  }, [products])

  // const [product, setProducts] = useState([]);
  // useEffect(() => {
  //   // Fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const data = await getAllProducts();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setProducts([]);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // // Filter the products based on the specific category
  // const filteredProducts = product.filter((product) => product.product_category === "fruits");
  // console.log(filteredProducts);
  return (
    <div className='w-full pt-24'>
      <Swiper
        centeredSlides={false}
        className='swiper'
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}

      >
        {fruits && fruits.map((data,i)=><SwiperSlide>
            <SliderCart key ={i} data={data} index={i} />
            </SwiperSlide>)}
        {/* {filteredProducts && filteredProducts.map((data, i) => <SwiperSlide key={i}>  <SliderCart key={i} data={data} index={i} /> </SwiperSlide>)} */}
      </Swiper>
    </div>
  );
};

export default Slider;
