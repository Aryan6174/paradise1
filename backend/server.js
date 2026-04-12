// 👇 SEED ROUTE WITH REAL DATA
app.get('/api/seed', async (req, res) => {
  try {
    const Trainer = require('./models/Trainer');
    const Class = require('./models/Class');
    const Membership = require('./models/Membership');

    // Clear existing data
    await Trainer.deleteMany({});
    await Class.deleteMany({});
    await Membership.deleteMany({});

    // Seed Trainers
    await Trainer.insertMany([
      {
        name: 'Laxman Meena',
        specialization: 'Weight Training & Strength',
        experience: 15,
        phone: '7014878955',
        bio: '15 years of experience in fitness and weight training. Dedicated to helping members achieve their fitness goals.',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8Kf2bf5L0-dFzlfWRpWXoOkgmmrPxwkyNuNPonYYXmQuEerx5Au08wLfaAR9AHnnqlgisOLVcjacAMKYUnB9h0yy1oQDBPNhLN2PfIBlkdReilJHYv1ainB1qO3uqhMgvi2yLeA=w289-h312-n-k-no'
      },
      {
        name: 'Siddharth Meena',
        specialization: 'Cardio & Muscle Building',
        experience: 10,
        phone: '8740062864',
        bio: '10 years of experience in fitness training. Passionate about helping members transform their bodies.',
        image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAE8Kf2bf5L0-dFzlfWRpWXoOkgmmrPxwkyNuNPonYYXmQuEerx5Au08wLfaAR9AHnnqlgisOLVcjacAMKYUnB9h0yy1oQDBPNhLN2PfIBlkdReilJHYv1ainB1qO3uqhMgvi2yLeA=w289-h312-n-k-no'
      }
    ]);

    // Seed Classes
    await Class.insertMany([
      {
        name: 'Weight Training',
        description: 'Build muscle and strength with our weight training program under expert guidance.',
        duration: 60,
        capacity: 20,
        schedule: 'Mon to Sat - 5:00 AM to 10:00 PM',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
      },
      {
        name: 'Cardio Training',
        description: 'Burn fat and improve cardiovascular health with our cardio program.',
        duration: 45,
        capacity: 25,
        schedule: 'Mon to Sat - 5:00 AM to 10:00 PM',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
      },
      {
        name: 'HIIT',
        description: 'High intensity interval training for maximum fat burn and fitness.',
        duration: 45,
        capacity: 20,
        schedule: 'Mon to Sat - 5:00 AM to 10:00 PM',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
      },
      {
        name: 'Muscle Building',
        description: 'Dedicated program for building lean muscle mass with proper form and technique.',
        duration: 60,
        capacity: 15,
        schedule: 'Mon to Sat - 5:00 AM to 10:00 PM',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400'
      }
    ]);

    // Seed Memberships
    await Membership.insertMany([
      {
        name: '1 Month',
        duration: 1,
        price: 1000,
        description: 'Perfect for beginners to get started',
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Mon to Sat - 5AM to 10PM'
        ]
      },
      {
        name: '3 Months',
        duration: 3,
        price: 2400,
        description: 'Most popular plan - Save ₹600',
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation',
          'Mon to Sat - 5AM to 10PM'
        ]
      },
      {
        name: '6 Months',
        duration: 6,
        price: 4500,
        description: 'Great value - Save ₹1500',
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation',
          'Progress tracking',
          'Mon to Sat - 5AM to 10PM'
        ]
      },
      {
        name: '1 Year',
        duration: 12,
        price: 8000,
        description: 'Best value - Save ₹4000',
        features: [
          'Full gym access',
          'All equipment access',
          'Trainer guidance',
          'Locker room access',
          'Free parking',
          'Diet consultation',
          'Progress tracking',
          'Priority support',
          'Mon to Sat - 5AM to 10PM'
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
    res.status(500).json({ message: error.message });
  }
});
