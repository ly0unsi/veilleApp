import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthApi from '../api/AuthApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../slices/AuthSlice'
import { Avatar, Dropdown } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
    const loggedIn = localStorage.getItem("userLogged")
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const symbol = user.firstname ? user.firstname[0] : ""
    const navigate = useNavigate()

    const handleLogout = async () => {
        await AuthApi.csrf()
        await AuthApi.logout()
        localStorage.setItem("userLogged", 0);
        localStorage.setItem("adminLogged", 0);
        dispatch(setUser({}))
        navigate('/login')
    }
    const items = [
        {
            label: <a aria-current="page"> Profile </a>,
            key: '0',
            icon: <UserOutlined />,
        },
        {
            label: <a onClick={handleLogout} aria-current="page"> Se deconnecter </a>,
            key: '1',
            icon: <LogoutOutlined />,
        }

    ];
    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IHM</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        {
                            loggedIn == 0 ? (
                                <>
                                    <li>
                                        <Link to="/login" className='block py-2 pl-3 pr-4 text-white rounded '
                                            aria-current="page"> Se connecter </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className='block py-2 pl-3 pr-4 text-white rounded '
                                            aria-current="page"> S'inscrire </Link>
                                    </li>
                                </>

                            ) : (<>
                                {/* <li>
                                    <Link to="/" className='block py-2 pl-3 pr-4 text-white rounded '
                                        aria-current="page"> Accueil </Link>
                                </li> */}

                                <li>
                                    <Dropdown
                                        placement="bottom"
                                        menu={{
                                            items,
                                        }}
                                        trigger={['click']}
                                    >
                                        <a className='cursor-pointer pb-3' onClick={(e) => e.preventDefault()}>

                                            <Avatar
                                                style={{
                                                    backgroundColor: '#0d7cf9',
                                                    verticalAlign: 'middle',
                                                }}
                                                size="large"
                                                gap={2}
                                            >
                                                {symbol}
                                            </Avatar>

                                        </a>
                                    </Dropdown>

                                </li>
                            </>)
                        }


                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar