import React from 'react'

const PostItem = () => {
    return (
        <div className='flex mt-2 cursor-pointer'>
            <div className='w-1/4 '>
                <img className='img-fluid rounded-md bg-cover' src="https://kinsta.com/wp-content/uploads/2022/06/what-is-react-js-feature-image-1024x512.png" alt="" />
            </div>
            <div className='w-3/4 ml-2'>
                <h4 className='text-xl font-semibold'>Titre</h4>
                <span>Andrew / Hubspot</span>
                <p className='text-gray-500'>Description</p>
            </div>

        </div>
    )
}

export default PostItem