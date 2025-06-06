import React,{useContext} from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Navbar = () => {
   const { user ,setShowLogin} = useContext(AppContext);
   
  
  return (
    <div className="flex items-center justify-between pt-4 px-4">
      <Link to='/'><img src={logo} alt="Logo" className="h-16 w-16 rounded-full object-cover" /></Link>
      <h1 className="ml-4 text-xl font-semibold">
        Food<span className="text-orange-400">4</span>Good
      </h1>
       <div className="flex items-center gap-2 sm:gap-5 ">
          {
            !user && (
             <button  onClick={()=>setShowLogin(true)} className='bg-orange-400 px-7 py-2 sm:px-10 text-sm rounded-full text-white'>Login</button>
            )
          }
        </div>
    </div>
  );
};

export default Navbar;

