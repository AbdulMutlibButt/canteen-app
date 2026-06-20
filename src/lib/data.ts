export const categories = ["All", "Burger", "Pizza", "Biryani", "Fast Food", "Drinks", "Snacks"];

export const menuItems = [
    { id: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", tag: "Burger", rating: 4.8, title: "Classic Beef Burger", subtitle: "Juicy beef patty with fresh vegetables", price: 299 },
    { id: 2, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500", tag: "Burger", rating: 4.9, title: "Double Cheese Burger", subtitle: "Two beef patties with extra cheese", price: 399 },
    { id: 3, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", tag: "Burger", rating: 4.7, title: "Chicken Burger", subtitle: "Crispy chicken with special sauce", price: 249 },
    { id: 4, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500", tag: "Pizza", rating: 4.9, title: "Supreme Pizza", subtitle: "Loaded with pepperoni, olives, and bell peppers", price: 449 },
    { id: 5, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500", tag: "Pizza", rating: 4.8, title: "Cheese Burst Pizza", subtitle: "Overflowing gooey cheese mozzarella blend", price: 499 },
    { id: 6, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500", tag: "Pizza", rating: 4.6, title: "Thin Crust Veggie", subtitle: "Crisp crust with seasonal garden vegetables", price: 349 },
    { id: 7, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500", tag: "Biryani", rating: 4.8, title: "Hyderabadi Biryani", subtitle: "Fragrant long-grain basmati rice with spices", price: 279 },
    { id: 8, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=500", tag: "Drinks", rating: 4.5, title: "Mango Smoothie", subtitle: "Fresh blended tropical sweet mangoes", price: 129 },
];

export const todayDeals = [
  {
    id: "student-mega-combo",
    title: "Student Mega Combo",
    subtitle: "Burger + Fries + Drink + Dessert",
    price: 349,
    originalPrice: 549,
    discount: "36% OFF",
    tag: "BESTSELLER",
    tagStyle: "bg-amber-100/90 text-amber-800 border border-amber-200/80 backdrop-blur-xs",
    timeLeft: "2 hours left",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500"
  },
  {
    id: "pizza-party-deal",
    title: "Pizza Party Deal",
    subtitle: "2 Medium Pizzas + 2 Drinks",
    price: 599,
    originalPrice: 898,
    discount: "33% OFF",
    tag: "LIMITED",
    tagStyle: "bg-slate-900/90 text-slate-100 border border-slate-800 backdrop-blur-xs",
    timeLeft: "Today only",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500"
  },
  {
    id: "biryani-special",
    title: "Biryani Special",
    subtitle: "Biryani + Raita + Salad + Dessert",
    price: 299,
    originalPrice: 499,
    discount: "40% OFF",
    tag: "HOT DEAL",
    tagStyle: "bg-rose-100/90 text-rose-800 border border-rose-200/80 backdrop-blur-xs",
    timeLeft: "5 hours left",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500"
  },
  {
    id: "breakfast-bundle",
    title: "Breakfast Bundle",
    subtitle: "Sandwich + Coffee + Juice",
    price: 199,
    originalPrice: 299,
    discount: "33% OFF",
    tag: "MORNING",
    tagStyle: "bg-yellow-100/90 text-yellow-800 border border-yellow-200/80 backdrop-blur-xs",
    timeLeft: "Until 11 AM",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500"
  },
  {
    id: "healthy-meal",
    title: "Healthy Meal",
    subtitle: "Salad Bowl + Smoothie + Nuts",
    price: 249,
    originalPrice: 399,
    discount: "38% OFF",
    tag: "HEALTHY",
    tagStyle: "bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 backdrop-blur-xs",
    timeLeft: "3 hours left",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500"
  },
  {
    id: "late-night-snack",
    title: "Late Night Snack",
    subtitle: "Wings + Fries + Cola",
    price: 279,
    originalPrice: 429,
    discount: "35% OFF",
    tag: "EVENING",
    tagStyle: "bg-indigo-100/90 text-indigo-800 border border-indigo-200/80 backdrop-blur-xs",
    timeLeft: "After 6 PM",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=500"
  }
];
