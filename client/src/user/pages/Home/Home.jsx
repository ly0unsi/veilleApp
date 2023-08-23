import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import HomeNav from '../../components/home/HomeNav'
import HomeContent from '../../components/home/homeContent/HomeContent'

const Home = () => {
  const user = useSelector((state) => state.auth.user)
  const [tab, settab] = useState("web")

  return (
    <div className='px-20'>
      <HomeNav settab={settab} tab={tab} />
      <HomeContent tab={tab} />
    </div>
  )
}

export default Home