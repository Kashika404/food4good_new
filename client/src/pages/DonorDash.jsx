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
// import { toast } from 'react-toastify';
// import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// const DonorDash = () => {
//     const { url, token, setToken } = useContext(AppContext);
//     const navigate = useNavigate();
    
//     const [donations, setDonations] = useState([]);
//     const [showAddDonationModal, setShowAddDonationModal] = useState(false);
//     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//     const profileMenuRef = useRef(null);

    
//     const fetchDonations = async () => {
//         if (token) {
//             try {
//                 const response = await axios.get(`${url}/api/donation/list`, { headers: { token } });
//                 if (response.data.success) {
//                     setDonations(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching donations:", error);
//             }
//         }
//     };

   
//     useEffect(() => {
//         if (token) {
//             fetchDonations();
//         }
//     }, [token]);

  
//     const handleQuickAdd = async (newItemData) => {
//         try {
//             const response = await axios.post(`${url}/api/donation/add`, newItemData, { headers: { token } });
//             if (response.data.success) {
//                 fetchDonations();
//                 toast.success("Item added quickly!");
                
//             } else {
          
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
            
//             toast.error("An error occurred during quick add.");
//         }
//     };
    
    
//     const handleUpdateQuantity = async (donationId, newQuantityValue) => {
//         if (newQuantityValue < 1) return;
        
//         const donation = donations.find(d => d._id === donationId);
//         if (!donation) return;

//         const payload = { 
//             donationId, 
//             newQuantity: { value: newQuantityValue, unit: donation.quantity.unit } 
//         };

//         try {
//             const response = await axios.post(`${url}/api/donation/update-quantity`, payload, { headers: { token } });
//             if (response.data.success) {
                
//                 setDonations(prev => prev.map(item => 
//                     item._id === donationId ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } } : item
//                 ));
//                 toast.success("Quantity updated.");
//             } else {
               
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
            
//                 toast.error("An error occurred while updating quantity.");

//         }
//     };
    

//     const handleRemoveItem = async (donationId) => {
//         if (window.confirm("Are you sure you want to permanently remove this donation listing?")) {
//             try {
//                 const response = await axios.post(`${url}/api/donation/remove`, { id: donationId }, { headers: { token } });
//                 if (response.data.success) {
//                     fetchDonations(); 
//                     toast.success(response.data.message);
//                 } else {
                    
//                     toast.error(response.data.message);
//                 }
//             } catch (error) {
              
//                 toast.error("An error occurred while removing the item.");
//             }
//         }
//     };


//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         setToken(null);
//         navigate('/');
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//                 setIsProfileMenuOpen(false);
//             }
//         };
//         if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [isProfileMenuOpen]);

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
//             {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onDonationAdded={fetchDonations} />}
            
//             <header className="relative flex items-center justify-between px-4 py-6">
//                 <Link to='/' className="z-10 -ml-4"><img src={logo} width={50} className='rounded-full'/></Link>
//                 <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">Together, We Make a Difference</h1>
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
//                         <button onClick={() => setShowAddDonationModal(true)} className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
//                             <FontAwesomeIcon icon={faPlus} /> Make a Full Donation
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
import { toast } from 'react-toastify';
import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const DonorDash = () => {
    const { url, token, setToken ,loading} = useContext(AppContext);
    const navigate = useNavigate();
    
    const [donations, setDonations] = useState([]);
    const [showAddDonationModal, setShowAddDonationModal] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    
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

   
    // useEffect(() => {
    //     if (token) {
    //         fetchDonations();
    //     }
    // }, [token]);

    useEffect(() => {
        // Only run fetchDonations AFTER the initial loading is false.
        if (!loading) {
            fetchDonations();
        }
    }, [token, loading]);

        if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading your dashboard...</p>
            </div>
        );
    }

  
    const handleQuickAdd = async (newItemData) => {
        try {
            const response = await axios.post(`${url}/api/donation/add`, newItemData, { headers: { token } });
            if (response.data.success) {
                fetchDonations();
                toast.success("Item added quickly!");
                
            } else {
          
                toast.error(response.data.message);
            }
        } catch (error) {
            
            toast.error("An error occurred during quick add.");
        }
    };
    
    
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
                
                setDonations(prev => prev.map(item => 
                    item._id === donationId ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } } : item
                ));
                toast.success("Quantity updated.");
            } else {
               
                toast.error(response.data.message);
            }
        } catch (error) {
            
                toast.error("An error occurred while updating quantity.");

        }
    };
    

    const handleRemoveItem = async (donationId) => {
        if (window.confirm("Are you sure you want to permanently remove this donation listing?")) {
            try {
                const response = await axios.post(`${url}/api/donation/remove`, { id: donationId }, { headers: { token } });
                if (response.data.success) {
                    fetchDonations(); 
                    toast.success(response.data.message);
                } else {
                    
                    toast.error(response.data.message);
                }
            } catch (error) {
              
                toast.error("An error occurred while removing the item.");
            }
        }
    };


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