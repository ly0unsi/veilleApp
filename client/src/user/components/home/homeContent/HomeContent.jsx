import React from 'react'
import Websites from './websites/Websites'
import Reddit from './reddit/Reddit'

const HomeContent = ({ tab }) => {
    return (
        <div className=''>
            {
                tab == "web" ? <Websites /> : tab == "reddit" && <Reddit />
            }
        </div>
    )
}

export default HomeContent