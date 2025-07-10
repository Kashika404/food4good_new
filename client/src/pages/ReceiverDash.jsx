
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
import PendingPage from '../components/Dashboard/PendingPage';
import ApprovalModal from '../components/Dashboard/ApprovalModal.jsx';
import { toast } from 'react-toastify';

const ReceiverDash = () => {
  
  const { url, token, setToken, loading } = useContext(AppContext);
  const navigate = useNavigate();

   const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [showApprovalModal, setShowApprovalModal] = useState(false);

 
  const [availableDonations, setAvailableDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('Available');
  const [isDataLoading, setIsDataLoading] = useState(true); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortMethod, setSortMethod] = useState('distance-asc');

  
  const formatAddress = (addressObj) => {
    if (!addressObj) return '';
    return `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.pincode}`;
  };

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

  
  // useEffect(() => {
  //   if (!loading) {
  //     if (token) {
  //       if (activeTab === 'Available') {
  //         fetchAndCalculateDistances();
  //       } else {
  //         fetchClaimedDonations();
  //       }
  //     } else {
  //       navigate('/'); 
  //     }
  //   }
  // }, [token, activeTab, loading]); 

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
                            
                            if (activeTab === 'Available') {
                                fetchAndCalculateDistances();
                            } else {
                                fetchClaimedDonations();
                            }
                        }
                    }
                } catch (error) {
                    toast.error("Could not load your profile.");
                } finally {
                    setIsProfileLoading(false);
                   
                    if (profile && profile.verificationStatus !== 'Verified') {
                        setIsDataLoading(false);
                    }
                }
            } else if (!loading) {
                navigate('/');
            }
        };

        if (!loading) {
            fetchInitialData();
        }
    }, [token, loading, activeTab]); 
     const handleCloseApprovalModal = async () => {
        try {
            await axios.post(`${url}/api/user/mark-welcomed`, {}, { headers: { token } });
            setShowApprovalModal(false);
        } catch (error) {
            console.error("Failed to update welcomed status", error);
            setShowApprovalModal(false);
        }
    };


 
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

  
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p>Loading application...</p>
  //     </div>
  //   );
  // }
  if (isProfileLoading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Loading Your Profile...</p></div>;
    }

    if (!profile) {
        return <div className="text-center py-20">Could not load user profile. Please try logging in again.</div>;
    }

    if (profile.verificationStatus === 'Pending') {
        return <div className="px-4 sm:px-6 lg:px-8 py-8"><PendingPage role={profile.primaryRole} /></div>;
    }

    if (profile.verificationStatus === 'Rejected') {
        return <div className="text-center py-20">Your account application was not approved. Please contact support for more information.</div>;
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
      {showApprovalModal && <ApprovalModal onClose={handleCloseApprovalModal} />}
            
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