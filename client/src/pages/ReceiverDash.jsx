
// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';


// import ReceiverFilterControls from '../components/Dashboard/ReceiverFilterControls';
// import AvailableDonationCard from '../components/Dashboard/AvailableDonationCard';
// import ProfileMenu from '../components/Dashboard/ProfileMenu';
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faShoppingBasket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';


// const ReceiverDash = () => {
//   const { url, token, setToken, loading  } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [availableDonations, setAvailableDonations] = useState([]);
//   const [claimedDonations, setClaimedDonations] = useState([]);
//   const [filteredDonations, setFilteredDonations] = useState([]);
//   const [activeTab, setActiveTab] = useState('Available');
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [sortMethod, setSortMethod] = useState('distance-asc');
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const profileMenuRef = useRef(null);


//   const formatAddress = (addressObj) => {
//     if (!addressObj) return '';
//     return `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.pincode}`;
//   };

//   // const fetchAvailableDonations = async () => {
//   //   try {
//   //       const response = await axios.get(`${url}/api/donation/available`, {
//   //           headers: { token }
//   //       });
//   //       if (response.data.success) {
//   //           const donationsWithDistance = response.data.data.map(d => ({...d, distance: '5 km'}));
//   //           setAvailableDonations(donationsWithDistance);
//   //       }
//   //   } catch (error) {
//   //       console.error("Failed to fetch donations:", error);
//   //   }
//   // };

//      const fetchAvailableDonations = async () => {
//         if (!token) return;
//         try {
//             const response = await axios.get(`${url}/api/donation/available`, { headers: { token } });
//             if (response.data.success) {
//                 setAvailableDonations(response.data.data.map(d => ({...d, distance: d.distance || '5 km'})));
//             }
//         } catch (error) {
//             toast.error("Failed to fetch available donations.");
//         }
//         setIsDataLoading(false);
//     };




