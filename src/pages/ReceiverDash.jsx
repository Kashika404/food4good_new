// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Component Imports
// import ReceiverFilterControls from '../components/Dashboard/ReceiverFilterControls';
// import AvailableDonationCard from '../components/Dashboard/AvailableDonationCard';

// // Asset Imports
// import logo from '../assets/logo.png'; // Ensure path is correct
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faShoppingBasket, faCheckCircle, faHistory } from '@fortawesome/free-solid-svg-icons';

// // --- MOCK DATA FOR ALL AVAILABLE DONATIONS ---
// // In a real app, you'd fetch this from your backend. It includes items from MULTIPLE donors.
// const allAvailableDonations = [
//   { id: 101, donor: 'Good Karma Cafe', title: 'Cooked Lentil Soup (Dal)', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 5, unit: 'L' }, imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Lentil+Soup', expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)), distance: '2.5 km' },
//   { id: 102, donor: 'Jane Doe', title: 'Fresh Tomatoes', type: 'Uncooked', category: 'Vegetables', quantity: 'Approx. 15 kg', imageUrl: 'https://placehold.co/600x400/f87171/ffffff?text=Tomatoes', expiryDate: new Date(new Date().setDate(new Date().getDate() + 4)), distance: '1.2 km' },
//   { id: 103, donor: 'The Corner Bakery', title: 'Assorted Pastries', type: 'Uncooked', category: 'Bakery', quantity: '3 boxes', imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Pastries', expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)), distance: '5.8 km' },
//   { id: 104, donor: 'Daily Grocers', title: 'Milk Cartons', type: 'Uncooked', category: 'Dairy', quantity: '20 cartons', imageUrl: 'https://placehold.co/600x400/60a5fa/ffffff?text=Milk', expiryDate: new Date(new Date().setDate(new Date().getDate() + 5)), distance: '3.1 km' },
// ];

// const ReceiverDash = () => {
//   const [availableDonations, setAvailableDonations] = useState(allAvailableDonations);
//   const [filteredDonations, setFilteredDonations] = useState([]);
//   const [activeTab, setActiveTab] = useState('Available'); // Tabs: Available, Claimed

//   // State for filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [sortMethod, setSortMethod] = useState('distance-asc');

//   // Filtering and sorting logic
//   useEffect(() => {
//     let result = [...availableDonations];

//     // In a real app, you would have separate lists for 'Available' and 'Claimed' donations.
//     // For this mock, we'll just filter the main list. 'Claimed' tab will be empty for now.
//     if (activeTab === 'Claimed') {
//       result = []; // Placeholder for claimed items logic
//     }

//     if (searchTerm) {
//       result = result.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
//     }

//     if (categoryFilter !== 'All') {
//       result = result.filter(d => d.category === categoryFilter);
//     }

//     result.sort((a, b) => {
//         switch(sortMethod) {
//             case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
//             case 'expiry-asc': return new Date(a.expiryDate) - new Date(b.expiryDate);
//             case 'title-asc': return a.title.localeCompare(b.title);
//             default: return 0;
//         }
//     });

//     setFilteredDonations(result);
//   }, [availableDonations, searchTerm, categoryFilter, sortMethod, activeTab]);
  
//   const handleClaimDonation = (donationId) => {
//     // In a real app, this would make an API call.
//     // Here, we just simulate it by removing the item from the available list.
//     alert(`Donation with ID ${donationId} has been claimed!`);
//     setAvailableDonations(prev => prev.filter(d => d.id !== donationId));
//   };

//   const categories = ['All', ...new Set(allAvailableDonations.map(d => d.category))];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
      
//       <header className="relative flex items-center justify-between px-4 py-6">
//         <Link to='/' className="z-10 -ml-4">
//           <img src={logo} width={50} className='rounded-full'/>
//         </Link>
//         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
//           Find Available Donations
//         </h1>
//         {/* You would have a profile menu here too */}
//         <FontAwesomeIcon icon={faUser} className="text-2xl text-neutral-700 cursor-pointer z-10" />
//       </header>

//       <main className="px-4 sm:px-6 lg:px-8 py-8">
//         <section>
//             <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
//                 <div>
//                     <div className="flex space-x-1 bg-green-100/70 p-1 rounded-lg">
//                         <button onClick={() => setActiveTab('Available')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Available' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faShoppingBasket} className="mr-2"/> Available Donations
//                         </button>
//                         <button onClick={() => setActiveTab('Claimed')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Claimed' ? 'bg-white text-green-600 shadow-sm' : 'text-neutral-600 hover:bg-white/50'}`}>
//                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2"/> My Claimed Items
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <ReceiverFilterControls 
//                 searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                 categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
//                 sortMethod={sortMethod} setSortMethod={setSortMethod}
//                 categories={categories}
//             />

