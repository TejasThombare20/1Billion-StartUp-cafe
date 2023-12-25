import './App.css';
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Main } from './container';
import { useEffect, useState } from 'react';
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { getAllCartItems, validateUserJWTToken } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setuserDetails } from './context/actions/userAction';
import { motion } from 'framer-motion';
import { fadeInOut } from './animation';
import { CheckoutSuccess, MainLoader,Menu } from './component';
import {Alert} from './component';
import { setCartItems } from './context/actions/cartActions';
import UserOrder from './component/UserOrder';



function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state)=>state.alert)

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then(token => {
          validateUserJWTToken(token).then((data) => {
            getAllCartItems(data.user_id).then((items)=>{
              
              dispatch(setCartItems(items))
            })
            dispatch(setuserDetails(data))
          })

        });
      }
      setInterval(() => {
        setIsLoading(false)
      }, 2000)
    });

  }, [])


  return (
    <div className=' w-screen min-h-screen h-auto flex flex-col items-center justify-center '>
      {isLoading &&
        (<motion.div {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
           <MainLoader/>
        </motion.div>)

      }
      <Routes> 
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/user-order' element={<UserOrder/>} />
        


      </Routes>
        {alert?.type &&( <Alert type={alert?.type} message={alert?.message}/>)}
    </div>
  );
}

export default App;
