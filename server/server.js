import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyToken, verifyGoogleToken } from './middleware/auth.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://notes-app-henna-gamma.vercel.app'
];

// Pre-flight request handling
app.options('*', cors());

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('Blocked origin:', origin); // Debug logging
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, origin);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  next();
});

app.use(express.json());

// Mongoose Connection
const uri = process.env.MONGO_URI; // Use MONGO_URI from .env

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Model
import Item from './models/Item.js';

// API Endpoint
app.post('/api/items', verifyToken, async (req, res) => {
  try {
    const { name, description, type, date } = req.body;
    
    // Parse the date string (DD/MM/YYYY) and create a valid Date object
    let formattedDate;
    if (date) {
      const [day, month, year] = date.split('/');
      formattedDate = new Date(year, month - 1, day); // month is 0-based in JS Date
    } else {
      formattedDate = new Date();
    }

    const newItem = new Item({ 
      name, 
      description, 
      type, 
      date: formattedDate,
      user: req.userId 
    });

    const savedItem = await newItem.save();
    res.status(201).json({ 
      message: 'Item created successfully!', 
      item: {
        ...savedItem._doc,
        date: savedItem.date.toLocaleDateString('en-GB') // Format as DD/MM/YYYY
      }
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item', details: error.message });
  }
});

app.get("/api/items", verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ user: req.userId }).sort({ date: -1 }); // newest first, only user's items
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});


app.delete("/api/items/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized to delete this item" });
    }
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});
app.put('/api/items/:id', verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized to update this item" });
    }
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Auth endpoints
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        const payload = await verifyGoogleToken(token);
        
        let user = await User.findOne({ googleId: payload.sub });
        
        if (!user) {
            user = await User.create({
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            });
        }

        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token: jwtToken, user });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
});

// Protected route example
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update all item endpoints to use authentication

// Start Server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
