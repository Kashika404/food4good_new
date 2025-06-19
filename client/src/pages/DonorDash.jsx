// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // <-- Import useNavigate
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';

// // Component Imports (make sure paths are correct)
// import StatCard from '../components/Dashboard/StatCard';
// import QuickAddForm from '../components/Dashboard/QuickAddForm';
// import DonationList from '../components/Dashboard/DonationList';
// import AddDonationModal from '../components/Dashboard/AddDonationModal';
// import ProfileMenu from '../components/Dashboard/ProfileMenu';

// // Asset Imports
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// const DonorDash = () => {
//   const { url, token, setToken } = useContext(AppContext);
//   const navigate = useNavigate(); // <-- Initialize navigate hook
  
//   const [donations, setDonations] = useState([]);
//   const [showAddDonationModal, setShowAddDonationModal] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const profileMenuRef = useRef(null);

//   // --- FUNCTION TO FETCH DONOR'S DONATIONS ---
//   const fetchDonations = async () => {
//     if (token) {
//         try {
//             const response = await axios.get(`${url}/api/donation/list`, { headers: { token } });
//             if (response.data.success) {
//                 setDonations(response.data.data);
//             } else {
//                 console.error("Failed to fetch donations:", response.data.message);
//             }
//         } catch (error) {
//             console.error("Error fetching donations:", error);
//         }
//     }
//   };

//   // Fetch donations when the component loads (and token is available)
//   useEffect(() => {
//     if(token) {
//         fetchDonations();
//     }
//   }, [token]);

//   // Effect for closing profile menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsProfileMenuOpen(false);
//       }
//     };
//     if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isProfileMenuOpen]);

//   const handleQuickAdd = async (newItemData) => {
//     try {
//         const response = await axios.post(`${url}/api/donation/add`, newItemData, { headers: { token } });
//         if (response.data.success) {
//             alert("Quick add successful!");
//             fetchDonations(); // Refresh the list
//         } else {
//             alert(response.data.message);
//         }
//     } catch (error) {
//         alert("An error occurred during quick add.");
//     }
//   };

//   const handleUpdateQuantity = async (donationId, newQuantityValue) => {
//     if (newQuantityValue < 1) return;
    
//     const donation = donations.find(d => d._id === donationId);
//     if (!donation) return;

//     const payload = {
//         donationId,
//         newQuantity: {
//             value: newQuantityValue,
//             unit: donation.quantity.unit
//         }
//     };

//     try {
//         const response = await axios.post(`${url}/api/donation/update-quantity`, payload, { headers: { token } });
//         if (response.data.success) {
//             // Provide instant UI feedback, then refetch for consistency
//             setDonations(prev => prev.map(item => item._id === donationId ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } } : item));
//         } else {
//             alert(response.data.message);
//         }
//     } catch (error) {
//         console.error("Error updating quantity:", error);
//         alert("An error occurred while updating quantity.");
//     }
//   };

//   const handleRemoveItem = async (donationId) => {
//     if (window.confirm("Are you sure you want to permanently remove this donation listing?")) {
//         try {
//             const response = await axios.post(`${url}/api/donation/remove`, { id: donationId }, { headers: { token } });
//             if (response.data.success) {
//                 alert(response.data.message);
//                 fetchDonations(); // Refresh the list to show the item has been removed
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error("Error removing donation:", error);
//             alert("An error occurred while removing the item.");
//         }
//     }
//   };

//   // --- FINAL LOGOUT FUNCTION ---
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     navigate('/'); // Redirect to homepage
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
      
//       {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onDonationAdded={fetchDonations} />}

