import { MenuItem, GalleryItem, Testimonial, FAQItem, CuisineType } from '../types';

export const RESTAURANT_INFO = {
  name: 'ANHAD DAS',
  subname: 'ROYAL INDIAN DINING & CELEBRATIONS',
  tagline: 'Where Indian Flavours Meet Timeless Celebrations.',
  description: 'An elevated Indian dining experience crafted for memorable meals, intimate gatherings and unforgettable celebrations.',
  address: 'No. 8, Heritage Royal Pavilion, Civil Lines, New Delhi 110054',
  phone: '+91 98712 34500',
  phoneDisplay: '+91 (0) 11 4982 3500 / +91 98712 34500',
  email: 'reservations@anhaddas.com',
  conciergeEmail: 'celebrations@anhaddas.com',
  instagramHandle: '@anhaddas',
  instagramUrl: 'https://instagram.com',
  hours: {
    lunch: '12:00 PM – 03:30 PM (Daily)',
    dinner: '07:00 PM – 11:30 PM (Daily)',
    lateLounge: '11:00 PM – 01:00 AM (Fri & Sat)'
  },
  valet: 'Complimentary private valet parking available'
};

export const CUISINE_CATEGORIES: {
  title: CuisineType;
  subtitle: string;
  description: string;
  image: string;
}[] = [
  {
    title: 'North Indian',
    subtitle: 'Slow-Simmered Heritage',
    description: 'Silken gravies, slow-braised spices, and centuries-old culinary secrets from the imperial courts.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Mughlai',
    subtitle: 'Imperial Royal Dastarkhwan',
    description: 'Decadent kormas, whole spice infusions, saffron aroma, and dry-fruit-enriched delicacies.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Punjabi',
    subtitle: 'Rustic Richness & Pure Desi Ghee',
    description: 'Robust charcoal flavors, hearty clay-oven breads, and heritage recipes made with warmth and uninhibited generosity.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Tandoor',
    subtitle: 'Live Charcoal Embers & Smoke',
    description: 'Clay pot roasting at 450°C, infusing char-grilled meats, cottage cheese, and smoky notes with aromatic spices.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Vegetarian',
    subtitle: 'Artisanal Satvik & Royal Greens',
    description: 'An expansive royal repertoire celebrating hand-churned paneer, delicate seasonal produce, and rich lentil stews.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Non-Vegetarian',
    subtitle: 'Tender Cuts & Grand Banquets',
    description: 'Prime cuts of spring mutton, corn-fed spring chicken, and coastal prawns marinated overnight in stone-ground spices.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Breads',
    subtitle: 'Hand-Stretched & Tandoor Baked',
    description: 'Crisp Amritsari kulchas, flaky laccha parathas, and saffron-infused Sheermal crafted fresh for every order.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Rice & Biryani',
    subtitle: 'Aged Basmati Dum Pukht',
    description: 'Dough-sealed heavy brass handis locking in whole cardamom, kewra, saffron layers, and deeply spiced cuts.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Desserts',
    subtitle: 'Mithai Elegance & Silver Vark',
    description: 'Warm melt-in-the-mouth gulab jamuns, saffron phirni in earthen sakoras, and modern interpretations of royal sweets.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=85'
  },
  {
    title: 'Beverages',
    subtitle: 'Botanical Elixirs & Signature Drinks',
    description: 'Artisanal royal mocktails, smoked star-anise infusions, rich saffron pistachio lassis, and ceremonial Kashmiri kahwa.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=85'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'm1',
    name: 'Galouti Kebab Awadhi',
    category: 'STARTERS',
    cuisineTag: 'Mughlai',
    description: 'Silken minced mutton patties infused with 32 secret spices, smoked over clove embers, served on mini saffron sheermal.',
    price: 895,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    preparationTime: '20 mins',
    serves: '2-3 guests',
    pairingNotes: 'Smoked Tamarind Old Fashioned'
  },
  {
    id: 'm2',
    name: 'Dahi Ke Kebab Nizami',
    category: 'STARTERS',
    cuisineTag: 'Vegetarian',
    description: 'Crisp golden crust filled with hung curd, green cardamom, roasted cumin, and crushed pistachios.',
    price: 645,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    serves: '2 guests',
    pairingNotes: 'Mint & Pomegranate Spritz'
  },
  {
    id: 'm3',
    name: 'Kasundi Mustard Prawns',
    category: 'STARTERS',
    cuisineTag: 'Non-Vegetarian',
    description: 'Jumbo bay of Bengal prawns marinated in stone-ground pungent Kasundi mustard, turmeric leaf, and grilled over charcoal.',
    price: 1195,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    serves: '2-3 guests',
    pairingNotes: 'Kaffir Lime Tonic'
  },

  // TANDOOR
  {
    id: 'm4',
    name: 'Paneer Tikka Shahi Angara',
    category: 'TANDOOR',
    cuisineTag: 'Tandoor',
    description: 'Char-grilled cottage cheese steeped in aromatic Mathania red chili, yellow mustard oil, hung yogurt, and charred bell peppers.',
    price: 695,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    preparationTime: '20 mins',
    serves: '2 guests',
    pairingNotes: 'Pomegranate & Mint Cooler'
  },
  {
    id: 'm5',
    name: 'Murgh Malai Tikka Saffron',
    category: 'TANDOOR',
    cuisineTag: 'North Indian',
    description: 'Tender boneless chicken steeped in rich mascarpone, clotted cream, green cardamom, and toasted Kashmiri saffron threads.',
    price: 845,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    preparationTime: '22 mins',
    serves: '2-3 guests',
    pairingNotes: 'Saffron Lassi Royale'
  },
  {
    id: 'm6',
    name: 'Bhatti Da Murgh',
    category: 'TANDOOR',
    cuisineTag: 'Punjabi',
    description: 'A legendary Amritsari recipe: bone-in chicken marinated in black pepper, coriander seeds, and dark mustard embers.',
    price: 895,
    isVeg: false,
    isChefSpecial: false,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    serves: '2-3 guests',
    pairingNotes: 'Spiced Ginger Brew'
  },
  {
    id: 'm7',
    name: 'Tandoori Broccoli Truffle Malai',
    category: 'TANDOOR',
    cuisineTag: 'Vegetarian',
    description: 'Charred fresh broccoli florets tossed in cream cheese, roasted garlic paste, and drizzled with earthy black truffle oil.',
    price: 725,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    preparationTime: '18 mins',
    serves: '2 guests',
    pairingNotes: 'Crisp Cardamom Fizz'
  },

  // MAIN COURSE
  {
    id: 'm8',
    name: 'Anhad Special Butter Chicken',
    category: 'MAIN COURSE',
    cuisineTag: 'North Indian',
    description: 'Slow-cooked, rich, aromatic and created with vine-ripened tomatoes, slow-simmered churned white butter, and fenugreek leaves.',
    price: 945,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    serves: '2-3 guests',
    pairingNotes: 'Garlic Butter Naan & Smoked Clove Elixir'
  },
  {
    id: 'm9',
    name: 'Dal Makhani Heritage 24-Hour',
    category: 'MAIN COURSE',
    cuisineTag: 'Punjabi',
    description: 'Slow-cooked whole black urad lentils simmered overnight over dying charcoal tandoor embers, finished with organic butter and dairy cream.',
    price: 695,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    preparationTime: '15 mins',
    serves: '2-3 guests',
    pairingNotes: 'Crispy Amritsari Kulcha'
  },
  {
    id: 'm10',
    name: 'Mutton Rogan Josh Kashmiri',
    category: 'MAIN COURSE',
    cuisineTag: 'Mughlai',
    description: 'Slow-cooked tender spring mutton shank braised in aromatic Kashmiri mawal flower extract, ratanjot, and sun-dried fennel powder.',
    price: 1095,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    preparationTime: '30 mins',
    serves: '2-3 guests',
    pairingNotes: 'Khamiri Roti & Kashmiri Kahwa'
  },
  {
    id: 'm11',
    name: 'Lasooni Palak Paneer Royal',
    category: 'MAIN COURSE',
    cuisineTag: 'Vegetarian',
    description: 'Velvety purée of tender baby spinach tempered with burnt golden garlic flakes, roasted cumin, and hand-cut artisanal cottage cheese.',
    price: 745,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    preparationTime: '20 mins',
    serves: '2 guests',
    pairingNotes: 'Laccha Paratha'
  },

  // BIRYANI
  {
    id: 'm12',
    name: 'Hyderabadi Gosht Dum Biryani',
    category: 'BIRYANI',
    cuisineTag: 'Rice & Biryani',
    description: 'Fragrant long-grain aged basmati rice layered with tender mutton marinated overnight, saffron, fried onions, and steamed in sealed handi.',
    price: 995,
    isVeg: false,
    isChefSpecial: true,
    spiceLevel: 3,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    preparationTime: '30 mins',
    serves: '2-3 guests',
    pairingNotes: 'Burani Raita & Mirchi Ka Salan'
  },
  {
    id: 'm13',
    name: 'Subz Nizami Saffron Biryani',
    category: 'BIRYANI',
    cuisineTag: 'Rice & Biryani',
    description: 'Garden-fresh vegetables, baby potatoes, paneer, and caramelized shallots cooked with aged Dehradun basmati in aromatic sealed clay.',
    price: 795,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    preparationTime: '25 mins',
    serves: '2 guests',
    pairingNotes: 'Roasted Cumin & Pomegranate Raita'
  },

  // BREADS
  {
    id: 'm14',
    name: 'Amritsari Chur-Chur Kulcha',
    category: 'BREADS',
    cuisineTag: 'Breads',
    description: 'Layered crispy bread stuffed with spiced potatoes, cottage cheese, pomegranate seeds, crushed on serving and soaked in pure desi ghee.',
    price: 245,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    preparationTime: '12 mins',
    serves: '1-2 guests',
    pairingNotes: 'Pindi Chole & Tangy Onion Relish'
  },
  {
    id: 'm15',
    name: 'Truffle Garlic Butter Naan',
    category: 'BREADS',
    cuisineTag: 'Breads',
    description: 'Tandoor-baked refined flour bread brushed with browned garlic flakes, fresh coriander, dairy butter, and subtle white truffle oil.',
    price: 265,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    serves: '1 guest',
    pairingNotes: 'Pairs with any rich royal gravy'
  },
  {
    id: 'm16',
    name: 'Saffron Sheermal Royale',
    category: 'BREADS',
    cuisineTag: 'Breads',
    description: 'Traditional Mughal sweet flatbread kneaded with milk, saffron, and pure clarified butter, baked gently in charcoal tandoor.',
    price: 295,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    preparationTime: '12 mins',
    serves: '1 guest',
    pairingNotes: 'Mughlai Kormas'
  },

  // DESSERTS
  {
    id: 'm17',
    name: 'Royal Gulab Jamun with Pistachio Rabdi',
    category: 'DESSERTS',
    cuisineTag: 'Desserts',
    description: 'Warm, soft khoya dumplings filled with green cardamom pearls and rose syrup, resting in slow-reduced saffron pistachio rabdi.',
    price: 495,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    serves: '1-2 guests',
    pairingNotes: 'Warm Spiced Chai Latte'
  },
  {
    id: 'm18',
    name: 'Kesari Phirni in Clay Sakora',
    category: 'DESSERTS',
    cuisineTag: 'Desserts',
    description: 'Slow-cooked broken basmati rice milk pudding steeped in pure Kashmiri saffron, almond flakes, and covered with pure 24k silver vark.',
    price: 445,
    isVeg: true,
    isChefSpecial: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    preparationTime: '8 mins',
    serves: '1 guest',
    pairingNotes: 'Kashmiri Kahwa'
  },

  // BEVERAGES
  {
    id: 'm19',
    name: 'Royal Saffron & Pistachio Lassi',
    category: 'BEVERAGES',
    cuisineTag: 'Beverages',
    description: 'Thick, creamy churned organic yogurt infused with royal saffron strands, crushed Iranian pistachios, and a whisper of rose water.',
    price: 385,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    preparationTime: '8 mins',
    serves: '1 guest',
    pairingNotes: 'A classic start to a royal feast'
  },
  {
    id: 'm20',
    name: 'Smoked Tamarind & Star Anise Old Fashioned',
    category: 'BEVERAGES',
    cuisineTag: 'Beverages',
    description: 'Artisanal zero-proof or botanical cocktail with barrel-aged tamarind syrup, roasted cumin, clove smoke, and burnt orange zest.',
    price: 475,
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    preparationTime: '10 mins',
    serves: '1 guest',
    pairingNotes: 'Galouti Kebabs & Tandoor starters'
  }
];

