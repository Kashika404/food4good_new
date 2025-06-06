


import React from 'react';

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-16 sm:my-20 px-4'> {/* Main container */}
    
      <div className='text-stone-600 inline-flex items-center text-center gap-2 bg-white px-4 py-2 sm:px-6 sm:py-1 rounded-full border border-neutral-400 shadow-sm'>
        <p className='text-sm sm:text-base'>Fighting Food Waste, Together.</p>
      </div>

    
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold max-w-[300px] sm:max-w-[590px] md:max-w-[700px] mx-auto mt-8 sm:mt-10 leading-tight'>
        Link Surplus <span className='text-orange-400'>Food</span> to Local Needs {/* Changed to green for consistency */}
      </h1>

      <p className='text-center text-gray-700 text-base sm:text-lg max-w-xl lg:max-w-2xl mx-auto mt-5 sm:mt-6'>
        Our platform makes it simple for donors to give excess food, volunteers to lend a hand, and receivers to find vital nourishment – all within your local area.
      </p>

      
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 sm:mt-10'>
        <button
          className='bg-orange-400 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto'
        >
          Give Surplus Food
        </button>
        <button
          className='bg-orange-400 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto'
        >
          Get Food Support
        </button>
        <button
          className='bg-orange-400 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto'
        >
          Lend a Hand
        </button>
      </div> 

      
      <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200 w-full max-w-3xl mx-auto"> 
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center"> 
          Our Collective Impact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">1000+</p>
            <p className="text-sm text-gray-600">Meals Served</p>
          </div>
      
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">5 Tons</p>
            <p className="text-sm text-gray-600">Food Rescued</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">100+</p>
            <p className="text-sm text-gray-600">Active Volunteers</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-6 text-center"> 
          Powered by our amazing community of donors, partners, and volunteers. <a href="/about" className="text-green-600 hover:underline">Learn more</a>.
        </p>
      </div> 

    </div> 
  );
};

export default Header;

