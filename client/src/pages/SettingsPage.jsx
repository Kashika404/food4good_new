
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    
    const { url, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            toast.success("New passwords do not match!");
            return;
        }

        if (!newPassword || newPassword.length < 8) {
            toast.success("New password must be at least 8 characters long.");
            return;
        }

        try {
            const response = await axios.post(
                `${url}/api/user/change-password`, 
                { currentPassword, newPassword }, 
                { headers: { token } }
            );

            alert(response.data.message);

            if (response.data.success) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
        }
    };

  
    const handleDeleteAccount = async () => {
        
        if (window.confirm("Are you absolutely sure you want to delete your account? This action is irreversible and will permanently delete all your data.")) {
            try {
                await axios.delete(`${url}/api/user/delete-account`, { headers: { token } });
                alert("Account deleted successfully.");
                
                
                setToken(null);
                localStorage.removeItem("token");

              
                navigate('/');
            } catch (error) {
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-gray-100/50">
            <header className="relative flex items-center justify-between px-4 py-6">
                <Link to='/' className="z-10 -ml-4">
                    <img src={logo} width={50} className='rounded-full'/>
                </Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
                    Account Settings
                </h1>
                <Link to="/profile" title="Back to Profile" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
                </Link>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faKey} className="text-orange-500"/>
                        Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <input 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            placeholder="Current Password" 
                            className="w-full p-2 border border-gray-300 rounded-lg" 
                            required 
                        />
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="New Password" 
                            className="w-full p-2 border border-gray-300 rounded-lg" 
                            required 
                        />
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm New Password" 
                            className="w-full p-2 border border-gray-300 rounded-lg" 
                            required 
                        />
                        <div className="text-right">
                            <button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-full text-sm">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-red-300">
                    <h2 className="text-xl font-bold text-red-600 flex items-center gap-3 mb-2">
                         <FontAwesomeIcon icon={faTrashAlt} />
                        Danger Zone
                    </h2>
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <p className="text-md text-neutral-700 font-medium">Delete This Account</p>
                            <p className="text-sm text-neutral-500 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors whitespace-nowrap"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;