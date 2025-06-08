// import React from 'react';

// const DonationCard = ({ donation }) => {
//   // Helper function to calculate days left until expiry
//   const getDaysLeft = (date) => {
//     const today = new Date();
//     const expiry = new Date(date);
//     const diffTime = expiry - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   };

//   const daysLeft = getDaysLeft(donation.expiryDate);

//   // Styles for different donation statuses
//   const statusStyles = {
//     Available: 'bg-green-100 text-green-800',
//     Claimed: 'bg-yellow-100 text-yellow-800',
//     Completed: 'bg-gray-200 text-gray-700',
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
//       <img className="h-48 w-full object-cover" src={donation.imageUrl} alt={donation.title} />
//       <div className="p-5 flex flex-col flex-grow">
//         <div className="flex justify-between items-start">
//             <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">{donation.title}</h3>
//             <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[donation.status]}`}>
//                 {donation.status}
//             </span>
//         </div>
//         <p className="text-sm text-neutral-500 mt-1">{donation.category}</p>
//         <p className="text-md text-neutral-700 mt-2 flex-grow">{donation.quantity}</p>
        
//         <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-neutral-600">
//             {donation.status === 'Claimed' && <p>Claimed by: <span className="font-semibold">{donation.claimedBy}</span></p>}
//             {donation.status !== 'Completed' && (
//                 <p>Expires in: <span className="font-bold">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</span></p>
//             )}
//         </div>
//       </div>
//        {donation.status === 'Available' && (
//             <div className="px-5 pb-5 mt-auto">
//                 <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition-colors">
//                     View Details
//                 </button>
//             </div>
//         )}
//     </div>
//   );
// };

// export default DonationCard;




// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// const DonationCard = ({ donation, onUpdateQuantity, onRemoveItem }) => {

//   // Styles for different donation statuses
//   const statusStyles = {
//     Listed: 'bg-blue-100 text-blue-800',
//     'Pickup Scheduled': 'bg-yellow-100 text-yellow-800',
//     Completed: 'bg-gray-200 text-gray-700',
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
//       <img className="h-48 w-full object-cover" src={donation.imageUrl} alt={donation.title} />
//       <div className="p-5 flex flex-col flex-grow">
//         <div className="flex justify-between items-start">
//             <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">{donation.title}</h3>
//             <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[donation.status]}`}>
//                 {donation.status}
//             </span>
//         </div>
//         <p className="text-sm text-neutral-500 mt-1">{donation.category} ({donation.type})</p>
        
//         {/* Quantity Display & Controls */}
//         <div className="mt-4 flex-grow">
//             {donation.type === 'Cooked' ? (
//                 <div className="flex items-center justify-between gap-4">
//                     <span className="text-lg text-neutral-700 font-medium">Quantity:</span>
//                     <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
//                         <button 
//                             onClick={() => onUpdateQuantity(donation.id, donation.quantity.value - 1)}
//                             className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full text-neutral-700 font-bold transition-colors"
//                             disabled={donation.quantity.value <= 1}
//                         >
//                             <FontAwesomeIcon icon={faMinus} />
//                         </button>
//                         <span className="text-lg font-semibold text-neutral-800 w-20 text-center">
//                             {donation.quantity.value} {donation.quantity.unit}
//                         </span>
//                         <button 
//                             onClick={() => onUpdateQuantity(donation.id, donation.quantity.value + 1)}
//                             className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full text-neutral-700 font-bold transition-colors"
//                         >
//                             <FontAwesomeIcon icon={faPlus} />
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-md text-neutral-700 mt-2">
//                     <span className="font-medium">Quantity:</span> {donation.quantity}
//                 </p>
//             )}
//         </div>
        
//       </div>
//       <div className="px-5 pb-5 mt-auto">
//           <button 
//             onClick={() => onRemoveItem(donation.id)}
//             className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors text-sm">
//               Remove Item
//           </button>
//       </div>
//     </div>
//   );
// };

// export default DonationCard;



// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// const DonationCard = ({ donation, onUpdateQuantity, onRemoveItem }) => {

