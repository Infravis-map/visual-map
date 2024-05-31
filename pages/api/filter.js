// pages/api/filter.js
import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
    console.log('Request body:', req.body);
    console.log('Request method:', req.method);
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests are allowed' });
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error response:', errorText);
            res.status(response.status).json({ message: `Server error: ${response.statusText}`, details: errorText });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
