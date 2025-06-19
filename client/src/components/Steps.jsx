import React from 'react'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-32'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Connecting Food, Connecting People</h1>
      <div>
        <div className='space-y-4 w-full max-w-3xl text-sm '>
            <div className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-sm border-gray-100 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                <h2 className='text-xl font-medium'>Connect & Share</h2>
                <p className='text-gray-500'>Whether you're a donor with surplus food, a volunteer ready to help, or someone seeking food assistance, our platform makes it easy to list, find, and offer support.</p>
            </div>
            <div className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-sm  border-gray-100 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                <h2 className='text-xl font-medium'>Coordinate & Act</h2>
                <p className='text-gray-500'>Our system efficiently matches needs with resources, facilitating clear communication and logistics for food pickups and deliveries within your local community.</p>
            </div>
            <div className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-sm border-gray-100 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg '>
                <h2 className='text-xl font-medium'>Impact & Nourish </h2>
                <p className='text-gray-500'>Witness the direct impact as good food reaches those who need it, reducing waste, nourishing lives, and strengthening our community bonds.</p>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Steps
