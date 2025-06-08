import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUtensils, faTag, faBoxOpen, faImage, faClipboard } from '@fortawesome/free-solid-svg-icons';

const AddDonationModal = ({ setShowModal, onAddDonation }) => {
  // State for all form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Cooked'); // Default to 'Cooked'
  const [category, setCategory] = useState('');
  
  // State for conditional quantity fields
  const [cookedQuantityValue, setCookedQuantityValue] = useState('');
  const [cookedQuantityUnit, setCookedQuantityUnit] = useState('kg');
  const [uncookedQuantity, setUncookedQuantity] = useState('');

  const [pickupInstructions, setPickupInstructions] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let donationData = {};

    // --- Validation and Data Structuring ---
    if (type === 'Cooked') {
      const numericValue = parseFloat(cookedQuantityValue);
      if (isNaN(numericValue) || numericValue <= 0) {
        alert('Please enter a valid numeric quantity for cooked food.');
        return;
      }
      donationData = {
        title,
        type,
        category,
        quantity: { value: numericValue, unit: cookedQuantityUnit },
      };
    } else { // Uncooked
      const quantityTrimmed = uncookedQuantity.trim();
      const containsNumber = /\d/.test(quantityTrimmed);
      if (!quantityTrimmed || !containsNumber) {
        alert('Please enter a valid quantity for uncooked food (e.g., "10 kg").');
        return;
      }
      donationData = {
        title,
        type,
        category,
        quantity: quantityTrimmed,
      };
    }
    
    // Add optional fields
    if (pickupInstructions.trim()) {
        donationData.pickupInstructions = pickupInstructions.trim();
    }
    if (imageFile) {
        // In a real app, you'd upload the file and use the returned URL
        donationData.imageUrl = URL.createObjectURL(imageFile);
    }

    onAddDonation(donationData);
    setShowModal(false); // Close modal on successful submission
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4 overflow-y-auto'>
      <form onSubmit={handleSubmit} className='relative bg-white p-6 sm:p-10 rounded-xl text-slate-500 shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-5'>Add a New Donation</h1>
        
        {/* Donation Title */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Donation Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Vegetable Curry, Fresh Apples" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
        </div>

        {/* Donation Type (Cooked/Uncooked) */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500">
                <option value="Cooked">Cooked Meal</option>
                <option value="Uncooked">Uncooked Item(s)</option>
            </select>
        </div>

        {/* Category */}
        <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Prepared Meals, Vegetables, Fruits" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
        </div>

        {/* Conditional Quantity Fields */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            {type === 'Cooked' ? (
                <div className="flex gap-2">
                    <input type="number" value={cookedQuantityValue} onChange={(e) => setCookedQuantityValue(e.target.value)} placeholder="e.g., 10" className="w-2/3 p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" min="0.1" step="0.1" required />
                    <select value={cookedQuantityUnit} onChange={(e) => setCookedQuantityUnit(e.target.value)} className="w-1/3 p-2 border border-gray-300 rounded-lg bg-white focus:ring-orange-500 focus:border-orange-500">
                        <option value="kg">kg</option>
                        <option value="L">Litres</option>
                        <option value="servings">Servings</option>
                    </select>
                </div>
            ) : (
                <input type="text" value={uncookedQuantity} onChange={(e) => setUncookedQuantity(e.target.value)} placeholder="e.g., 2 crates, approx. 15 kg" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" required />
            )}
        </div>
        
        {/* Optional Fields */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"/>
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Instructions (Optional)</label>
            <textarea value={pickupInstructions} onChange={(e) => setPickupInstructions(e.target.value)} placeholder="e.g., Please come to the back door, call upon arrival" rows="3" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"></textarea>
        </div>

        <button type="submit" className='bg-orange-500 hover:bg-orange-600 w-full text-white py-3 rounded-lg font-semibold transition-colors'>
            Add Donation to List
        </button>

        <button type="button" onClick={() => setShowModal(false)} className='absolute top-5 right-5 cursor-pointer p-2 rounded-full hover:bg-gray-200'>
             <FontAwesomeIcon icon={faTimes} className="text-gray-600 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default AddDonationModal;
