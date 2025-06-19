// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png'; // Make sure this path is correct

// // Mock user data for a RECEIVER. In a real app, this would come from your context or API.
// const mockUser = {
//   organizationName: 'Community Shelter',
//   contactPerson: 'John Doe',
//   email: 'contact@communityshelter.org',
//   role: 'Receiver',
//   receiverCategory: 'Shelter (General)',
//   memberSince: 'March 2024',
//   profilePicture: 'https://placehold.co/128x128/3b82f6/ffffff?text=CS',
// };

// const ProfilePage = () => {
//   const [user, setUser] = useState(mockUser);
//   const [isEditing, setIsEditing] = useState(false);
//   // Form data for editing
//   const [formData, setFormData] = useState({
//     organizationName: user.organizationName,
//     contactPerson: user.contactPerson,
//     receiverCategory: user.receiverCategory,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     // In a real app, you would send this formData to your backend API to update the user's profile
//     console.log('Saving profile data:', formData);
//     setUser(prev => ({ ...prev, ...formData }));
//     setIsEditing(false);
//     alert('Profile updated successfully!'); // Replace with a better notification
//   };

//   // Determine the correct dashboard link based on role
//   const dashboardLink = user.role === 'Donor' ? '/donor-dash' : '/receiver-dash';

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           My Profile
//         </h1>
//         <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//             <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//         </Link>
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//         <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//             <img 
//               src={user.profilePicture} 
//               alt="Profile" 
//               className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//             />
//             <div className="flex-grow text-center sm:text-left">
//               {!isEditing ? (
//                 <>
//                   <h2 className="text-3xl font-bold text-neutral-800">{user.organizationName}</h2>
//                   <p className="text-lg text-neutral-700 mt-1">Contact: {user.contactPerson}</p>
//                   <p className="text-md text-neutral-600">{user.email}</p>
//                   <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                     <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.role}</span>
//                     <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{user.receiverCategory}</span>
//                   </div>
//                   <p className="text-sm text-neutral-500 mt-3">Member since {user.memberSince}</p>
//                   <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
//                     <FontAwesomeIcon icon={faEdit} />
//                     Edit Profile
//                   </button>
//                 </>
//               ) : (
//                 <form onSubmit={handleSave} className="w-full">
//                   <div className="mb-4">
//                     <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name</label>
//                     <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
//                   </div>
//                    <div className="mb-4">
//                     <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
//                     <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
//                   </div>
//                   <div className="mb-4">
//                      <label htmlFor="receiverCategory" className="block text-sm font-medium text-gray-700">Receiver Category</label>
//                      <select id="receiverCategory" name="receiverCategory" value={formData.receiverCategory} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500">
//                         <option>Old Age Home</option>
//                         <option>Women's Rescue Center</option>
//                         <option>Orphanage</option>
//                         <option>Shelter (General)</option>
//                         <option>Food Bank/Pantry</option>
//                         <option>Community Fridge</option>
//                         <option>School Nutrition Program</option>
//                         <option>Other</option>
//                     </select>
//                   </div>
//                   <div className="flex gap-3 mt-4">
//                      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2">
//                         <FontAwesomeIcon icon={faSave} />
//                         Save Changes
//                     </button>
//                      <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2">
//                         <FontAwesomeIcon icon={faTimes} />
//                         Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
          
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <h3 className="text-xl font-semibold text-neutral-800">Claimed Donation History</h3>
//             <p className="mt-2 text-neutral-600">
//               {/* In a real application, you would map over the user's claimed donations. */}
//               You have claimed <strong>12</strong> donations in the past month. Your most recent claim was for "Cooked Lentil Soup (Dal)".
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;



// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext'; // Assuming you have AppContext
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await axios.get(`${url}/api/user/profile`, {
//                     headers: { token }
//                 });
//                 if (response.data.success) {
//                     setUser(response.data.user);
//                     // Initialize form data for editing
//                     setFormData({
//                         fullName: response.data.user.fullName,
//                         organizationName: response.data.user.roleDetails.organizationName || '',
//                     });
//                 } else {
//                     console.error(response.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };

//         if (token) {
//             fetchUserProfile();
//         } else {
//             navigate('/'); // Redirect if not logged in
//         }
//     }, [token, url, navigate]);


//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>; // Loading state
//     }
    
//     // Determine the correct dashboard link based on role
//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';

//     // Simplified rendering for user role details
//     const renderRoleDetails = () => {
//         if (!user.roleDetails) return null;
//         return Object.entries(user.roleDetails)
//             .filter(([key, value]) => value) // Only show details that have a value
//             .map(([key, value]) => (
//                 <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
//             ));
//     };


//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
//                         <div className="flex-grow text-center sm:text-left">
//                            <h2 className="text-3xl font-bold text-neutral-800">{user.fullName}</h2>
//                            <p className="text-md text-neutral-600">{user.email}</p>
//                            <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                {renderRoleDetails()}
//                            </div>
//                         </div>

//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProfilePage;






// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext'; // Assuming you have AppContext
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await axios.get(`${url}/api/user/profile`, {
//                     headers: { token }
//                 });
//                 if (response.data.success) {
//                     setUser(response.data.user);
//                     // Initialize form data for editing
//                     setFormData({
//                         fullName: response.data.user.fullName,
//                         organizationName: response.data.user.roleDetails.organizationName || '',
//                     });
//                 } else {
//                     console.error(response.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };

//         if (token) {
//             fetchUserProfile();
//         } else {
//             navigate('/'); // Redirect if not logged in
//         }
//     }, [token, url, navigate]);


//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>; // Loading state
//     }
    
//     // Determine the correct dashboard link based on role
//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';

//     // Simplified rendering for user role details
//     const renderRoleDetails = () => {
//         if (!user.roleDetails) return null;
//         return Object.entries(user.roleDetails)
//             .filter(([key, value]) => value) // Only show details that have a value
//             .map(([key, value]) => (
//                 <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
//             ));
//     };


//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
//                         <div className="flex-grow text-center sm:text-left">
//                            <h2 className="text-3xl font-bold text-neutral-800">{user.fullName}</h2>
//                            <p className="text-md text-neutral-600">{user.email}</p>
//                            <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                {renderRoleDetails()}
//                            </div>
//                         </div>
                        
//                     </div>
//                 </div>




                




//             </main>
//         </div>
//     );
// };

// export default ProfilePage;




// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token, setUser: setGlobalUser } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(null);
//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             if (!token) {
//                 navigate('/');
//                 return;
//             }
//             try {
//                 const profileResponse = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//                 if (profileResponse.data.success) {
//                     const currentUser = profileResponse.data.user;
//                     setUser(currentUser);
//                     setFormData({
//                         fullName: currentUser.fullName,
//                         address: { ...currentUser.address }
//                     });

//                     // Fetch stats only if the user is a Donor
//                     if (currentUser.primaryRole === 'Donor') {
//                         const statsResponse = await axios.get(`${url}/api/donation/stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     }
//                 } else {
//                     console.error(profileResponse.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };
//         fetchUserProfile();
//     }, [token, url, navigate]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             address: { ...prev.address, [name]: value }
//         }));
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`${url}/api/user/profile`, formData, { headers: { token } });
//             if (response.data.success) {
//                 setUser(response.data.user);
//                 setGlobalUser(response.data.user); // Optionally update global context
//                 setIsEditing(false);
//                 alert("Profile Updated!");
//             }
//         } catch (error) {
//             alert("Failed to update profile.");
//         }
//     };

//     const renderRoleDetails = () => {
//         if (!user.roleDetails) return null;
//         return Object.entries(user.roleDetails)
//             .filter(([key, value]) => value)
//             .map(([key, value]) => (
//                 <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
//             ));
//     };

//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>;
//     }

//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
                        
//                         {!isEditing ? (
//                             <div className="flex-grow text-center sm:text-left">
//                                 <h2 className="text-3xl font-bold text-neutral-800">{user.fullName}</h2>
//                                 <p className="text-md text-neutral-600">{user.email}</p>
//                                 <div className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${user.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{user.verificationStatus}</div>
//                                 <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                    {renderRoleDetails()}
//                                 </div>
//                                 <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600 text-center sm:text-left">
//                                     <p className="font-semibold">Address:</p>
//                                     <p>{user.address.street}, {user.address.city}</p>
//                                     <p>{user.address.state} - {user.address.pincode}</p>
//                                     <p className="mt-2 text-xs text-gray-500">Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
//                                     <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                                 </button>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleSave} className="w-full space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                                     <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Street Address</label>
//                                     <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                                     <input type="text" name="pincode" value={formData.address.pincode} onChange={handleAddressChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-3 mt-4">
//                                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
//                                     <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTimes} /> Cancel</button>
//                                 </div>
//                             </form>
//                         )}
//                     </div>

//                     {user.primaryRole === 'Donor' && stats && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">My Impact</h3>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-blue-600">{stats.total}</p><p className="text-sm text-gray-600">Total Donations</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-green-600">{stats.completed}</p><p className="text-sm text-gray-600">Completed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-yellow-600">{stats.claimed}</p><p className="text-sm text-gray-600">Claimed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-orange-600">{stats.available}</p><p className="text-sm text-gray-600">Still Available</p></div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProfilePage;





// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token, setUser: setGlobalUser } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(null);
//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             if (!token) {
//                 navigate('/');
//                 return;
//             }
//             try {
//                 const profileResponse = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//                 if (profileResponse.data.success) {
//                     const currentUser = profileResponse.data.user;
//                     setUser(currentUser);
//                     setFormData({
//                         fullName: currentUser.fullName,
//                         address: { ...currentUser.address },
//                         roleDetails: { ...currentUser.roleDetails } // <-- NEW: Initialize roleDetails for editing
//                     });

//                     // --- MODIFIED: Fetches stats based on the user's role ---
//                     if (currentUser.primaryRole === 'Donor') {
//                         const statsResponse = await axios.get(`${url}/api/donation/stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     } else if (currentUser.primaryRole === 'Receiver') {
//                         // --- NEW: Fetch stats for the receiver ---
//                         const statsResponse = await axios.get(`${url}/api/donation/receiver-stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     }
//                 } else {
//                     console.error(profileResponse.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };
//         fetchUserProfile();
//     }, [token, url, navigate]);

//     // --- MODIFIED: This handler now updates nested state for address and roleDetails ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (['street', 'city', 'state', 'pincode'].includes(name)) {
//             setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
//         } else if (['organizationName'].includes(name)) {
//             setFormData(prev => ({ ...prev, roleDetails: { ...prev.roleDetails, [name]: value } }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };
    
//     // This handler remains unchanged
//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`${url}/api/user/profile`, formData, { headers: { token } });
//             if (response.data.success) {
//                 setUser(response.data.user);
//                 setGlobalUser(response.data.user);
//                 setIsEditing(false);
//                 alert("Profile Updated!");
//             }
//         } catch (error) {
//             alert("Failed to update profile.");
//         }
//     };

//     const renderRoleDetails = () => { /* ... unchanged ... */ };

//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>;
//     }

//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
                        
//                         {!isEditing ? (
//                             <div className="flex-grow text-center sm:text-left">
//                                 {/* --- MODIFIED: Show Organization Name for Receivers --- */}
//                                 <h2 className="text-3xl font-bold text-neutral-800">
//                                     {user.primaryRole === 'Receiver' ? user.roleDetails.organizationName : user.fullName}
//                                 </h2>
//                                 {user.primaryRole === 'Receiver' && <p className="text-lg text-neutral-700 mt-1">Contact: {user.fullName}</p>}
//                                 <p className="text-md text-neutral-600">{user.email}</p>
//                                 <div className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${user.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{user.verificationStatus}</div>
//                                 <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                    {renderRoleDetails()}
//                                 </div>
//                                 <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600 text-center sm:text-left">
//                                     <p className="font-semibold">Address:</p>
//                                     <p>{user.address.street}, {user.address.city}</p>
//                                     <p>{user.address.state} - {user.address.pincode}</p>
//                                     <p className="mt-2 text-xs text-gray-500">Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
//                                     <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                                 </button>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleSave} className="w-full space-y-4">
//                                 {/* --- NEW: Conditional editing field for Organization Name --- */}
//                                 {user.primaryRole === 'Receiver' && (
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">Organization Name</label>
//                                         <input type="text" name="organizationName" value={formData.roleDetails.organizationName || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                     </div>
//                                 )}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">{user.primaryRole === 'Receiver' ? 'Contact Person Name' : 'Full Name'}</label>
//                                     <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 {/* ... other form fields for address ... */}
//                                 <div className="flex gap-3 mt-4">
//                                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
//                                     <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTimes} /> Cancel</button>
//                                 </div>
//                             </form>
//                         )}
//                     </div>

//                     {/* --- MODIFIED: This entire block now handles rendering stats for BOTH user types --- */}
//                     {stats && user.primaryRole === 'Donor' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">My Impact</h3>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-blue-600">{stats.total}</p><p className="text-sm text-gray-600">Total Donations</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-green-600">{stats.completed}</p><p className="text-sm text-gray-600">Completed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-yellow-600">{stats.claimed}</p><p className="text-sm text-gray-600">Claimed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-orange-600">{stats.available}</p><p className="text-sm text-gray-600">Still Available</p></div>
//                             </div>
//                         </div>
//                     )}
//                     {stats && user.primaryRole === 'Receiver' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">Activity Summary</h3>
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center">
//                                     <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                                     <p className="text-sm text-gray-600">Total Items Claimed</p>
//                                 </div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center">
//                                     <p className="text-2xl font-bold text-yellow-600">{stats.pickup}</p>
//                                     <p className="text-sm text-gray-600">Awaiting Pickup</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProfilePage;





// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token, setUser: setGlobalUser } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(null);
//     const [stats, setStats] = useState(null);


//         // --- NEW: State variables to control the details modal ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalTitle, setModalTitle] = useState('');
//     const [modalDonations, setModalDonations] = useState([]);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             if (!token) {
//                 navigate('/');
//                 return;
//             }
//             try {
//                 const profileResponse = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//                 if (profileResponse.data.success) {
//                     const currentUser = profileResponse.data.user;
//                     setUser(currentUser);
//                     // --- MODIFIED: Initialize formData with all necessary fields ---
//                     setFormData({
//                         fullName: currentUser.fullName,
//                         address: { ...currentUser.address },
//                         roleDetails: { ...currentUser.roleDetails }
//                     });

//                     // --- MODIFIED: Fetches stats based on the user's role ---
//                     if (currentUser.primaryRole === 'Donor') {
//                         const statsResponse = await axios.get(`${url}/api/donation/stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     } else if (currentUser.primaryRole === 'Receiver') {
//                         // --- NEW: Fetch stats for the receiver ---
//                         const statsResponse = await axios.get(`${url}/api/donation/receiver-stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     }
//                 } else {
//                     console.error(profileResponse.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };
//         fetchUserProfile();
//     }, [token, url, navigate]);

//     // --- MODIFIED: This handler now updates nested state for address and roleDetails ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (['street', 'city', 'state', 'pincode'].includes(name)) {
//             setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
//         } else if (['organizationName'].includes(name)) {
//             setFormData(prev => ({ ...prev, roleDetails: { ...prev.roleDetails, [name]: value } }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };
    
//     // This handler remains unchanged
//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             // --- MODIFIED: The backend controller for this route now accepts roleDetails ---
//             const response = await axios.put(`${url}/api/user/profile`, formData, { headers: { token } });
//             if (response.data.success) {
//                 setUser(response.data.user);
//                 setGlobalUser(response.data.user);
//                 setIsEditing(false);
//                 alert("Profile Updated!");
//             }
//         } catch (error) {
//             alert("Failed to update profile.");
//         }
//     };

//     const renderRoleDetails = () => {
//         if (!user.roleDetails) return null;
//         return Object.entries(user.roleDetails)
//             .filter(([key, value]) => value && key !== 'organizationName') // Don't re-render organization name as a badge
//             .map(([key, value]) => (
//                 <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
//             ));
//     };


//     const handleStatCardClick = async (title, statusFilter = '') => {
//         setModalTitle(title);
//         try {
//             const endpoint = user.primaryRole === 'Donor' ? 'list' : 'claimed';
//             const fetchUrl = `${url}/api/donation/${endpoint}`;
            
//             const response = await axios.get(fetchUrl, { headers: { token } });
            
//             if (response.data.success) {
//                 const filteredData = statusFilter 
//                     ? response.data.data.filter(d => d.status === statusFilter) 
//                     : response.data.data;
//                 setModalDonations(filteredData);
//                 setIsModalOpen(true);
//             }
//         } catch (error) {
//             console.error(`Failed to fetch ${title}:`, error);
//             alert(`Could not load details for ${title}.`);
//         }
//     };


//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>;
//     }

//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
                        
//                         {!isEditing ? (
//                             <div className="flex-grow text-center sm:text-left">
//                                 {/* --- MODIFIED: Show Organization Name for Receivers --- */}
//                                 <h2 className="text-3xl font-bold text-neutral-800">
//                                     {user.primaryRole === 'Receiver' ? user.roleDetails.organizationName : user.fullName}
//                                 </h2>
//                                 {user.primaryRole === 'Receiver' && <p className="text-lg text-neutral-700 mt-1">Contact: {user.fullName}</p>}
//                                 <p className="text-md text-neutral-600">{user.email}</p>
//                                 <div className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${user.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{user.verificationStatus}</div>
//                                 <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                    {renderRoleDetails()}
//                                 </div>
//                                 <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600 text-center sm:text-left">
//                                     <p className="font-semibold">Address:</p>
//                                     <p>{user.address.street}, {user.address.city}</p>
//                                     <p>{user.address.state} - {user.address.pincode}</p>
//                                     <p className="mt-2 text-xs text-gray-500">Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
//                                     <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                                 </button>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleSave} className="w-full space-y-4">
//                                 {/* --- NEW: Conditional editing field for Organization Name --- */}
//                                 {user.primaryRole === 'Receiver' && (
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">Organization Name</label>
//                                         <input type="text" name="organizationName" value={formData.roleDetails.organizationName || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                     </div>
//                                 )}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">{user.primaryRole === 'Receiver' ? 'Contact Person Name' : 'Full Name'}</label>
//                                     <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 {/* The other address form fields remain unchanged */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Street Address</label>
//                                     <input type="text" name="street" value={formData.address.street} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.address.city} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.address.state} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                                     <input type="text" name="pincode" value={formData.address.pincode} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-3 mt-4">
//                                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
//                                     <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTimes} /> Cancel</button>
//                                 </div>
//                             </form>
//                         )}
//                     </div>

//                     {/* --- MODIFIED: This block now renders stats for BOTH user types --- */}
//                     {stats && user.primaryRole === 'Donor' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">My Impact</h3>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-blue-600">{stats.total}</p><p className="text-sm text-gray-600">Total Donations</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-green-600">{stats.completed}</p><p className="text-sm text-gray-600">Completed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-yellow-600">{stats.claimed}</p><p className="text-sm text-gray-600">Claimed</p></div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center"><p className="text-2xl font-bold text-orange-600">{stats.available}</p><p className="text-sm text-gray-600">Still Available</p></div>
//                             </div>
//                         </div>
//                     )}
//                     {stats && user.primaryRole === 'Receiver' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">Activity Summary</h3>
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center">
//                                     <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                                     <p className="text-sm text-gray-600">Total Items Claimed</p>
//                                 </div>
//                                 <div className="bg-slate-100 p-4 rounded-lg text-center">
//                                     <p className="text-2xl font-bold text-yellow-600">{stats.pickup}</p>
//                                     <p className="text-sm text-gray-600">Awaiting Pickup</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProfilePage;









// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const ProfilePage = () => {
//     const { url, token, setUser: setGlobalUser } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(null);
//     const [stats, setStats] = useState(null);


//         // --- NEW: State variables to control the details modal ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalTitle, setModalTitle] = useState('');
//     const [modalDonations, setModalDonations] = useState([]);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             if (!token) {
//                 navigate('/');
//                 return;
//             }
//             try {
//                 const profileResponse = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//                 if (profileResponse.data.success) {
//                     const currentUser = profileResponse.data.user;
//                     setUser(currentUser);
//                     // --- MODIFIED: Initialize formData with all necessary fields ---
//                     setFormData({
//                         fullName: currentUser.fullName,
//                         address: { ...currentUser.address },
//                         roleDetails: { ...currentUser.roleDetails }
//                     });

//                     // --- MODIFIED: Fetches stats based on the user's role ---
//                     if (currentUser.primaryRole === 'Donor') {
//                         const statsResponse = await axios.get(`${url}/api/donation/stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     } else if (currentUser.primaryRole === 'Receiver') {
//                         // --- NEW: Fetch stats for the receiver ---
//                         const statsResponse = await axios.get(`${url}/api/donation/receiver-stats`, { headers: { token } });
//                         if (statsResponse.data.success) {
//                             setStats(statsResponse.data.stats);
//                         }
//                     }
//                 } else {
//                     console.error(profileResponse.data.message);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user profile.", error);
//             }
//         };
//         fetchUserProfile();
//     }, [token, url, navigate]);

//     // --- MODIFIED: This handler now updates nested state for address and roleDetails ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (['street', 'city', 'state', 'pincode'].includes(name)) {
//             setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
//         } else if (['organizationName'].includes(name)) {
//             setFormData(prev => ({ ...prev, roleDetails: { ...prev.roleDetails, [name]: value } }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };
    
//     // This handler remains unchanged
//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             // --- MODIFIED: The backend controller for this route now accepts roleDetails ---
//             const response = await axios.put(`${url}/api/user/profile`, formData, { headers: { token } });
//             if (response.data.success) {
//                 setUser(response.data.user);
//                 setGlobalUser(response.data.user);
//                 setIsEditing(false);
//                 alert("Profile Updated!");
//             }
//         } catch (error) {
//             alert("Failed to update profile.");
//         }
//     };

//     const renderRoleDetails = () => {
//         if (!user.roleDetails) return null;
//         return Object.entries(user.roleDetails)
//             .filter(([key, value]) => value && key !== 'organizationName') // Don't re-render organization name as a badge
//             .map(([key, value]) => (
//                 <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
//             ));
//     };


//     const handleStatCardClick = async (title, statusFilter = '') => {
//         setModalTitle(title);
//         try {
//             const endpoint = user.primaryRole === 'Donor' ? 'list' : 'claimed';
//             const fetchUrl = `${url}/api/donation/${endpoint}`;
            
//             const response = await axios.get(fetchUrl, { headers: { token } });
            
//             if (response.data.success) {
//                 const filteredData = statusFilter 
//                     ? response.data.data.filter(d => d.status === statusFilter) 
//                     : response.data.data;
//                 setModalDonations(filteredData);
//                 setIsModalOpen(true);
//             }
//         } catch (error) {
//             console.error(`Failed to fetch ${title}:`, error);
//             alert(`Could not load details for ${title}.`);
//         }
//     };


//     if (!user) {
//         return <div className="text-center py-20">Loading profile...</div>;
//     }

//     const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
//                           user.primaryRole === 'Receiver' ? '/receiver-dash' :
//                           '/volunteer-dash';





//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//             <header className="relative flex items-center justify-between px-4 py-6">
//                  <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                  <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
//                  <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                     <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
//                 </Link>
//             </header>

//             <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
//                 <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
//                     {/* This profile display and edit form section is preserved exactly as you had it */}
//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
//                         <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
                        
//                         {!isEditing ? (
//                             <div className="flex-grow text-center sm:text-left">
//                                 <h2 className="text-3xl font-bold text-neutral-800">
//                                     {user.primaryRole === 'Receiver' ? user.roleDetails.organizationName : user.fullName}
//                                 </h2>
//                                 {user.primaryRole === 'Receiver' && <p className="text-lg text-neutral-700 mt-1">Contact: {user.fullName}</p>}
//                                 <p className="text-md text-neutral-600">{user.email}</p>
//                                 <div className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${user.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{user.verificationStatus}</div>
//                                 <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
//                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
//                                    {renderRoleDetails()}
//                                 </div>
//                                 <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600 text-center sm:text-left">
//                                     <p className="font-semibold">Address:</p>
//                                     <p>{user.address.street}, {user.address.city}</p>
//                                     <p>{user.address.state} - {user.address.pincode}</p>
//                                     <p className="mt-2 text-xs text-gray-500">Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
//                                     <FontAwesomeIcon icon={faEdit} /> Edit Profile
//                                 </button>
//                             </div>
//                         ) : (
//                             // <form onSubmit={handleSave} className="w-full space-y-4">
//                             //    {/* Your existing form JSX is preserved */}
//                             // </form>

//                             <form onSubmit={handleSave} className="w-full space-y-4">
//                                 {user.primaryRole === 'Receiver' && (
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">Organization Name</label>
//                                         <input type="text" name="organizationName" value={formData.roleDetails.organizationName || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                     </div>
//                                 )}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">{user.primaryRole === 'Receiver' ? 'Contact Person Name' : 'Full Name'}</label>
//                                     <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Street Address</label>
//                                     <input type="text" name="street" value={formData.address.street} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.address.city} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                     <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.address.state} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                                     <input type="text" name="pincode" value={formData.address.pincode} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
//                                 </div>
//                                 <div className="flex gap-3 mt-4">
//                                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
//                                     <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTimes} /> Cancel</button>
//                                 </div>
//                             </form>
//                         )}
//                     </div>

//                     {/* --- MODIFIED: Donor stats cards are now clickable buttons --- */}
//                     {stats && user.primaryRole === 'Donor' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">My Impact</h3>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                                 <button onClick={() => handleStatCardClick('All My Donations')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                                     <p className="text-sm text-gray-600">Total Donations</p>
//                                 </button>
//                                 <button onClick={() => handleStatCardClick('Claimed Donations', 'Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-yellow-600">{stats.claimed}</p>
//                                     <p className="text-sm text-gray-600">Claimed</p>
//                                 </button>
//                                 <button onClick={() => handleStatCardClick('Available Donations', 'Available')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-orange-600">{stats.available}</p>
//                                     <p className="text-sm text-gray-600">Still Available</p>
//                                 </button>
//                                 <button onClick={() => handleStatCardClick('Completed Donations', 'Completed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
//                                     <p className="text-sm text-gray-600">Completed</p>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     {/* --- MODIFIED: Receiver stats cards are now clickable buttons --- */}
//                     {stats && user.primaryRole === 'Receiver' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">Activity Summary</h3>
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 <button onClick={() => handleStatCardClick('Total Items Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
//                                     <p className="text-sm text-gray-600">Total Items Claimed</p>
//                                 </button>
//                                 <button onClick={() => handleStatCardClick('Items Awaiting Pickup', 'Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-yellow-600">{stats.pickup}</p>
//                                     <p className="text-sm text-gray-600">Awaiting Pickup</p>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     {stats && user.primaryRole === 'Volunteer' && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-xl font-semibold text-neutral-800">My Activity</h3>
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 <button onClick={() => handleStatCardClick('Tasks In Progress', 'Assigned')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
//                                     <p className="text-sm text-gray-600">Tasks In Progress</p>
//                                 </button>
//                                 <button onClick={() => handleStatCardClick('Completed Tasks', 'Completed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
//                                     <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
//                                     <p className="text-sm text-gray-600">Tasks Completed</p>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
                    

//                 </div>
//             </main>

//             {/* --- NEW: This is the pop-up modal for displaying the detailed history --- */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
//                     <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
//                         <header className="flex items-center justify-between p-4 border-b">
//                             <h2 className="text-lg font-semibold">{modalTitle}</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
//                         </header>
//                         <div className="overflow-y-auto p-4">
//                             <div className="space-y-3">
//                                 {modalDonations.length > 0 ? modalDonations.map(donation => (
//                                     <div key={donation._id} className="p-3 bg-gray-50 rounded-md border grid grid-cols-3 gap-4 items-center">
//                                         <div className="col-span-1">
//                                             <p className="font-semibold text-gray-800">{donation.title}</p>
//                                             <p className="text-xs text-gray-500">Status: {donation.status}</p>
//                                         </div>
//                                         <div className="col-span-1">
//                                             <p className="text-sm text-gray-600">
//                                                 {user.primaryRole === 'Receiver' && `From: ${donation.donorId.roleDetails.organizationName || donation.donorId.fullName}`}
//                                                 {user.primaryRole === 'Donor' && `To: ${donation.claimedByReceiverId ? (donation.claimedByReceiverId.roleDetails.organizationName || donation.claimedByReceiverId.fullName) : 'Unclaimed'}`}
//                                             </p>
//                                         </div>
//                                         <div className="col-span-1 text-right">
//                                              <p className="text-sm text-gray-600">{new Date(donation.updatedAt).toLocaleDateString()}</p>
//                                              <p className="text-xs text-gray-500">{new Date(donation.updatedAt).toLocaleTimeString()}</p>
//                                         </div>
//                                     </div>
//                                 )) : <p className="text-center text-gray-500 py-8">No items to display.</p>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfilePage;






import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { url, token, setUser: setGlobalUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [stats, setStats] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    // Renamed for clarity, as it now holds tasks or donations
    const [modalData, setModalData] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const profileResponse = await axios.get(`${url}/api/user/profile`, { headers: { token } });
                if (profileResponse.data.success) {
                    const currentUser = profileResponse.data.user;
                    setUser(currentUser);
                    setFormData({
                        fullName: currentUser.fullName,
                        address: { ...currentUser.address },
                        roleDetails: { ...currentUser.roleDetails }
                    });

                    // --- INTEGRATED: Fetches stats for all roles, including Volunteer ---
                    let statsEndpoint = '';
                    if (currentUser.primaryRole === 'Donor') {
                        statsEndpoint = '/api/donation/stats';
                    } else if (currentUser.primaryRole === 'Receiver') {
                        statsEndpoint = '/api/donation/receiver-stats';
                    } else if (currentUser.primaryRole === 'Volunteer') {
                        statsEndpoint = '/api/task/stats';
                    }
                    
                    if (statsEndpoint) {
                        const statsResponse = await axios.get(`${url}${statsEndpoint}`, { headers: { token } });
                        if (statsResponse.data.success) {
                            setStats(statsResponse.data.stats);
                        }
                    }
                } else {
                    console.error(profileResponse.data.message);
                }
            } catch (error) {
                console.error("Failed to fetch user profile.", error);
            }
        };
        fetchUserProfile();
    }, [token, url, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['street', 'city', 'state', 'pincode'].includes(name)) {
            setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
        } else if (['organizationName'].includes(name)) {
            setFormData(prev => ({ ...prev, roleDetails: { ...prev.roleDetails, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${url}/api/user/profile`, formData, { headers: { token } });
            if (response.data.success) {
                setUser(response.data.user);
                setGlobalUser(response.data.user);
                setIsEditing(false);
                toast.success("Profile Updated!");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    const renderRoleDetails = () => {
        if (!user.roleDetails) return null;
        return Object.entries(user.roleDetails)
            .filter(([key, value]) => value && key !== 'organizationName')
            .map(([key, value]) => (
                <span key={key} className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{value}</span>
            ));
    };

    // --- INTEGRATED: This function now handles all roles ---
    const handleStatCardClick = async (title, statusFilter = '') => {
        setModalTitle(title);
        let fetchUrl = '';
        
        // Determine the correct API endpoint based on user role
        if (user.primaryRole === 'Donor') {
            fetchUrl = `${url}/api/donation/list`;
        } else if (user.primaryRole === 'Receiver') {
            fetchUrl = `${url}/api/donation/claimed`;
        } else if (user.primaryRole === 'Volunteer') {
            fetchUrl = `${url}/api/task/list`; // Fetches tasks for the volunteer
        }

        try {
            const response = await axios.get(fetchUrl, { headers: { token } });
            if (response.data.success) {
                const filteredData = statusFilter 
                    ? response.data.data.filter(d => d.status === statusFilter) 
                    : response.data.data;
                setModalData(filteredData);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(`Failed to fetch ${title}:`, error);
            toast.error(`Could not load details for ${title}.`);
        }
    };

    if (!user) {
        return <div className="text-center py-20">Loading profile...</div>;
    }

    const dashboardLink = user.primaryRole === 'Donor' ? '/donor-dash' :
                          user.primaryRole === 'Receiver' ? '/receiver-dash' :
                          '/volunteer-dash';

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
            <header className="relative flex items-center justify-between px-4 py-6">
                 <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
                 <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">My Profile</h1>
                 <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
                </Link>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <FontAwesomeIcon icon={faUser} className="text-6xl text-slate-400 p-5 bg-slate-100 rounded-full" />
                        
                        {!isEditing ? (
                            <div className="flex-grow text-center sm:text-left">
                                <h2 className="text-3xl font-bold text-neutral-800">
                                    {user.primaryRole === 'Receiver' ? user.roleDetails.organizationName : user.fullName}
                                </h2>
                                {user.primaryRole === 'Receiver' && <p className="text-lg text-neutral-700 mt-1">Contact: {user.fullName}</p>}
                                <p className="text-md text-neutral-600">{user.email}</p>
                                <div className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${user.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{user.verificationStatus}</div>
                                <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
                                   <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.primaryRole}</span>
                                   {renderRoleDetails()}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600 text-center sm:text-left">
                                    <p className="font-semibold">Address:</p>
                                    <p>{user.address.street}, {user.address.city}</p>
                                    <p>{user.address.state} - {user.address.pincode}</p>
                                    <p className="mt-2 text-xs text-gray-500">Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
                                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="w-full space-y-4">
                                {user.primaryRole === 'Receiver' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                                        <input type="text" name="organizationName" value={formData.roleDetails.organizationName || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{user.primaryRole === 'Receiver' ? 'Contact Person Name' : 'Full Name'}</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input type="text" name="street" value={formData.address.street} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.address.city} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
                                    <div className="w-1/2"><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.address.state} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input type="text" name="pincode" value={formData.address.pincode} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faSave} /> Save Changes</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2"><FontAwesomeIcon icon={faTimes} /> Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>

                    {stats && user.primaryRole === 'Donor' && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-neutral-800">My Impact</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <button onClick={() => handleStatCardClick('All My Donations')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                                    <p className="text-sm text-gray-600">Total Donations</p>
                                </button>
                                <button onClick={() => handleStatCardClick('Completed Donations', 'Completed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                    <p className="text-sm text-gray-600">Completed</p>
                                </button>
                                <button onClick={() => handleStatCardClick('Claimed Donations', 'Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-yellow-600">{stats.claimed}</p>
                                    <p className="text-sm text-gray-600">Claimed</p>
                                </button>
                                <button onClick={() => handleStatCardClick('Available Donations', 'Available')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-orange-600">{stats.available}</p>
                                    <p className="text-sm text-gray-600">Still Available</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {stats && user.primaryRole === 'Receiver' && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-neutral-800">Activity Summary</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <button onClick={() => handleStatCardClick('Total Items Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                                    <p className="text-sm text-gray-600">Total Items Claimed</p>
                                </button>
                                <button onClick={() => handleStatCardClick('Items Awaiting Pickup', 'Claimed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pickup}</p>
                                    <p className="text-sm text-gray-600">Awaiting Pickup</p>
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {stats && user.primaryRole === 'Volunteer' && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-neutral-800">My Activity</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <button onClick={() => handleStatCardClick('Tasks In Progress', 'Assigned')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
                                    <p className="text-sm text-gray-600">Tasks In Progress</p>
                                </button>
                                <button onClick={() => handleStatCardClick('Completed Tasks', 'Completed')} className="bg-slate-100 p-4 rounded-lg text-center hover:bg-slate-200 transition-colors">
                                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                    <p className="text-sm text-gray-600">Tasks Completed</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* --- INTEGRATED: Universal History Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <header className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">{modalTitle}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                        </header>
                        <div className="overflow-y-auto p-4">
                            <div className="space-y-3">
                                {modalData.length > 0 ? modalData.map(item => (
                                    <div key={item._id} className="p-3 bg-gray-50 rounded-md border text-sm">
                                        
                                        {/* For Donors and Receivers (viewing Donations) */}
                                        {(user.primaryRole === 'Donor' || user.primaryRole === 'Receiver') && (
                                            <div className="grid grid-cols-3 gap-4 items-center">
                                                <p className="font-semibold text-gray-800">{item.title}</p>
                                                <p className="text-gray-600">
                                                    {user.primaryRole === 'Receiver'
                                                        ? `From: ${item.donorId?.roleDetails?.organizationName || item.donorId?.fullName || 'N/A'}`
                                                        : `To: ${item.claimedByReceiverId?.roleDetails?.organizationName || item.claimedByReceiverId?.fullName || 'Unclaimed'}`
                                                    }
                                                </p>
                                                <p className="text-right">Status: <span className="font-semibold">{item.status}</span></p>
                                            </div>
                                        )}

                                        {/* For Volunteers (viewing Tasks) */}
                                        {user.primaryRole === 'Volunteer' && (
                                             <div className="grid grid-cols-3 gap-4 items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800">{item.donationId?.title || 'Task Item'}</p>
                                                    <p className="text-xs text-gray-500">Pickup Task</p>
                                                </div>
                                                <div className="text-gray-600">
                                                    <p>From: {item.donationId?.donorId?.roleDetails?.organizationName || 'Donor'}</p>
                                                    <p>To: {item.donationId?.claimedByReceiverId?.roleDetails?.organizationName || 'Receiver'}</p>
                                                </div>
                                                <p className="text-right">Status: <span className="font-semibold">{item.status}</span></p>
                                            </div>
                                        )}

                                    </div>
                                )) : <p className="text-center text-gray-500 py-8">No items to display.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;