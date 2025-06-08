





import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const uncookedItems = [
    { title: 'Tomatoes', category: 'Vegetables' },
    { title: 'Potatoes', category: 'Vegetables' },
    { title: 'Onions', category: 'Vegetables' },
    { title: 'Apples', category: 'Fruits' },
    { title: 'Bananas', category: 'Fruits' },
    { title: 'Rice', category: 'Grains' },
    { title: 'Wheat Flour', category: 'Grains' },
    { title: 'Lentils (Dal)', category: 'Pulses' },
    { title: 'Milk', category: 'Dairy' },
    { title: 'Eggs', category: 'Dairy' },
];

const QuickAddForm = ({ onAddDonation }) => {
    const [selectedItem, setSelectedItem] = useState(uncookedItems[0].title);
    
    // CORRECTED: State is split into numeric value and unit for better validation
    const [quantityValue, setQuantityValue] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const numericValue = parseFloat(quantityValue);

        // CORRECTED: Stricter validation for the two new fields
        if (!selectedItem) {
            alert('Please select an item.');
            return;
        }
        if (isNaN(numericValue) || numericValue <= 0) {
            alert('Please enter a valid number greater than 0 for the quantity.');
            return;
        }
        if (!quantityUnit.trim()) {
            alert('Please enter a unit for the quantity (e.g., kg, items, crates).');
            return;
        }

        const itemDetails = uncookedItems.find(item => item.title === selectedItem);

        // We combine the validated inputs into a single string to pass up
        const formattedQuantity = `${numericValue} ${quantityUnit.trim()}`;

        onAddDonation({
            type: 'Uncooked',
            title: itemDetails.title,
            category: itemDetails.category,
            quantity: formattedQuantity, // Pass the combined string
        });

        // Reset form
        setQuantityValue('');
        setQuantityUnit('');
    };

    return (
        <div className="mb-8 p-4 bg-white/60 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-neutral-700 mb-2">Quick Add Uncooked Item</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Item Selection - takes up 2 columns on medium screens */}
                <div className="relative md:col-span-2">
                    <select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg appearance-none focus:ring-orange-500 focus:border-orange-500 bg-white h-full"
                    >
                        {uncookedItems.map(item => (
                            <option key={item.title} value={item.title}>{item.title} ({item.category})</option>
                        ))}
                    </select>
                </div>
                
                {/* CORRECTED: Split Quantity Input */}
                <div className="relative">
                    <input
                        type="number" // Use type="number" for numeric input
                        placeholder="e.g., 10"
                        value={quantityValue}
                        onChange={(e) => setQuantityValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        min="0.1" // Set a minimum value
                        step="0.1" // Allow decimals
                    />
                </div>
                <div className="relative">
                     <input
                        type="text"
                        placeholder="Unit (kg, items, etc.)"
                        value={quantityUnit}
                        onChange={(e) => setQuantityUnit(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
                 {/* The submit button is now automatically placed as the last item in the grid */}
            </form>
             {/* Submit button moved outside the grid for better layout control */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSubmit} // Trigger submit handler on click
                    className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default QuickAddForm;
