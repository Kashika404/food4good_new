import React from 'react'
import image from '../assets/image.png';

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Our Mission</h1>
     <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
       <img src={image} className='w-80 xl:w-96 rounded-lg'/>
        <div>
            <p className='text-gray-600 my-7 mb-4'>At Food4Good, our mission is to cultivate a resilient and compassionate community where no individual goes hungry and no good food is wasted. We are dedicated to bridging the gap between food surplus and food scarcity by providing an innovative, user-friendly platform. This technology empowers local businesses, individuals, and a passionate network of volunteers to easily and efficiently redirect excess food to those who need it most, thereby fostering environmental sustainability, nourishing lives, and strengthening the fabric of our community one connection at a time.</p>
        </div>
     </div>
    </div>
  )
}

export default Description
