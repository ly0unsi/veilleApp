import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './user/components/Navbar'
import Home from './user/pages/Home/Home'
import Login from './user/pages/auth/Login'
import Signup from './user/pages/auth/Signup'
import Forgotpassword from './user/pages/auth/Forgotpassword'
import ResetPassword from './user/pages/auth/ResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { getUser as getuserAction } from './user/actions/AuthAction'
import { ToastContainer } from 'react-toastify'
import EmailVerification from './user/pages/auth/EmailVerification'
import VerifyEmail from './user/pages/auth/VerifyEmail'
import Sidebar from './user/components/sidebar/Sidebar'



const HomeRoutes = () => {
    const isAuth = localStorage.getItem("userLogged")
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;
    const [showNav, setShowNav] = useState(true)

    useEffect(() => {
        dispatch(getuserAction(navigate))
        console.log(currentPath);
        if (currentPath.includes('email/notification') || currentPath.includes("verify-email")) {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }, [currentPath.length, isAuth])
    return (
        <div className="bg-slate-50 min-h-screen ">
            {
                showNav && <Navbar />
            }
            <div className="flex">
                {
                    isAuth == 1 && <div><Sidebar /></div>
                }

                <div className={`max-w-7xl mt-6 flex-1 px-2 overflow-y-auto ${isAuth == 1 ? "ml-[306px]" : "m-auto"} `}>
                    <Routes>
                        <Route path="/" element={isAuth == 1 ? <Home /> : <Navigate to='/login' />} />
                        <Route path="/login" element={isAuth == 0 ? <Login /> : <Navigate to='/' />} />
                        <Route path="/signup" element={!isAuth == 0 ? <Signup /> : <Navigate to='/' />} />
                        <Route path="/forgot" element={!isAuth == 0 ? <Forgotpassword /> : <Navigate to='/' />} />
                        <Route path="/email/notification" element={<EmailVerification />} />
                        <Route path="/verify-email/:id" element={<VerifyEmail />} />
                        <Route path="/password-reset/:token" element={!isAuth == 0 ? <ResetPassword /> : <Navigate to='/' />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default HomeRoutes