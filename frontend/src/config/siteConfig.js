// Paradise Gym & Fitness Center - Site Configuration
const siteConfig = {
  // Basic Info
  gymName: "Paradise Gym & Fitness Center",
  tagline: "Get Fit & Great Look",
  yearEstablished: 2010,
  ownerName: "Mr. Laxman Meena",
  
  // Contact
  contact: {
    phone: ["+91 70148 78955", "+91 87400 62864"],
    whatsapp: "917014878955",
    email: {
      general: "paradisegymjaipur@gmail.com",
      support: "paradisegymjaipur@gmail.com"
    }
  },
  
  // Location
  location: {
    address: "Patel Colony, Goner Mod",
    area: "Sitapura",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302022",
    landmark: "Near Goner Mod, Sitapura",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113952.98962481042!2d75.71530827424618!3d26.80714389903013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc99f74d0ed9d%3A0x8f3fc46c4cc3b94!2sParadise%20gym!5e0!3m2!1sen!2sin!4v1768654429572!5m2!1sen!2sin",
    googleMapsLink: "https://maps.app.goo.gl/ArorHQrzVEApYmk8A"
  },
  
  // Working Hours
  hours: {
    weekdays: { open: "05:00 AM", close: "10:00 PM" },
    saturday: { open: "05:00 AM", close: "10:00 PM" },
    sunday: { open: "Closed", close: "Closed" },
    holidays: "Sundays & Announced Holidays"
  },
  
  // Social Media
  social: {
    instagram: "https://instagram.com/laxmanmeena642",
    instagram2: "https://instagram.com/siddharth1997fitness",
    facebook: "",
    youtube: "",
    twitter: ""
  },
  
  // Branding
  branding: {
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    accentColor: "#ff4d4d",
    logo: "/images/logo.png",
    favicon: "/images/favicon.ico"
  },
  
  // SEO
  seo: {
    title: "Paradise Gym & Fitness Center Jaipur | Best Gym in Sitapura",
    description: "Join Paradise Gym & Fitness Center in Jaipur. 15+ years of experience, expert trainers, modern equipment. Located at Goner Mod, Sitapura. Call: 7014878955",
    keywords: "gym jaipur, fitness center sitapura, paradise gym, best gym jaipur, personal training jaipur, weight loss jaipur, muscle building",
    ogImage: "/images/og-image.jpg"
  },
  
  // Features Flags
  features: {
    onlinePayment: false,
    classBooking: true,
    dietPlans: true,
    progressTracking: true,
    liveChat: false,
    newsletter: true
  },
  
  // Stats (for homepage)
  stats: {
    trainers: "2+",
    experience: "15+",
    members: "1000+",
    equipment: "50+"
  },
  
  // Currency
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN"
  }
};

export default siteConfig;