//     const fetchClaimedDonations = async () => {
//     if (!token) return;
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${url}/api/donation/claimed`, { headers: { token } });
//       if (response.data.success) {
//         const donationsWithDistance = response.data.data.map(d => ({...d, distance: 'N/A'})); // Distance isn't critical for claimed items
//         setClaimedDonations(donationsWithDistance);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch claimed donations.");
//       console.error("Failed to fetch claimed donations:", error);
//     }
//     setIsLoading(false);
//   };



 
//   useEffect(() => {
//     const fetchAndCalculateDistances = async () => {
//         if (!token) return;
//         setIsLoading(true);
//         try {
           
//             const profileRes = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//             if (!profileRes.data.success) {
//                 toast.error("Could not fetch your profile to calculate distances.");
//                 setIsLoading(false);
//                 return;
//             }
//             const user = profileRes.data.user;
//             setCurrentUser(user);
            
           
//             const donationsRes = await axios.get(`${url}/api/donation/available`, { headers: { token } });
            
//             if (donationsRes.data.success) {
//                 const receiverAddress = formatAddress(user.address);
                
//                 const donationsWithDistance = await Promise.all(donationsRes.data.data.map(async (donation) => {
//                     const donorAddress = formatAddress(donation.donorId?.address);
//                     let distance = 'N/A';
//                     if (receiverAddress && donorAddress) {
//                         try {
//                             const distRes = await axios.post(`${url}/api/distance/calculate`, {
//                                 origin: receiverAddress,
//                                 destination: donorAddress
//                             }, { headers: { token } });
//                             if (distRes.data.success) {
//                                 distance = distRes.data.distance;
//                             }
//                         } catch (distError) {
//                             console.error("Distance calculation failed for one item:", distError);
//                         }
//                     }
//                     return { ...donation, distance };
//                 }));
//                 setAvailableDonations(donationsWithDistance);
//             }
//         } catch (error) {
//             toast.error("Failed to load available donations.");
//             console.error("Failed to fetch data:", error);
//         }
//         setIsLoading(false);
//     };

//     if (token) {
//       if (activeTab === 'Available') {
//         fetchAndCalculateDistances();
//       } else {
//         fetchClaimedDonations();
//       }
//     }
//   }, [token, url, activeTab]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsProfileMenuOpen(false);
//       }
//     };
//     if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isProfileMenuOpen]);

//   useEffect(() => {
//     const sourceData = activeTab === 'Available' ? availableDonations : claimedDonations;
//     let result = [...sourceData];
    
//     if (searchTerm) {
//       result = result.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
//     }
//     if (categoryFilter !== 'All') {
//       result = result.filter(d => d.category === categoryFilter);
//     }
//     result.sort((a, b) => {
//         switch(sortMethod) {
//             case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
//             case 'expiry-asc': return new Date(a.expiryDate) - new Date(b.expiryDate);
//             case 'title-asc': return a.title.localeCompare(b.title);
//             default: return 0;
//         }
//     });
//     setFilteredDonations(result);
//   }, [availableDonations, claimedDonations, searchTerm, categoryFilter, sortMethod, activeTab]);
  
//   // const handleClaimDonation = async (donationId) => {
//   //   try {
//   //       const response = await axios.post(`${url}/api/donation/claim`, { donationId }, { headers: { token } });
//   //       if (response.data.success) {
//   //           toast.success(response.data.message);
           
//   //           setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
//   //       } else {
//   //           toast.error(response.data.message);
//   //       }
//   //   } catch (error) {
//   //       toast.error("An error occurred while claiming the donation.");
//   //       console.error("Claim error:", error);
//   //   }
//   // };


//       const handleClaimDonation = async (donationId) => {
//         try {
//             const response = await axios.post(`${url}/api/donation/claim`, { donationId }, { headers: { token } });
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error("An error occurred while claiming the donation.");
//         }
//     };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     navigate('/');
//   };

//   const categories = ['All', ...new Set(availableDonations.map(d => d.category))];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           Find Available Donations
//         </h1>
        
//         <div className="relative z-20" ref={profileMenuRef}>
//             <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                 <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
//             </button>
//             {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
//         </div>
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8">
//         <section>
//             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                 <div>
//                     <div className="flex space-x-1 bg-green-100/70 p-1 rounded-lg">
//                         <button onClick={() => setActiveTab('Available')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Available' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faShoppingBasket} className="mr-2"/> Available Donations
//                         </button>
//                         <button onClick={() => setActiveTab('Claimed')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Claimed' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/> My Claimed Items
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {activeTab === 'Available' && (
//               <ReceiverFilterControls 
//                   searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                   categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
//                   sortMethod={sortMethod} setSortMethod={setSortMethod}
//                   categories={categories}
//               />
//             )}

           
//             {isLoading ? (
//                 <div className="text-center py-16 text-gray-500">Loading available donations...</div>
//             ) : filteredDonations.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {filteredDonations.map(donation => {
//                       const isClaimed = activeTab === 'Claimed';
//                       return (
//                          <AvailableDonationCard 
//                               key={donation._id} 
//                               donation={donation} 
//                               onClaim={isClaimed ? () => {} : handleClaimDonation}
//                               buttonText={isClaimed ? `Status: ${donation.status}` : "Claim Donation"}
//                               isButtonDisabled={isClaimed}
//                           />
//                       )
//                   })}
//                 </div>
//             ) : (
//                  <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
//                     <h3 className="text-xl font-semibold text-neutral-700">
//                         {activeTab === 'Available' ? 'No Donations Available Right Now' : 'You Haven\'t Claimed Any Items Yet'}
//                     </h3>
//                     <p className="text-neutral-500 mt-2">
//                          {activeTab === 'Available' ? 'Please check back later, new items are added daily!' : 'When you claim a donation from the "Available" tab, it will appear here.'}
//                     </p>
//                 </div>
//             )}
//         </section>
//       </main>
//     </div>
//   )
// }

// export default ReceiverDash;





// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';


// import ReceiverFilterControls from '../components/Dashboard/ReceiverFilterControls';
// import AvailableDonationCard from '../components/Dashboard/AvailableDonationCard';
// import ProfileMenu from '../components/Dashboard/ProfileMenu';
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faShoppingBasket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';


// const ReceiverDash = () => {
//   const { url, token, setToken, loading  } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [availableDonations, setAvailableDonations] = useState([]);
//   const [claimedDonations, setClaimedDonations] = useState([]);
//   const [filteredDonations, setFilteredDonations] = useState([]);
//   const [activeTab, setActiveTab] = useState('Available');
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [sortMethod, setSortMethod] = useState('distance-asc');
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const profileMenuRef = useRef(null);


//   const formatAddress = (addressObj) => {
//     if (!addressObj) return '';
//     return `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.pincode}`;
//   };



//      const fetchAvailableDonations = async () => {
//         if (!token) return;
//         try {
//             const response = await axios.get(`${url}/api/donation/available`, { headers: { token } });
//             if (response.data.success) {
//                 setAvailableDonations(response.data.data.map(d => ({...d, distance: d.distance || '5 km'})));
//             }
//         } catch (error) {
//             toast.error("Failed to fetch available donations.");
//         }
//         setIsDataLoading(false);
//     };




//     const fetchClaimedDonations = async () => {
//     if (!token) return;
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${url}/api/donation/claimed`, { headers: { token } });
//       if (response.data.success) {
//         const donationsWithDistance = response.data.data.map(d => ({...d, distance: 'N/A'})); // Distance isn't critical for claimed items
//         setClaimedDonations(donationsWithDistance);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch claimed donations.");
//       console.error("Failed to fetch claimed donations:", error);
//     }
//     setIsLoading(false);
//   };
//  useEffect(() => {
//     if (!loading && token) {
//       if (activeTab === 'Available') {
//         fetchAndCalculateDistances();
//       } else {
//         fetchClaimedDonations();
//       }
//     } else if (!loading && !token) {
//       // If loading is done and there's no token, redirect to home
//       navigate('/');
//     }
//   }, [token, activeTab, loading]);


 
//   useEffect(() => {
//     const fetchAndCalculateDistances = async () => {
//         if (!token) return;
//         setIsLoading(true);
//         try {
           
