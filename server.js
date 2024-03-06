const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(cors());

app.get('/get-otp', async (req, res) => {
    const { username, mobile_no } = req.query;

    try {
        const response = await axios.get(`https://mis.eregistrationukgov.in/Sro_Esearch.asmx/GetOtp`, {
            params: {
                username: username,
                mobile_no: mobile_no
            }
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching OTP:', error);
        res.status(500).json({ error: 'Failed to fetch OTP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
