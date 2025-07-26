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
                         phone: currentUser.phone,
                        address: { ...currentUser.address },
                        roleDetails: { ...currentUser.roleDetails }
                    });

                    
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


    const handleStatCardClick = async (title, statusFilter = '') => {
        setModalTitle(title);
        let fetchUrl = '';
        

        if (user.primaryRole === 'Donor') {
            fetchUrl = `${url}/api/donation/list`;
        } else if (user.primaryRole === 'Receiver') {
            fetchUrl = `${url}/api/donation/claimed`;
        } else if (user.primaryRole === 'Volunteer') {
            fetchUrl = `${url}/api/task/list`; 
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
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