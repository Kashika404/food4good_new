import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const AddDonationModal = ({ setShowModal, onDonationAdded }) => {
    const { url, token } = useContext(AppContext);

    // Form field states
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Cooked');
    const [category, setCategory] = useState('');
    const [cookedQuantityValue, setCookedQuantityValue] = useState('');
    const [cookedQuantityUnit, setCookedQuantityUnit] = useState('kg');
    const [uncookedQuantity, setUncookedQuantity] =useState('');
    const [pickupInstructions, setPickupInstructions] = useState('');
    
 
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("You must be logged in.");
            return;
        }
        if (!image) {
            alert("Please select an image for the donation.");
            return;
        }

      
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        formData.append("category", category);
        formData.append("pickupInstructions", pickupInstructions);
        formData.append("image", image); 

     
        if (type === 'Cooked') {
            const numericValue = parseFloat(cookedQuantityValue);
            if (isNaN(numericValue) || numericValue <= 0) {
                alert('Please enter a valid numeric quantity.');
                return;
            }
            
            formData.append("quantity", JSON.stringify({ value: numericValue, unit: cookedQuantityUnit }));
        } else {
            if (!uncookedQuantity.trim()) {
                alert('Please enter a quantity.');
                return;
            }
            formData.append("quantity", uncookedQuantity.trim());
        }

        try {
          
            const response = await axios.post(`${url}/api/donation/add`, formData, { headers: { token } });
            if (response.data.success) {
                alert(response.data.message);
                onDonationAdded(); 
                setShowModal(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error adding donation:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
            <form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-lg'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium mb-5'>Add a Full Donation</h1>

                <div className='border px-6 py-2 rounded-full mt-4'>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Donation Title (e.g., Vegetable Curry)" className="outline-none text-sm w-full" required />
                </div>
                
           
                <div className='border px-6 py-2 rounded-full mt-4'>
                    <label htmlFor="image-upload" className="text-sm text-gray-500">Upload Image: </label>
                    <input id="image-upload" type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="outline-none text-sm" required />
                </div>

                <div className='border px-6 py-2 rounded-full mt-4'>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="outline-none text-sm w-full bg-transparent text-slate-500">
                        <option value="Cooked">Cooked Meal</option>
                        <option value="Uncooked">Uncooked Item(s)</option>
                    </select>
                </div>

                <div className='border px-6 py-2 rounded-full mt-4'>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (e.g., Prepared Meals, Veg)" className="outline-none text-sm w-full" required />
                </div>

                {type === 'Cooked' ? (
                    <div className="flex gap-2 mt-4">
                        <input type="number" value={cookedQuantityValue} onChange={(e) => setCookedQuantityValue(e.target.value)} placeholder="e.g., 10" className="border px-6 py-2 rounded-full w-2/3 outline-none text-sm" min="0.1" step="0.1" required />
                        <select value={cookedQuantityUnit} onChange={(e) => setCookedQuantityUnit(e.target.value)} className="border px-6 py-2 rounded-full w-1/3 outline-none text-sm bg-transparent text-slate-500">
                            <option value="kg">kg</option>
                            <option value="L">Litres</option>
                            <option value="servings">Servings</option>
                        </select>
                    </div>
                ) : (
                    <div className='border px-6 py-2 rounded-full mt-4'>
                        <input type="text" value={uncookedQuantity} onChange={(e) => setUncookedQuantity(e.target.value)} placeholder="Quantity (e.g., 2 crates, approx. 15 kg)" className="outline-none text-sm w-full" required />
                    </div>
                )}
                
                <div className='border px-6 py-2 rounded-full mt-4'>
                    <input type="text" value={pickupInstructions} onChange={(e) => setPickupInstructions(e.target.value)} placeholder="Pickup Instructions (Optional)" className="outline-none text-sm w-full" />
                </div>

                <button type="submit" className='bg-orange-400 w-full text-white py-2 rounded-full mt-6'>
                    Add Donation
                </button>

                <img onClick={() => setShowModal(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="close" />
            </form>
        </div>
    );
};

export default AddDonationModal;