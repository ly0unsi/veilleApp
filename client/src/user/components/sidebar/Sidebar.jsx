import React, { useEffect, useState } from 'react'
import './sidebar.css'
import {
    AppstoreOutlined,
    MenuOutlined,
    DesktopOutlined,
    DownOutlined, RightOutlined,
    MailOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);
    const [activeNav, setactiveNav] = useState("search")
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const handleShowSideBar = () => {
        setshowSideBar(!showSideBar);
    };
    const handleHideSideBar = () => {
        setshowSideBar(0);
    };
    const [showSideBar, setshowSideBar] = useState(-1)
    useEffect(() => {
        if (location.pathname == "/") setactiveNav("search")
        else setactiveNav('other')
    }, [location.pathname.length])

    return (
        <div
            className='h-screen  flex fixed'
        >

            <div className='bg-white p-2 flex flex-col h-full gap-3 text-xl z-50 pt-3  w-[50px]'>
                <AppstoreOutlined />
                <MenuOutlined onClick={() => {
                    (showSideBar == 0 || showSideBar == -1) ? handleShowSideBar() : showSideBar == 1 && handleHideSideBar()
                }} />
                <SearchOutlined className={`mt-[50px] cursor-pointer ${activeNav == "search" && "text-blue-500"}`} />
            </div>

            <div className={`animate__animated pt-2 ${showSideBar == 1 ? 'animate__slideInLeft' : showSideBar == 0 && 'animate__slideOutLeft'} bg-slate-200 w-[256px] animate__fast`}>
                <ul className='list-none font-medium text-zinc-900'>
                    <li className='flex pl-7 cursor-pointer hover:bg-slate-300 transition-all duration-75 items-center gap-2'><span className='text-gray-400 text-lg'><AppstoreOutlined className='inline-flex' /> </span> Today </li>
                    <li className='flex pl-7 cursor-pointer mt-2 hover:bg-slate-300 transition-all duration-75 items-center gap-2'><span className='text-gray-400 text-lg'><MailOutlined className='inline-flex' /> </span> Read later </li>
                    <li className='text-gray-400 mt-10 font-normal ml-7'>FEEDS</li>
                    <li className='flex pl-7 cursor-pointer mt-2 hover:bg-slate-300 transition-all duration-75 items-center gap-2'><span className='text-gray-400 text-lg'><DesktopOutlined className='inline-flex' /> </span> All </li>

                    <li onClick={toggleCollapsed} className='flex pl-7 pr-2 cursor-pointer hover:bg-slate-300 transition-all duration-75 mt-2 items-center gap-2'>


                        <span onClick={toggleCollapsed} className='cursor-pointer text-lg  text-gray-400'>
                            {
                                collapsed ?
                                    <RightOutlined className='inline-flex' />
                                    :
                                    <DownOutlined className='inline-flex' />
                            }
                        </span>



                        Tech

                    </li>
                    {
                        !collapsed && <ul className='list-none font-medium text-zinc-900'>
                            <li className='cursor-pointer flex pl-[19%] hover:bg-slate-300 transition-all duration-75 items-center gap-2'><span className='text-gray-400 text-lg'><AppstoreOutlined className='inline-flex' /> </span>
                                Compy Blogger
                            </li>
                            <li className='cursor-pointer flex pl-[19%] hover:bg-slate-300 transition-all duration-75 mt-2 items-center gap-2'><span className='text-gray-400 text-lg'><AppstoreOutlined className='inline-flex' /> </span>
                                Hub Spot
                            </li>
                        </ul>
                    }


                </ul>
            </div>


        </div>
    )
}

export default Sidebar