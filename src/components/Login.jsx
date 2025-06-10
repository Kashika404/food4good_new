// import React, { useContext, useEffect, useState } from 'react';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';

// const Login = () => {
//   const [state, setState] = useState('Login');
//   const [selectedRole, setSelectedRole] = useState('');
//   const { setShowLogin } = useContext(AppContext);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, []);

//   return (
//     <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
//       <form className='relative bg-white p-10 rounded-xl text-slate-500'>
//         <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
//         <p className='text-sm'>Welcome back! Please sign in to continue</p>

//         {/* Sign Up Section */}
//         {state !== 'Login' && (
//           <>
//             {/* Role Dropdown */}
//             <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
//               <label className='text-sm'>Role:</label>
//               <select
//                 required
//                 className='outline-none text-sm bg-transparent w-full text-slate-500'
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 <option value="" disabled>Select Role</option>
//                 <option value="Donor">Donor</option>
//                 <option value="Receiver">Receiver</option>
//                 <option value="Volunteer">Volunteer</option>
//               </select>
//             </div>

//             {/* Conditional Sub-role Dropdown */}
//             {selectedRole === 'Donor' && (
//               <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//                 <label className='text-sm'>Donor Type:</label>
//                 <select required className='outline-none text-sm bg-transparent w-full'>
//                   <option value="" disabled selected>Select Donor Type</option>
//                   <option value="Individual">Individual</option>
//                   <option value="Restaurant">Restaurant</option>
//                 </select>
//               </div>
//             )}

//             {selectedRole === 'Receiver' && (
//   <>
//     <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//       <label className='text-sm'>Receiver Type:</label>
//       <select required className='outline-none text-sm bg-transparent w-full'>
//         <option value="" disabled selected>Select Receiver Type</option>
//         <option value="Old Age Home">Old Age Home</option>
//         <option value="NGO">NGO</option>
//         <option value="Orphanage">Orphanage</option>
//       </select>
//     </div>

//     {/* Additional Input for Organization Name */}
//     <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//       <label className='text-sm'>Organization:</label>
//       <input
//         type="text"
//         className='outline-none text-sm bg-transparent w-full'
//         placeholder='Organization Name'
//         required
//       />
//     </div>
//   </>
// )}


//             {selectedRole === 'Volunteer' && (
//               <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//                 <label className='text-sm'>Volunteer Role:</label>
//                 <select required className='outline-none text-sm bg-transparent w-full'>
//                   <option value="" disabled selected>Select Volunteer Role</option>
//                   <option value="Pickup Agent">Pickup Agent</option>
//                   <option value="Delivery Agent">Delivery Agent</option>
//                   <option value="Coordinator">Coordinator</option>
//                 </select>
//               </div>
//             )}

//             {/* Full Name */}
//             <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//               <img src={assets.user_icon} alt="user" />
//               <input type="text" className='outline-none text-sm' placeholder='Full Name' required />
//             </div>
//           </>
//         )}

//         {/* Email */}
//         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//           <img src={assets.email_icon} alt="email" />
//           <input type="email" className='outline-none text-sm' placeholder='Email id' required />
//         </div>

//         {/* Password */}
//         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//           <img src={assets.lock_icon} alt="lock" />
//           <input type="password" className='outline-none text-sm' placeholder='Password' required />
//         </div>

//         <p className='text-sm text-orange-400 my-4 cursor-pointer'>Forgot password?</p>

//         {/* Submit Button */}
//         <button className='bg-orange-400 w-full text-white py-2 rounded-full'>
//           {state === 'Login' ? 'login' : 'create account'}
//         </button>

//         {/* Toggle Login/Sign Up */}
//         {state === 'Login' ? (
//           <p className='mt-5 text-center'>
//             Don't have an account?{' '}
//             <span className='text-orange-400 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span>
//           </p>
//         ) : (
//           <p className='mt-5 text-center'>
//             Already have an account?{' '}
//             <span className='text-orange-400 cursor-pointer' onClick={() => setState('Login')}>Login</span>
//           </p>
//         )}

