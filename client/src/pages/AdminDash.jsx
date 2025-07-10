
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';

const AdminDash = () => {
    const { url, token } = useContext(AppContext);
    const [pendingUsers, setPendingUsers] = useState([]);

  
    const fetchPendingUsers = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${url}/api/admin/pending-users`, {
                headers: { token }
            });
            if (response.data.success) {
                setPendingUsers(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch pending users:", error);
            toast.error("You may not have admin access, or a server error occurred.");
        }
    };

   
    useEffect(() => {
        fetchPendingUsers();
    }, [token]);

    
    const handleApproveUser = async (userId) => {
        if (window.confirm("Are you sure you want to approve this user?")) {
            try {
                const response = await axios.post(`${url}/api/admin/approve/${userId}`, {}, { headers: { token } });
                if (response.data.success) {
                    alert(response.data.message);
                    fetchPendingUsers();
                }
            } catch (error) {
                toast.error("Failed to approve user.");
            }
        }
    };

    const handleRejectUser = async (userId) => {
         if (window.confirm("Are you sure you want to reject this user?")) {
            try {
                const response = await axios.post(`${url}/api/admin/reject/${userId}`, {}, { headers: { token } });
                if (response.data.success) {
                    alert(response.data.message);
                    fetchPendingUsers(); 
                }
            } catch (error) {
                toast.error("Failed to reject user.");
            }
        }
        
    };

     const handleCleanupTasks = async () => {
        if (window.confirm("Are you sure you want to permanently delete all invalid tasks? This action cannot be undone.")) {
            try {
                const response = await axios.delete(`${url}/api/task/cleanup-orphaned`, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error("Failed to clean up tasks.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <header className="flex items-center justify-between pb-6 border-b">
                <Link to='/' className="flex items-center gap-3">
                    <img src={logo} alt="Logo" className="h-12 w-12 rounded-full object-cover" />
                    <h1 className="text-2xl font-semibold text-neutral-700">Admin Dashboard</h1>
                </Link>
                <p className="font-semibold text-slate-600">User Verification</p>
            </header>

            <main className="mt-8">
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Pending Approvals ({pendingUsers.length})</h2>
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">ID Document</th>
                                <th scope="col" className="px-6 py-3">Date Joined</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.length > 0 ? pendingUsers.map(user => (
                                <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.primaryRole}</td>
                                   
                                    <td className="px-6 py-4">
                                        <a 
                                            href={`${url}/${user.identity?.documentUrl}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            View ID
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button onClick={() => handleApproveUser(user._id)} className="font-medium text-green-600 hover:underline">Approve</button>
                                        <button onClick={() => handleRejectUser(user._id)} className="font-medium text-red-600 hover:underline">Reject</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                   
                                    <td colSpan="6" className="text-center py-8 text-gray-500">No users are currently pending approval.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="mt-12">
                     <h2 className="text-xl font-bold text-neutral-800 mb-4">Data Maintenance</h2>
                     <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">Clean Up Invalid Tasks</p>
                            <p className="text-sm text-gray-600 mt-1">This will permanently remove any tasks that are linked to non-existent or incomplete donations.</p>
                        </div>
                        <button
                            onClick={handleCleanupTasks}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            Run Cleanup
                        </button>
                     </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDash;