//             {filteredDonations.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {filteredDonations.map(donation => (
//                         <AvailableDonationCard key={donation.id} donation={donation} onClaim={handleClaimDonation} />
//                     ))}
//                 </div>
//             ) : (
//                  <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
//                     <h3 className="text-xl font-semibold text-neutral-700">
//                         {activeTab === 'Available' ? 'No Donations Available Right Now' : 'You Haven\'t Claimed Any Items Yet'}
//                     </h3>
//                     <p className="text-neutral-500 mt-2">
//                          {activeTab === 'Available' ? 'Please check back later, or adjust your filters.' : 'Claimed items will appear here.'}
//                     </p>
//                 </div>
//             )}
//         </section>
//       </main>
//     </div>
//   )
// }

// export default ReceiverDash;



import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Component Imports
import ReceiverFilterControls from '../components/Dashboard/ReceiverFilterControls';
import AvailableDonationCard from '../components/Dashboard/AvailableDonationCard';
import ProfileMenu from '../components/Dashboard/ProfileMenu'; // <-- Make sure this is imported

// Asset Imports
import logo from '../assets/logo.png'; // Ensure path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBasket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// --- MOCK DATA FOR ALL AVAILABLE DONATIONS ---
const allAvailableDonations = [
  { id: 101, donor: 'Good Karma Cafe', title: 'Cooked Lentil Soup (Dal)', type: 'Cooked', category: 'Prepared Meals', quantity: { value: 5, unit: 'L' }, imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Lentil+Soup', expiryDate: new Date(new Date().setDate(new Date().getDate() + 2)), distance: '2.5 km' },
  { id: 102, donor: 'Jane Doe', title: 'Fresh Tomatoes', type: 'Uncooked', category: 'Vegetables', quantity: 'Approx. 15 kg', imageUrl: 'https://placehold.co/600x400/f87171/ffffff?text=Tomatoes', expiryDate: new Date(new Date().setDate(new Date().getDate() + 4)), distance: '1.2 km' },
  { id: 103, donor: 'The Corner Bakery', title: 'Assorted Pastries', type: 'Uncooked', category: 'Bakery', quantity: '3 boxes', imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=Pastries', expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)), distance: '5.8 km' },
  { id: 104, donor: 'Daily Grocers', title: 'Milk Cartons', type: 'Uncooked', category: 'Dairy', quantity: '20 cartons', imageUrl: 'https://placehold.co/600x400/60a5fa/ffffff?text=Milk', expiryDate: new Date(new Date().setDate(new Date().getDate() + 5)), distance: '3.1 km' },
];

const ReceiverDash = () => {
  const [availableDonations, setAvailableDonations] = useState(allAvailableDonations);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('Available');

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortMethod, setSortMethod] = useState('distance-asc');

  // --- ADDED: State and Ref for profile menu ---
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // --- ADDED: Effect to handle clicks outside the profile menu ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
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

  // Filtering and sorting logic
  useEffect(() => {
    let result = [...availableDonations];
    if (activeTab === 'Claimed') {
      result = [];
    }
    if (searchTerm) {
      result = result.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== 'All') {
      result = result.filter(d => d.category === categoryFilter);
    }
    result.sort((a, b) => {
        switch(sortMethod) {
            case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
            case 'expiry-asc': return new Date(a.expiryDate) - new Date(b.expiryDate);
            case 'title-asc': return a.title.localeCompare(b.title);
            default: return 0;
        }
    });
    setFilteredDonations(result);
  }, [availableDonations, searchTerm, categoryFilter, sortMethod, activeTab]);
  
  const handleClaimDonation = (donationId) => {
    alert(`Donation with ID ${donationId} has been claimed!`);
    setAvailableDonations(prev => prev.filter(d => d.id !== donationId));
  };

  const handleLogout = () => {
    console.log("Receiver logged out");
    alert("Logout functionality triggered!");
    setIsProfileMenuOpen(false);
  };

  const categories = ['All', ...new Set(allAvailableDonations.map(d => d.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-green-50/50">
      
      <header className="relative flex items-center justify-between px-4 py-6">
        <Link to='/' className="z-10 -ml-4">
          <img src={logo} width={50} className='rounded-full'/>
        </Link>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-neutral-700">
          Find Available Donations
        </h1>
        
        {/* --- UPDATED: Profile Icon Section --- */}
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

            <ReceiverFilterControls 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
                sortMethod={sortMethod} setSortMethod={setSortMethod}
                categories={categories}
            />

            {filteredDonations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDonations.map(donation => (
                        <AvailableDonationCard key={donation.id} donation={donation} onClaim={handleClaimDonation} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
                    <h3 className="text-xl font-semibold text-neutral-700">
                        {activeTab === 'Available' ? 'No Donations Available Right Now' : 'You Haven\'t Claimed Any Items Yet'}
                    </h3>
                    <p className="text-neutral-500 mt-2">
                         {activeTab === 'Available' ? 'Please check back later, or adjust your filters.' : 'Claimed items will appear here.'}
                    </p>
                </div>
            )}
        </section>
      </main>
    </div>
  )
}

export default ReceiverDash;
