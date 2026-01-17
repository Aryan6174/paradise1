const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import Models
const User = require('./models/User');
const Trainer = require('./models/Trainer');
const Class = require('./models/Class');
const Membership = require('./models/Membership');
const Contact = require('./models/Contact');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Paradise Gym Trainers Data
const trainersData = [
  {
    name: 'Laxman Meena',
    email: 'laxmanmeena@paradisegym.in',
    phone: '+91 70148 78955',
    specialization: ['Strength Training', 'Weight Loss', 'Muscle Building', 'Functional Workouts'],
    experience: 15,
    bio: 'With over 15 years of experience in the fitness industry, Laxman Meena is a highly dedicated and passionate gym trainer. He specializes in strength training, weight loss, muscle building, and functional workouts. Laxman believes in training smart, maintaining proper form, and building long-term healthy habits. His personalized training approach helps members achieve consistent results while staying motivated and injury-free.',
    image: '/images/trainers/laxman-meena.jpg',
    certifications: ['Certified Personal Trainer', 'Strength & Conditioning Specialist', 'Nutrition Expert'],
    socialMedia: {
      instagram: 'https://instagram.com/laxmanmeena642'
    },
    isActive: true
  },
  {
    name: 'Siddharth Meena',
    email: 'siddharthmeena@paradisegym.in',
    phone: '+91 87400 62864',
    specialization: ['Fat Loss', 'Strength Conditioning', 'Flexibility Training', 'Wellness'],
    experience: 15,
    bio: 'Siddharth Meena is a certified fitness trainer with 15 years of hands-on experience in helping clients transform their lifestyle through fitness. His expertise includes fat loss programs, strength conditioning, flexibility training, and overall wellness. Known for his disciplined yet friendly approach, Siddharth focuses on both physical fitness and mental strength, ensuring every client feels confident, strong, and healthy.',
    image: '/images/trainers/siddharth-meena.jpg',
    certifications: ['Certified Fitness Trainer', 'Fat Loss Specialist', 'Wellness Coach'],
    socialMedia: {
      instagram: 'https://instagram.com/siddharth1997fitness'
    },
    isActive: true
  }
];

// Paradise Gym Memberships Data (Prices in INR)
const membershipsData = [
  {
    name: '1 Month',
    price: 1000,
    duration: 30,
    description: 'Perfect for trying out our gym facilities',
    features: [
      'Full gym access',
      'Cardio equipment',
      'Strength training equipment',
      'Free weights access',
      'Locker room access',
      'Free parking',
      'Trainer guidance',
      'Diet consultation'
    ],
    isPopular: false
  },
  {
    name: '2 Months',
    price: 1800,
    duration: 60,
    description: 'Great value for short-term commitment',
    features: [
      'Full gym access',
      'Cardio equipment',
      'Strength training equipment',
      'Free weights access',
      'Locker room access',
      'Free parking',
      'Trainer guidance',
      'Diet consultation',
      'Progress tracking'
    ],
    isPopular: false
  },
  {
    name: '3 Months',
    price: 2500,
    duration: 90,
    description: 'Most popular choice for visible results',
    features: [
      'Full gym access',
      'Cardio equipment',
      'Strength training equipment',
      'Free weights access',
      'Locker room access',
      'Free parking',
      'Personal trainer guidance',
      'Customized diet plan',
      'Progress tracking',
      'Body composition analysis'
    ],
    isPopular: true
  },
  {
    name: '6 Months',
    price: 4500,
    duration: 180,
    description: 'Commit to your transformation journey',
    features: [
      'Full gym access',
      'Cardio equipment',
      'Strength training equipment',
      'Free weights access',
      'Locker room access',
      'Free parking',
      'Personal trainer guidance',
      'Customized diet plan',
      'Progress tracking',
      'Body composition analysis',
      'Priority support',
      'Guest pass (1/month)'
    ],
    isPopular: false
  },
  {
    name: '1 Year',
    price: 8000,
    duration: 365,
    description: 'Best value - Complete yearly access',
    features: [
      'Full gym access',
      'Cardio equipment',
      'Strength training equipment',
      'Free weights access',
      'Locker room access',
      'Free parking',
      'Dedicated personal trainer',
      'Customized diet & nutrition plan',
      'Weekly progress tracking',
      'Monthly body composition analysis',
      'Priority support',
      'Guest passes (2/month)',
      'Freeze option (up to 15 days)',
      'Free gym merchandise'
    ],
    isPopular: false
  }
];

// Sample Contact Messages
const contactsData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    subject: 'Membership Inquiry',
    message: 'Hi, I want to know about the 3-month membership plan. What are the timings and facilities available? I live near Goner Mod.',
    status: 'pending'
  },
  {
    name: 'Priya Verma',
    email: 'priya.verma@gmail.com',
    phone: '+91 87654 32109',
    subject: 'Personal Training',
    message: 'I am interested in personal training sessions for weight loss. Can you please share the details and pricing?',
    status: 'pending'
  },
  {
    name: 'Amit Kumar',
    email: 'amit.kumar@gmail.com',
    phone: '+91 76543 21098',
    subject: 'Trial Session',
    message: 'Is there a free trial session available? I would like to visit the gym before taking membership.',
    status: 'resolved'
  }
];

