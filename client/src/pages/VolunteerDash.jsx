import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import PendingPage from '../components/Dashboard/PendingPage';
import ApprovalModal from '../components/Dashboard/ApprovalModal';

import VolunteerFilterControls from '../components/Dashboard/VolunteerFilterControls';
import TaskCard from '../components/Dashboard/TaskCard';
import ProfileMenu from '../components/Dashboard/ProfileMenu';

import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

const VolunteerDash = () => {
  const { url, token, setToken ,loading} = useContext(AppContext);
  const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [showApprovalModal, setShowApprovalModal] = useState(false);

  const [availableTasks, setAvailableTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Available');

  
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [sortMethod, setSortMethod] = useState('distance-asc');
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

 
  const formatAddress = (addressObj) => {
    if (!addressObj) return '';
    return `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.pincode}`;
  };

 
  const fetchOpenTasks = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
        const response = await axios.get(`${url}/api/task/open`, { headers: { token } });
        if (response.data.success) {
          
            const tasksWithDistance = await Promise.all(response.data.data.map(async (task) => {
                const donorAddress = formatAddress(task.donationId?.donorId?.address);
                const receiverAddress = formatAddress(task.donationId?.claimedByReceiverId?.address);
                let distance = 'N/A'; 

                if (donorAddress && receiverAddress) {
                    try {
                        const distRes = await axios.post(`${url}/api/distance/calculate`, {
                            origin: donorAddress,
                            destination: receiverAddress
                        }, { headers: { token } });
                        if (distRes.data.success) {
                            distance = distRes.data.distance;
                        }
                    } catch (distError) {
                        console.error("Distance calculation failed for one task:", distError);
                    }
                }
                return { ...task, distance }; 
            }));
            setAvailableTasks(tasksWithDistance);
        }
    } catch (error) {
        toast.error("Failed to fetch open tasks.");
        console.error("Failed to fetch open tasks:", error);
    }
    setIsLoading(false);
  };

  
  const fetchMyTasks = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
        const response = await axios.get(`${url}/api/task/list`, { headers: { token } });
        if (response.data.success) {
         
            const myTasksWithDistance = response.data.data.map(task => ({ ...task, distance: "N/A" }));
            setMyTasks(myTasksWithDistance);
        }
    } catch (error) {
        toast.error("Failed to fetch your assigned tasks.");
        console.error("Failed to fetch your tasks:", error);
    }
    setIsLoading(false);
  };

