/* ===================================================================
   BUYCART - E-commerce Application Logic
   Vanilla JavaScript, no frameworks.
   Sections:
   1. Product Data
   2. State & LocalStorage helpers
   3. Utility functions
   4. Toast notifications
   5. Router (SPA page navigation)
   6. Page renderers (home, products, categories, detail, etc.)
   7. Product card & list rendering
   8. Search & Filters
   9. Cart logic
   10. Wishlist logic
   11. Checkout & Payment
   12. Order Confirmation
   13. Account & Orders
   14. Auth (Login/Signup demo)
   15. Contact & About
   16. Header/Nav/Mobile menu
   17. Dark mode
   18. Init
   =================================================================== */

/* ============ 1. PRODUCT DATA ============ */
const PRODUCTS = [
  {
    id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", subcat: "Audio",
    img: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/3394648/pexels-photo-3394648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/3756912/pexels-photo-3756912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Premium wireless over-ear headphones with active noise cancellation, 40-hour battery life, and crystal-clear sound. Perfect for music lovers and professionals.",
    rating: 4.4, reviews: 128, originalPrice: 2999, salePrice: 1999,
    stock: 6, colors: ["Black", "White", "Blue"], sizes: [],
    features: ["Active Noise Cancellation", "40-hour battery life", "Bluetooth 5.3", "Fast charge support", "Built-in microphone"],
    specs: { "Brand": "SoundMax", "Model": "SM-WH100", "Connectivity": "Bluetooth 5.3", "Battery": "40 hours", "Weight": "250g", "Warranty": "1 Year" },
    tags: ["flash", "trending", "bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 2, name: "Pro 5G Smartphone (8GB, 256GB)", category: "Electronics", subcat: "Mobiles",
    img: "https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/14979013/pexels-photo-14979013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/7989742/pexels-photo-7989742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/11120516/pexels-photo-11120516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Flagship 5G smartphone with 6.7-inch AMOLED display, triple camera setup (108MP+12MP+5MP), and blazing-fast Snapdragon processor.",
    rating: 4.6, reviews: 342, originalPrice: 29999, salePrice: 19999,
    stock: 15, colors: ["Midnight Black", "Ocean Blue", "Sunrise Gold"], sizes: [],
    features: ["6.7-inch AMOLED display", "108MP triple camera", "5000mAh battery", "5G connectivity", "256GB storage"],
    specs: { "Brand": "NexTech", "Model": "Pro 5G", "Display": "6.7 inch AMOLED", "RAM": "8GB", "Storage": "256GB", "Camera": "108MP Triple", "Battery": "5000mAh", "Warranty": "1 Year" },
    tags: ["trending", "bestseller"], isNew: true, freeDelivery: true
  },
  {
    id: 3, name: "Smart Fitness Watch with Heart Rate Monitor", category: "Electronics", subcat: "Wearables",
    img: "https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/1136589/pexels-photo-1136589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Track your fitness goals with this smartwatch featuring heart rate monitoring, SpO2 tracking, sleep analysis, and 50+ sports modes. Water resistant up to 50m.",
    rating: 4.3, reviews: 89, originalPrice: 4999, salePrice: 2999,
    stock: 22, colors: ["Black", "Orange", "Navy"], sizes: [],
    features: ["Heart rate monitor", "SpO2 tracking", "50+ sports modes", "5ATM water resistant", "7-day battery life"],
    specs: { "Brand": "FitPro", "Model": "FP-Watch2", "Display": "1.8 inch HD", "Battery": "7 days", "Water Resistance": "5ATM", "Connectivity": "Bluetooth 5.0", "Warranty": "6 Months" },
    tags: ["flash", "trending"], isNew: false, freeDelivery: true
  },
  {
    id: 4, name: "Ultra-Slim Laptop (16GB, 512GB SSD)", category: "Electronics", subcat: "Computers",
    img: "https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/18311089/pexels-photo-18311089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/12877898/pexels-photo-12877898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Powerful ultra-slim laptop with 15.6-inch FHD display, Intel Core i5 processor, 16GB RAM, and 512GB SSD. Ideal for work, study, and entertainment.",
    rating: 4.5, reviews: 67, originalPrice: 64999, salePrice: 44999,
    stock: 8, colors: ["Silver", "Space Gray"], sizes: [],
    features: ["Intel Core i5 processor", "15.6-inch FHD display", "16GB DDR4 RAM", "512GB SSD", "Backlit keyboard"],
    specs: { "Brand": "TechBook", "Model": "Ultra 15", "Processor": "Intel Core i5", "RAM": "16GB DDR4", "Storage": "512GB SSD", "Display": "15.6 inch FHD", "OS": "Windows 11", "Warranty": "1 Year" },
    tags: ["bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 5, name: "Portable Bluetooth Speaker", category: "Electronics", subcat: "Audio",
    img: "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/29581125/pexels-photo-29581125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/12502430/pexels-photo-12502430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Compact portable Bluetooth speaker with 20W output, deep bass, and 12-hour playtime. IPX7 waterproof rating for outdoor adventures.",
    rating: 4.2, reviews: 156, originalPrice: 2999, salePrice: 1799,
    stock: 30, colors: ["Black", "Blue", "Red"], sizes: [],
    features: ["20W powerful output", "Deep bass technology", "12-hour playtime", "IPX7 waterproof", "Bluetooth 5.1"],
    specs: { "Brand": "SoundMax", "Model": "SM-SP20", "Output": "20W", "Battery": "12 hours", "Waterproof": "IPX7", "Weight": "480g", "Warranty": "1 Year" },
    tags: ["flash"], isNew: false, freeDelivery: true
  },
  {
    id: 6, name: "Men's Cotton Casual Shirt", category: "Fashion", subcat: "Men's Fashion",
    img: "https://images.pexels.com/photos/4295983/pexels-photo-4295983.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/4295983/pexels-photo-4295983.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/28967487/pexels-photo-28967487.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/57749/pexels-photo-57749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Premium cotton casual shirt for men. Breathable fabric, modern slim fit, and versatile design perfect for both office and casual wear.",
    rating: 4.1, reviews: 94, originalPrice: 1499, salePrice: 799,
    stock: 40, colors: ["Beige", "White", "Blue", "Olive"], sizes: ["S", "M", "L", "XL", "XXL"],
    features: ["100% premium cotton", "Slim fit design", "Breathable fabric", "Easy care", "Available in 4 colors"],
    specs: { "Brand": "UrbanWear", "Fabric": "100% Cotton", "Fit": "Slim Fit", "Pattern": "Solid", "Sleeve": "Full Sleeve", "Care": "Machine Wash" },
    tags: ["trending"], isNew: true, freeDelivery: true
  },
  {
    id: 7, name: "Women's Elegant Floral Dress", category: "Fashion", subcat: "Women's Fashion",
    img: "https://images.pexels.com/photos/4428388/pexels-photo-4428388.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/4428388/pexels-photo-4428388.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/19889649/pexels-photo-19889649.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/38652624/pexels-photo-38652624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Elegant floral midi dress for women. Lightweight, comfortable, and stylish - perfect for parties, dates, and casual outings.",
    rating: 4.5, reviews: 112, originalPrice: 2499, salePrice: 1499,
    stock: 18, colors: ["Blue Floral", "Pink Floral", "Black"], sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Floral print design", "Midi length", "Soft breathable fabric", "Comfortable fit", "Machine washable"],
    specs: { "Brand": "BloomStyle", "Fabric": "Polyester Blend", "Fit": "Regular Fit", "Length": "Midi", "Pattern": "Floral", "Care": "Machine Wash Cold" },
    tags: ["trending", "bestseller"], isNew: true, freeDelivery: true
  },
  {
    id: 8, name: "Men's Running Sneakers", category: "Shoes", subcat: "Sports Shoes",
    img: "https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/4296075/pexels-photo-4296075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/27113455/pexels-photo-27113455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Lightweight running sneakers with cushioned soles, breathable mesh upper, and superior grip. Designed for comfort during runs and everyday wear.",
    rating: 4.3, reviews: 203, originalPrice: 3499, salePrice: 1999,
    stock: 12, colors: ["Black", "White", "Orange"], sizes: ["6", "7", "8", "9", "10", "11"],
    features: ["Lightweight design", "Cushioned EVA sole", "Breathable mesh upper", "Anti-slip outsole", "Arch support"],
    specs: { "Brand": "SwiftStep", "Type": "Running Shoes", "Sole": "EVA", "Upper": "Mesh", "Closure": "Lace-up", "Warranty": "90 Days" },
    tags: ["flash", "bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 9, name: "Premium Makeup Kit with 24 Shades", category: "Beauty", subcat: "Makeup",
    img: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/6527699/pexels-photo-6527699.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Complete makeup kit with 24 eyeshadow shades, 2 blushes, highlighter, and brushes. Long-lasting, highly pigmented formula for all-day wear.",
    rating: 4.4, reviews: 178, originalPrice: 2999, salePrice: 1499,
    stock: 25, colors: ["Multi"], sizes: [],
    features: ["24 eyeshadow shades", "Includes brushes", "Long-lasting formula", "Highly pigmented", "Cruelty-free"],
    specs: { "Brand": "GlowBeauty", "Shades": "24", "Type": "Makeup Kit", "Skin Type": "All", "Cruelty-Free": "Yes", "Weight": "350g" },
    tags: ["trending"], isNew: false, freeDelivery: true
  },
  {
    id: 10, name: "Non-Stick Cookware Set (5 Pieces)", category: "Home & Kitchen", subcat: "Cookware",
    img: "https://images.pexels.com/photos/36552082/pexels-photo-36552082.png?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/36552082/pexels-photo-36552082.png?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/792615/pexels-photo-792615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/105588/pexels-photo-105588.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "5-piece non-stick cookware set including frying pan, saucepan, kadai, and glass lids. Food-grade coating, even heat distribution, and easy to clean.",
    rating: 4.2, reviews: 145, originalPrice: 4999, salePrice: 2499,
    stock: 14, colors: ["Black", "Red"], sizes: [],
    features: ["5-piece set", "Non-stick coating", "Even heat distribution", "Glass lids included", "Compatible with all stovetops"],
    specs: { "Brand": "HomeChef", "Pieces": "5", "Material": "Aluminum", "Coating": "Non-stick", "Lids": "Glass", "Warranty": "1 Year" },
    tags: ["bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 11, name: "Stylish Leather Backpack", category: "Accessories", subcat: "Bags",
    img: "https://images.pexels.com/photos/19131365/pexels-photo-19131365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/19131365/pexels-photo-19131365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/31453948/pexels-photo-31453948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/33861296/pexels-photo-33861296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Premium leather backpack with multiple compartments, padded laptop sleeve (fits 15.6\"), and adjustable straps. Water-resistant and durable.",
    rating: 4.6, reviews: 87, originalPrice: 3999, salePrice: 2499,
    stock: 20, colors: ["Brown", "Black", "Tan"], sizes: [],
    features: ["Genuine leather", "Padded laptop sleeve", "Multiple compartments", "Water-resistant", "Adjustable straps"],
    specs: { "Brand": "UrbanCarry", "Material": "Leather", "Laptop Fit": "15.6 inch", "Compartments": "4", "Water Resistant": "Yes", "Warranty": "6 Months" },
    tags: ["trending", "new"], isNew: true, freeDelivery: true
  },
  {
    id: 12, name: "Premium Sunglasses with UV Protection", category: "Accessories", subcat: "Eyewear",
    img: "https://images.pexels.com/photos/38797596/pexels-photo-38797596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/38797596/pexels-photo-38797596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/6157411/pexels-photo-6157411.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/19869756/pexels-photo-19869756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Stylish polarized sunglasses with 100% UV400 protection. Lightweight frame, anti-glare lenses, and a classic unisex design.",
    rating: 4.0, reviews: 62, originalPrice: 1999, salePrice: 999,
    stock: 35, colors: ["Black", "Brown", "Silver"], sizes: [],
    features: ["100% UV400 protection", "Polarized lenses", "Anti-glare coating", "Lightweight frame", "Unisex design"],
    specs: { "Brand": "SunGuard", "Lens": "Polarized", "UV Protection": "UV400", "Frame": "Metal", "Style": "Aviator", "Warranty": "3 Months" },
    tags: ["flash"], isNew: false, freeDelivery: false
  },
  {
    id: 13, name: "Resistance Band Set for Home Workout", category: "Sports", subcat: "Fitness",
    img: "https://images.pexels.com/photos/8436407/pexels-photo-8436407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/8436407/pexels-photo-8436407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8436147/pexels-photo-8436147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/7072051/pexels-photo-7072051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Complete resistance band set with 5 different tension levels, door anchor, handles, and ankle straps. Perfect for full-body home workouts.",
    rating: 4.3, reviews: 134, originalPrice: 1499, salePrice: 699,
    stock: 50, colors: ["Multi"], sizes: [],
    features: ["5 tension levels (10-50 lbs)", "Door anchor included", "Foam handles", "Ankle straps", "Carry bag included"],
    specs: { "Brand": "FitGear", "Bands": "5", "Tension": "10-50 lbs", "Material": "Natural Latex", "Includes": "Handles, Door Anchor, Straps", "Warranty": "6 Months" },
    tags: ["trending", "bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 14, name: "Cricket Bat (Grade A Willow)", category: "Sports", subcat: "Cricket",
    img: "https://images.pexels.com/photos/185364/pexels-photo-185364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/185364/pexels-photo-185364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/6878018/pexels-photo-6878018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/13311525/pexels-photo-13311525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Professional grade A English willow cricket bat with excellent balance and pickup. Hand-crafted, pre-knocked, and ready for match play.",
    rating: 4.5, reviews: 56, originalPrice: 5999, salePrice: 3499,
    stock: 10, colors: ["Natural"], sizes: ["SH", "LH", "Har Size"],
    features: ["Grade A English willow", "Hand-crafted", "Pre-knocked", "Excellent balance", "Premium grip"],
    specs: { "Brand": "ProCricket", "Willow": "Grade A English", "Weight": "1180-1250g", "Size": "Short Handle", "Grains": "8-12", "Warranty": "3 Months" },
    tags: ["new"], isNew: true, freeDelivery: true
  },
  {
    id: 15, name: "Organic Grocery Staples Combo Pack", category: "Grocery", subcat: "Staples",
    img: "https://images.pexels.com/photos/6553454/pexels-photo-6553454.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/6553454/pexels-photo-6553454.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/9070106/pexels-photo-9070106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/33622710/pexels-photo-33622710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Organic grocery combo including basmati rice (1kg), toor dal (1kg), wheat flour (1kg), and cooking oil (1L). 100% organic and pesticide-free.",
    rating: 4.1, reviews: 78, originalPrice: 899, salePrice: 599,
    stock: 60, colors: ["N/A"], sizes: [],
    features: ["100% organic", "Pesticide-free", "Combo pack of 4 items", "Fresh stock", "No preservatives"],
    specs: { "Brand": "PureOrganic", "Type": "Combo Pack", "Items": "4", "Total Weight": "4kg", "Shelf Life": "6 months", "Certification": "Organic Certified" },
    tags: ["bestseller"], isNew: false, freeDelivery: true
  },
  {
    id: 16, name: "Fresh Vegetables Basket (Weekly)", category: "Grocery", subcat: "Vegetables",
    img: "https://images.pexels.com/photos/33622710/pexels-photo-33622710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    gallery: [
      "https://images.pexels.com/photos/33622710/pexels-photo-33622710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/9070106/pexels-photo-9070106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/38802734/pexels-photo-38802734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    desc: "Weekly fresh vegetable basket with 10+ seasonal vegetables sourced directly from farms. Farm-fresh, chemical-free, and delivered to your doorstep.",
    rating: 3.9, reviews: 45, originalPrice: 599, salePrice: 399,
    stock: 80, colors: ["N/A"], sizes: [],
    features: ["10+ seasonal vegetables", "Farm-fresh", "Chemical-free", "Weekly delivery", "Sourced from local farms"],
    specs: { "Brand": "FarmDirect", "Type": "Vegetable Basket", "Items": "10+", "Weight": "5-6kg", "Delivery": "Same Day", "Source": "Local Farms" },
    tags: ["new"], isNew: true, freeDelivery: true
  }
];

/* Category metadata (for category cards) */
const CATEGORIES = [
  { name: "Electronics", icon: "📱", subcats: ["Audio", "Mobiles", "Wearables", "Computers"] },
  { name: "Fashion", icon: "👗", subcats: ["Men's Fashion", "Women's Fashion"] },
  { name: "Men's Fashion", icon: "👔", subcats: ["Men's Fashion"] },
  { name: "Women's Fashion", icon: "👚", subcats: ["Women's Fashion"] },
  { name: "Shoes", icon: "👟", subcats: ["Sports Shoes"] },
  { name: "Beauty", icon: "💄", subcats: ["Makeup"] },
  { name: "Home & Kitchen", icon: "🏠", subcats: ["Cookware"] },
  { name: "Accessories", icon: "👜", subcats: ["Bags", "Eyewear"] },
  { name: "Grocery", icon: "🛒", subcats: ["Staples", "Vegetables"] },
  { name: "Sports", icon: "🏏", subcats: ["Fitness", "Cricket"] }
];

/* Customer reviews (testimonials) */
const TESTIMONIALS = [
  { name: "Aarav Sharma", city: "Mumbai", rating: 5, text: "BUYCART has become my go-to shopping app. The delivery is super fast and the product quality is excellent. I ordered headphones and got them the next day!", avatar: "https://images.pexels.com/photos/36586364/pexels-photo-36586364.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { name: "Priya Patel", city: "Bengaluru", rating: 5, text: "I love the variety of products on BUYCART. From fashion to electronics, everything is available at great prices. The flash sales are amazing!", avatar: "https://images.pexels.com/photos/4993172/pexels-photo-4993172.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { name: "Rohan Mehta", city: "Delhi", rating: 4, text: "Great shopping experience overall. The website is easy to use and the checkout process is smooth. Customer support was helpful when I had a question.", avatar: "https://images.pexels.com/photos/15791274/pexels-photo-15791274.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { name: "Anjali Gupta", city: "Pune", rating: 5, text: "The dress I ordered exceeded my expectations. The quality is top-notch and the fit was perfect. BUYCART is my favorite online store now!", avatar: "https://images.pexels.com/photos/28589238/pexels-photo-28589238.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" }
];

/* Demo coupons */
const COUPONS = {
  WELCOME10: { discount: 10, type: "percent", label: "10% off your order" },
  SAVE500: { discount: 500, type: "flat", label: "₹500 off on orders above ₹2000", minOrder: 2000 },
  FIRSTORDER: { discount: 200, type: "flat", label: "₹200 off on your first order", minOrder: 999 }
};

/* Sample FAQ data */
const FAQS = [
  { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days. For metro cities, we offer same-day or next-day delivery on select products." },
  { q: "What is your return policy?", a: "You can return any product within 7 days of delivery, provided it is unused and in original packaging. Refunds are processed within 5-7 business days." },
  { q: "Do you charge for shipping?", a: "Delivery is free on all orders above ₹499. For orders below ₹499, a nominal delivery fee of ₹49 is charged." },
  { q: "How can I track my order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from the 'My Orders' section in your account." },
  { q: "What payment methods do you accept?", a: "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. All online payments are secured with bank-grade encryption." },
  { q: "Can I cancel my order?", a: "Yes, you can cancel your order before it is shipped. Go to 'My Orders', select the order, and click 'Cancel'. The refund will be processed immediately." }
];

/* ============ 2. STATE & LOCALSTORAGE ============ */
// Central app state - backed by localStorage so data persists on refresh
let state = {
  cart: load("buycart_cart", []),
  wishlist: load("buycart_wishlist", []),
  darkMode: load("buycart_dark", false),
  user: load("buycart_user", null),
  orders: load("buycart_orders", []),
  recentlyViewed: load("buycart_recent", []),
  coupon: load("buycart_coupon", null),
  currentPage: "home",
  currentCategory: null,
  searchQuery: "",
  filters: { categories: [], priceMax: 100000, minRating: 0, inStockOnly: false, minDiscount: 0 },
  sort: "popularity",
  selectedProduct: null,
  selectedColor: null,
  selectedSize: null,
  qty: 1
};

// Helper: load from localStorage with fallback
function load(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}
// Helper: save to localStorage
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
}

// Persist state helpers
function saveCart() { save("buycart_cart", state.cart); updateCounts(); }
function saveWishlist() { save("buycart_wishlist", state.wishlist); updateCounts(); }
function saveUser() { save("buycart_user", state.user); }
function saveOrders() { save("buycart_orders", state.orders); }
function saveRecent() { save("buycart_recent", state.recentlyViewed); }
function saveCoupon() { save("buycart_coupon", state.coupon); }

/* ============ 3. UTILITY FUNCTIONS ============ */

// Format a number as Indian Rupees (e.g., 1999 -> ₹1,999)
function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

// Calculate discount percentage
function discountPercent(original, sale) {
  return Math.round(((original - sale) / original) * 100);
}

// Get a product by ID
function getProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

// Generate a star rating string (filled + empty stars)
function starString(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = "";
  for (let i = 0; i < full; i++) s += "★";
  if (half) s += "☆";
  for (let i = full + (half ? 1 : 0); i < 5; i++) s += "☆";
  return s;
}

// Get products by tag (flash, trending, bestseller)
function getByTag(tag) {
  return PRODUCTS.filter(p => p.tags && p.tags.includes(tag));
}

// Get count of products in a category
function categoryCount(catName) {
  if (catName === "Men's Fashion" || catName === "Women's Fashion") {
    return PRODUCTS.filter(p => p.subcat === catName).length;
  }
  return PRODUCTS.filter(p => p.category === catName).length;
}

// Generate a random order ID (format: BN + YYYYMMDD + HHMM)
function generateOrderId() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `BN${date}${time}`;
}

// HTML escape to prevent XSS in user-generated content
function esc(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ============ 4. TOAST NOTIFICATIONS ============ */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${esc(message)}</span>`;
  container.appendChild(toast);
  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============ 5. ROUTER (SPA navigation) ============ */
function navigate(page, params = {}) {
  // Close mobile menu & drawers
  closeMobileMenu();
  closeCartDrawer();

  // Handle params
  if (params.category) state.currentCategory = params.category;
  if (params.search) {
    state.searchQuery = params.search;
    document.getElementById("searchInput").value = params.search;
  }
  if (params.productId) {
    const p = getProduct(params.productId);
    if (p) {
      openProductDetail(p);
      return; // Don't navigate away, show modal
    } else {
      state.currentPage = "products";
      renderNotFound();
      return;
    }
  }

  state.currentPage = page;
  // Scroll to top on page change
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  renderPage();
}

function renderPage() {
  const app = document.getElementById("app");
  const page = state.currentPage;

  // Show a brief loading state then render (gives a smooth transition feel)
  app.innerHTML = '<div class="page-loader"><div class="loader-spinner"></div></div>';

  // Small timeout for loading animation effect
  setTimeout(() => {
    switch (page) {
      case "home": renderHome(); break;
      case "products": renderProductsPage(); break;
      case "categories": renderCategoriesPage(); break;
      case "wishlist": renderWishlistPage(); break;
      case "cart": renderCartPage(); break;
      case "checkout": renderCheckoutPage(); break;
      case "payment": renderPaymentPage(); break;
      case "confirmation": renderConfirmationPage(); break;
      case "contact": renderContactPage(); break;
      case "about": renderAboutPage(); break;
      case "login": renderAuthPage(); break;
      case "account": renderAccountPage(); break;
      case "orders": renderOrdersPage(); break;
      default: renderHome();
    }
    // Trigger scroll animations after render
    triggerRevealAnimations();
  }, 100);
}

// 404 / Not Found state
function renderNotFound() {
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Product Not Found</h3>
        <p>The product you are looking for might have been removed or is no longer available.</p>
        <button class="btn btn-primary" onclick="navigate('products')">Browse All Products</button>
      </div>
    </div>`;
}

/* ============ 6. PAGE RENDERERS ============ */

/* --- HOME PAGE --- */
function renderHome() {
  const flashProducts = getByTag("flash");
  const trendingProducts = getByTag("trending");
  const bestSellerProducts = getByTag("bestseller");

  document.getElementById("app").innerHTML = `
    <div class="container">
      <!-- HERO -->
      <section class="hero reveal">
        <div class="hero-content">
          <span class="hero-tag">🛍️ India's Growing Marketplace</span>
          <h1>Shop Smarter.<br>Live Better.</h1>
          <p>Discover great products at great prices, all in one place.</p>
          <div class="hero-buttons">
            <button class="btn btn-primary btn-lg" onclick="navigate('products')">Shop Now</button>
            <button class="btn btn-secondary btn-lg" onclick="navigate('categories')">Explore Categories</button>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.pexels.com/photos/6956803/pexels-photo-6956803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Online shopping with BUYCART" loading="eager" />
        </div>
      </section>

      <!-- CATEGORIES -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">Explore our wide range of product categories</p>
        </div>
        <div class="cat-grid">
          ${CATEGORIES.map(c => `
            <div class="cat-card reveal" onclick="navigate('products', { category: '${c.name}' })">
              <div class="cat-card-icon">${c.icon}</div>
              <h4>${c.name}</h4>
              <p class="cat-count">${categoryCount(c.name)} products</p>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- FLASH SALE -->
      <section class="section">
        <div class="flash-banner reveal">
          <div>
            <h3>⚡ Flash Sale</h3>
            <span class="limited">Limited Time Offer - Hurry up!</span>
          </div>
          <div class="countdown" id="countdown">
            <div class="countdown-box"><span class="num" id="cdHours">00</span><span class="lbl">Hours</span></div>
            <div class="countdown-box"><span class="num" id="cdMins">00</span><span class="lbl">Minutes</span></div>
            <div class="countdown-box"><span class="num" id="cdSecs">00</span><span class="lbl">Seconds</span></div>
          </div>
        </div>
        <div class="product-grid">
          ${flashProducts.map(p => productCardHTML(p)).join("")}
        </div>
      </section>

      <!-- TRENDING -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🔥 Trending Products</h2>
          <p class="section-subtitle">What everyone's buying right now</p>
        </div>
        <div class="product-grid">
          ${trendingProducts.map(p => productCardHTML(p)).join("")}
        </div>
      </section>

      <!-- BEST SELLERS -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">⭐ Best Sellers</h2>
          <p class="section-subtitle">Our most loved products by customers</p>
        </div>
        <div class="product-grid">
          ${bestSellerProducts.map(p => productCardHTML(p)).join("")}
        </div>
      </section>

      <!-- WHY CHOOSE BUYCART -->
      <section class="section">
        <div class="section-header text-center">
          <h2 class="section-title" style="justify-content:center">Why Choose BUYCART?</h2>
          <p class="section-subtitle">We're committed to giving you the best shopping experience</p>
        </div>
        <div class="features-grid">
          <div class="feature-card reveal">
            <div class="feature-icon blue">🔒</div>
            <h4>Secure Payments</h4>
            <p>Bank-grade encryption keeps your transactions safe and secure.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon teal">🚚</div>
            <h4>Fast Delivery</h4>
            <p>Get your orders delivered to your doorstep in 3-5 business days.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon amber">↩️</div>
            <h4>Easy Returns</h4>
            <p>Not satisfied? Return any product within 7 days for a full refund.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon green">📞</div>
            <h4>24/7 Customer Support</h4>
            <p>Our support team is always here to help you with any queries.</p>
          </div>
        </div>
      </section>

      <!-- CUSTOMER REVIEWS -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">What Our Customers Say</h2>
          <p class="section-subtitle">Real reviews from real customers across India</p>
        </div>
        <div class="reviews-grid">
          ${TESTIMONIALS.map(t => `
            <div class="review-card reveal">
              <div class="review-stars">${starString(t.rating)}</div>
              <p class="review-text">"${esc(t.text)}"</p>
              <div class="review-author">
                <img src="${t.avatar}" alt="${esc(t.name)}" class="review-avatar" loading="lazy" />
                <div>
                  <div class="review-name">${esc(t.name)}</div>
                  <div class="review-meta">${esc(t.city)}</div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- NEWSLETTER -->
      <section class="section">
        <div class="newsletter reveal">
          <h3>Stay Updated With The Latest Deals</h3>
          <p>Subscribe to our newsletter and be the first to know about exclusive offers and new arrivals.</p>
          <form class="newsletter-form" onsubmit="handleNewsletter(event)">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" class="btn btn-accent">Subscribe</button>
          </form>
        </div>
      </section>

      <!-- RECENTLY VIEWED (only if user has viewed products) -->
      ${state.recentlyViewed.length > 0 ? `
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">👁️ Recently Viewed</h2>
            <p class="section-subtitle">Pick up where you left off</p>
          </div>
          <div class="product-grid">
            ${state.recentlyViewed.slice(0, 4).map(id => productCardHTML(getProduct(id))).join("")}
          </div>
        </section>
      ` : ""}
    </div>
  `;

  // Start countdown timer
  startCountdown();
}

/* Newsletter form handler */
function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector("input").value;
  showToast("Subscribed successfully! We'll send deals to " + email, "success");
  e.target.reset();
}

/* Flash sale countdown timer (counts down 8 hours from page load) */
let countdownInterval;
function startCountdown() {
  const end = Date.now() + 8 * 60 * 60 * 1000; // 8 hours from now
  clearInterval(countdownInterval);
  function tick() {
    const diff = end - Date.now();
    if (diff <= 0) {
      clearInterval(countdownInterval);
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, "0");
    const hEl = document.getElementById("cdHours");
    const mEl = document.getElementById("cdMins");
    const sEl = document.getElementById("cdSecs");
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  tick();
  countdownInterval = setInterval(tick, 1000);
}

/* --- CATEGORIES PAGE --- */
function renderCategoriesPage() {
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Categories</span></div>
      <div class="section-header">
        <h2 class="section-title">All Categories</h2>
        <p class="section-subtitle">Browse products by category</p>
      </div>
      <div class="cat-grid">
        ${CATEGORIES.map(c => `
          <div class="cat-card reveal" onclick="navigate('products', { category: '${c.name}' })">
            <div class="cat-card-icon">${c.icon}</div>
            <h4>${c.name}</h4>
            <p class="cat-count">${categoryCount(c.name)} products</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* --- PRODUCTS PAGE (with filters & sorting) --- */
function renderProductsPage() {
  const isFiltered = state.currentCategory || state.searchQuery;
  const pageTitle = state.currentCategory ? state.currentCategory : (state.searchQuery ? `Search: "${esc(state.searchQuery)}"` : "All Products");

  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>${esc(pageTitle)}</span></div>
      <div class="section-header">
        <h2 class="section-title">${esc(pageTitle)}</h2>
        <button class="btn btn-outline btn-sm filter-toggle" onclick="toggleFilters()">☰ Filters</button>
      </div>
      <div class="products-layout">
        <!-- Filters sidebar -->
        <aside class="filters" id="filtersPanel">
          <div class="filter-group">
            <h4>Category</h4>
            ${CATEGORIES.map(c => `
              <label class="filter-option">
                <input type="checkbox" value="${c.name}" onchange="toggleCategoryFilter('${c.name}', this.checked)" ${state.filters.categories.includes(c.name) ? "checked" : ""} />
                ${c.name} (${categoryCount(c.name)})
              </label>
            `).join("")}
          </div>
          <div class="filter-group">
            <h4>Price Range</h4>
            <label class="filter-option">
              <input type="radio" name="priceRange" value="all" onchange="setPriceFilter(100000)" ${state.filters.priceMax >= 100000 ? "checked" : ""} />
              All Prices
            </label>
            <label class="filter-option">
              <input type="radio" name="priceRange" value="999" onchange="setPriceFilter(999)" ${state.filters.priceMax === 999 ? "checked" : ""} />
              Under ₹999
            </label>
            <label class="filter-option">
              <input type="radio" name="priceRange" value="2999" onchange="setPriceFilter(2999)" ${state.filters.priceMax === 2999 ? "checked" : ""} />
              Under ₹2,999
            </label>
            <label class="filter-option">
              <input type="radio" name="priceRange" value="9999" onchange="setPriceFilter(9999)" ${state.filters.priceMax === 9999 ? "checked" : ""} />
              Under ₹9,999
            </label>
            <label class="filter-option">
              <input type="radio" name="priceRange" value="49999" onchange="setPriceFilter(49999)" ${state.filters.priceMax === 49999 ? "checked" : ""} />
              Under ₹49,999
            </label>
          </div>
          <div class="filter-group">
            <h4>Rating</h4>
            <label class="filter-option">
              <input type="radio" name="rating" value="0" onchange="setRatingFilter(0)" ${state.filters.minRating === 0 ? "checked" : ""} />
              All Ratings
            </label>
            <label class="filter-option">
              <input type="radio" name="rating" value="4" onchange="setRatingFilter(4)" ${state.filters.minRating === 4 ? "checked" : ""} />
              4★ & above
            </label>
            <label class="filter-option">
              <input type="radio" name="rating" value="4.5" onchange="setRatingFilter(4.5)" ${state.filters.minRating === 4.5 ? "checked" : ""} />
              4.5★ & above
            </label>
          </div>
          <div class="filter-group">
            <h4>Availability</h4>
            <label class="filter-option">
              <input type="checkbox" onchange="setInStockOnly(this.checked)" ${state.filters.inStockOnly ? "checked" : ""} />
              In Stock Only
            </label>
          </div>
          <div class="filter-group">
            <h4>Discount</h4>
            <label class="filter-option">
              <input type="radio" name="discount" value="0" onchange="setMinDiscount(0)" ${state.filters.minDiscount === 0 ? "checked" : ""} />
              All Products
            </label>
            <label class="filter-option">
              <input type="radio" name="discount" value="20" onchange="setMinDiscount(20)" ${state.filters.minDiscount === 20 ? "checked" : ""} />
              20% off or more
            </label>
            <label class="filter-option">
              <input type="radio" name="discount" value="40" onchange="setMinDiscount(40)" ${state.filters.minDiscount === 40 ? "checked" : ""} />
              40% off or more
            </label>
          </div>
          <button class="btn btn-outline btn-block btn-sm mt-2" onclick="clearFilters()">Clear Filters</button>
        </aside>

        <!-- Products list -->
        <div>
          <div class="products-toolbar">
            <span class="results-count" id="resultsCount">Loading...</span>
            <div class="sort-wrap">
              <label>Sort by:</label>
              <select class="sort-select" onchange="setSort(this.value)">
                <option value="popularity" ${state.sort === "popularity" ? "selected" : ""}>Popularity</option>
                <option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Price: Low to High</option>
                <option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Price: High to Low</option>
                <option value="rating" ${state.sort === "rating" ? "selected" : ""}>Rating</option>
                <option value="newest" ${state.sort === "newest" ? "selected" : ""}>Newest</option>
              </select>
            </div>
          </div>
          <div class="product-grid" id="productsGrid">
            ${renderProductList()}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Toggle filter panel on mobile
function toggleFilters() {
  document.getElementById("filtersPanel").classList.toggle("open");
}

// Render the filtered/sorted product list
function renderProductList() {
  let filtered = filterAndSortProducts();
  if (filtered.length === 0) {
    return `<div class="empty-state" style="grid-column:1/-1">
      <div class="empty-icon">📦</div>
      <h3>No products found</h3>
      <p>Try adjusting your filters or search terms.</p>
      <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
    </div>`;
  }
  return filtered.map(p => productCardHTML(p)).join("");
}

// Update only the product grid (used when filters change)
function refreshProductList() {
  const grid = document.getElementById("productsGrid");
  const count = document.getElementById("resultsCount");
  if (!grid) return;
  grid.innerHTML = renderProductList();
  const num = filterAndSortProducts().length;
  if (count) count.textContent = `${num} product${num !== 1 ? "s" : ""} found`;
  triggerRevealAnimations();
}

/* --- Filter & Sort functions --- */
function filterAndSortProducts() {
  let list = [...PRODUCTS];

  // Category filter (from navbar category click or filter checkboxes)
  if (state.currentCategory && state.filters.categories.length === 0) {
    if (state.currentCategory === "Men's Fashion" || state.currentCategory === "Women's Fashion") {
      list = list.filter(p => p.subcat === state.currentCategory);
    } else {
      list = list.filter(p => p.category === state.currentCategory);
    }
  }
  if (state.filters.categories.length > 0) {
    list = list.filter(p => state.filters.categories.includes(p.category) || state.filters.categories.includes(p.subcat));
  }

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcat.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q))
    );
  }

  // Price filter
  list = list.filter(p => p.salePrice <= state.filters.priceMax);

  // Rating filter
  list = list.filter(p => p.rating >= state.filters.minRating);

  // In-stock filter
  if (state.filters.inStockOnly) {
    list = list.filter(p => p.stock > 0);
  }

  // Discount filter
  if (state.filters.minDiscount > 0) {
    list = list.filter(p => discountPercent(p.originalPrice, p.salePrice) >= state.filters.minDiscount);
  }

  // Sorting
  switch (state.sort) {
    case "price-low": list.sort((a, b) => a.salePrice - b.salePrice); break;
    case "price-high": list.sort((a, b) => b.salePrice - a.salePrice); break;
    case "rating": list.sort((a, b) => b.rating - a.rating); break;
    case "newest": list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case "popularity":
    default: list.sort((a, b) => b.reviews - a.reviews); break;
  }

  return list;
}

function toggleCategoryFilter(cat, checked) {
  if (checked) {
    if (!state.filters.categories.includes(cat)) state.filters.categories.push(cat);
  } else {
    state.filters.categories = state.filters.categories.filter(c => c !== cat);
  }
  // Clear the direct category nav selection when using filters
  state.currentCategory = null;
  refreshProductList();
}
function setPriceFilter(max) { state.filters.priceMax = max; refreshProductList(); }
function setRatingFilter(min) { state.filters.minRating = min; refreshProductList(); }
function setInStockOnly(val) { state.filters.inStockOnly = val; refreshProductList(); }
function setMinDiscount(val) { state.filters.minDiscount = val; refreshProductList(); }
function setSort(val) { state.sort = val; refreshProductList(); }

function clearFilters() {
  state.filters = { categories: [], priceMax: 100000, minRating: 0, inStockOnly: false, minDiscount: 0 };
  state.currentCategory = null;
  state.searchQuery = "";
  document.getElementById("searchInput").value = "";
  refreshProductList();
  // Re-render the page to reset filter UI
  renderProductsPage();
}

/* ============ 7. PRODUCT CARD HTML ============ */
function productCardHTML(p) {
  const off = discountPercent(p.originalPrice, p.salePrice);
  const inWishlist = state.wishlist.includes(p.id);
  const lowStock = p.stock <= 10 && p.stock > 0;
  return `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-img-wrap" onclick="openProductDetail(getProduct(${p.id}))">
        <div class="product-badges">
          ${off > 0 ? `<span class="badge badge-discount">${off}% OFF</span>` : ""}
          ${p.isNew ? `<span class="badge badge-new">New Arrival</span>` : ""}
          ${p.freeDelivery ? `<span class="badge badge-free-delivery">Free Delivery</span>` : ""}
        </div>
        <img src="${p.img}" alt="${esc(p.name)}" loading="lazy" />
        <div class="quick-actions">
          <button class="qa-btn ${inWishlist ? "active" : ""}" onclick="event.stopPropagation(); toggleWishlist(${p.id})" title="Wishlist" aria-label="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="qa-btn" onclick="event.stopPropagation(); openQuickView(${p.id})" title="Quick View" aria-label="Quick view">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name" onclick="openProductDetail(getProduct(${p.id}))">${esc(p.name)}</h3>
        <div class="product-rating">
          <span class="rating-pill">${p.rating}</span>
          <span class="stars">${starString(p.rating)}</span>
          <span class="review-count">(${p.reviews})</span>
        </div>
        <div class="price-row">
          <span class="price-now">${formatPrice(p.salePrice)}</span>
          ${off > 0 ? `<span class="price-old">${formatPrice(p.originalPrice)}</span><span class="price-off">${off}% off</span>` : ""}
        </div>
        <p class="product-stock ${lowStock ? "stock-low" : "stock-ok"}">${p.stock > 0 ? (lowStock ? `Only ${p.stock} left` : "In stock") : "Out of stock"}</p>
        <button class="btn btn-primary btn-add btn-block" onclick="addToCart(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
          ${p.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  `;
}

/* ============ PRODUCT DETAIL & QUICK VIEW ============ */

// Open the full product detail modal
function openProductDetail(p) {
  if (!p) return;
  // Add to recently viewed
  if (!state.recentlyViewed.includes(p.id)) {
    state.recentlyViewed.unshift(p.id);
    state.recentlyViewed = state.recentlyViewed.slice(0, 8);
    saveRecent();
  }

  state.selectedProduct = p;
  state.selectedColor = p.colors[0];
  state.selectedSize = p.sizes[0] || null;
  state.qty = 1;

  const off = discountPercent(p.originalPrice, p.salePrice);
  const inWishlist = state.wishlist.includes(p.id);
  // "You may also like" - same category, exclude current
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);

  document.getElementById("productDetailContent").innerHTML = `
    <div class="modal-body">
      <div class="detail-grid">
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-img" id="detailMainImg">
            <img src="${p.gallery[0]}" alt="${esc(p.name)}" id="mainDetailImg" />
          </div>
          <div class="detail-thumbs">
            ${p.gallery.map((g, i) => `
              <div class="detail-thumb ${i === 0 ? "active" : ""}" onclick="changeDetailImg(${i}, '${g}')">
                <img src="${g}" alt="${esc(p.name)} view ${i + 1}" />
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="product-cat">${p.category} / ${p.subcat}</span>
          <h1>${esc(p.name)}</h1>
          <div class="detail-rating-row">
            <span class="rating-pill">${p.rating}</span>
            <span class="stars">${starString(p.rating)}</span>
            <span class="review-count">${p.reviews} reviews</span>
          </div>
          <div class="detail-price-row">
            <span class="detail-price-now">${formatPrice(p.salePrice)}</span>
            ${off > 0 ? `<span class="detail-price-old">${formatPrice(p.originalPrice)}</span><span class="price-off">${off}% off</span>` : ""}
          </div>
          <p class="detail-desc">${esc(p.desc)}</p>

          ${p.colors.length > 0 && p.colors[0] !== "N/A" ? `
            <div class="detail-section">
              <h4>Color: <span id="selColor">${esc(state.selectedColor)}</span></h4>
              <div class="variant-chips">
                ${p.colors.map(c => `<span class="chip ${c === state.selectedColor ? "active" : ""}" onclick="selectColor('${esc(c)}')">${esc(c)}</span>`).join("")}
              </div>
            </div>
          ` : ""}

          ${p.sizes.length > 0 ? `
            <div class="detail-section">
              <h4>Size: <span id="selSize">${esc(state.selectedSize)}</span></h4>
              <div class="variant-chips">
                ${p.sizes.map(s => `<span class="chip ${s === state.selectedSize ? "active" : ""}" onclick="selectSize('${esc(s)}')">${esc(s)}</span>`).join("")}
              </div>
            </div>
          ` : ""}

          <div class="detail-section">
            <h4>Quantity</h4>
            <div class="qty-selector">
              <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
              <input type="text" class="qty-val" id="detailQty" value="1" readonly />
              <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
            </div>
          </div>

          <div class="detail-section">
            <p class="product-stock ${p.stock <= 10 ? "stock-low" : "stock-ok"}">
              ${p.stock > 0 ? (p.stock <= 10 ? `Hurry! Only ${p.stock} left in stock` : "In stock") : "Out of stock"}
            </p>
            ${p.freeDelivery ? `<span class="badge badge-free-delivery">Free Delivery Available</span>` : ""}
          </div>

          <div class="detail-actions">
            <button class="btn btn-primary btn-lg" onclick="addProductDetailToCart()" ${p.stock === 0 ? "disabled" : ""}>
              🛒 Add to Cart
            </button>
            <button class="btn btn-accent btn-lg" onclick="buyNow(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
              ⚡ Buy Now
            </button>
            <button class="btn btn-outline" onclick="toggleWishlist(${p.id}); refreshDetailWishlistBtn(${p.id})" id="detailWishlistBtn">
              ${inWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <!-- Features & Specs -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px" class="detail-extra">
        <div>
          <h4 style="margin-bottom:12px">Key Features</h4>
          <ul class="spec-list">
            ${p.features.map(f => `<li><span>${esc(f)}</span><span>✓</span></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom:12px">Specifications</h4>
          <ul class="spec-list">
            ${Object.entries(p.specs).map(([k, v]) => `<li><span class="spec-key">${esc(k)}</span><span>${esc(v)}</span></li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- You may also like -->
      <div style="margin-top:32px">
        <h4 style="margin-bottom:16px">You May Also Like</h4>
        <div class="product-grid">
          ${related.map(r => productCardHTML(r)).join("")}
        </div>
      </div>
    </div>
  `;

  document.getElementById("productDetailOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function changeDetailImg(idx, src) {
  document.getElementById("mainDetailImg").src = src;
  document.querySelectorAll(".detail-thumb").forEach((t, i) => t.classList.toggle("active", i === idx));
}
function selectColor(c) {
  state.selectedColor = c;
  document.getElementById("selColor").textContent = c;
  document.querySelectorAll(".detail-info .variant-chips .chip").forEach(chip => {
    chip.classList.toggle("active", chip.textContent === c);
  });
}
function selectSize(s) {
  state.selectedSize = s;
  document.getElementById("selSize").textContent = s;
  document.querySelectorAll(".detail-info .variant-chips .chip").forEach(chip => {
    chip.classList.toggle("active", chip.textContent === s);
  });
}
function changeDetailQty(delta) {
  state.qty = Math.max(1, Math.min(state.selectedProduct.stock, state.qty + delta));
  document.getElementById("detailQty").value = state.qty;
}
function refreshDetailWishlistBtn(id) {
  const btn = document.getElementById("detailWishlistBtn");
  if (!btn) return;
  const inW = state.wishlist.includes(id);
  btn.textContent = inW ? "♥ In Wishlist" : "♡ Add to Wishlist";
}
function addProductDetailToCart() {
  const p = state.selectedProduct;
  if (!p) return;
  addToCart(p.id, state.qty, state.selectedColor, state.selectedSize);
}
function buyNow(id) {
  addToCart(id, state.qty || 1, state.selectedColor, state.selectedSize);
  closeProductDetail();
  proceedToCheckout();
}

function proceedToCheckout() {
  if (state.cart.length === 0) {
    navigate("cart");
    return;
  }
  if (state.user) {
    navigate("checkout");
  } else {
    state.pendingRedirect = "checkout";
    navigate("login");
  }
}

// Quick View modal (compact preview)
function openQuickView(id) {
  const p = getProduct(id);
  if (!p) return;
  const off = discountPercent(p.originalPrice, p.salePrice);
  const inWishlist = state.wishlist.includes(p.id);
  document.getElementById("quickViewContent").innerHTML = `
    <div class="modal-body">
      <div class="detail-grid">
        <div class="detail-gallery">
          <div class="detail-main-img"><img src="${p.img}" alt="${esc(p.name)}" /></div>
        </div>
        <div class="detail-info">
          <span class="product-cat">${p.category}</span>
          <h1 style="font-size:1.2rem">${esc(p.name)}</h1>
          <div class="detail-rating-row">
            <span class="rating-pill">${p.rating}</span>
            <span class="stars">${starString(p.rating)}</span>
            <span class="review-count">${p.reviews} reviews</span>
          </div>
          <div class="detail-price-row">
            <span class="detail-price-now">${formatPrice(p.salePrice)}</span>
            ${off > 0 ? `<span class="detail-price-old">${formatPrice(p.originalPrice)}</span><span class="price-off">${off}% off</span>` : ""}
          </div>
          <p class="detail-desc">${esc(p.desc.substring(0, 150))}...</p>
          <p class="product-stock ${p.stock <= 10 ? "stock-low" : "stock-ok"}">${p.stock > 0 ? (p.stock <= 10 ? `Only ${p.stock} left` : "In stock") : "Out of stock"}</p>
          <div class="detail-actions">
            <button class="btn btn-primary" onclick="addToCart(${p.id}); closeQuickView()" ${p.stock === 0 ? "disabled" : ""}>Add to Cart</button>
            <button class="btn btn-secondary" onclick="closeQuickView(); openProductDetail(getProduct(${p.id}))">View Details</button>
            <button class="btn btn-outline" onclick="toggleWishlist(${p.id}); closeQuickView()">${inWishlist ? "♥" : "♡"}</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("quickViewOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  document.getElementById("quickViewOverlay").classList.remove("open");
  document.body.style.overflow = "";
}
function closeProductDetail() {
  document.getElementById("productDetailOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ============ 8. SEARCH ============ */
function handleSearch() {
  const q = document.getElementById("searchInput").value.trim();
  if (q.length === 0) {
    state.searchQuery = "";
    navigate("products");
    return;
  }
  navigate("products", { search: q });
}

/* ============ 9. CART LOGIC ============ */

// Add a product to the cart
function addToCart(id, qty = 1, color = null, size = null) {
  const p = getProduct(id);
  if (!p || p.stock === 0) {
    showToast("This product is out of stock", "error");
    return;
  }
  const existing = state.cart.find(item => item.id === id && item.color === color && item.size === size);
  if (existing) {
    existing.qty = Math.min(p.stock, existing.qty + qty);
  } else {
    state.cart.push({ id, qty: Math.min(p.stock, qty), color: color || p.colors[0], size: size || (p.sizes[0] || null) });
  }
  saveCart();
  showToast(`${p.name} added to cart`, "success");
}

// Remove item from cart
function removeFromCart(id, color, size) {
  state.cart = state.cart.filter(item => !(item.id === id && item.color === color && item.size === size));
  saveCart();
  showToast("Item removed from cart", "info");
  refreshCartUI();
}

// Update quantity in cart
function updateCartQty(id, color, size, delta) {
  const item = state.cart.find(i => i.id === id && i.color === color && i.size === size);
  if (!item) return;
  const p = getProduct(id);
  const newQty = item.qty + delta;
  if (newQty < 1) {
    removeFromCart(id, color, size);
    return;
  }
  item.qty = Math.min(p.stock, newQty);
  saveCart();
  refreshCartUI();
}

function setCartQty(id, color, size, value) {
  const item = state.cart.find(i => i.id === id && i.color === color && i.size === size);
  if (!item) return;
  const p = getProduct(id);
  const qty = parseInt(value, 10);
  if (isNaN(qty) || qty < 1) {
    removeFromCart(id, color, size);
    return;
  }
  item.qty = Math.min(p.stock, qty);
  saveCart();
  refreshCartUI();
}

// Move item from cart to wishlist
function moveToWishlist(id, color, size) {
  removeFromCart(id, color, size);
  if (!state.wishlist.includes(id)) {
    state.wishlist.push(id);
    saveWishlist();
    showToast("Item moved to wishlist", "success");
  }
}

// Calculate cart totals (subtotal, discount, delivery, coupon, grand total)
function calculateTotal() {
  let subtotal = 0;
  let productDiscount = 0;
  let delivery = 0;
  let couponDiscount = 0;

  state.cart.forEach(item => {
    const p = getProduct(item.id);
    if (!p) return;
    subtotal += p.originalPrice * item.qty;
    productDiscount += (p.originalPrice - p.salePrice) * item.qty;
  });

  const cartTotal = subtotal - productDiscount; // total after product discounts

  // Coupon discount
  if (state.coupon && COUPONS[state.coupon]) {
    const c = COUPONS[state.coupon];
    if (c.type === "percent") {
      couponDiscount = Math.round(cartTotal * c.discount / 100);
    } else if (c.type === "flat") {
      if (!c.minOrder || cartTotal >= c.minOrder) {
        couponDiscount = c.discount;
      }
    }
  }

  // Delivery charge (free above ₹499)
  const afterCoupon = cartTotal - couponDiscount;
  delivery = afterCoupon >= 499 || afterCoupon === 0 ? 0 : 49;

  const grandTotal = afterCoupon + delivery;

  return { subtotal, productDiscount, delivery, couponDiscount, grandTotal, cartTotal };
}

// Apply a coupon code
function applyCoupon() {
  const input = document.getElementById("couponInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Please enter a coupon code", "warning");
    return;
  }
  if (!COUPONS[code]) {
    showToast("Invalid coupon code", "error");
    return;
  }
  const coupon = COUPONS[code];
  const totals = calculateTotal();
  if (coupon.minOrder && totals.cartTotal < coupon.minOrder) {
    showToast(`Coupon requires minimum order of ${formatPrice(coupon.minOrder)}`, "error");
    return;
  }
  state.coupon = code;
  saveCoupon();
  showToast(`Coupon applied: ${coupon.label}`, "success");
  refreshCartUI();
}

// Remove applied coupon
function removeCoupon() {
  state.coupon = null;
  saveCoupon();
  showToast("Coupon removed", "info");
  refreshCartUI();
}

// Render cart page (full page)
function renderCartPage() {
  if (state.cart.length === 0) {
    document.getElementById("app").innerHTML = `
      <div class="container page">
        <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Cart</span></div>
        <div class="empty-state">
          <div class="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button class="btn btn-primary" onclick="navigate('products')">Start Shopping</button>
        </div>
      </div>`;
    return;
  }

  const totals = calculateTotal();
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Cart</span></div>
      <div class="section-header">
        <h2 class="section-title">Shopping Cart</h2>
        <p class="section-subtitle">${state.cart.length} item${state.cart.length !== 1 ? "s" : ""} in your cart</p>
      </div>
      <div class="cart-page-grid">
        <!-- Cart items -->
        <div class="cart-list" id="cartListItems">
          ${renderCartItemsHTML()}
        </div>

        <!-- Order summary -->
        <div class="summary-card" id="cartSummary">
          <h3>Order Summary</h3>

          <!-- Coupon -->
          ${state.coupon ? `
            <div class="coupon-applied">
              <span>✓ Coupon "${esc(state.coupon)}" applied</span>
              <button onclick="removeCoupon()">Remove</button>
            </div>
          ` : `
            <div class="coupon-box">
              <input type="text" id="couponInput" placeholder="Enter coupon code" />
              <button class="btn btn-primary btn-sm" onclick="applyCoupon()">Apply</button>
            </div>
            <p class="muted" style="font-size:0.75rem;margin-bottom:12px">Try: WELCOME10, SAVE500, FIRSTORDER</p>
          `}

          <div class="summary-row"><span>Subtotal</span><span>${formatPrice(totals.subtotal)}</span></div>
          <div class="summary-row discount"><span>Product Discount</span><span>-${formatPrice(totals.productDiscount)}</span></div>
          ${totals.couponDiscount > 0 ? `<div class="summary-row discount"><span>Coupon Discount</span><span>-${formatPrice(totals.couponDiscount)}</span></div>` : ""}
          <div class="summary-row"><span>Delivery Charge</span><span>${totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${formatPrice(totals.grandTotal)}</span></div>

          <p class="muted" style="font-size:0.78rem;margin-top:10px">You saved ${formatPrice(totals.productDiscount + totals.couponDiscount)} on this order</p>

          <button class="btn btn-primary btn-block btn-lg mt-3" onclick="proceedToCheckout()">Proceed to Checkout</button>
          <button class="btn btn-outline btn-block mt-2" onclick="navigate('products')">Continue Shopping</button>
        </div>
      </div>
    </div>
  `;
}

// HTML for cart items (shared by page and drawer)
function renderCartItemsHTML() {
  return state.cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return "";
    return `
      <div class="cart-row">
        <div class="cart-row-img"><img src="${p.img}" alt="${esc(p.name)}" /></div>
        <div class="cart-row-info">
          <div class="cart-row-name">${esc(p.name)}</div>
          <div class="cart-row-meta">${item.color ? `Color: ${esc(item.color)}` : ""} ${item.size ? ` | Size: ${esc(item.size)}` : ""}</div>
          <div class="cart-row-actions">
            <a onclick="moveToWishlist(${p.id}, '${esc(item.color)}', '${esc(item.size)}')">Move to Wishlist</a>
            <a onclick="removeFromCart(${p.id}, '${esc(item.color)}', '${esc(item.size)}')">Remove</a>
          </div>
          <div class="cart-item-controls" style="margin-top:10px">
            <div class="qty-selector">
              <button class="qty-btn" onclick="updateCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', -1)">−</button>
              <input type="text" class="qty-val" value="${item.qty}" onchange="setCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', this.value)" onkeydown="if(event.key==='Enter')this.blur()" />
              <button class="qty-btn" onclick="updateCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', 1)">+</button>
            </div>
          </div>
        </div>
        <div class="cart-row-price">
          <div class="p-now">${formatPrice(p.salePrice * item.qty)}</div>
          <div class="p-old">${formatPrice(p.originalPrice * item.qty)}</div>
        </div>
      </div>
    `;
  }).join("");
}

// Refresh cart UI without full page reload
function refreshCartUI() {
  if (state.currentPage === "cart") {
    renderCartPage();
  }
  updateCartDrawer();
}

// Cart drawer (slide-in)
function openCartDrawer() {
  updateCartDrawer();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerOverlay").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Update cart drawer contents
function updateCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  const footer = document.getElementById("cartDrawerFooter");
  if (!body) return;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="empty-state" style="padding:40px 10px">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add products to get started</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); navigate('products')">Shop Now</button>
      </div>`;
    footer.innerHTML = "";
    return;
  }

  body.innerHTML = state.cart.map(item => {
    const p = getProduct(item.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${p.img}" alt="${esc(p.name)}" /></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${esc(p.name)}</div>
          <div class="cart-item-price">${formatPrice(p.salePrice * item.qty)} <span class="cart-item-old">${formatPrice(p.originalPrice * item.qty)}</span></div>
          <div class="cart-item-controls">
            <div class="qty-selector">
              <button class="qty-btn" onclick="updateCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', -1)">−</button>
              <input type="text" class="qty-val" value="${item.qty}" onchange="setCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', this.value)" onkeydown="if(event.key==='Enter')this.blur()" />
              <button class="qty-btn" onclick="updateCartQty(${p.id}, '${esc(item.color)}', '${esc(item.size)}', 1)">+</button>
            </div>
            <a class="cart-item-remove" onclick="removeFromCart(${p.id}, '${esc(item.color)}', '${esc(item.size)}')">Remove</a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const totals = calculateTotal();
  footer.innerHTML = `
    <div class="summary-row total"><span>Total</span><span>${formatPrice(totals.grandTotal)}</span></div>
    <button class="btn btn-primary btn-block mt-2" onclick="closeCartDrawer(); navigate('cart')">View Cart</button>
    <button class="btn btn-accent btn-block mt-1" onclick="closeCartDrawer(); proceedToCheckout()">Checkout</button>
  `;
}

/* ============ 10. WISHLIST LOGIC ============ */
function toggleWishlist(id) {
  const p = getProduct(id);
  if (!p) return;
  if (state.wishlist.includes(id)) {
    state.wishlist = state.wishlist.filter(w => w !== id);
    showToast(`${p.name} removed from wishlist`, "info");
  } else {
    state.wishlist.push(id);
    showToast(`${p.name} added to wishlist`, "success");
  }
  saveWishlist();
  // Refresh current view if on wishlist page
  if (state.currentPage === "wishlist") renderWishlistPage();
  // Update product cards' wishlist buttons
  refreshProductCards();
}

// Move from wishlist to cart
function moveToCart(id) {
  if (!state.wishlist.includes(id)) return;
  addToCart(id);
  state.wishlist = state.wishlist.filter(w => w !== id);
  saveWishlist();
  showToast("Item moved to cart", "success");
  if (state.currentPage === "wishlist") renderWishlistPage();
}

function removeFromWishlist(id) {
  const p = getProduct(id);
  state.wishlist = state.wishlist.filter(w => w !== id);
  saveWishlist();
  showToast(`${p ? p.name : "Item"} removed from wishlist`, "info");
  if (state.currentPage === "wishlist") renderWishlistPage();
}

function renderWishlistPage() {
  if (state.wishlist.length === 0) {
    document.getElementById("app").innerHTML = `
      <div class="container page">
        <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Wishlist</span></div>
        <div class="empty-state">
          <div class="empty-icon">♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite products here to buy them later.</p>
          <button class="btn btn-primary" onclick="navigate('products')">Discover Products</button>
        </div>
      </div>`;
    return;
  }

  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Wishlist</span></div>
      <div class="section-header">
        <h2 class="section-title">My Wishlist</h2>
        <p class="section-subtitle">${state.wishlist.length} item${state.wishlist.length !== 1 ? "s" : ""} saved</p>
      </div>
      <div class="wishlist-grid">
        ${state.wishlist.map(id => {
          const p = getProduct(id);
          if (!p) return "";
          const off = discountPercent(p.originalPrice, p.salePrice);
          return `
            <div class="product-card reveal">
              <div class="product-img-wrap" onclick="openProductDetail(getProduct(${p.id}))">
                <div class="product-badges">${off > 0 ? `<span class="badge badge-discount">${off}% OFF</span>` : ""}</div>
                <img src="${p.img}" alt="${esc(p.name)}" loading="lazy" />
              </div>
              <div class="product-info">
                <span class="product-cat">${p.category}</span>
                <h3 class="product-name" onclick="openProductDetail(getProduct(${p.id}))">${esc(p.name)}</h3>
                <div class="product-rating">
                  <span class="rating-pill">${p.rating}</span>
                  <span class="review-count">(${p.reviews})</span>
                </div>
                <div class="price-row">
                  <span class="price-now">${formatPrice(p.salePrice)}</span>
                  ${off > 0 ? `<span class="price-old">${formatPrice(p.originalPrice)}</span>` : ""}
                </div>
                <button class="btn btn-primary btn-add btn-block" onclick="moveToCart(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
                  ${p.stock === 0 ? "Out of Stock" : "Move to Cart"}
                </button>
                <button class="btn btn-outline btn-sm btn-block mt-1" onclick="removeFromWishlist(${p.id})">Remove</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// Refresh product cards on current page (update wishlist icons)
function refreshProductCards() {
  document.querySelectorAll(".product-card").forEach(card => {
    const id = Number(card.dataset.id);
    if (!id) return;
    const btn = card.querySelector(".qa-btn");
    if (btn) {
      const inW = state.wishlist.includes(id);
      btn.classList.toggle("active", inW);
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", inW ? "currentColor" : "none");
    }
  });
}

/* ============ 11. CHECKOUT & PAYMENT ============ */
function renderCheckoutPage() {
  if (state.cart.length === 0) {
    document.getElementById("app").innerHTML = `
      <div class="container page">
        <div class="empty-state">
          <div class="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add products to your cart before checkout.</p>
          <button class="btn btn-primary" onclick="navigate('products')">Shop Now</button>
        </div>
      </div>`;
    return;
  }

  const totals = calculateTotal();
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><a onclick="navigate('cart')">Cart</a><span class="sep">/</span><span>Checkout</span></div>
      <div class="section-header">
        <h2 class="section-title">Checkout</h2>
        <p class="section-subtitle">Complete your order in 3 easy steps</p>
      </div>

      <div class="checkout-grid">
        <div>
          <!-- Step 1: Delivery Address -->
          <div class="checkout-card">
            <h3><span class="step-num">1</span> Delivery Address</h3>
            <p class="card-sub">Where should we deliver your order?</p>
            <form id="addressForm" onsubmit="return false">
              <div class="form-grid">
                <div class="form-field">
                  <label>Full Name <span class="req">*</span></label>
                  <input type="text" id="addrName" placeholder="John Doe" value="${state.user ? esc(state.user.name || "") : ""}" />
                  <span class="field-err">Please enter your name</span>
                </div>
                <div class="form-field">
                  <label>Mobile Number <span class="req">*</span></label>
                  <input type="tel" id="addrMobile" placeholder="9876543210" maxlength="10" />
                  <span class="field-err">Enter a valid 10-digit mobile number</span>
                </div>
                <div class="form-field">
                  <label>Email <span class="req">*</span></label>
                  <input type="email" id="addrEmail" placeholder="you@example.com" value="${state.user ? esc(state.user.email || "") : ""}" />
                  <span class="field-err">Please enter a valid email</span>
                </div>
                <div class="form-field">
                  <label>Pincode <span class="req">*</span></label>
                  <input type="text" id="addrPincode" placeholder="560001" maxlength="6" />
                  <span class="field-err">Enter a valid 6-digit pincode</span>
                </div>
                <div class="form-field full">
                  <label>House / Flat / Building <span class="req">*</span></label>
                  <input type="text" id="addrHouse" placeholder="Flat 101, Sunrise Apartments" />
                  <span class="field-err">Please enter your house/flat details</span>
                </div>
                <div class="form-field full">
                  <label>Street / Area <span class="req">*</span></label>
                  <input type="text" id="addrStreet" placeholder="MG Road, Indiranagar" />
                  <span class="field-err">Please enter your street/area</span>
                </div>
                <div class="form-field">
                  <label>City <span class="req">*</span></label>
                  <input type="text" id="addrCity" placeholder="Bengaluru" />
                  <span class="field-err">Please enter your city</span>
                </div>
                <div class="form-field">
                  <label>State <span class="req">*</span></label>
                  <select id="addrState">
                    <option value="">Select State</option>
                    <option>Andhra Pradesh</option><option>Assam</option><option>Bihar</option>
                    <option>Chhattisgarh</option><option>Delhi</option><option>Goa</option>
                    <option>Gujarat</option><option>Haryana</option><option>Himachal Pradesh</option>
                    <option>Jharkhand</option><option>Karnataka</option><option>Kerala</option>
                    <option>Madhya Pradesh</option><option>Maharashtra</option><option>Odisha</option>
                    <option>Punjab</option><option>Rajasthan</option><option>Tamil Nadu</option>
                    <option>Telangana</option><option>Uttar Pradesh</option><option>Uttarakhand</option>
                    <option>West Bengal</option>
                  </select>
                  <span class="field-err">Please select your state</span>
                </div>
              </div>
              <label class="checkbox-row">
                <input type="checkbox" id="saveAddr" /> Save this address for future orders
              </label>
            </form>
          </div>

          <!-- Step 2: Order Summary -->
          <div class="checkout-card">
            <h3><span class="step-num">2</span> Order Summary</h3>
            <p class="card-sub">Review your items</p>
            ${state.cart.map(item => {
              const p = getProduct(item.id);
              if (!p) return "";
              return `
                <div class="cart-row" style="border-bottom:1px solid var(--border);padding:12px 0">
                  <div class="cart-row-img" style="width:60px;height:60px"><img src="${p.img}" alt="${esc(p.name)}" /></div>
                  <div class="cart-row-info">
                    <div class="cart-row-name" style="font-size:0.85rem">${esc(p.name)}</div>
                    <div class="cart-row-meta">Qty: ${item.qty} ${item.color ? `| ${esc(item.color)}` : ""} ${item.size ? `| Size: ${esc(item.size)}` : ""}</div>
                  </div>
                  <div class="cart-row-price">
                    <div class="p-now" style="font-size:0.9rem">${formatPrice(p.salePrice * item.qty)}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <!-- Step 3: Payment Method -->
          <div class="checkout-card">
            <h3><span class="step-num">3</span> Payment Method</h3>
            <p class="card-sub">Choose how you'd like to pay</p>
            <div class="payment-methods">
              <!-- UPI -->
              <div class="payment-option active" onclick="selectPayment('upi', this)">
                <div class="payment-option-header">
                  <input type="radio" name="payment" checked />
                  <span class="pm-icon">📱</span>
                  <span class="pm-name">UPI</span>
                </div>
                <div class="payment-option-body">
                  <div class="form-field">
                    <label>UPI ID</label>
                    <input type="text" id="upiId" placeholder="yourname@upi" />
                  </div>
                  <button class="btn btn-secondary btn-sm mt-2" onclick="payWithUPI()">Pay Using UPI</button>
                </div>
              </div>

              <!-- Card -->
              <div class="payment-option" onclick="selectPayment('card', this)">
                <div class="payment-option-header">
                  <input type="radio" name="payment" />
                  <span class="pm-icon">💳</span>
                  <span class="pm-name">Credit / Debit Card</span>
                </div>
                <div class="payment-option-body">
                  <div class="form-grid">
                    <div class="form-field full">
                      <label>Card Holder Name</label>
                      <input type="text" id="cardName" placeholder="Name on card" />
                    </div>
                    <div class="form-field full">
                      <label>Card Number</label>
                      <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCardNumber(this)" />
                    </div>
                    <div class="form-field">
                      <label>Expiry Date</label>
                      <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5" oninput="formatExpiry(this)" />
                    </div>
                    <div class="form-field">
                      <label>CVV</label>
                      <input type="password" id="cardCvv" placeholder="***" maxlength="3" />
                    </div>
                  </div>
                  <p class="muted" style="font-size:0.75rem;margin-top:10px">🔒 This is a demo only. Do not enter real card details.</p>
                </div>
              </div>

              <!-- Net Banking -->
              <div class="payment-option" onclick="selectPayment('netbanking', this)">
                <div class="payment-option-header">
                  <input type="radio" name="payment" />
                  <span class="pm-icon">🏦</span>
                  <span class="pm-name">Net Banking</span>
                </div>
                <div class="payment-option-body">
                  <label style="font-size:0.85rem;margin-bottom:10px;display:block">Select your bank</label>
                  <div class="bank-grid">
                    <div class="bank-option" onclick="selectBank(this)"><div class="bank-logo">SBI</div>State Bank of India</div>
                    <div class="bank-option" onclick="selectBank(this)"><div class="bank-logo">HDFC</div>HDFC Bank</div>
                    <div class="bank-option" onclick="selectBank(this)"><div class="bank-logo">ICICI</div>ICICI Bank</div>
                    <div class="bank-option" onclick="selectBank(this)"><div class="bank-logo">AXIS</div>Axis Bank</div>
                    <div class="bank-option" onclick="selectBank(this)"><div class="bank-logo">KOTAK</div>Kotak Mahindra</div>
                  </div>
                </div>
              </div>

              <!-- COD -->
              <div class="payment-option" onclick="selectPayment('cod', this)">
                <div class="payment-option-header">
                  <input type="radio" name="payment" />
                  <span class="pm-icon">💵</span>
                  <span class="pm-name">Cash on Delivery</span>
                </div>
                <div class="payment-option-body">
                  <p style="font-size:0.85rem">Pay when your order arrives. Keep the exact amount ready for a hassle-free delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary sidebar -->
        <div class="summary-card">
          <h3>Price Details</h3>
          <div class="summary-row"><span>Subtotal (${state.cart.length} items)</span><span>${formatPrice(totals.subtotal)}</span></div>
          <div class="summary-row discount"><span>Product Discount</span><span>-${formatPrice(totals.productDiscount)}</span></div>
          ${totals.couponDiscount > 0 ? `<div class="summary-row discount"><span>Coupon Discount</span><span>-${formatPrice(totals.couponDiscount)}</span></div>` : ""}
          <div class="summary-row"><span>Delivery Charge</span><span>${totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)}</span></div>
          <div class="summary-row total"><span>Total Amount</span><span>${formatPrice(totals.grandTotal)}</span></div>
          <button class="btn btn-success btn-block btn-lg mt-3" onclick="placeOrder()">Place Order</button>
          <p class="muted text-center" style="font-size:0.75rem;margin-top:10px">By placing order, you agree to our Terms & Conditions</p>
        </div>
      </div>
    </div>
  `;
}

// Payment method selection
function selectPayment(method, el) {
  document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("active"));
  el.classList.add("active");
  el.querySelector("input[type=radio]").checked = true;
  state.selectedPayment = method;
}

// UPI pay handler
function payWithUPI() {
  const upi = document.getElementById("upiId").value.trim();
  if (!upi || !upi.includes("@")) {
    showToast("Please enter a valid UPI ID", "error");
    return;
  }
  showToast("UPI payment initiated", "info");
}

// Bank selection for net banking
function selectBank(el) {
  document.querySelectorAll(".bank-option").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  state.selectedBank = el.querySelector(".bank-logo").textContent;
}

// Card number formatting (add spaces every 4 digits)
function formatCardNumber(input) {
  let v = input.value.replace(/\s/g, "").replace(/\D/g, "");
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}
// Expiry date formatting (MM/YY)
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "");
  if (v.length >= 3) v = v.substring(0, 2) + "/" + v.substring(2);
  input.value = v;
}

/* ============ 12. PLACE ORDER & CONFIRMATION ============ */

// Validate checkout form and place the order
function placeOrder() {
  // Validate address fields
  const fields = [
    { id: "addrName", test: v => v.trim().length >= 2 },
    { id: "addrMobile", test: v => /^\d{10}$/.test(v.trim()) },
    { id: "addrEmail", test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: "addrPincode", test: v => /^\d{6}$/.test(v.trim()) },
    { id: "addrHouse", test: v => v.trim().length >= 3 },
    { id: "addrStreet", test: v => v.trim().length >= 3 },
    { id: "addrCity", test: v => v.trim().length >= 2 },
    { id: "addrState", test: v => v.trim().length > 0 }
  ];

  let hasError = false;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    const fieldEl = el.closest(".form-field");
    if (!f.test(el.value)) {
      fieldEl.classList.add("error");
      hasError = true;
    } else {
      fieldEl.classList.remove("error");
    }
  });

  if (hasError) {
    showToast("Please fill all required fields correctly", "error");
    // Scroll to first error
    const firstError = document.querySelector(".form-field.error");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Validate payment method
  const payment = state.selectedPayment || "upi";
  if (payment === "upi") {
    const upi = document.getElementById("upiId").value.trim();
    if (!upi || !upi.includes("@")) {
      showToast("Please enter a valid UPI ID", "error");
      return;
    }
  } else if (payment === "card") {
    const cardNum = document.getElementById("cardNumber").value.replace(/\s/g, "");
    const cvv = document.getElementById("cardCvv").value;
    if (cardNum.length < 16 || cvv.length < 3) {
      showToast("Please enter valid card details", "error");
      return;
    }
  } else if (payment === "netbanking" && !state.selectedBank) {
    showToast("Please select a bank", "error");
    return;
  }

  // All validation passed - create the order
  const totals = calculateTotal();
  const orderId = generateOrderId();
  const paymentLabels = { upi: "UPI", card: "Credit/Debit Card", netbanking: `Net Banking (${state.selectedBank || ""})`, cod: "Cash on Delivery" };

  const order = {
    id: orderId,
    items: [...state.cart],
    total: totals.grandTotal,
    subtotal: totals.subtotal,
    discount: totals.productDiscount + totals.couponDiscount,
    delivery: totals.delivery,
    paymentMethod: paymentLabels[payment] || "UPI",
    date: new Date().toISOString(),
    status: "Order Placed",
    address: {
      name: document.getElementById("addrName").value,
      mobile: document.getElementById("addrMobile").value,
      email: document.getElementById("addrEmail").value,
      pincode: document.getElementById("addrPincode").value,
      house: document.getElementById("addrHouse").value,
      street: document.getElementById("addrStreet").value,
      city: document.getElementById("addrCity").value,
      state: document.getElementById("addrState").value
    }
  };

  // Save the order
  state.orders.unshift(order);
  saveOrders();

  // Clear cart & coupon
  state.cart = [];
  state.coupon = null;
  saveCart();
  saveCoupon();

  // Show confirmation
  state.lastOrder = order;
  showToast("Order placed successfully!", "success");
  navigate("confirmation");
}

function renderConfirmationPage() {
  const order = state.lastOrder;
  if (!order) {
    // No order to confirm - redirect home
    navigate("home");
    return;
  }

  const deliveryEst = "3-5 Business Days";
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="order-success fade-up">
        <div class="success-icon">🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with BUYCART. Your order has been confirmed.</p>
        <div class="order-info-card">
          <div class="order-info-row"><span class="label">Order ID</span><span class="value">${order.id}</span></div>
          <div class="order-info-row"><span class="label">Payment Method</span><span class="value">${esc(order.paymentMethod)}</span></div>
          <div class="order-info-row"><span class="label">Amount Paid</span><span class="value">${formatPrice(order.total)}</span></div>
          <div class="order-info-row"><span class="label">Items</span><span class="value">${order.items.length}</span></div>
          <div class="order-info-row"><span class="label">Estimated Delivery</span><span class="value">${deliveryEst}</span></div>
          <div class="order-info-row"><span class="label">Delivery Address</span><span class="value" style="text-align:right;font-size:0.82rem">${esc(order.address.name)}, ${esc(order.address.house)}, ${esc(order.address.city)}, ${esc(order.address.state)} - ${esc(order.address.pincode)}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn btn-primary btn-lg" onclick="navigate('products')">Continue Shopping</button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('orders')">View My Orders</button>
        </div>
      </div>
    </div>
  `;
}

/* ============ 13. ACCOUNT & ORDERS ============ */

function renderAccountPage() {
  const user = state.user;
  if (!user) {
    // Not logged in - show prompt
    document.getElementById("app").innerHTML = `
      <div class="container page">
        <div class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>You're not logged in</h3>
          <p>Login to access your account dashboard, orders, and saved addresses.</p>
          <button class="btn btn-primary" onclick="navigate('login')">Login / Signup</button>
        </div>
      </div>`;
    return;
  }

  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>My Account</span></div>
      <div class="account-grid">
        <aside class="account-sidebar">
          <div class="account-user">
            <div class="account-avatar">${esc(user.name ? user.name.charAt(0).toUpperCase() : "U")}</div>
            <div class="a-name">${esc(user.name || "User")}</div>
            <div class="a-email">${esc(user.email || "")}</div>
          </div>
          <div class="account-menu-item active" onclick="showAccountTab('profile', this)"><span class="mi-icon">👤</span> My Profile</div>
          <div class="account-menu-item" onclick="showAccountTab('orders', this); navigate('orders')"><span class="mi-icon">📦</span> My Orders</div>
          <div class="account-menu-item" onclick="navigate('wishlist')"><span class="mi-icon">♡</span> Wishlist</div>
          <div class="account-menu-item" onclick="showAccountTab('addresses', this)"><span class="mi-icon">📍</span> Saved Addresses</div>
          <div class="account-menu-item" onclick="showAccountTab('payments', this)"><span class="mi-icon">💳</span> Payment Methods</div>
          <div class="account-menu-item logout" onclick="logout()"><span class="mi-icon">🚪</span> Logout</div>
        </aside>
        <div class="account-content" id="accountContent">
          ${renderAccountProfile(user)}
        </div>
      </div>
    </div>
  `;
}

function renderAccountProfile(user) {
  return `
    <h2>My Profile</h2>
    <p class="ac-sub">Manage your personal information</p>
    <form onsubmit="updateProfile(event)">
      <div class="form-grid">
        <div class="form-field">
          <label>Full Name</label>
          <input type="text" id="profileName" value="${esc(user.name || "")}" />
        </div>
        <div class="form-field">
          <label>Mobile</label>
          <input type="tel" id="profileMobile" value="${esc(user.mobile || "")}" />
        </div>
        <div class="form-field full">
          <label>Email</label>
          <input type="email" id="profileEmail" value="${esc(user.email || "")}" />
        </div>
      </div>
      <button class="btn btn-primary mt-2" type="submit">Save Changes</button>
    </form>
  `;
}

function showAccountTab(tab, el) {
  document.querySelectorAll(".account-menu-item").forEach(i => i.classList.remove("active"));
  if (el) el.classList.add("active");
  const content = document.getElementById("accountContent");
  if (!content) return;
  if (tab === "profile") content.innerHTML = renderAccountProfile(state.user);
  else if (tab === "addresses") content.innerHTML = renderSavedAddresses();
  else if (tab === "payments") content.innerHTML = renderPaymentMethods();
}

function renderSavedAddresses() {
  return `
    <h2>Saved Addresses</h2>
    <p class="ac-sub">Your delivery addresses</p>
    <div class="empty-state" style="padding:30px 10px">
      <div class="empty-icon">📍</div>
      <p>No saved addresses yet. Addresses from your orders will appear here.</p>
    </div>
  `;
}

function renderPaymentMethods() {
  return `
    <h2>Payment Methods</h2>
    <p class="ac-sub">Your saved payment options</p>
    <div class="empty-state" style="padding:30px 10px">
      <div class="empty-icon">💳</div>
      <p>No saved payment methods. This is a demo account - no real payment data is stored.</p>
    </div>
  `;
}

function updateProfile(e) {
  e.preventDefault();
  state.user.name = document.getElementById("profileName").value;
  state.user.mobile = document.getElementById("profileMobile").value;
  state.user.email = document.getElementById("profileEmail").value;
  saveUser();
  updateAccountLabel();
  showToast("Profile updated successfully", "success");
}

function logout() {
  state.user = null;
  state.pendingRedirect = null;
  saveUser();
  updateAccountLabel();
  showToast("Logged out successfully", "info");
  navigate("home");
}

/* --- ORDERS PAGE --- */
function renderOrdersPage() {
  // Generate sample orders if none exist (for demo)
  if (state.orders.length === 0) {
    state.orders = getSampleOrders();
    saveOrders();
  }

  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>My Orders</span></div>
      <div class="section-header">
        <h2 class="section-title">My Orders</h2>
        <p class="section-subtitle">Track and manage your orders</p>
      </div>
      <div id="ordersList">
        ${state.orders.map(o => renderOrderCard(o)).join("")}
      </div>
    </div>
  `;
}

function renderOrderCard(o) {
  const statuses = ["Order Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];
  const statusIdx = statuses.indexOf(o.status);
  const statusClass = o.status.toLowerCase().replace(/\s+/g, "").replace("for", "");

  return `
    <div class="order-card reveal">
      <div class="order-card-header">
        <div>
          <div class="order-id">Order ${o.id}</div>
          <div class="order-date">${new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
        </div>
        <span class="order-status-badge status-${statusClass}">${esc(o.status)}</span>
      </div>

      <div class="order-products">
        ${o.items.map(item => {
          const p = getProduct(item.id);
          if (!p) return "";
          return `
            <div class="order-prod-item">
              <img src="${p.img}" alt="${esc(p.name)}" />
              <div>
                <div class="opi-name">${esc(p.name.substring(0, 25))}...</div>
                <div class="opi-qty">Qty: ${item.qty}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="order-progress">
        ${statuses.map((s, i) => `
          <div class="progress-step ${i < statusIdx ? "done" : ""} ${i === statusIdx ? "current" : ""}">
            <div class="ps-dot">${i + 1}</div>
            <div class="ps-label">${s}</div>
          </div>
        `).join("")}
      </div>

      <div class="order-footer">
        <div>
          <span class="order-total">${formatPrice(o.total)}</span>
          <span class="order-pay-method"> | ${esc(o.paymentMethod)}</span>
        </div>
        ${o.status !== "Delivered" ? `<button class="btn btn-outline btn-sm" onclick="trackOrder('${o.id}')">Track Order</button>` : `<span class="badge badge-free-delivery">Completed</span>`}
      </div>
    </div>
  `;
}

// Track order - advance to next status (demo)
function trackOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;
  const statuses = ["Order Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];
  const idx = statuses.indexOf(order.status);
  if (idx < statuses.length - 1) {
    order.status = statuses[idx + 1];
    saveOrders();
    showToast(`Order status updated: ${order.status}`, "info");
    renderOrdersPage();
  }
}

// Sample orders for demo
function getSampleOrders() {
  return [
    {
      id: "BN202607281430",
      items: [{ id: 2, qty: 1, color: "Midnight Black", size: null }],
      total: 19999, subtotal: 29999, discount: 10000, delivery: 0,
      paymentMethod: "Credit/Debit Card",
      date: new Date(Date.now() - 12 * 86400000).toISOString(),
      status: "Delivered",
      address: { name: "Demo User", city: "Mumbai", state: "Maharashtra", pincode: "400001", house: "Flat 101", street: "Linking Road" }
    },
    {
      id: "BN202608051820",
      items: [{ id: 9, qty: 1, color: "Multi", size: null }, { id: 12, qty: 1, color: "Black", size: null }],
      total: 2498, subtotal: 4998, discount: 2500, delivery: 0,
      paymentMethod: "UPI",
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      status: "Out for Delivery",
      address: { name: "Demo User", city: "Bengaluru", state: "Karnataka", pincode: "560001", house: "Flat 202", street: "MG Road" }
    }
  ];
}

/* ============ 14. AUTH (Login/Signup demo) ============ */
function renderAuthPage() {
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="auth-container">
        <div class="auth-card fade-up">
          <div class="auth-tabs">
            <div class="auth-tab active" id="loginTab" onclick="switchAuthTab('login')">Login</div>
            <div class="auth-tab" id="signupTab" onclick="switchAuthTab('signup')">Sign Up</div>
          </div>

          <!-- Login form -->
          <form class="auth-form" id="loginForm" onsubmit="handleLogin(event)">
            <div class="form-field">
              <label>Email / Mobile <span class="req">*</span></label>
              <input type="text" id="loginEmail" placeholder="you@example.com or 9876543210" required />
            </div>
            <div class="form-field">
              <label>Password <span class="req">*</span></label>
              <input type="password" id="loginPassword" placeholder="Enter your password" required />
            </div>
            <div class="auth-remember">
              <label><input type="checkbox" /> Remember Me</label>
              <a style="color:var(--primary);cursor:pointer">Forgot Password?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">Login</button>
          </form>

          <!-- Signup form -->
          <form class="auth-form hidden" id="signupForm" onsubmit="handleSignup(event)">
            <div class="form-field">
              <label>Full Name <span class="req">*</span></label>
              <input type="text" id="signupName" placeholder="John Doe" required />
            </div>
            <div class="form-field">
              <label>Email <span class="req">*</span></label>
              <input type="email" id="signupEmail" placeholder="you@example.com" required />
            </div>
            <div class="form-field">
              <label>Mobile <span class="req">*</span></label>
              <input type="tel" id="signupMobile" placeholder="9876543210" maxlength="10" required />
            </div>
            <div class="form-field">
              <label>Password <span class="req">*</span></label>
              <input type="password" id="signupPassword" placeholder="Create a password" required />
            </div>
            <div class="form-field">
              <label>Confirm Password <span class="req">*</span></label>
              <input type="password" id="signupConfirm" placeholder="Re-enter password" required />
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">Create Account</button>
          </form>

          <p class="auth-switch" id="authSwitch">Don't have an account? <a onclick="switchAuthTab('signup')">Sign up</a></p>
        </div>
      </div>
    </div>
  `;
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const authSwitch = document.getElementById("authSwitch");

  if (tab === "login") {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    authSwitch.innerHTML = `Don't have an account? <a onclick="switchAuthTab('signup')">Sign up</a>`;
  } else {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    authSwitch.innerHTML = `Already have an account? <a onclick="switchAuthTab('login')">Login</a>`;
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  if (!email || !password) {
    showToast("Please fill all fields", "error");
    return;
  }
  // Demo login - create a user from the input
  state.user = { name: email.includes("@") ? email.split("@")[0] : "User", email: email.includes("@") ? email : "", mobile: /^\d{10}$/.test(email) ? email : "" };
  saveUser();
  updateAccountLabel();
  showToast("Login successful! Welcome to BUYCART", "success");
  redirectAfterAuth();
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const mobile = document.getElementById("signupMobile").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!name || !email || !mobile || !password) {
    showToast("Please fill all required fields", "error");
    return;
  }
  if (password !== confirm) {
    showToast("Passwords do not match", "error");
    return;
  }
  if (!/^\d{10}$/.test(mobile)) {
    showToast("Please enter a valid 10-digit mobile number", "error");
    return;
  }
  state.user = { name, email, mobile };
  saveUser();
  updateAccountLabel();
  showToast("Account created successfully! Welcome to BUYCART", "success");
  redirectAfterAuth();
}

/* ============ 15. CONTACT & ABOUT ============ */
function renderContactPage() {
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>Contact</span></div>
      <div class="section-header">
        <h2 class="section-title">Contact Us</h2>
        <p class="section-subtitle">We're here to help you with any questions</p>
      </div>

      <div class="contact-grid">
        <!-- Contact form -->
        <div class="checkout-card">
          <h3>Send us a message</h3>
          <p class="card-sub">Fill out the form below and we'll get back to you</p>
          <form onsubmit="handleContactSubmit(event)">
            <div class="form-grid">
              <div class="form-field">
                <label>Name <span class="req">*</span></label>
                <input type="text" id="contactName" placeholder="Your name" required />
              </div>
              <div class="form-field">
                <label>Email <span class="req">*</span></label>
                <input type="email" id="contactEmail" placeholder="you@example.com" required />
              </div>
              <div class="form-field">
                <label>Phone</label>
                <input type="tel" id="contactPhone" placeholder="9876543210" />
              </div>
              <div class="form-field">
                <label>Subject <span class="req">*</span></label>
                <input type="text" id="contactSubject" placeholder="How can we help?" required />
              </div>
              <div class="form-field full">
                <label>Message <span class="req">*</span></label>
                <textarea id="contactMessage" rows="5" placeholder="Write your message here..." required style="resize:vertical"></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg mt-2">Submit</button>
          </form>
        </div>

        <!-- Contact info -->
        <div>
          <div class="contact-info-card mb-3">
            <div class="contact-info-item">
              <div class="ci-icon">📞</div>
              <div><div class="ci-label">Customer Support</div><div class="ci-value">1800-123-4567 (Toll Free)</div></div>
            </div>
            <div class="contact-info-item">
              <div class="ci-icon">✉️</div>
              <div><div class="ci-label">Email</div><div class="ci-value">support@buycart.in</div></div>
            </div>
            <div class="contact-info-item">
              <div class="ci-icon">🕐</div>
              <div><div class="ci-label">Business Hours</div><div class="ci-value">Mon - Sun: 9:00 AM - 9:00 PM IST</div></div>
            </div>
            <div class="contact-info-item">
              <div class="ci-icon">📍</div>
              <div><div class="ci-label">Registered Office</div><div class="ci-value">BUYCART Technologies, Whitefield, Bengaluru 560066</div></div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="contact-info-card">
            <h3 style="margin-bottom:16px">Frequently Asked Questions</h3>
            ${FAQS.map((f, i) => `
              <div class="faq-item" id="faq${i}">
                <div class="faq-q" onclick="toggleFAQ(${i})">
                  ${esc(f.q)}
                  <span class="faq-arrow">▼</span>
                </div>
                <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleFAQ(i) {
  document.getElementById("faq" + i).classList.toggle("open");
}

function handleContactSubmit(e) {
  e.preventDefault();
  showToast("Your message has been sent! We'll respond within 24 hours.", "success");
  e.target.reset();
}

function redirectAfterAuth() {
  const dest = state.pendingRedirect;
  state.pendingRedirect = null;
  navigate(dest || "account");
}

function renderAboutPage() {
  document.getElementById("app").innerHTML = `
    <div class="container page">
      <div class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="sep">/</span><span>About</span></div>

      <div class="about-hero fade-up">
        <h1>About BUYCART</h1>
        <p>A modern Indian online shopping platform designed to bring electronics, fashion, lifestyle, home products, and everyday essentials together in one convenient place.</p>
      </div>

      <div style="max-width:760px;margin:0 auto;text-align:center;line-height:1.8;color:var(--text-muted)">
        <p>Founded with a vision to simplify online shopping for every Indian household, BUYCART brings together a curated selection of products across categories — from the latest electronics and trendy fashion to home essentials and daily groceries. Our mission is to make quality products accessible and affordable, delivered right to your doorstep.</p>
        <p class="mt-2">We believe shopping should be simple, enjoyable, and reliable. That's why we focus on a seamless browsing experience, secure payments, fast delivery, and friendly customer support — all designed to make "Everything You Need, Delivered Simply" more than just a tagline.</p>
      </div>

      <div class="about-grid">
        <div class="about-value">
          <div class="av-icon">🎯</div>
          <h4>Our Mission</h4>
          <p>To make quality products accessible to every Indian home at affordable prices, with a shopping experience that's simple and trustworthy.</p>
        </div>
        <div class="about-value">
          <div class="av-icon">🌟</div>
          <h4>Our Vision</h4>
          <p>To become India's most loved e-commerce platform, known for reliability, value, and customer-first service across every city and town.</p>
        </div>
        <div class="about-value">
          <div class="av-icon">❤️</div>
          <h4>Our Values</h4>
          <p>Customer happiness, honest pricing, quality products, and transparent service — these values guide every decision we make.</p>
        </div>
      </div>

      <div class="about-stats">
        <div class="stat-card"><div class="stat-num">10K+</div><div class="stat-label">Products</div></div>
        <div class="stat-card"><div class="stat-num">500K+</div><div class="stat-label">Happy Customers</div></div>
        <div class="stat-card"><div class="stat-num">50+</div><div class="stat-label">Cities Served</div></div>
        <div class="stat-card"><div class="stat-num">24/7</div><div class="stat-label">Customer Support</div></div>
      </div>
    </div>
  `;
}

/* ============ 16. HEADER / NAV / MOBILE MENU ============ */

// Update cart & wishlist count badges
function updateCounts() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const wishCount = state.wishlist.length;
  const cartBadge = document.getElementById("cartCount");
  const wishBadge = document.getElementById("wishlistCount");
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle("hidden", cartCount === 0);
  }
  if (wishBadge) {
    wishBadge.textContent = wishCount;
    wishBadge.classList.toggle("hidden", wishCount === 0);
  }
}

// Update account label (Login vs name)
function updateAccountLabel() {
  const label = document.getElementById("accountLabel");
  if (label) {
    label.textContent = state.user ? "Account" : "Login";
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navBar = document.getElementById("navBar");
  const overlay = document.getElementById("menuOverlay");
  const hamburger = document.getElementById("hamburger");
  navBar.classList.toggle("open");
  overlay.classList.toggle("open");
  hamburger.classList.toggle("active");
  const isOpen = navBar.classList.contains("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMobileMenu() {
  const navBar = document.getElementById("navBar");
  const overlay = document.getElementById("menuOverlay");
  const hamburger = document.getElementById("hamburger");
  if (!navBar) return;
  navBar.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/* ============ 17. DARK MODE ============ */
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  applyDarkMode();
  save("buycart_dark", state.darkMode);
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = state.darkMode ? "☀️" : "🌙";
  showToast(state.darkMode ? "Dark mode enabled" : "Light mode enabled", "info");
}

function applyDarkMode() {
  document.body.classList.toggle("dark", state.darkMode);
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = state.darkMode ? "☀️" : "🌙";
}

/* ============ 18. SCROLL ANIMATIONS ============ */
function triggerRevealAnimations() {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// Back to top button
function handleScroll() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  btn.classList.toggle("show", window.scrollY > 400);
}

/* ============ 19. INIT ============ */
function init() {
  // Apply dark mode on load
  applyDarkMode();

  // Update counts & labels
  updateCounts();
  updateAccountLabel();

  // Generate sample orders for first-time visitors (demo)
  if (state.orders.length === 0) {
    state.orders = getSampleOrders();
    saveOrders();
  }

  // --- Event listeners ---

  // Navigation links (delegated)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-page]");
    if (link) {
      e.preventDefault();
      const page = link.dataset.page;
      navigate(page);
    }
  });

  // Search
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  }

  // Hamburger menu
  document.getElementById("hamburger").addEventListener("click", toggleMobileMenu);
  document.getElementById("menuOverlay").addEventListener("click", closeMobileMenu);

  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", toggleDarkMode);

  // Cart drawer
  document.getElementById("cartDrawerClose").addEventListener("click", closeCartDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", closeCartDrawer);

  // Modals
  document.getElementById("quickViewClose").addEventListener("click", closeQuickView);
  document.getElementById("quickViewOverlay").addEventListener("click", (e) => {
    if (e.target.id === "quickViewOverlay") closeQuickView();
  });
  document.getElementById("productDetailClose").addEventListener("click", closeProductDetail);
  document.getElementById("productDetailOverlay").addEventListener("click", (e) => {
    if (e.target.id === "productDetailOverlay") closeProductDetail();
  });

  // Back to top
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", handleScroll);

  // ESC key to close modals/drawers
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeQuickView();
      closeProductDetail();
      closeCartDrawer();
      closeMobileMenu();
    }
  });

  // Chatbot
  initChatbot();

  // Render the home page
  renderHome();
}

/* ============ 20. AI CHATBOT ============ */
const chatbotKnowledge = [
  { keys: ["hi", "hello", "hey", "greetings"], reply: "Hello! Welcome to BUYCART. I can help you find products, track orders, answer shipping questions, and more. What can I do for you?" },
  { keys: ["shipping", "delivery", "deliver", "ship"], reply: "We offer free shipping on orders over ₹499. Standard delivery takes 3-5 business days, and express delivery (1-2 days) is available for ₹49. We deliver to all major cities across India." },
  { keys: ["return", "refund", "exchange", "replace"], reply: "You can return any item within 7 days of delivery for a full refund or exchange. The product must be unused and in its original packaging. Refunds are processed within 5-7 business days." },
  { keys: ["track", "order status", "where is my order", "my order"], reply: "You can track your order by going to the Account page and clicking on the 'Orders' tab. There you'll see the status of all your orders with estimated delivery dates." },
  { keys: ["payment", "pay", "card", "upi", "cod", "cash on delivery"], reply: "We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), net banking, and Cash on Delivery. All online payments are secured with 256-bit encryption." },
  { keys: ["cancel", "cancel order", "cancellation"], reply: "You can cancel an order before it's shipped. Go to your Account > Orders, find the order, and click 'Cancel'. If it's already shipped, you can return it after delivery for a full refund." },
  { keys: ["discount", "coupon", "promo", "offer", "deal", "sale"], reply: "We have ongoing sales with up to 70% off! Check the home page for the latest deals. You can also use coupon code WELCOME10 for 10% off your first order." },
  { keys: ["login", "sign in", "signin", "log in", "account", "register", "sign up", "signup"], reply: "You can create an account or log in by clicking the 'Login' button in the top right corner. We support email and mobile number login with a password." },
  { keys: ["wishlist", "wish list", "favorite", "favourite", "save"], reply: "Your wishlist lets you save products to buy later. Click the heart icon on any product to add it to your wishlist. You can view all saved items under Account > Wishlist." },
  { keys: ["contact", "support", "help", "customer care", "phone", "email"], reply: "You can reach us at support@buycart.com or call 1800-123-4567 (toll-free, 9 AM - 9 PM). You can also use the Contact page on our website to send a message." },
  { keys: ["password", "forgot password", "reset password", "change password"], reply: "If you forgot your password, click 'Login' then 'Forgot Password'. You'll receive a reset link on your email or mobile number to set a new password." },
  { keys: ["category", "categories", "what do you sell", "products do you have"], reply: "We sell a wide range of products across categories: Electronics, Fashion, Home & Kitchen, Beauty, Sports, Books, Toys, and more. Browse our categories from the home page!" },
  { keys: ["thank", "thanks", "thank you"], reply: "You're welcome! Is there anything else I can help you with?" },
  { keys: ["bye", "goodbye", "see you"], reply: "Goodbye! Thanks for shopping with BUYCART. Have a great day!" },
];

const chatbotQuickReplies = [
  "Track my order",
  "Shipping info",
  "Return policy",
  "Payment methods",
  "Current offers",
];

function initChatbot() {
  const fab = document.getElementById("chatbotFab");
  const win = document.getElementById("chatbotWindow");
  const closeBtn = document.getElementById("chatbotClose");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const quickWrap = document.getElementById("chatbotQuick");

  fab.addEventListener("click", () => {
    const isOpen = win.classList.toggle("open");
    win.setAttribute("aria-hidden", !isOpen);
    if (isOpen && document.getElementById("chatbotMessages").children.length === 0) {
      addChatbotMessage("bot", "Hi! I'm your BUYCART shopping assistant. Ask me about products, orders, shipping, returns, or anything else!");
      renderQuickReplies();
    }
    if (isOpen) input.focus();
  });

  closeBtn.addEventListener("click", () => {
    win.classList.remove("open");
    win.setAttribute("aria-hidden", "true");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addChatbotMessage("user", text);
    input.value = "";
    quickWrap.innerHTML = "";
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const reply = getChatbotResponse(text);
      addChatbotMessage("bot", reply);
      renderQuickReplies();
    }, 600 + Math.random() * 500);
  });
}

function addChatbotMessage(sender, text) {
  const msgContainer = document.getElementById("chatbotMessages");
  const msg = document.createElement("div");
  msg.className = `chatbot-msg ${sender}`;
  msg.textContent = text;
  msgContainer.appendChild(msg);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

function showTypingIndicator() {
  const msgContainer = document.getElementById("chatbotMessages");
  const typing = document.createElement("div");
  typing.className = "chatbot-msg bot typing";
  typing.id = "chatbotTyping";
  typing.innerHTML = "<span></span><span></span><span></span>";
  msgContainer.appendChild(typing);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("chatbotTyping");
  if (typing) typing.remove();
}

function renderQuickReplies() {
  const quickWrap = document.getElementById("chatbotQuick");
  quickWrap.innerHTML = "";
  chatbotQuickReplies.forEach(q => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chatbot-quick-btn";
    btn.textContent = q;
    btn.addEventListener("click", () => {
      addChatbotMessage("user", q);
      quickWrap.innerHTML = "";
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addChatbotMessage("bot", getChatbotResponse(q));
        renderQuickReplies();
      }, 500 + Math.random() * 400);
    });
    quickWrap.appendChild(btn);
  });
}

function getChatbotResponse(text) {
  const lower = text.toLowerCase().trim();

  if (lower.includes("search") || lower.includes("find") || lower.includes("looking for")) {
    const terms = lower.replace(/.*(search|find|looking for)\s*(for)?\s*/, "").trim();
    if (terms) {
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(terms) ||
        p.category.toLowerCase().includes(terms) ||
        p.brand.toLowerCase().includes(terms)
      ).slice(0, 3);
      if (matches.length) {
        let reply = `I found ${matches.length} product${matches.length > 1 ? "s" : ""} matching "${terms}":\n`;
        matches.forEach((p, i) => {
          reply += `\n${i + 1}. ${p.name} — ${formatPrice(p.salePrice)} (${p.category})`;
        });
        reply += "\n\nWould you like to browse our full catalog?";
        return reply;
      }
      return `I couldn't find exact matches for "${terms}", but you can browse our categories from the home page. Try searching with a different keyword!`;
    }
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    const matches = PRODUCTS.filter(p =>
      lower.includes(p.name.toLowerCase().split(" ")[0]) ||
      lower.includes(p.category.toLowerCase())
    ).slice(0, 2);
    if (matches.length) {
      let reply = "Here are some prices:\n";
      matches.forEach(p => {
        reply += `\n• ${p.name}: ${formatPrice(p.salePrice)} (was ${formatPrice(p.originalPrice)})`;
      });
      return reply;
    }
    return "Prices vary by product. Browse our catalog to see current sale prices — we have discounts up to 70% off!";
  }

  for (const entry of chatbotKnowledge) {
    if (entry.keys.some(k => lower.includes(k))) {
      return entry.reply;
    }
  }

  if (lower.includes("cart") || lower.includes("add to cart")) {
    return "To add a product to your cart, click the 'Add to Cart' button on any product. You can adjust quantities in the cart page by typing a number or using the +/− buttons. Press − at quantity 1 to remove an item!";
  }

  return "I'm not sure I understand. I can help with: finding products, tracking orders, shipping & delivery, returns & refunds, payment methods, discounts, and account questions. Try asking about one of those!";
}

// Start the app when DOM is ready
document.addEventListener("DOMContentLoaded", init);
