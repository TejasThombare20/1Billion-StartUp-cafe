import React, { useEffect } from 'react';
import {  logo } from '../assets/.'
import backgroundImg from '../assets/Album/Bg.jpg'
import { LoginInput } from '../component';
import { useState } from 'react';
import { FaEnvelope, FaLock } from '../assets/icons/';
import { motion } from 'framer-motion';
import { buttonClick } from '../animation';
import { FcGoogle } from '../assets/icons/';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../config/firebase.config'
import { validateUserJWTToken } from '../api';
import { useNavigate , NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setuserDetails } from '../context/actions/userAction';
import { alertInfo, alertWarning } from '../context/actions/alertAction';





const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const alert  = useSelector((state)=>state.alert);

    useEffect(()=> {
        if (user){
            navigate("/",{replace : true});
        }

    },[user])


    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
                if (cred) {
                    cred.getIdToken().then(token => {
                        validateUserJWTToken(token).then((data) => {
                            dispatch(setuserDetails(data))
                        })
                        navigate("/", { replace: true })
                    })
                }
            })
        })
    }

    const signupWithEmailandPass = async () => {
        if (userEmail === "" || password === "" || confirmpassword === "") {
            dispatch(alertInfo("Required fields shold not empty"));
        }
        else {
            if (password === confirmpassword) {
                setUserEmail("");
                setPassword("");
                setconfirmPassword("");
                await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then(userCred => {
                    firebaseAuth.onAuthStateChanged((cred) => {
                        if (cred) {
                            cred.getIdToken().then(token => {
                                validateUserJWTToken(token).then((data) => {
                                    dispatch(setuserDetails(data))
                                })
                            })
                        }
                    })
                })
            }
            else {
                dispatch(alertWarning("password does not match"));
            }
        }
    }

    const signInWithEmailAndPass = async () => {

        if (userEmail !== "" || password !== "") {
            await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
                firebaseAuth.onAuthStateChanged((cred) => {
                    if (cred) {
                        cred.getIdToken().then(token => {
                            validateUserJWTToken(token).then((data) => {
                                dispatch(setuserDetails(data))
                            })
                            navigate("/", { replace: true });
                        })
                    }
                })
            });
        }
        else {

        }


    }


    return (
        <div className='  w-screen h-screen relative overflow-hidden flex '>

            <img src={backgroundImg} alt="" className='w-full h-full object-cover absolute top-0 left-0 ' />
            <div className='flex flex-col  items-center bg-lightOverlay w-[80%] md:w-[300px] h-full z-10 backdrop-blur-md p-2  md:p-4 py-4 px-2 '>
                {/* logo with name */}
                <div className='flex items-center justify-center gap-6 w-full '>
                    <div  className='h-14 w-40'
                     {...buttonClick} >
                        <NavLink 
                        to={'/'}>
                        <img src={logo} alt="" className='w-full h-full' />
                        </NavLink>
                    </div>
                    {/* <p className='text-headingColor font-bold text-xl'><span className='text-red-600 text-3xl'>1</span>Billion- The Startup CAFE</p> */}
                </div>
                {/* Welcome text */}
                <p className=' font-semibold text-headingColor text-lg mt-3 '>Welcome Back</p>
                <p className=' font-semibold text-headingColor text-md my-2 '>{isSignUp ? "Sign Up" : "Sign in"}</p>

                {/* input Section */}
                <div className='w-full flex flex-col items-center justify-center gap-4'>
                    <LoginInput placeholder={"Email"}
                        icon={<FaEnvelope className='text-xl text-textColor' />}
                        inputState={userEmail}
                        inputstateFunc={setUserEmail}
                        type="email"
                        isSignUp={isSignUp} />

                    <LoginInput placeholder={"Password"}
                        icon={<FaLock className='text-xl text-textColor' />}
                        inputState={password}
                        inputstateFunc={setPassword}
                        type="password"
                        isSignUp={isSignUp} />

                    {isSignUp && (
                        <LoginInput placeholder={" Confirm Password "}
                            icon={<FaLock className='text-xl text-textColor' />}
                            inputState={confirmpassword}
                            inputstateFunc={setconfirmPassword}
                            type="password"
                            isSignUp={isSignUp} />
                    )}

                    {!isSignUp ? (
                        <p>
                            Doesn't have an account{" "}
                            < motion.button {...buttonClick} className=' text-red-600 cursor-pointer bg-transparent font-bold'
                                onClick={() => setIsSignUp(true)}>
                                Create one
                            </motion.button>
                        </p>
                    ) : (
                        <p>
                            Already have an account{" "}
                            < motion.button {...buttonClick} className=' text-red-600 cursor-pointer bg-transparent font-bold text-sm'
                                onClick={() => setIsSignUp(false)}>
                                Sign-in here
                            </motion.button>
                        </p>
                    )}

                    {/* buttion Section */}
                    {isSignUp ? (<motion.button {...buttonClick}
                        className='w-full rounded-md py-1 bg-red-600  cursor-pointer text-white capitalize hover:bg-red-700  transition-all duration-150'
                        onClick={signupWithEmailandPass}>

                        SignUp
                    </motion.button>)
                        :
                        (<motion.button {...buttonClick}
                            className='w-full rounded-md py-1 bg-red-600  cursor-pointer text-white capitalize hover:bg-red-700  transition-all duration-150'
                            onClick={signInWithEmailAndPass}>
                            SignIn
                        </motion.button>)
                    }
                </div>

                <div className='flex justify-between items-center gap-6 my-4'>
                    <div className='w-24 h-[1px] bg-white'></div>
                    <p>or</p>
                    <div className='w-24 h-[1px] bg-white'></div>
                </div>

                <motion.div {...buttonClick} onClick={loginWithGoogle}
                    className='flex items-center justify-center bg-lightOverlay backdrop-blur-md cursor-pointer rounded-md gap-4 my-2 px-2 py-2 w-full'>

                    <FcGoogle className='text-2xl' />
                    <p className='capitalize text-base font-semibold '>Signin with Google</p>


                </motion.div>




            </div>
        </div>
    )
}

export default Login