//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           Together, We Make a Difference
//         </h1>
//         <div className="relative z-20" ref={profileMenuRef}>
//             <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                 <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
//             </button>
//             <ProfileMenu onLogout={handleLogout} />
//         </div>
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8">
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             <StatCard title="Items Available" value={donations.filter(d => d.status === 'Available').length} icon={faSeedling} />
//             <StatCard title="Pickups Scheduled" value={donations.filter(d => d.status === 'Claimed').length} icon={faCarrot} />
//             <StatCard title="Total Listed Items" value={donations.length} icon={faBreadSlice} />
//         </section>
//         <section>
//             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                 <h2 className="text-2xl font-bold text-neutral-800">My Donation Listings</h2>
//                  <button onClick={() => setShowAddDonationModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//                     <FontAwesomeIcon icon={faPlus} />
//                     Make a Full Donation
//                 </button>
//             </div>
//             <QuickAddForm onAddDonation={handleQuickAdd} /> 
//             <DonationList 
//                 donations={donations} 
//                 onUpdateQuantity={handleUpdateQuantity} 
//                 onRemoveItem={handleRemoveItem}
//             />
//         </section>
//       </main>
//     </div>
//   )
// }

// export default DonorDash;




// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import StatCard from '../components/Dashboard/StatCard';
// import QuickAddForm from '../components/Dashboard/QuickAddForm';
// import DonationList from '../components/Dashboard/DonationList';
// import AddDonationModal from '../components/Dashboard/AddDonationModal';
// import ProfileMenu from '../components/Dashboard/ProfileMenu';
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// const DonorDash = () => {
//     const { url, token, setToken } = useContext(AppContext);
//     const navigate = useNavigate();
    
//     const [donations, setDonations] = useState([]);
//     const [showAddDonationModal, setShowAddDonationModal] = useState(false);
//     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
//     // This ref is attached to the dropdown's container div
//     const profileMenuRef = useRef(null);

//     // This block of code handles all the API calls and logic
//     const fetchDonations = async () => { /* ...existing logic... */ };
//     useEffect(() => { if(token) fetchDonations(); }, [token]);
//     const handleQuickAdd = async (newItemData) => { /* ...existing logic... */ };
//     const handleUpdateQuantity = async (donationId, newQuantityValue) => { /* ...existing logic... */ };
//     const handleRemoveItem = async (donationId) => { /* ...existing logic... */ };
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         setToken(null);
//         navigate('/');
//     };

//     // This useEffect hook contains the specific fix for the dropdown menu
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//                 setIsProfileMenuOpen(false);
//             }
//         };
//         if (isProfileMenuOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isProfileMenuOpen]);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
//             {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onDonationAdded={fetchDonations} />}
//             <header className="relative flex items-center justify-between px-4 py-6">
//                 <Link to='/' className="z-10 -ml-4">
//                     <img src={logo} width={50} className='rounded-full'/>
//                 </Link>
//                 <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//                     Together, We Make a Difference
//                 </h1>
                
//                 {/* The ref is attached here to the parent div */}
//                 <div className="relative z-20" ref={profileMenuRef}>
//                     <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
//                         <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
//                     </button>
//                     {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
//                 </div>
//             </header>
//             <main className="px-4 sm:px-6 lg:px-8 py-8">
//                 <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                     <StatCard title="Items Available" value={donations.filter(d => d.status === 'Available').length} icon={faSeedling} />
//                     <StatCard title="Pickups Scheduled" value={donations.filter(d => d.status === 'Claimed').length} icon={faCarrot} />
//                     <StatCard title="Total Listed Items" value={donations.length} icon={faBreadSlice} />
//                 </section>
//                 <section>
//                     <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                         <h2 className="text-2xl font-bold text-neutral-800">My Donation Listings</h2>
//                          <button onClick={() => setShowAddDonationModal(true)} className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//                             <FontAwesomeIcon icon={faPlus} />
//                             Make a Full Donation
//                         </button>
//                     </div>
//                     <QuickAddForm onAddDonation={handleQuickAdd} /> 
//                     <DonationList 
//                         donations={donations} 
//                         onUpdateQuantity={handleUpdateQuantity} 
//                         onRemoveItem={handleRemoveItem}
//                     />
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default DonorDash;



