import axios from 'axios';

export const calculateDistance = async (req, res) => {
    const { origin, destination } = req.body;
    const apiKey = process.env.Maps_API_KEY;

    if (!origin || !destination) {
        return res.status(400).json({ success: false, message: "Origin and destination are required." });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${apiKey}`;
        
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
            const distanceText = response.data.rows[0].elements[0].distance.text;
            const durationText = response.data.rows[0].elements[0].duration.text;
            
            res.json({ success: true, distance: distanceText, duration: durationText });
        } else {
            // Handle cases where Google Maps can't find a route
            res.json({ success: true, distance: 'N/A', duration: 'N/A' });
        }
    } catch (error) {
        console.error("Google Maps API Error:", error.message);
        res.status(500).json({ success: false, message: 'Failed to calculate distance.' });
    }
};