//         {/* Close Icon */}
//         <img
//           onClick={() => setShowLogin(false)}
//           src={assets.cross_icon}
//           className='absolute top-5 right-5 cursor-pointer'
//           alt="close"
//         />
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [state, setState] = useState('Sign Up'); // Default to Sign Up for easier testing
  
  // Get what we need from context
  const { setShowLogin, setUser } = useContext(AppContext);
  
  // Initialize the navigate function for redirection
  const navigate = useNavigate();

  // --- State for all form inputs ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  // Sub-role states
  const [donorType, setDonorType] = useState('');
  const [receiverType, setReceiverType] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // --- Helper function for redirection ---
  const redirectToDashboard = (role) => {
    // We use lowercase for routing consistency
    switch (role.toLowerCase()) {
        case 'donor':
            navigate('/donor-dash');
            break;
        case 'receiver':
            navigate('/receiver-dash');
            break;
        case 'volunteer':
            navigate('/volunteer-dash');
            break;
        default:
            navigate('/'); // Fallback to home page
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (state === 'Sign Up') {
        if (!selectedRole) {
            alert("Please select your primary role to continue.");
            return;
        }
        
        // This simulates a successful backend registration.
        // 1. Create a user object with the data from the form.
        const newUserData = {
            fullName,
            email,
            role: selectedRole,
            // You can add sub-role data here too if needed
            details: {
                donorType,
                receiverType,
                volunteerRole,
                organizationName,
            }
        };

        // 2. Set this new user as the currently logged-in user in the app's context.
        setUser(newUserData); 
        
        // 3. Close the login modal.
        setShowLogin(false); 
        
        // 4. Redirect to the correct dashboard based on the selected role.
        redirectToDashboard(selectedRole);

    } else { // Login logic
        // In a real app, you'd call an API. Here we just show a placeholder.
        alert("Login functionality would be handled here.");
    }
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      {/* Attach the handleSubmit function to the form's onSubmit event */}
      <form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {/* Sign Up Section */}
        {state !== 'Login' && (
          <>
            {/* Role Dropdown */}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <label className='text-sm'>Role:</label>
              <select
                required
                className='outline-none text-sm bg-transparent w-full text-slate-500'
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="" disabled>Select Role</option>
                <option value="Donor">Donor</option>
                <option value="Receiver">Receiver</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            {/* Conditional Sub-role Dropdown */}
            {selectedRole === 'Donor' && (
              <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <label className='text-sm'>Donor Type:</label>
                <select required className='outline-none text-sm bg-transparent w-full' value={donorType} onChange={e => setDonorType(e.target.value)}>
                  <option value="" disabled>Select Donor Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
              </div>
            )}

            {selectedRole === 'Receiver' && (
              <>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                  <label className='text-sm'>Receiver Type:</label>
                  <select required className='outline-none text-sm bg-transparent w-full' value={receiverType} onChange={e => setReceiverType(e.target.value)}>
                    <option value="" disabled>Select Receiver Type</option>
                    <option value="Old Age Home">Old Age Home</option>
                    <option value="NGO">NGO</option>
                    <option value="Orphanage">Orphanage</option>
                  </select>
                </div>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                  <label className='text-sm'>Organization:</label>
                  <input type="text" className='outline-none text-sm bg-transparent w-full' placeholder='Organization Name' required value={organizationName} onChange={e => setOrganizationName(e.target.value)} />
                </div>
              </>
            )}

            {selectedRole === 'Volunteer' && (
              <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <label className='text-sm'>Volunteer Role:</label>
                <select required className='outline-none text-sm bg-transparent w-full' value={volunteerRole} onChange={e => setVolunteerRole(e.target.value)}>
                  <option value="" disabled>Select Volunteer Role</option>
                  <option value="Pickup Agent">Pickup Agent</option>
                  <option value="Delivery Agent">Delivery Agent</option>
                  <option value="Coordinator">Coordinator</option>
                </select>
              </div>
            )}

            {/* Full Name */}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <img src={assets.user_icon} alt="user" />
              <input type="text" className='outline-none text-sm' placeholder='Full Name' required value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
          </>
        )}

        {/* Email */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="email" />
          <input type="email" className='outline-none text-sm' placeholder='Email id' required value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {/* Password */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="lock" />
          <input type="password" className='outline-none text-sm' placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <p className='text-sm text-orange-400 my-4 cursor-pointer'>Forgot password?</p>

        {/* Submit Button */}
        <button type="submit" className='bg-orange-400 w-full text-white py-2 rounded-full'>
          {state === 'Login' ? 'login' : 'create account'}
        </button>

        {/* Toggle Login/Sign Up */}
        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an account?{' '}
            <span className='text-orange-400 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{' '}
            <span className='text-orange-400 cursor-pointer' onClick={() => setState('Login')}>Login</span>
          </p>
        )}

        {/* Close Icon */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className='absolute top-5 right-5 cursor-pointer'
          alt="close"
        />
      </form>
    </div>
  );
};

export default Login;
