// import React, { useContext } from 'react'
// import Home from './pages/Home'
// import {Routes,Route} from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Login from './components/Login'
// import { AppContext } from './context/AppContext'
// import DonorDash from './pages/DonorDash'


// const App = () => {
//   const{showLogin}=useContext(AppContext)
//   return (
//     <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 '>
     
//      {showLogin&&<Login/> }
//      <Navbar/>
//       <Routes>
        
//         <Route path='/' element={<Home/>}></Route>   
//         <Route path='/donor-dash' element ={<DonorDash/>}></Route>  
//       </Routes>
//       <Footer/>
      
//     </div>
//   )
// }

// export default App


import React, { useContext } from 'react';
import Home from './pages/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import DonorDash from './pages/DonorDash';
import ReceiverDash from './pages/ReceiverDash';
import VolunteerDash from './pages/VolunteerDash'; 
import ProfilePage from './pages/ProfilePage'; 
import SettingsPage from './pages/SettingsPage';

const App = () => {
  const { showLogin } = useContext(AppContext);
  const location = useLocation(); // Hook to get current path

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      {showLogin && <Login />}

      {/* Show Navbar only on the homepage */}
      {location.pathname === '/' && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/donor-dash' element={<DonorDash />} />
        <Route path='/receiver-dash' element={<ReceiverDash/>}/>
        <Route path="/volunteer-dash" element={<VolunteerDash />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} /> 
        
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
