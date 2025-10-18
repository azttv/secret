const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Password verification endpoint
app.post('/api/verify-password', (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Merci de remplir ce champ.' 
    });
  }

  const correctPassword = process.env.SECRET_PASSWORD || 'Vanilla2024';
  
  if (password.trim() === correctPassword) {
    const promoCode = process.env.PROMO_CODE || 'Hg9xYrP';
    return res.json({ 
      success: true, 
      promoCode: promoCode,
      message: 'Mot de passe valide !'
    });
  } else {
    return res.json({ 
      success: false, 
      message: 'Mot de passe incorrect' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});