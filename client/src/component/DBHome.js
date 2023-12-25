import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productAction';
import { CChart } from '@coreui/react-chartjs';

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const drinks = products?.filter((item)=> item.product_category ==="drinks");
  const deserts = products?.filter((item)=> item.product_category ==="deserts");
  const fruits = products?.filter((item)=> item.product_category ==="fruits");
  const chinese = products?.filter((item)=> item.product_category ==="chinese");
  const bread = products?.filter((item)=> item.product_category ==="bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full ">
        <div className="flex items-center justify-center">
          <div className='w-340 md:w-[600px] '>
            <CChart
              type="bar"
              data={{
                labels: ['Drinks', 'Deserts', 'Fruits', 'Bread', 'Chineses'],
                datasets: [
                  {
                    label:'Category wise Count',
                    backgroundColor: '#f87979', // Use a regular color value here
                    data: [drinks?.length, 
                      deserts?.length,
                      fruits?.length,
                      chinese?.length,
                      bread?.length]
                  },
                ],
              }}
              labels="months"
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: '#333',
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: '#eee',
                    },
                    ticks: {
                      color: '#333',
                    },
                  },
                  y: {
                    grid: {
                      color: '#eee',
                    },
                    ticks: {
                      color: '#333',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className='w-275 md:w-460'>
            <CChart
              type="doughnut"
              data={{
                labels: ['Orders', 'Delivered', 'Cancelled', 'Paid', 'NotPaid', ],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: '#333',
                    }
                  }
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