//             const profileRes = await axios.get(`${url}/api/user/profile`, { headers: { token } });
//             if (!profileRes.data.success) {
//                 toast.error("Could not fetch your profile to calculate distances.");
//                 setIsLoading(false);
//                 return;
//             }
//             const user = profileRes.data.user;
//             setCurrentUser(user);
            
           
//             const donationsRes = await axios.get(`${url}/api/donation/available`, { headers: { token } });
            
//             if (donationsRes.data.success) {
//                 const receiverAddress = formatAddress(user.address);
                
//                 const donationsWithDistance = await Promise.all(donationsRes.data.data.map(async (donation) => {
//                     const donorAddress = formatAddress(donation.donorId?.address);
//                     let distance = 'N/A';
//                     if (receiverAddress && donorAddress) {
//                         try {
//                             const distRes = await axios.post(`${url}/api/distance/calculate`, {
//                                 origin: receiverAddress,
//                                 destination: donorAddress
//                             }, { headers: { token } });
//                             if (distRes.data.success) {
//                                 distance = distRes.data.distance;
//                             }
//                         } catch (distError) {
//                             console.error("Distance calculation failed for one item:", distError);
//                         }
//                     }
//                     return { ...donation, distance };
//                 }));
//                 setAvailableDonations(donationsWithDistance);
//             }
//         } catch (error) {
//             toast.error("Failed to load available donations.");
//             console.error("Failed to fetch data:", error);
//         }
//         setIsLoading(false);
//     };

//     if (token) {
//       if (activeTab === 'Available') {
//         fetchAndCalculateDistances();
//       } else {
//         fetchClaimedDonations();
//       }
//     }
//   }, [token, url, activeTab]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsProfileMenuOpen(false);
//       }
//     };
//     if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isProfileMenuOpen]);

//   useEffect(() => {
//     const sourceData = activeTab === 'Available' ? availableDonations : claimedDonations;
//     let result = [...sourceData];
    
//     if (searchTerm) {
//       result = result.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
//     }
//     if (categoryFilter !== 'All') {
//       result = result.filter(d => d.category === categoryFilter);
//     }
//     result.sort((a, b) => {
//         switch(sortMethod) {
//             case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
//             case 'expiry-asc': return new Date(a.expiryDate) - new Date(b.expiryDate);
//             case 'title-asc': return a.title.localeCompare(b.title);
//             default: return 0;
//         }
//     });
//     setFilteredDonations(result);
//   }, [availableDonations, claimedDonations, searchTerm, categoryFilter, sortMethod, activeTab]);



