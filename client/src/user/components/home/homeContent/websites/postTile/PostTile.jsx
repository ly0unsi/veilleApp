import React from 'react'
import PostItem from './PostItem'

const PostTile = () => {
    const posts = [1, 2, 3, 4, 5, 6]
    return (
        <div className=''>
            {
                posts.map(post => (
                    <PostItem />
                ))
            }
        </div>
    )
}

export default PostTile