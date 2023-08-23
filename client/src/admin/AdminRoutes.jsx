import React, { useEffect } from 'react'
import { AppSidebar, AppFooter, AppHeader } from './components/index'
import Dashboard from './pages/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import './assets/scss/style.scss'
import Demandes from './pages/Users/demandes/Demandes'
import { useDispatch, useSelector } from 'react-redux'
import { getUser as getuserAction } from '../user/actions/AuthAction'

import Login from '../user/pages/auth/Login'
import Signup from '../user/pages/auth/Signup'



const AdminRoutes = () => {
    const isAuth = localStorage.getItem("adminLogged")
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getuserAction())
    }, [user.firstname])
    return (
        <div>
            {
                isAuth == 1 && <AppSidebar />
            }

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {
                    isAuth == 1 && <AppHeader />
                }
                <div className={`body flex-grow-1 px-3 ${isAuth == 0 && "md:mt-28 mt-10"}`}>
                    <Routes>
                        <Route path="/" element={isAuth == 1 ? <Dashboard /> : <Navigate to='/admin/login' />} />
                        <Route path="/login" element={isAuth == 0 ? <Login mode='admin' /> : <Navigate to='/admin' />} />
                        <Route path="/signup" element={!isAuth == 0 ? <Signup /> : <Navigate to='/admin' />} />
                        <Route path="/user/demandes" element={isAuth == 1 ? < Demandes /> : <Navigate to='/admin/login' />} />
                    </Routes>
                </div>
                {
                    isAuth == 1 && <AppFooter />
                }
            </div>
        </div>
    )
}

export default AdminRoutes