//   useEffect(() => {
//     if (activeTab === 'Available') {
//         fetchOpenTasks();
//     } else {
//         fetchMyTasks();
//     }
//   }, [token, activeTab]);
//   useEffect(() => {
//     if (!loading) { // Only fetch data if the app is NOT loading
//         if (activeTab === 'Available') {
//             fetchOpenTasks();
//         } else {
//             fetchMyTasks();
//         }
//     }
//   }, [token, activeTab, loading]);

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
                                fetchOpenTasks();
                            } else {
                                fetchMyTasks();
                            }
                        }
                    }
                } catch (error) {
                    toast.error("Could not load your profile.");
                } finally {
                    setIsProfileLoading(false);
                    if (profile && profile.verificationStatus !== 'Verified') {
                        setIsLoading(false);
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

    // --- NEW HANDLER FOR THE MODAL ---
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
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);
  



useEffect(() => {
    const sourceData = activeTab === 'Available' ? availableTasks : myTasks;
    let result = [...sourceData];

   
    if (urgencyFilter !== 'All') {
      result = result.filter(task => task.urgency === urgencyFilter);
    }
    
    if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        result = result.filter(task => 
            (task.donationId?.donorId?.roleDetails?.organizationName || '').toLowerCase().includes(lowerCaseSearch) ||
            (task.donationId?.claimedByReceiverId?.roleDetails?.organizationName || '').toLowerCase().includes(lowerCaseSearch) ||
            (task.donationId?.title || '').toLowerCase().includes(lowerCaseSearch)
        );
    }

   
    const urgencyOrder = { 'Urgent': 1, 'Today': 2, 'Flexible': 3 };
    const parseDistance = (distStr) => {
        if (typeof distStr !== 'string' || distStr === 'N/A') return Infinity;
        const value = parseFloat(distStr);
        if (distStr.toLowerCase().includes('km')) {
            return value * 1000;
        }
        return value; 
    };

    result.sort((a, b) => {
        switch (sortMethod) {
            case 'distance-asc':
                return parseDistance(a.distance) - parseDistance(b.distance);
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'urgency':
                return (urgencyOrder[a.urgency] || 99) - (urgencyOrder[b.urgency] || 99);
            default:
                return 0;
        }
    });

    setFilteredTasks(result);
  }, [availableTasks, myTasks, activeTab, searchTerm, urgencyFilter, sortMethod]);

  const handleTaskAction = async (taskId, currentStatus) => {
    if (currentStatus === 'Open') {
        if (window.confirm("Are you sure you want to accept this task?")) {
            try {
                const response = await axios.post(`${url}/api/task/assign`, { taskId }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchOpenTasks();
                } else { 
                    toast.error(response.data.message); 
                }
            } catch (error) { 
                toast.error("An error occurred while accepting the task."); 
            }
        }
    } 
    else if (currentStatus === 'Assigned') {
        if (window.confirm("Are you sure you have completed this delivery?")) {
            try {
                const response = await axios.post(`${url}/api/task/complete/${taskId}`, {}, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                    fetchMyTasks();
                } else { 
                    toast.error(response.data.message); 
                }
            } catch (error) { 
                toast.error("An error occurred while completing the task."); 
            }
        }
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate('/');
  };
//     if (loading) {
//       return (
//           <div className="flex justify-center items-center min-h-screen">
//               <p>Loading application...</p>
//           </div>
//       );
//   }
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-orange-50/50">
        {showApprovalModal && <ApprovalModal onClose={handleCloseApprovalModal} />}
      <header className="relative flex items-center justify-between px-4 py-6">
          <Link to='/' className="z-10 -ml-4">
              <img src={logo} alt="Logo" className='rounded-full h-12 w-12 object-cover'/>
          </Link>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
              Volunteer Opportunities
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
                    <div className="flex space-x-1 bg-purple-100/70 p-1 rounded-lg">
                        <button onClick={() => setActiveTab('Available')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Available' ? 'bg-white text-purple-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
                           <FontAwesomeIcon icon={faTasks} className="mr-2"/> Available Tasks
                        </button>
                        <button onClick={() => setActiveTab('MyTasks')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'MyTasks' ? 'bg-white text-purple-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
                           <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/> My Accepted Tasks
                        </button>
                    </div>
                </div>
            </div>

            <VolunteerFilterControls 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                urgencyFilter={urgencyFilter} setUrgencyFilter={setUrgencyFilter}
                sortMethod={sortMethod} setSortMethod={setSortMethod}
            />
            
          
            {isLoading ? (
                <div className="text-center py-16 text-gray-500">Loading tasks...</div>
            ) : filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTasks.map(task => {
                        const donation = task.donationId;
                        const donor = donation?.donorId;
                        const receiver = donation?.claimedByReceiverId;
                        const taskDetails = {
                            id: task._id,
                            title: `Pickup for "${donation?.title || 'Unknown Item'}"`,
                            from: `${donor?.roleDetails?.organizationName || donor?.fullName || 'Unknown'}, ${donor?.address?.city || ''}`,
                            to: `${receiver?.roleDetails?.organizationName || receiver?.fullName || 'Unknown'}, ${receiver?.address?.city || ''}`,
                            items: donation?.type === 'Cooked' ? `${donation?.quantity?.value} ${donation?.quantity?.unit}` : donation?.quantity,
                           
                            distance: task.distance,
                            timeWindow: 'Flexible',
                            urgency: task.urgency,
                            status: task.status
                        };
                        
                        return <TaskCard 
                                    key={task._id} 
                                    task={taskDetails} 
                                    onTaskAction={handleTaskAction}
                                />
                    })}
                </div>
            ) : (
                 <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
                    <h3 className="text-xl font-semibold text-neutral-700">
                        {activeTab === 'Available' ? 'No Tasks Available Right Now' : 'You Haven\'t Accepted Any Tasks'}
                    </h3>
                    <p className="text-neutral-500 mt-2">
                         {activeTab === 'Available' ? 'Great work! Check back later.' : 'Accept a task from the "Available Tasks" tab.'}
                    </p>
                </div>
            )}
        </section>
      </main>
    </div>
  )
}

export default VolunteerDash;
