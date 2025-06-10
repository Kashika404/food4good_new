import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Make sure this path is correct

// Mock user data for a RECEIVER. In a real app, this would come from your context or API.
const mockUser = {
  organizationName: 'Community Shelter',
  contactPerson: 'John Doe',
  email: 'contact@communityshelter.org',
  role: 'Receiver',
  receiverCategory: 'Shelter (General)',
  memberSince: 'March 2024',
  profilePicture: 'https://placehold.co/128x128/3b82f6/ffffff?text=CS',
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  // Form data for editing
  const [formData, setFormData] = useState({
    organizationName: user.organizationName,
    contactPerson: user.contactPerson,
    receiverCategory: user.receiverCategory,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, you would send this formData to your backend API to update the user's profile
    console.log('Saving profile data:', formData);
    setUser(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
    alert('Profile updated successfully!'); // Replace with a better notification
  };

  // Determine the correct dashboard link based on role
  const dashboardLink = user.role === 'Donor' ? '/donor-dash' : '/receiver-dash';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
      <header className="relative flex items-center justify-between px-4 py-6">
        <Link to='/' className="z-10 -ml-4">
          <img src={logo} width={50} className='rounded-full'/>
        </Link>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
          My Profile
        </h1>
        <Link to={dashboardLink} title="Back to Dashboard" className="z-10 p-2 rounded-full hover:bg-gray-200/50 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-neutral-700" />
        </Link>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
        <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="flex-grow text-center sm:text-left">
              {!isEditing ? (
                <>
                  <h2 className="text-3xl font-bold text-neutral-800">{user.organizationName}</h2>
                  <p className="text-lg text-neutral-700 mt-1">Contact: {user.contactPerson}</p>
                  <p className="text-md text-neutral-600">{user.email}</p>
                  <div className="mt-3 flex justify-center sm:justify-start gap-3 flex-wrap">
                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{user.role}</span>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{user.receiverCategory}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-3">Member since {user.memberSince}</p>
                  <button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2 mx-auto sm:mx-0">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSave} className="w-full">
                  <div className="mb-4">
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name</label>
                    <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                   <div className="mb-4">
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
                    <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="receiverCategory" className="block text-sm font-medium text-gray-700">Receiver Category</label>
                     <select id="receiverCategory" name="receiverCategory" value={formData.receiverCategory} onChange={handleInputChange} className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500">
                        <option>Old Age Home</option>
                        <option>Women's Rescue Center</option>
                        <option>Orphanage</option>
                        <option>Shelter (General)</option>
                        <option>Food Bank/Pantry</option>
                        <option>Community Fridge</option>
                        <option>School Nutrition Program</option>
                        <option>Other</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-4">
                     <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faSave} />
                        Save Changes
                    </button>
                     <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-lg text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faTimes} />
                        Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-neutral-800">Claimed Donation History</h3>
            <p className="mt-2 text-neutral-600">
              {/* In a real application, you would map over the user's claimed donations. */}
              You have claimed <strong>12</strong> donations in the past month. Your most recent claim was for "Cooked Lentil Soup (Dal)".
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
