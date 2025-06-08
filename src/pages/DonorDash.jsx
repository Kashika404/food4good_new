

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Component Imports
// import StatCard from '../components/Dashboard/StatCard';
// import QuickAddForm from '../components/Dashboard/QuickAddForm';
// import DonationList from '../components/Dashboard/DonationList';
// import AddDonationModal from '../components/Dashboard/AddDonationModal'; // <-- Import the new modal

// // Asset Imports
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// // --- MOCK DATA ---
// const initialDonations = [
//   { id: 1, title: 'Cooked Lentil Soup (Dal)', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 5, unit: 'L' }, imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Lentil+Soup', status: 'Listed' },
//   { id: 2, title: 'Fresh Tomatoes', type: 'Uncooked', category: 'Vegetables', quantity: 'Approx. 15 kg', imageUrl: 'https://placehold.co/600x400/f87171/ffffff?text=Tomatoes', status: 'Pickup Scheduled' },
//   { id: 3, title: 'Cooked Vegetable Curry', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 10, unit: 'kg' }, imageUrl: 'https://placehold.co/600x400/84cc16/ffffff?text=Veg+Curry', status: 'Listed' },
// ];

// const DonorDash = () => {
//   const [donations, setDonations] = useState(initialDonations);
//   // --- NEW STATE for controlling the modal ---
//   const [showAddDonationModal, setShowAddDonationModal] = useState(false);

//   // Updated function to handle adding ANY new donation
//   const handleAddDonation = (newItemData) => {
//     // Validation is now handled inside the modal form
//     const newDonation = {
//         id: Date.now(),
//         ...newItemData,
//         // Use a default image if none is provided in the form
//         imageUrl: newItemData.imageUrl || `https://placehold.co/600x400/a3a3a3/ffffff?text=${newItemData.title.replace(/\s/g, '+')}`,
//         status: 'Listed',
//     };
//     setDonations(prevDonations => [newDonation, ...prevDonations]);
//   };

//   // Function to update quantity of a COOKED item
//   const handleUpdateQuantity = (itemId, newQuantityValue) => {
//     if (newQuantityValue < 1) return;
//     setDonations(prevDonations => 
//         prevDonations.map(item => 
//             item.id === itemId 
//             ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } }
//             : item
//         )
//     );
//   };

//   // Function to remove an item from the list
//   const handleRemoveItem = (itemId) => {
//     if(window.confirm("Are you sure you want to remove this item?")) {
//         setDonations(prevDonations => prevDonations.filter(item => item.id !== itemId));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
      
//       {/* Conditionally render the new modal */}
//       {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onAddDonation={handleAddDonation} />}

//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           Together, We Make a Difference
//         </h1>
//         <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer z-10" />
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8">
        
//         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             <StatCard title="Items Listed" value={donations.filter(d => d.status === 'Listed').length} icon={faSeedling} />
//             <StatCard title="Pickups Scheduled" value={donations.filter(d => d.status === 'Pickup Scheduled').length} icon={faCarrot} />
//             <StatCard title="Total Listed Items" value={donations.length} icon={faBreadSlice} />
//         </section>

//         <section>
//             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                 <h2 className="text-2xl font-bold text-neutral-800">My Donation Listings</h2>
//                  <button 
//                     className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
//                     // --- UPDATED to open the modal ---
//                     onClick={() => setShowAddDonationModal(true)} 
//                  >
//                     <FontAwesomeIcon icon={faPlus} />
//                     Make a Full Donation
//                 </button>
//             </div>

//             <QuickAddForm onAddDonation={handleAddDonation} />
            
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


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Component Imports
import StatCard from '../components/Dashboard/StatCard';
import QuickAddForm from '../components/Dashboard/QuickAddForm';
import DonationList from '../components/Dashboard/DonationList';
import AddDonationModal from '../components/Dashboard/AddDonationModal';
import ProfileMenu from '../components/Dashboard/ProfileMenu';

// Asset Imports
import logo from '../assets/logo.png'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSeedling, faCarrot, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// --- MOCK DATA ---
const initialDonations = [
  { id: 1, title: 'Cooked Lentil Soup (Dal)', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 5, unit: 'L' }, imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Lentil+Soup', status: 'Listed' },
  { id: 2, title: 'Fresh Tomatoes', type: 'Uncooked', category: 'Vegetables', quantity: 'Approx. 15 kg', imageUrl: 'https://placehold.co/600x400/f87171/ffffff?text=Tomatoes', status: 'Pickup Scheduled' },
  { id: 3, title: 'Cooked Vegetable Curry', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 10, unit: 'kg' }, imageUrl: 'https://placehold.co/600x400/84cc16/ffffff?text=Veg+Curry', status: 'Listed' },
];

const DonorDash = () => {
  const [donations, setDonations] = useState(initialDonations);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Effect to handle clicks outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuf.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleAddDonation = (newItemData) => {
    const newDonation = { 
        id: Date.now(), 
        ...newItemData, 
        imageUrl: newItemData.imageUrl || `https://placehold.co/600x400/a3a3a3/ffffff?text=${newItemData.title.replace(/\s/g, '+')}`, 
        status: 'Listed' 
    };
    setDonations(prevDonations => [newDonation, ...prevDonations]);
  };

  const handleUpdateQuantity = (itemId, newQuantityValue) => {
    if (newQuantityValue < 1) return;
    setDonations(prevDonations => 
        prevDonations.map(item => 
            item.id === itemId 
            ? { ...item, quantity: { ...item.quantity, value: newQuantityValue } } 
            : item
        )
    );
  };

  const handleRemoveItem = (itemId) => {
    if(window.confirm("Are you sure you want to remove this item?")) {
        setDonations(prevDonations => prevDonations.filter(item => item.id !== itemId));
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    alert("Logout functionality triggered!");
    setIsProfileMenuOpen(false);
    // In a real app: navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-orange-50/50">
      
      {showAddDonationModal && <AddDonationModal setShowModal={setShowAddDonationModal} onAddDonation={handleAddDonation} />}

      <header className="relative flex items-center justify-between px-4 py-6">
        <Link to='/' className="z-10 -ml-4">
          <img src={logo} width={50} className='rounded-full'/>
        </Link>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
          Together, We Make a Difference
        </h1>
        
        <div className="relative z-20" ref={profileMenuRef}>
            <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
                <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer" />
            </button>
            {isProfileMenuOpen && <ProfileMenu onLogout={handleLogout} />}
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard title="Items Listed" value={donations.filter(d => d.status === 'Listed').length} icon={faSeedling} />
            <StatCard title="Pickups Scheduled" value={donations.filter(d => d.status === 'Pickup Scheduled').length} icon={faCarrot} />
            <StatCard title="Total Listed Items" value={donations.length} icon={faBreadSlice} />
        </section>
        <section>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-neutral-800">My Donation Listings</h2>
                 <button onClick={() => setShowAddDonationModal(true)} className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faPlus} />
                    Make a Full Donation
                </button>
            </div>
            <QuickAddForm onAddDonation={handleAddDonation} />
            <DonationList 
                donations={donations} 
                onUpdateQuantity={handleUpdateQuantity} 
                onRemoveItem={handleRemoveItem}
            />
        </section>
      </main>
    </div>
  )
}

export default DonorDash;