import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import StatCard from '../components/Dashboard/StatCard';
import QuickAddForm from '../components/Dashboard/QuickAddForm';
import DonationList from '../components/Dashboard/DonationList';
import AddDonationModal from '../components/Dashboard/AddDonationModal';
import ProfileMenu from '../components/Dashboard/ProfileMenu';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --- NEW: Import toast ---
import { toast } from 'react-toastify';
import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const DonorDash = () => {
    const { url, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [donations, setDonations] = useState([]);
    const [showAddDonationModal, setShowAddDonationModal] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    // --- FETCHES ALL DONATIONS FOR THE LOGGED-IN DONOR ---
    const fetchDonations = async () => {
        if (token) {
            try {
                const response = await axios.get(`${url}/api/donation/list`, { headers: { token } });
                if (response.data.success) {
                    setDonations(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        }
    };

    // --- RUNS WHEN THE COMPONENT LOADS TO GET INITIAL DATA ---
    useEffect(() => {
        if (token) {
            fetchDonations();
        }
    }, [token]);

    // --- HANDLES ADDING A DONATION FROM THE QUICK ADD FORM ---
    const handleQuickAdd = async (newItemData) => {
        try {
            const response = await axios.post(`${url}/api/donation/add`, newItemData, { headers: { token } });
            if (response.data.success) {
                fetchDonations(); // Refresh the list from the server
                toast.success("Item added quickly!");
                
            } else {
                // alert(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            // alert("An error occurred during quick add.");
            toast.error("An error occurred during quick add.");
        }
    };
    
    // --- HANDLES UPDATING THE QUANTITY OF A DONATION ---
    const handleUpdateQuantity = async (donationId, newQuantityValue) => {
        if (newQuantityValue < 1) return;
        
        const donation = donations.find(d => d._id === donationId);
        if (!donation) return;

        const payload = { 
            donationId, 
            newQuantity: { value: newQuantityValue, unit: donation.quantity.unit } 
        };

        try {
            const response = await axios.post(`${url}/api/donation/update-quantity`, payload, { headers: { token } });
            if (response.data.success) {
                // Update UI instantly for a better user experience
                setDonations(prev => prev.map(item => 
                    item._id === donationId ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } } : item
                ));
                toast.success("Quantity updated.");
            } else {
                // alert(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            // alert("An error occurred while updating quantity.");
                toast.error("An error occurred while updating quantity.");

        }
    };
    
    // --- HANDLES REMOVING A DONATION ---
    const handleRemoveItem = async (donationId) => {
        if (window.confirm("Are you sure you want to permanently remove this donation listing?")) {
            try {
                const response = await axios.post(`${url}/api/donation/remove`, { id: donationId }, { headers: { token } });
                if (response.data.success) {
                    fetchDonations(); // Refresh the list from the server
                    toast.success(response.data.message);
                } else {
                    // alert(response.data.message);
                    toast.error(response.data.message);
                }
            } catch (error) {
                // alert("An error occurred while removing the item.");
                toast.error("An error occurred while removing the item.");
            }
        }
    };

    // --- HANDLES LOGOUT AND DROPDOWN MENU LOGIC ---
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileMenuOpen]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
            {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onDonationAdded={fetchDonations} />}
            
            <header className="relative flex items-center justify-between px-4 py-6">
                <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">Together, We Make a Difference</h1>
                <div className="relative z-20" ref={profileMenuRef}>
                    <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                        <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
                    </button>
                    {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
                </div>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Items Available" value={donations.filter(d => d.status === 'Available').length} icon={faSeedling} />
                    <StatCard title="Pickups Scheduled" value={donations.filter(d => d.status === 'Claimed').length} icon={faCarrot} />
                    <StatCard title="Total Listed Items" value={donations.length} icon={faBreadSlice} />
                </section>
                <section>
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-neutral-800">My Donation Listings</h2>
                        <button onClick={() => setShowAddDonationModal(true)} className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faPlus} /> Make a Full Donation
                        </button>
                    </div>
                    {/* The onAddDonation prop is now correctly wired to the handleQuickAdd function */}
                    <QuickAddForm onAddDonation={handleQuickAdd} /> 
                    <DonationList 
                        donations={donations} 
                        onUpdateQuantity={handleUpdateQuantity} 
                        onRemoveItem={handleRemoveItem}
                    />
                </section>
            </main>
        </div>
    );
};

export default DonorDash;