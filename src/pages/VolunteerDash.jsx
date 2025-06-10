import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Component Imports
import VolunteerFilterControls from '../components/Dashboard/VolunteerFilterControls';
import TaskCard from '../components/Dashboard/TaskCard';
import ProfileMenu from '../components/Dashboard/ProfileMenu';

// Asset Imports
import logo from '../assets/logo.png'; // Ensure path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// --- MOCK DATA FOR VOLUNTEER TASKS ---
const allAvailableTasks = [
  { id: 201, title: 'Pickup from Good Karma Cafe', from: 'Good Karma Cafe, Koramangala', to: 'Community Shelter, HSR Layout', items: 'Lentil Soup (5 L)', distance: '4.2 km', timeWindow: 'Today, 2 PM - 4 PM', urgency: 'Today', postedDate: new Date() },
  { id: 202, title: 'Urgent Pastry Collection', from: 'The Corner Bakery, Indiranagar', to: 'Orphanage of Hope, Domlur', items: 'Assorted Pastries (3 boxes)', distance: '2.1 km', timeWindow: 'ASAP within 2 hours', urgency: 'Urgent', postedDate: new Date(new Date().setHours(new Date().getHours() - 1)) },
  { id: 203, title: 'Grocery Run from Daily Grocers', from: 'Daily Grocers, Jayanagar', to: 'Elderly Care Home, BTM Layout', items: 'Milk & Bread (multiple items)', distance: '6.5 km', timeWindow: 'This Week (Flexible)', urgency: 'Flexible', postedDate: new Date(new Date().setDate(new Date().getDate() - 1)) },
  { id: 204, title: 'Collect Vegetables from Farmer\'s Market', from: 'City Farmer\'s Market, Malleswaram', to: 'Food Bank Center, Yeshwanthpur', items: 'Fresh Vegetables (5 crates)', distance: '8.0 km', timeWindow: 'Today, before 6 PM', urgency: 'Today', postedDate: new Date(new Date().setHours(new Date().getHours() - 3)) },
];

const VolunteerDash = () => {
  const [availableTasks, setAvailableTasks] = useState(allAvailableTasks);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Available');

  // Filter and Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [sortMethod, setSortMethod] = useState('distance-asc');
  
  // Profile Menu State
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Effect for closing profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  // Effect for filtering and sorting tasks
  useEffect(() => {
    let result = [...availableTasks];

    if (activeTab === 'MyTasks') {
      result = []; // Placeholder for tasks accepted by the user
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.from.toLowerCase().includes(lowerCaseSearch) || 
        t.to.toLowerCase().includes(lowerCaseSearch) ||
        t.title.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (urgencyFilter !== 'All') {
      result = result.filter(t => t.urgency === urgencyFilter);
    }

    result.sort((a, b) => {
        switch(sortMethod) {
            case 'distance-asc': return parseFloat(a.distance) - parseFloat(b.distance);
            case 'newest': return new Date(b.postedDate) - new Date(a.postedDate);
            case 'urgency':
                const urgencyOrder = { 'Urgent': 1, 'Today': 2, 'Flexible': 3 };
                return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
            default: return 0;
        }
    });

    setFilteredTasks(result);
  }, [availableTasks, searchTerm, urgencyFilter, sortMethod, activeTab]);
  
  const handleAcceptTask = (taskId) => {
    alert(`You have accepted task ID ${taskId}. You will receive details shortly.`);
    setAvailableTasks(prev => prev.filter(t => t.id !== taskId));
  };
  
  const handleLogout = () => {
    alert("Logout functionality triggered!");
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-orange-50/50">
      <header className="relative flex items-center justify-between px-4 py-6">
        <Link to='/' className="z-10 -ml-4">
          <img src={logo} width={50} className='rounded-full'/>
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

            {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} onAccept={handleAcceptTask} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16 px-6 bg-white/50 rounded-xl">
                    <h3 className="text-xl font-semibold text-neutral-700">
                        {activeTab === 'Available' ? 'No Tasks Available Right Now' : 'You Haven\'t Accepted Any Tasks'}
                    </h3>
                    <p className="text-neutral-500 mt-2">
                         {activeTab === 'Available' ? 'Great work! All tasks are currently handled. Please check back later.' : 'Accepted tasks will appear here.'}
                    </p>
                </div>
            )}
        </section>
      </main>
    </div>
  )
}

export default VolunteerDash;
