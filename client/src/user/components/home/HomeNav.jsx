import React from 'react'
import {
    GlobalOutlined,

    RedditOutlined,

    MailOutlined

} from '@ant-design/icons';
const HomeNav = ({ settab, tab }) => {
    const handleSetTab = (tab) => {
        settab(tab)
    }
    return (
        <div className='mx-auto border-b-2 border-gray-200 '>
            <ul className='list-none flex gap-10 text-xl font-normal text-gray-500'>
                <li onClick={() => handleSetTab("web")} className={`pb-2 cursor-pointer  ${tab == "web" ? 'border-b-2 border-blue-500 text-blue-500' : "hover:border-b-2 hover:border-gray-400"}`}><span className={`${tab == "web" ? "text-blue-500 " : "text-gray-500"} `}><GlobalOutlined className='inline-flex' /> </span>Web </li>
                <li onClick={() => settab("reddit")} className={`pb-2 cursor-pointer   ${tab == "reddit" ? 'border-b-2 border-blue-500 text-blue-500' : "hover:border-b-2 hover:border-gray-400"}`}><span className={`${tab == "reddit" ? "text-blue-500 " : "text-gray-500"} `}><RedditOutlined className='inline-flex' /> </span>Reddit</li>
                <li><span className={` cursor-pointer  ${tab == "dd" && 'border-b-4 border-blue-500 text-blue-500'}`}><MailOutlined className='inline-flex' /> </span>Twiter</li>
            </ul>
        </div>
    )
}

export default HomeNav