export const DINING_EXPERIENCES = [
  {
    id: 'fine-dining',
    title: 'Fine Dining',
    tag: 'ELEGANCE & HERITAGE',
    description: 'Refined Indian cuisine in an elegant atmosphere with bespoke tableware, curated wine pairings, and attentive butler service.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    features: ['Intimate candlelit seating', 'Sommelier beverage pairings', 'Chef tasting menus']
  },
  {
    id: 'family-dining',
    title: 'Family Dining',
    tag: 'WARMTH & GENEROSITY',
    description: 'Spacious, comfortable dining designed for families where grandparents, parents, and children share generous platters in comfort.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    features: ['Expansive round & banquet tables', 'Customizable spice profiles', 'Dedicated family concierge']
  },
  {
    id: 'celebration-dining',
    title: 'Celebration Dining',
    tag: 'MILESTONES & MEMORIES',
    description: 'A memorable setting for birthdays, anniversaries and milestones, complete with floral artistry, customized cakes, and celebratory toasts.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    features: ['Signature celebration cakes', 'Bespoke floral centerpiece', 'Personalized menu stationery']
  },
  {
    id: 'private-dining',
    title: 'Private Dining',
    tag: 'EXCLUSIVE & DISCREET',
    description: 'Exclusive private chambers with personalized service, customized menus, private music acoustic controls, and dedicated waitstaff.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    features: ['Private entrance & foyer', 'Dedicated personal masterchef', 'Seating for 8 to 45 guests']
  }
];

