import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faKey, faBell, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Make sure this path is correct

// A simple reusable toggle switch component
const ToggleSwitch = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-md text-neutral-700">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);


const SettingsPage = () => {
    // State for password fields
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for notification toggles
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (!newPassword || newPassword.length < 6) {
            alert("New password must be at least 6 characters long.");
            return;
        }
        // In a real app, you'd send this to your backend API
        console.log({ oldPassword, newPassword });
        alert("Password change request sent!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you absolutely sure you want to delete your account? This action is irreversible and will permanently delete all your data.")) {
            // In a real app, this would trigger a series of backend API calls
            console.log("Account deletion initiated.");
            alert("Account deletion request received.");
            // navigate('/'); // Redirect user after deletion
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
                {/* A back button could be useful, linking to the last dashboard or profile */}
                <Link to="/profile" title="Back to Profile" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
                </Link>
            </header>

            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">
                {/* Change Password Section */}
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faKey} className="text-orange-500"/>
                        Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Current Password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
                        <div className="text-right">
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg text-sm transition-colors">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notification Preferences Section */}
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-3 mb-2">
                         <FontAwesomeIcon icon={faBell} className="text-blue-500"/>
                        Notification Preferences
                    </h2>
                    <div className="divide-y divide-gray-200">
                        <ToggleSwitch label="Email Notifications" enabled={emailNotifications} setEnabled={setEmailNotifications} />
                        <ToggleSwitch label="Push Notifications" enabled={pushNotifications} setEnabled={setPushNotifications} />
                    </div>
                </div>

                 {/* Account Actions Section */}
                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg border border-red-200">
                    <h2 className="text-xl font-bold text-neutral-800 flex items-center gap-3 mb-4">
                         <FontAwesomeIcon icon={faTrashAlt} className="text-red-500"/>
                        Account Actions
                    </h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-md text-neutral-700 font-medium">Delete Account</p>
                            <p className="text-sm text-neutral-500 mt-1">Permanently remove your account and all associated data.</p>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg text-sm transition-colors whitespace-nowrap"
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