//       const handleClaimDonation = async (donationId) => {
//         try {
//             const response = await axios.post(`${url}/api/donation/claim`, { donationId }, { headers: { token } });
//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error("An error occurred while claiming the donation.");
//         }
//     };
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     navigate('/');
//   };

//   const categories = ['All', ...new Set(availableDonations.map(d => d.category))];


//     if (loading) {
//     return (
//         <div className="flex justify-center items-center min-h-screen">
//             <p>Loading application...</p>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           Find Available Donations
//         </h1>
        
//         <div className="relative z-20" ref={profileMenuRef}>
//             <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                 <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
//             </button>
//             {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
//         </div>
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8">
//         <section>
//             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                 <div>
//                     <div className="flex space-x-1 bg-green-100/70 p-1 rounded-lg">
//                         <button onClick={() => setActiveTab('Available')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Available' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faShoppingBasket} className="mr-2"/> Available Donations
//                         </button>
//                         <button onClick={() => setActiveTab('Claimed')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Claimed' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/> My Claimed Items
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {activeTab === 'Available' && (
//               <ReceiverFilterControls 
//                   searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                   categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
//                   sortMethod={sortMethod} setSortMethod={setSortMethod}
//                   categories={categories}
//               />
//             )}

           
//             {isLoading ? (
//                 <div className="text-center py-16 text-gray-500">Loading available donations...</div>
//             ) : filteredDonations.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {filteredDonations.map(donation => {
//                       const isClaimed = activeTab === 'Claimed';
//                       return (
//                          <AvailableDonationCard 
//                               key={donation._id} 
//                               donation={donation} 
//                               onClaim={isClaimed ? () => {} : handleClaimDonation}
//                               buttonText={isClaimed ? `Status: ${donation.status}` : "Claim Donation"}
//                               isButtonDisabled={isClaimed}
//                           />
//                       )
//                   })}
//                 </div>
//             ) : (
//                  <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
//                     <h3 className="text-xl font-semibold text-neutral-700">
//                         {activeTab === 'Available' ? 'No Donations Available Right Now' : 'You Haven\'t Claimed Any Items Yet'}
//                     </h3>
//                     <p className="text-neutral-500 mt-2">
//                          {activeTab === 'Available' ? 'Please check back later, new items are added daily!' : 'When you claim a donation from the "Available" tab, it will appear here.'}
//                     </p>
//                 </div>
//             )}
//         </section>
//       </main>
//     </div>
//   )
// }

// export default ReceiverDash;




import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import ReceiverFilterControls from '../components/Dashboard/ReceiverFilterControls';
import AvailableDonationCard from '../components/Dashboard/AvailableDonationCard';
import ProfileMenu from '../components/Dashboard/ProfileMenu';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBasket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const ReceiverDash = () => {
  // State from Context, including the global 'loading' state
  const { url, token, setToken, loading } = useContext(AppContext);
  const navigate = useNavigate();

  // Component-level states
  const [availableDonations, setAvailableDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('Available');
  const [isDataLoading, setIsDataLoading] = useState(true); // For data fetching spinner
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortMethod, setSortMethod] = useState('distance-asc');

  // Helper function to format address strings
  const formatAddress = (addressObj) => {
    if (!addressObj) return '';
    return `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.pincode}`;
  };

  // Fetches available donations and calculates distance for each
  const fetchAndCalculateDistances = async () => {
    if (!token) return;
    setIsDataLoading(true);
    try {
      const profileRes = await axios.get(`${url}/api/user/profile`, { headers: { token } });
      if (!profileRes.data.success) {
        toast.error("Could not fetch your profile to calculate distances.");
        setIsDataLoading(false);
        return;
      }
      const user = profileRes.data.user;
      const donationsRes = await axios.get(`${url}/api/donation/available`, { headers: { token } });

      if (donationsRes.data.success) {
        const receiverAddress = formatAddress(user.address);
        const donationsWithDistance = await Promise.all(
          donationsRes.data.data.map(async (donation) => {
            const donorAddress = formatAddress(donation.donorId?.address);
            let distance = 'N/A';
            if (receiverAddress && donorAddress) {
              try {
                const distRes = await axios.post(`${url}/api/distance/calculate`, {
                  origin: receiverAddress,
                  destination: donorAddress
                }, { headers: { token } });
                if (distRes.data.success) {
                  distance = distRes.data.distance;
                }
              } catch (distError) {
                console.error("Distance calculation failed for one item:", distError);
              }
            }
            return { ...donation, distance };
          })
        );
        setAvailableDonations(donationsWithDistance);
      }
    } catch (error) {
      toast.error("Failed to load available donations.");
      console.error("Failed to fetch data:", error);
    }
    setIsDataLoading(false);
  };

  // Fetches donations that the current user has claimed
  const fetchClaimedDonations = async () => {
    if (!token) return;
    setIsDataLoading(true);
    try {
      const response = await axios.get(`${url}/api/donation/claimed`, { headers: { token } });
      if (response.data.success) {
        setClaimedDonations(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch claimed donations.");
    }
    setIsDataLoading(false);
  };

  // --- THIS IS THE SINGLE, CORRECT useEffect FOR DATA FETCHING ---
  // It waits for the initial app 'loading' to finish before running.
  useEffect(() => {
    if (!loading) {
      if (token) {
        if (activeTab === 'Available') {
          fetchAndCalculateDistances();
        } else {
          fetchClaimedDonations();
        }
      } else {
        navigate('/'); // If app is loaded but there's no token, go home
      }
    }
  }, [token, activeTab, loading]); // Depends on the global loading state

  // This useEffect handles filtering and sorting whenever the source data changes
  useEffect(() => {
    const sourceData = activeTab === 'Available' ? availableDonations : claimedDonations;
    let result = [...sourceData];

    if (searchTerm) {
      result = result.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== 'All') {
      result = result.filter(d => d.category === categoryFilter);
    }
    result.sort((a, b) => {
      switch (sortMethod) {
        case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
        case 'expiry-asc': return new Date(a.expiryDate) - new Date(b.expiryDate);
        case 'title-asc': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });
    setFilteredDonations(result);
  }, [availableDonations, claimedDonations, searchTerm, categoryFilter, sortMethod, activeTab]);

  const handleClaimDonation = async (donationId) => {
    try {
      const response = await axios.post(`${url}/api/donation/claim`, { donationId }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while claiming the donation.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate('/');
  };

  const categories = ['All', ...new Set(availableDonations.map(d => d.category))];
  
  // This useEffect handles clicks outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // --- THIS IS THE INITIAL LOADING SCREEN FOR THE WHOLE APP ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
      <header className="relative flex items-center justify-between px-4 py-6">
        <Link to='/' className="z-10 -ml-4">
          <img src={logo} alt="Logo" width={50} className='rounded-full'/>
        </Link>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
          Find Available Donations
        </h1>
        <div className="relative z-20" ref={profileMenuRef}>
          <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
            <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
          </button>
          {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <div>
              <div className="flex space-x-1 bg-green-100/70 p-1 rounded-lg">
                <button onClick={() => setActiveTab('Available')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Available' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
                  <FontAwesomeIcon icon={faShoppingBasket} className="mr-2"/> Available Donations
                </button>
                <button onClick={() => setActiveTab('Claimed')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Claimed' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/> My Claimed Items
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'Available' && (
            <ReceiverFilterControls 
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
              sortMethod={sortMethod} setSortMethod={setSortMethod}
              categories={categories}
            />
          )}
           
          {isDataLoading ? (
            <div className="text-center py-16 text-gray-500">Loading donations...</div>
          ) : filteredDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDonations.map(donation => {
                const isClaimedTab = activeTab === 'Claimed';
                return (
                  <AvailableDonationCard 
                    key={donation._id} 
                    donation={donation} 
                    onClaim={isClaimedTab ? () => {} : handleClaimDonation}
                    buttonText={isClaimedTab ? `Status: ${donation.status}` : "Claim Donation"}
                    isButtonDisabled={isClaimedTab}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
              <h3 className="text-xl font-semibold text-neutral-700">
                {activeTab === 'Available' ? 'No Donations Available Right Now' : 'You Haven\'t Claimed Any Items Yet'}
              </h3>
              <p className="text-neutral-500 mt-2">
                {activeTab === 'Available' ? 'Please check back later, new items are added daily!' : 'When you claim a donation from the "Available" tab, it will appear here.'}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReceiverDash;