import React from 'react'
import HomeComponet from '../../components/common/Home'
import CusNavBar from '../../components/common/CusNavBar'
import '../../pages/sandeep/customerRelationship.css'

function Home() {
  return (
    <>
    <CusNavBar/>
    <div className='customerHome'>
        <div>Home</div>
        <HomeComponet />
        </div>
    </>
  )
}

export default Home