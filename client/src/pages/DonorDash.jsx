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
// import PendingPage from '../components/Dashboard/PendingPage';
import ApprovalModal from '../components/Dashboard/ApprovalModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

const DonorDash = () => {
    
    const { url, token, setToken, loading } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [donations, setDonations] = useState([]);
    const [stats, setStats] = useState({ available: 0, claimed: 0, total: 0 });
    const [showAddDonationModal, setShowAddDonationModal] = useState(false);
    // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    //  const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
const [showApprovalModal, setShowApprovalModal] = useState(false);
    const profileMenuRef = useRef(null);

   
    const fetchDonorData = async () => {
        if (!token) return;
        try {
            const [donationsRes, statsRes] = await Promise.all([
                axios.get(`${url}/api/donation/list`, { headers: { token } }),
                axios.get(`${url}/api/donation/stats`, { headers: { token } })
            ]);

            if (donationsRes.data.success) {
                setDonations(donationsRes.data.data);
            }
            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }
        } catch (error) {
            console.error("Error fetching donor data:", error);
            toast.error("Could not load your dashboard data.");
        }
    };

   
    // useEffect(() => {
       
    //     if (!loading) {
           
    //         if (token) {
    //             fetchDonorData(); 
    //         } else {
                
    //             navigate('/');
    //         }
    //     }
    // }, [token, loading]); 

    useEffect(() => {
    const fetchInitialData = async () => {
        if (token) {
            try {
                const profileRes = await axios.get(`${url}/api/user/profile`, { headers: { token } });
                if (profileRes.data.success) {
                    const userProfile = profileRes.data.user;
                    setProfile(userProfile);

                    if (userProfile.verificationStatus === 'Verified' && !userProfile.hasBeenWelcomed) {
                        setShowApprovalModal(true);
                    }
                    
                    if (userProfile.verificationStatus === 'Verified') {
                        fetchDonorData(); // Your function to get donation listings
                    }
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsProfileLoading(false);
            }
        } else if (!loading) {
             navigate('/');
        }
    };
    
    if (!loading) {
        fetchInitialData();
    }
}, [token, loading]);
    

    const handleCloseApprovalModal = async () => {
        try {
            await axios.post(`${url}/api/user/mark-welcomed`, {}, { headers: { token } });
            setShowApprovalModal(false);
        } catch (error) {
            console.error("Failed to update welcomed status", error);
            setShowApprovalModal(false);
        }
    };


   
    const handleDonationAdded = () => {
        fetchDonorData();
    };

   
    const handleQuickAdd = async (newItemData) => {
        try {
            const response = await axios.post(`${url}/api/donation/add`, newItemData, { headers: { token } });
            if (response.data.success) {
                fetchDonorData(); 
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
                    fetchDonorData(); 
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Loading application...</p></div>;
    }
    if (isProfileLoading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading Your Profile...</p></div>;
}

if (!profile) {
    return <div className="text-center py-20">Could not load user profile. Please try logging in again.</div>;
}

if (profile.verificationStatus === 'Pending') {
    return <div className="px-4 sm:px-6 lg:px-8 py-8"><PendingPage role={profile.primaryRole} /></div>;
}

// ... etc.

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
             {showApprovalModal && <ApprovalModal onClose={handleCloseApprovalModal} />}
           
            {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onDonationAdded={handleDonationAdded} />}
            
            <header className="relative flex items-center justify-between px-4 py-6">
                <Link to='/' className="z-10 -ml-4"><img src={logo} alt="Logo" width={50} className='rounded-full'/></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">Donor Dashboard</h1>
                <div className="relative z-20" ref={profileMenuRef}>
                    <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                        <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
                    </button>
                    {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
                </div>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Items Available" value={stats.available} icon={faSeedling} />
                    <StatCard title="Pickups Scheduled" value={stats.claimed} icon={faCarrot} />
                    <StatCard title="Total Donations" value={stats.total} icon={faBreadSlice} />
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
