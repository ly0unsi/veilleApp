import React from 'react'
import {
    SearchOutlined
} from '@ant-design/icons';
import PostTile from './postTile/PostTile';
const Websites = () => {
    return (
        <div className='overflow-y-scroll max-h-[470px] postTile pt-10'>

            <h2 className='text-xl font-medium'>Suivez vos sites Web préférés</h2>
            <div className='relative'>
                <span class="absolute left-0 top-[58%] text-gray-400 transform -translate-y-1/2 pl-3">
                    <SearchOutlined className='inline-flex text-xl' />
                </span>
                <input type="text"
                    className='pl-10 mt-2 p-4 focus:outline-none border border-blue-500 rounded-sm bg-transparent w-100'
                    placeholder='Recherche par sujet, site web' />
            </div>
            <PostTile />
        </div>
    )
}

export default Websites