// Seed Function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('\n🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Trainer.deleteMany({});
    await Class.deleteMany({});
    await Membership.deleteMany({});
    await Contact.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create Admin User (Laxman Meena - Owner)
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('Paradise@2024', 10);
    const admin = await User.create({
      name: 'Laxman Meena',
      email: 'admin@paradisegym.in',
      password: adminPassword,
      phone: '+91 70148 78955',
      role: 'admin'
    });
    console.log(`✅ Admin created: ${admin.email}\n`);

    // Create Staff User (Siddharth Meena)
    console.log('👤 Creating staff user...');
    const staffPassword = await bcrypt.hash('Staff@2024', 10);
    const staff = await User.create({
      name: 'Siddharth Meena',
      email: 'siddharth@paradisegym.in',
      password: staffPassword,
      phone: '+91 87400 62864',
      role: 'admin'
    });
    console.log(`✅ Staff created: ${staff.email}\n`);

    // Create Sample Member Users
    console.log('👥 Creating sample members...');
    const userPassword = await bcrypt.hash('member123', 10);
    
    const usersData = [
      {
        name: 'Rajesh Sharma',
        email: 'rajesh.sharma@gmail.com',
        password: userPassword,
        phone: '+91 98765 11111'
      },
      {
        name: 'Neha Gupta',
        email: 'neha.gupta@gmail.com',
        password: userPassword,
        phone: '+91 98765 22222'
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@gmail.com',
        password: userPassword,
        phone: '+91 98765 33333'
      },
      {
        name: 'Pooja Meena',
        email: 'pooja.meena@gmail.com',
        password: userPassword,
        phone: '+91 98765 44444'
      },
      {
        name: 'Arjun Yadav',
        email: 'arjun.yadav@gmail.com',
        password: userPassword,
        phone: '+91 98765 55555'
      }
    ];

    const users = await User.insertMany(usersData);
    console.log(`✅ ${users.length} members created\n`);

    // Create Trainers
    console.log('🏋️ Creating trainers...');
    const trainers = await Trainer.insertMany(trainersData);
    console.log(`✅ ${trainers.length} trainers created\n`);

    // Create Memberships
    console.log('💳 Creating memberships...');
    const memberships = await Membership.insertMany(membershipsData);
    console.log(`✅ ${memberships.length} memberships created\n`);

    // Create Sample Classes/Sessions
    console.log('📚 Creating gym sessions...');
    const classesData = [
      {
        name: 'Morning Strength Training',
        description: 'Start your day with an intense strength training session. Focus on major muscle groups with proper form and progressive overload techniques.',
        trainer: trainers[0]._id, // Laxman Meena
        schedule: { day: 'Monday', startTime: '06:00 AM', endTime: '07:30 AM' },
        capacity: 15,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
        difficulty: 'Intermediate',
        category: 'Strength'
      },
      {
        name: 'Weight Loss Program',
        description: 'Comprehensive weight loss session combining cardio and strength exercises. Designed to maximize calorie burn and improve metabolism.',
        trainer: trainers[1]._id, // Siddharth Meena
        schedule: { day: 'Monday', startTime: '07:00 PM', endTime: '08:30 PM' },
        capacity: 20,
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
        difficulty: 'Beginner',
        category: 'Cardio'
      },
      {
        name: 'Muscle Building Session',
        description: 'Focused session on muscle hypertrophy. Includes compound and isolation exercises with proper nutrition guidance.',
        trainer: trainers[0]._id, // Laxman Meena
        schedule: { day: 'Tuesday', startTime: '06:00 AM', endTime: '07:30 AM' },
        capacity: 12,
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600',
        difficulty: 'Advanced',
        category: 'Strength'
      },
      {
        name: 'Cardio Blast',
        description: 'High-energy cardio session to improve cardiovascular health and endurance. Includes treadmill, cycling, and rowing.',
        trainer: trainers[1]._id, // Siddharth Meena
        schedule: { day: 'Tuesday', startTime: '05:30 PM', endTime: '06:30 PM' },
        capacity: 20,
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600',
        difficulty: 'Beginner',
        category: 'Cardio'
      },
      {
        name: 'Functional Training',
        description: 'Train for real-life movements. Improve strength, balance, and coordination with functional exercises.',
        trainer: trainers[0]._id, // Laxman Meena
        schedule: { day: 'Wednesday', startTime: '06:00 AM', endTime: '07:00 AM' },
        capacity: 15,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
        difficulty: 'Intermediate',
        category: 'Strength'
      },
      {
        name: 'Evening Strength Session',
        description: 'End your day with a powerful strength training session. Focus on proper form and muscle engagement.',
        trainer: trainers[1]._id, // Siddharth Meena
        schedule: { day: 'Wednesday', startTime: '07:00 PM', endTime: '08:30 PM' },
        capacity: 15,
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600',
        difficulty: 'Intermediate',
        category: 'Strength'
      },
      {
        name: 'Fat Loss Circuit',
        description: 'High-intensity circuit training designed for maximum fat burning. Combines strength and cardio exercises.',
        trainer: trainers[0]._id, // Laxman Meena
        schedule: { day: 'Thursday', startTime: '06:00 AM', endTime: '07:00 AM' },
        capacity: 18,
        image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600',
        difficulty: 'Advanced',
        category: 'HIIT'
      },
      {
        name: 'Flexibility & Stretching',
        description: 'Improve flexibility and prevent injuries with guided stretching and mobility exercises.',
        trainer: trainers[1]._id, // Siddharth Meena
        schedule: { day: 'Thursday', startTime: '08:00 PM', endTime: '09:00 PM' },
        capacity: 25,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
        difficulty: 'Beginner',
        category: 'Yoga'
      },
      {
        name: 'Power Lifting Basics',
        description: 'Learn the fundamentals of powerlifting - squat, bench press, and deadlift with proper technique.',
        trainer: trainers[0]._id, // Laxman Meena
        schedule: { day: 'Friday', startTime: '06:00 AM', endTime: '07:30 AM' },
        capacity: 10,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
        difficulty: 'Advanced',
        category: 'Strength'
      },
      {
        name: 'Weekend Warrior Workout',
        description: 'Intense full-body workout to kickstart your weekend. Combines all elements of fitness.',
        trainer: trainers[1]._id, // Siddharth Meena
        schedule: { day: 'Saturday', startTime: '08:00 AM', endTime: '09:30 AM' },
        capacity: 20,
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600',
        difficulty: 'Intermediate',
        category: 'HIIT'
      }
    ];

    const classes = await Class.insertMany(classesData);
    console.log(`✅ ${classes.length} sessions created\n`);

    // Create Contacts
    console.log('📧 Creating sample inquiries...');
    const contacts = await Contact.insertMany(contactsData);
    console.log(`✅ ${contacts.length} inquiries created\n`);

    // Update users with membership
    console.log('🔄 Updating members with memberships...');
    const threemonthMembership = memberships.find(m => m.name === '3 Months');
    const oneMonthMembership = memberships.find(m => m.name === '1 Month');
    
    const expiryDate90 = new Date();
    expiryDate90.setDate(expiryDate90.getDate() + 90);
    
    const expiryDate30 = new Date();
    expiryDate30.setDate(expiryDate30.getDate() + 30);

    // Rajesh Sharma - 3 Month member with sessions
    await User.findByIdAndUpdate(users[0]._id, {
      membership: threemonthMembership._id,
      membershipExpiry: expiryDate90,
      enrolledClasses: [classes[0]._id, classes[2]._id]
    });

    // Neha Gupta - 1 Month member
    await User.findByIdAndUpdate(users[1]._id, {
      membership: oneMonthMembership._id,
      membershipExpiry: expiryDate30,
      enrolledClasses: [classes[1]._id]
    });

    console.log('✅ Members updated with memberships\n');

    // Summary
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('      🎉 PARADISE GYM DATABASE SEEDED SUCCESSFULLY! 🎉          ');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('📊 Summary:');
    console.log('─────────────────────────────────────────────────────────────');
    console.log(`   👤 Admin/Staff Users:  2`);
    console.log(`   👥 Sample Members:     ${users.length}`);
    console.log(`   🏋️ Trainers:           ${trainers.length}`);
    console.log(`   📚 Sessions/Classes:   ${classes.length}`);
    console.log(`   💳 Membership Plans:   ${memberships.length}`);
    console.log(`   📧 Sample Inquiries:   ${contacts.length}`);
    console.log('─────────────────────────────────────────────────────────────\n');

    console.log('🔐 Login Credentials:');
    console.log('─────────────────────────────────────────────────────────────');
    console.log('   OWNER (Laxman Meena):');
    console.log('   📧 Email:    admin@paradisegym.in');
    console.log('   🔑 Password: Paradise@2024\n');
    console.log('   STAFF (Siddharth Meena):');
    console.log('   📧 Email:    siddharth@paradisegym.in');
    console.log('   🔑 Password: Staff@2024\n');
    console.log('   SAMPLE MEMBERS:');
    console.log('   📧 Email:    rajesh.sharma@gmail.com');
    console.log('   📧 Email:    neha.gupta@gmail.com');
    console.log('   🔑 Password: member123 (for all members)');
    console.log('─────────────────────────────────────────────────────────────\n');

    console.log('🏋️ Paradise Gym & Fitness Center');
    console.log('   📍 Patel Colony, Goner Mod, Sitapura, Jaipur - 302022');
    console.log('   📞 +91 70148 78955 | +91 87400 62864');
    console.log('═══════════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();