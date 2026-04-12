const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'https://paradise-gym.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/memberships', require('./routes/membershipRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Gym Website API' });
});

// Seed route
// Seed route
app.get('/api/seed', async (req, res) => {
  try {
    const Trainer = require('./models/Trainer');
    const Class = require('./models/Class');
    const Membership = require('./models/Membership');

    // Clear existing data
    await Trainer.deleteMany({});
    await Class.deleteMany({});
    await Membership.deleteMany({});

    // Seed Trainers First (we need their IDs for classes)
    const trainers = await Trainer.insertMany([
      {
        name: 'Laxman Meena',
        email: 'laxman@paradisegym.com',
        specialization: ['Weight Training', 'Strength Training'],
        experience: 15,
        phone: '7014878955',
        bio: '15 years of experience in fitness and weight training. Dedicated to helping members achieve their fitness goals.',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8Kf2bf5L0-dFzlfWRpWXoOkgmmrPxwkyNuNPonYYXmQuEerx5Au08wLfaAR9AHnnqlgisOLVcjacAMKYUnB9h0yy1oQDBPNhLN2PfIBlkdReilJHYv1ainB1qO3uqhMgvi2yLeA=w289-h312-n-k-no',
        certifications: [],
        isActive: true
      },
      {
        name: 'Siddharth Meena',
        email: 'siddharth@paradisegym.com',
        specialization: ['Cardio', 'Muscle Building'],
        experience: 10,
        phone: '8740062864',
        bio: '10 years of experience in fitness training. Passionate about helping members transform their bodies.',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8Kf2bf5L0-dFzlfWRpWXoOkgmmrPxwkyNuNPonYYXmQuEerx5Au08wLfaAR9AHnnqlgisOLVcjacAMKYUnB9h0yy1oQDBPNhLN2PfIBlkdReilJHYv1ainB1qO3uqhMgvi2yLeA=w289-h312-n-k-no',
        certifications: [],
        isActive: true
      }
    ]);

    // Get trainer IDs
    const laxman = trainers[0]._id;
    const siddharth = trainers[1]._id;

    // Seed Classes with correct fields
    await Class.insertMany([
      {
        name: 'Weight Training',
        description: 'Build muscle and strength with expert guidance.',
        trainer: laxman,
        schedule: {
          day: 'Monday to Saturday',
          startTime: '05:00 AM',
          endTime: '10:00 PM'
        },
        capacity: 20,
        category: 'Strength',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
      },
      {
        name: 'Cardio Training',
        description: 'Burn fat and improve cardiovascular health.',
        trainer: siddharth,
        schedule: {
          day: 'Monday to Saturday',
          startTime: '05:00 AM',
          endTime: '10:00 PM'
        },
        capacity: 25,
        category: 'Cardio',
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
      },
      {
        name: 'HIIT',
        description: 'High intensity interval training for maximum fat burn.',
        trainer: siddharth,
        schedule: {
          day: 'Monday to Saturday',
          startTime: '05:00 AM',
          endTime: '10:00 PM'
        },
        capacity: 20,
        category: 'HIIT',
        difficulty: 'Advanced',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
      },
      {
        name: 'Muscle Building',
        description: 'Dedicated program for building lean muscle mass.',
        trainer: laxman,
        schedule: {
          day: 'Monday to Saturday',
          startTime: '05:00 AM',
          endTime: '10:00 PM'
        },
        capacity: 15,
        category: 'Strength',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400'
      }
    ]);

    // Seed Memberships
    await Membership.insertMany([
      {
        name: '1 Month',
        duration: 30,
        price: 1000,
        description: 'Perfect for beginners',
        isPopular: false,
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking'
        ]
      },
      {
        name: '3 Months',
        duration: 90,
        price: 2400,
        description: 'Most popular plan - Save ₹600',
        isPopular: true,
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation'
        ]
      },
      {
        name: '6 Months',
        duration: 180,
        price: 4500,
        description: 'Great value - Save ₹1500',
        isPopular: false,
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation',
          'Progress tracking'
        ]
      },
      {
        name: '1 Year',
        duration: 365,
        price: 8000,
        description: 'Best value - Save ₹4000',
        isPopular: false,
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation',
          'Progress tracking',
          'Priority support'
        ]
      }
    ]);

    res.json({ 
      message: 'Database seeded successfully!',
      data: {
        trainers: 2,
        classes: 4,
        memberships: 4
      }
    });

  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      message: error.message,
      details: error.toString()
    });
  }
});
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