export const CELEBRATION_TYPES = [
  {
    id: 'birthday',
    title: 'Birthday Celebrations',
    subtitle: 'Golden Milestones & Joyous Toasts',
    description: 'Celebrate your special day with authentic flavours, ambient candlelit lighting, customized artisanal birthday cake, and tailored banquet spreads.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    capacity: '10 - 150 guests'
  },
  {
    id: 'anniversary',
    title: 'Anniversaries',
    subtitle: 'Intimate Romance & Lasting Memories',
    description: 'Create an intimate evening worth remembering with bespoke rose petal setups, vintage wine selections, and personalized chef degustations.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    capacity: '2 - 40 guests'
  },
  {
    id: 'family-functions',
    title: 'Family Functions',
    subtitle: 'Generations Gathered In Harmony',
    description: 'Bring your entire extended family together around a bountiful Indian feast with spacious seating, comforting classics, and royal hospitality.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    capacity: '15 - 120 guests'
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    subtitle: 'Prestige, Discretion & Executive Dining',
    description: 'Premium dining experiences for leadership teams, high-stakes client dinners, annual celebrations, and discreet business banquets.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    capacity: '8 - 80 guests'
  },
  {
    id: 'private-parties',
    title: 'Private Parties',
    subtitle: 'Tailored Spaces & Exclusive Moments',
    description: 'Dedicated private chambers, customized theme décor, live instrumental background musicians, and personalized menus for any occasion.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    capacity: '12 - 90 guests'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Royal Charcoal Tandoori Platter',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
    caption: 'Tandoor-grilled cottage cheese and succulent kebabs with mint coriander relish.'
  },
  {
    id: 'g2',
    title: 'The Golden Dining Pavilion',
    category: 'INTERIORS',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    caption: 'Subtle warm brass accents and bespoke velvet dining alcoves under warm chandeliers.'
  },
  {
    id: 'g3',
    title: 'Grand Family Sunday Table',
    category: 'FAMILY',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    caption: 'Gatherings where three generations share stories over slow-simmered regional handis.'
  },
  {
    id: 'g4',
    title: 'Golden Jubilee Anniversary Feast',
    category: 'CELEBRATIONS',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    caption: 'Custom floral centerpieces and champagne toasts for lifelong milestone celebrations.'
  },
  {
    id: 'g5',
    title: 'Executive Boardroom Gala Dinner',
    category: 'EVENTS',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    caption: 'Private dining salon prepared for an evening of executive celebration.'
  },
  {
    id: 'g6',
    title: 'Candlelit Archways & Water Reflections',
    category: 'AMBIENCE',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    caption: 'Intimate evening lights glowing against carved sandstone arches and antique copper urns.'
  },
  {
    id: 'g7',
    title: 'Hyderabadi Dum Gosht Biryani Handi',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    caption: 'Unsealed dough-crusted copper handi releasing royal saffron and whole cardamom vapor.'
  },
  {
    id: 'g8',
    title: 'The Courtyard Cocktail Lounge',
    category: 'AMBIENCE',
    imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=85',
    caption: 'Earthy charcoal tones, hand-hammered brass, and botanical artisanal mixology.'
  },
  {
    id: 'g9',
    title: 'Birthday Soirée Private Chamber',
    category: 'CELEBRATIONS',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85',
    caption: 'Bespoke birthday table styling with hand-tied florals and warm ambient glow.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Vikramaditya & Radhika Singhania',
    rating: 5,
    text: 'Beautiful ambience, exceptional food and an amazing place for family dinners. The 24-hour slow-cooked Dal Makhani and Galouti Kebabs melted on the palate. Our parents were treated with such reverence.',
    occasion: '50th Wedding Anniversary & Family Dinner',
    date: 'February 2026',
    city: 'New Delhi'
  },
  {
    id: 't2',
    name: 'Ananya Roy Chowdhury',
    rating: 5,
    text: 'Perfect place for celebrations. The entire experience felt premium. We hosted my sister’s 30th birthday in the Private Dining Chamber — from customized printed menus to the staff timing every course flawlessly, it was magnificent.',
    occasion: 'Milestone Birthday Party (35 Guests)',
    date: 'January 2026',
    city: 'Mumbai & Delhi'
  },
  {
    id: 't3',
    name: 'Rohan Mehra & Associates',
    rating: 5,
    text: 'The food, service and atmosphere made our evening unforgettable. Our global corporate partners were completely blown away by the live charcoal tandoor and the subtlety of Indian royal spices. An absolute masterpiece.',
    occasion: 'Executive Corporate Gala',
    date: 'March 2026',
    city: 'Gurugram'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Reservations',
    question: 'Do I need a reservation?',
    answer: 'While we hold a select few walk-in tables for spontaneous guests each evening, advance reservations are strongly recommended — especially for dinner services, weekends, and celebration parties — to guarantee your preferred seating area and timing.'
  },
  {
    id: 'faq-2',
    category: 'Dining & Menu',
    question: 'Do you accept large family groups?',
    answer: 'Yes, absolutely. Family dining is the very cornerstone of Anhad Das. We offer large round banquet tables and connected semi-private alcoves comfortable for multi-generational families ranging from 8 to 40 guests.'
  },
  {
    id: 'faq-3',
    category: 'Events & Private Dining',
    question: 'Can I book the restaurant for a birthday?',
    answer: 'Yes! Birthdays are celebrated with immense joy at Anhad Das. We provide customized celebration packages including artisanal cakes from our in-house patisserie, floral centerpieces, customized menu cards, and dedicated table hosts.'
  },
  {
    id: 'faq-4',
    category: 'Events & Private Dining',
    question: 'Do you offer private dining?',
    answer: 'We feature two exclusive Private Dining Chambers: The Shahi Darbar (up to 20 guests) and The Heritage Pavilion (up to 50 guests). Both spaces feature dedicated service staff, private ambient sound control, and personalized chef menus.'
  },
  {
    id: 'faq-5',
    category: 'Events & Private Dining',
    question: 'Can I arrange decorations?',
    answer: 'Yes. Our dedicated celebrations concierge coordinates seamless personalized floral styling, mood lighting, elegant balloon arrangements, and custom table displays. You may also coordinate with approved decor partners upon advance notice.'
  },
  {
    id: 'faq-6',
    category: 'Events & Private Dining',
    question: 'Do you host corporate events?',
    answer: 'Yes. We frequently host business dinners, board meetings, corporate milestones, and team celebrations. Audio-visual presentation equipment and bespoke corporate tasting menus are available upon request.'
  },
  {
    id: 'faq-7',
    category: 'Dining & Menu',
    question: 'Do you have vegetarian options?',
    answer: 'Over half our signature menu is proudly vegetarian. We source our artisanal paneer fresh daily, use separate dedicated tandoors and cooking stations, and offer an expansive royal repertoire of vegetables and lentils.'
  },
  {
    id: 'faq-8',
    category: 'Dining & Menu',
    question: 'Do you offer Jain food?',
    answer: 'Yes. We cater to Jain dietary requirements with dedicated non-root vegetable preparations, made completely without onion or garlic upon request, retaining the authentic royal spice nuance and culinary excellence.'
  },
  {
    id: 'faq-9',
    category: 'Dining & Menu',
    question: 'Can I request special dietary requirements?',
    answer: 'Certainly. Our kitchen can accommodate gluten-free, dairy-conscious, nut-sensitive, and low-spice requests. Simply inform us during your table reservation or speak with your captain upon arrival.'
  },
  {
    id: 'faq-10',
    category: 'Reservations',
    question: 'Can I modify my reservation?',
    answer: 'Yes. You can effortlessly modify or cancel eligible reservations directly through your Customer Account dashboard on this website, or by calling our concierge at +91 98712 34500 up to two hours prior to your scheduled time.'
  },
  {
    id: 'faq-11',
    category: 'Reservations',
    question: 'What are your opening hours?',
    answer: 'Lunch is served daily from 12:00 PM to 03:30 PM. Dinner is served from 07:00 PM to 11:30 PM. On Friday and Saturday evenings, our ambient courtyard lounge serves signature drinks and light bites until 01:00 AM.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig1',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80',
    likes: '1,420',
    comments: '48',
    caption: 'Slow-simmered over fragrant tandoor embers. The Anhad Special Butter Chicken.'
  },
  {
    id: 'ig2',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    likes: '2,109',
    comments: '72',
    caption: 'Where candlelit shadows meet golden brass accents. Reserve your evening.'
  },
  {
    id: 'ig3',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    likes: '1,894',
    comments: '63',
    caption: 'The breaking of the saffron dough seal. Hyderabadi Gosht Dum Biryani in progress.'
  },
  {
    id: 'ig4',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    likes: '3,210',
    comments: '115',
    caption: 'Another milestone anniversary in our private pavilion. To memories that last generations.'
  },
  {
    id: 'ig5',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    likes: '1,650',
    comments: '51',
    caption: 'Clay pot embers charring artisanal paneer to smoky perfection.'
  },
  {
    id: 'ig6',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    likes: '2,480',
    comments: '89',
    caption: 'Smoked cardamom, cold-pressed tamarind, and aged star-anise botanicals.'
  }
];