//   const statusStyles = {
//     Listed: 'bg-blue-100 text-blue-800',
//     'Pickup Scheduled': 'bg-yellow-100 text-yellow-800',
//     Completed: 'bg-gray-200 text-gray-700',
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
//       <img className="h-48 w-full object-cover" src={donation.imageUrl} alt={donation.title} />
//       <div className="p-5 flex flex-col flex-grow">
//         <div className="flex justify-between items-start">
//             <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">{donation.title}</h3>
//             <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[donation.status]}`}>
//                 {donation.status}
//             </span>
//         </div>
//         <p className="text-sm text-neutral-500 mt-1">{donation.category} ({donation.type})</p>
        
//         {/* Quantity Display & Controls */}
//         <div className="mt-4 flex-grow flex items-center">
//             {donation.type === 'Cooked' ? (
//                 <div className="flex items-center justify-between gap-4 w-full">
//                     <span className="text-md text-neutral-700 font-medium">Quantity:</span>
//                     <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full p-1">
//                         <button 
//                             onClick={() => onUpdateQuantity(donation.id, donation.quantity.value - 1)}
//                             className="bg-white hover:bg-slate-200 w-8 h-8 rounded-full text-slate-700 font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                             disabled={donation.quantity.value <= 1}
//                         >
//                             <FontAwesomeIcon icon={faMinus} />
//                         </button>
//                         <span className="text-lg font-semibold text-neutral-800 w-20 text-center">
//                             {donation.quantity.value} {donation.quantity.unit}
//                         </span>
//                         <button 
//                             onClick={() => onUpdateQuantity(donation.id, donation.quantity.value + 1)}
//                             className="bg-white hover:bg-slate-200 w-8 h-8 rounded-full text-slate-700 font-bold transition-colors shadow-sm"
//                         >
//                             <FontAwesomeIcon icon={faPlus} />
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-md text-neutral-700">
//                     <span className="font-medium">Quantity:</span> {donation.quantity}
//                 </p>
//             )}
//         </div>
        
//       </div>
//       <div className="px-5 pb-5 mt-auto pt-4 border-t border-gray-100">
//           <button 
//             onClick={() => onRemoveItem(donation.id)}
//             className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors text-sm">
//               Remove Item
//           </button>
//       </div>
//     </div>
//   );
// };

// export default DonationCard;




import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const DonationCard = ({ donation, onUpdateQuantity, onRemoveItem }) => {

  const statusStyles = {
    Listed: 'bg-blue-100 text-blue-800',
    'Pickup Scheduled': 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-gray-200 text-gray-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <img className="h-48 w-full object-cover" src={donation.imageUrl} alt={donation.title} />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-neutral-800 tracking-tight">{donation.title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[donation.status]}`}>
                {donation.status}
            </span>
        </div>
        <p className="text-sm text-neutral-500 mt-1">{donation.category} ({donation.type})</p>
        
        {/* CORRECTED: Quantity Display & Controls Layout */}
        <div className="mt-4 flex-grow">
            {donation.type === 'Cooked' ? (
                <div className="flex items-center justify-between w-full">
                    <span className="text-md text-neutral-700 font-medium">Quantity:</span>
                    <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full p-1">
                        <button 
                            onClick={() => onUpdateQuantity(donation.id, donation.quantity.value - 1)}
                            className="bg-white hover:bg-slate-200 w-8 h-8 rounded-full text-slate-700 font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={donation.quantity.value <= 1}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="text-lg font-semibold text-neutral-800 w-20 text-center">
                            {donation.quantity.value} {donation.quantity.unit}
                        </span>
                        <button 
                            onClick={() => onUpdateQuantity(donation.id, donation.quantity.value + 1)}
                            className="bg-white hover:bg-slate-200 w-8 h-8 rounded-full text-slate-700 font-bold transition-colors shadow-sm"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-md text-neutral-700 mt-2">
                    <span className="font-medium">Quantity:</span> {donation.quantity}
                </p>
            )}
        </div>
        
      </div>
      <div className="px-5 pb-5 mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={() => onRemoveItem(donation.id)}
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors text-sm">
              Remove Item
          </button>
      </div>
    </div>
  );
};

export default DonationCard;
