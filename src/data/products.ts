import { Product } from '../types/store';

export const products: Product[] = [
  {
    id: 1,
    name: "Artisan Leather Biker Jacket",
    slug: "artisan-leather-biker-jacket",
    price: 185,
    originalPrice: 220,
    image: "/images/ltr.jpg",
    images: [
      "/images/ltr.jpg",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Outerwear",
    tag: "Best Seller",
    description: "Expertly handcrafted from supple vegetable-tanned leather, this iconic biker silhouette features brushed matte silver hardware and an asymmetric zip front.",
    details: [
      "100% full-grain genuine leather shell",
      "Silk-touch breathable cupro lining",
      "Heavy gauge custom matte silver zippers",
      "Tailored shoulder epaulettes & zip cuffs"
    ],
    material: "100% Full-Grain Leather, 100% Cupro Lining",
    care: "Specialist leather dry clean only. Store on shaped hanger in dry environment.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Onyx Black", hex: "#111111" },
      { name: "Espresso", hex: "#2e1c14" },
      { name: "Slate Grey", hex: "#474d52" }
    ],
    rating: 4.9,
    reviewCount: 42,
    stock: 8,
    reviews: [
      {
        id: "r1",
        author: "Marcus V.",
        rating: 5,
        date: "2 days ago",
        comment: "The leather quality is remarkable at this price point. Fits like a glove with just enough drape.",
        verified: true
      },
      {
        id: "r2",
        author: "Elena R.",
        rating: 5,
        date: "1 week ago",
        comment: "Soft, weighty, and looks timeless. The zippers feel very high grade.",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "Selvedge Raw Denim Jacket",
    slug: "selvedge-raw-denim-jacket",
    price: 95,
    originalPrice: 120,
    image: "/images/hhh.jpg",
    images: [
      "/images/hhh.jpg",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Denim",
    tag: "Trending",
    description: "Cut from 13.5oz organic Japanese selvedge denim. Designed with custom shank buttons, dual chest flap pockets, and tailored pleats.",
    details: [
      "13.5oz shuttle-loomed organic cotton",
      "Red-line selvedge interior detail",
      "Antiqued copper shank buttons",
      "Pre-shrunk sanforized denim"
    ],
    material: "100% Organic Japanese Cotton",
    care: "Cold soak wash inside-out, hang dry to preserve indigo depth.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Deep Indigo", hex: "#1b2a4a" },
      { name: "Washed Slate", hex: "#4a5568" }
    ],
    rating: 4.8,
    reviewCount: 38,
    stock: 14,
    reviews: [
      {
        id: "r3",
        author: "Julian K.",
        rating: 5,
        date: "3 weeks ago",
        comment: "True vintage cut and exceptional selvedge craftsmanship.",
        verified: true
      }
    ]
  },
  {
    id: 3,
    name: "Architectural Graphic Tee",
    slug: "architectural-graphic-tee",
    price: 38,
    originalPrice: 48,
    image: "/images/grp.jpg",
    images: [
      "/images/grp.jpg",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Tops",
    tag: "Organic Cotton",
    description: "Crafted from 240 GSM heavy combed organic cotton with a ribbed collar and screen-printed minimalist Bauhaus geometric artwork.",
    details: [
      "240 GSM heavyweight combed cotton",
      "Water-based non-toxic silkscreen print",
      "Reinforced collar binding that keeps shape",
      "Slightly boxy contemporary drop-shoulder cut"
    ],
    material: "100% GOTS Certified Organic Cotton",
    care: "Machine wash cold with like colors. Tumble dry low or air dry.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Chalk White", hex: "#f8f9fa" },
      { name: "Charcoal", hex: "#2b2d42" },
      { name: "Sand", hex: "#d8cbb8" }
    ],
    rating: 4.7,
    reviewCount: 56,
    stock: 25,
    reviews: [
      {
        id: "r4",
        author: "Liam S.",
        rating: 5,
        date: "5 days ago",
        comment: "Heavyweight tee that doesn't lose shape after multiple washes.",
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: "Modern Tapered Slim Denim",
    slug: "modern-tapered-slim-denim",
    price: 78,
    originalPrice: 95,
    image: "/images/slm.jpg",
    images: [
      "/images/slm.jpg",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Denim",
    tag: "Best Seller",
    description: "Constructed with 2% elastane woven into long-staple denim for flexibility and shape retention throughout the day.",
    details: [
      "Mid-rise tailored fit with narrow ankle opening",
      "Reinforced bartack stitching at stress points",
      "Custom branded YKK brass zip fly",
      "Vintage whiskered wash pattern"
    ],
    material: "98% Cotton, 2% Elastane",
    care: "Machine wash cold inside out. Line dry.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Faded Indigo", hex: "#2c3e50" },
      { name: "Washed Black", hex: "#1f1f1f" }
    ],
    rating: 4.8,
    reviewCount: 64,
    stock: 19,
    reviews: [
      {
        id: "r5",
        author: "David B.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Perfect balance of comfort and slim tailoring. Ordered a second pair!",
        verified: true
      }
    ]
  },
  {
    id: 5,
    name: "Brushed Fleece Relaxed Hoodie",
    slug: "brushed-fleece-relaxed-hoodie",
    price: 68,
    originalPrice: 85,
    image: "/images/hde.jpg",
    images: [
      "/images/hde.jpg",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Tops",
    tag: "Trending",
    description: "An everyday luxury staple cut from 450 GSM French Terry cotton with brushed fleece backing for maximum warmth and structure.",
    details: [
      "450 GSM French Terry brushed cotton",
      "Double-layered structured hood (drawstring-free)",
      "Hidden side seam kangaroo pockets",
      "Heavy ribbed cuffs and hem"
    ],
    material: "100% Combed Cotton Terry",
    care: "Machine wash cold gentle. Do not tumble dry.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Heather Grey", hex: "#8d99ae" },
      { name: "Pitch Black", hex: "#111111" },
      { name: "Forest Moss", hex: "#2d4739" }
    ],
    rating: 4.9,
    reviewCount: 89,
    stock: 16,
    reviews: [
      {
        id: "r6",
        author: "Chloe M.",
        rating: 5,
        date: "1 month ago",
        comment: "The hood holds its shape perfectly and the interior fleece is cloud-soft.",
        verified: true
      }
    ]
  },
  {
    id: 6,
    name: "Riviera Linen Tiered Midi Dress",
    slug: "riviera-linen-tiered-midi-dress",
    price: 110,
    originalPrice: 135,
    image: "/images/smr.jpg",
    images: [
      "/images/smr.jpg",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dresses",
    tag: "New Arrival",
    description: "Woven from French flax linen that softens with every wear. Features romantic tiered ruffles, concealed pockets, and an adjustable tie sash.",
    details: [
      "100% certified French flax linen",
      "Hidden functional side pockets",
      "Lined bodice with breathable voile",
      "Flattering A-line tiered silhouette"
    ],
    material: "100% French Flax Linen",
    care: "Gentle machine wash cold. Hang dry in shade, warm iron when damp.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Coral Sunset", hex: "#e76f51" },
      { name: "Pure Sand", hex: "#e9c46a" },
      { name: "Sage Garden", hex: "#6b705c" }
    ],
    rating: 4.9,
    reviewCount: 31,
    stock: 11,
    reviews: [
      {
        id: "r7",
        author: "Hannah W.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Wore this to a garden wedding and received endless compliments. Pockets are a huge bonus!",
        verified: true
      }
    ]
  },
  {
    id: 7,
    name: "Heritage Flannel Plaid Overshirt",
    slug: "heritage-flannel-plaid-overshirt",
    price: 65,
    originalPrice: 80,
    image: "/images/pld.jpg",
    images: [
      "/images/pld.jpg",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Tops",
    tag: "Trending",
    description: "Double-brushed cotton twill offering substantial warmth. Wear it as an overshirt or buttoned up as an insulating midlayer.",
    details: [
      "Dual chest flap pockets with button closure",
      "Double-brushed yarn-dyed pattern",
      "Curved hemline with reinforced gussets",
      "Faux horn durable buttons"
    ],
    material: "100% Double-Brushed Cotton",
    care: "Machine wash cold with like colors. Low tumble dry.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Autumn Ochre", hex: "#b07d62" },
      { name: "Navy Tartan", hex: "#1e293b" }
    ],
    rating: 4.7,
    reviewCount: 47,
    stock: 22,
    reviews: [
      {
        id: "r8",
        author: "Oliver T.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Substantial fabric weight, feels warm and looks fantastic layered over a white tee.",
        verified: true
      }
    ]
  },
  {
    id: 8,
    name: "Cashmere-Blend Oversized Knit",
    slug: "cashmere-blend-oversized-knit",
    price: 135,
    originalPrice: 165,
    image: "/images/ovr.jpg",
    images: [
      "/images/ovr.jpg",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Tops",
    tag: "Best Seller",
    description: "An ultra-soft fisherman rib knit spun from Grade-A Mongolian cashmere and extra-fine Merino wool for sumptuous warmth without bulk.",
    details: [
      "70% Extra Fine Merino Wool, 30% Grade-A Cashmere",
      "Raglan shoulders for easy layering",
      "Subtle side vents for a fluid drape",
      "Ribbed mock-neck collar"
    ],
    material: "70% Merino Wool, 30% Cashmere",
    care: "Hand wash in cool water with wool detergent. Dry flat on towel.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Cream", hex: "#e6e2dd" },
      { name: "Midnight Charcoal", hex: "#2b2d42" },
      { name: "Cinnamon", hex: "#934b00" }
    ],
    rating: 5.0,
    reviewCount: 74,
    stock: 9,
    reviews: [
      {
        id: "r9",
        author: "Sophie D.",
        rating: 5,
        date: "4 days ago",
        comment: "Incredibly luxurious feel. Zero scratchiness and holds warmth in crisp weather.",
        verified: true
      }
    ]
  },
  {
    id: 9,
    name: "Pleated Tailored Chino Trousers",
    slug: "pleated-tailored-chino-trousers",
    price: 82,
    originalPrice: 105,
    image: "/images/chin.jpg",
    images: [
      "/images/chin.jpg",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Bottoms",
    tag: "New Arrival",
    description: "Designed with subtle front pleats and a relaxed tapered leg. Made from garment-dyed cotton twill with an interior gripper waistband.",
    details: [
      "Garment-dyed cotton twill with peach finish",
      "Single reverse front pleats",
      "Slanted side pockets and button-through rear pockets",
      "Concealed tab closure with internal hook"
    ],
    material: "97% Cotton Twill, 3% Elastane",
    care: "Machine wash warm inside out. Warm iron.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Olive Drab", hex: "#556b2f" },
      { name: "Warm Khaki", hex: "#c2b280" },
      { name: "Deep Navy", hex: "#1a2530" }
    ],
    rating: 4.8,
    reviewCount: 39,
    stock: 18,
    reviews: [
      {
        id: "r10",
        author: "Alexander P.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Versatile styling from business casual to weekend coffees. The drape is outstanding.",
        verified: true
      }
    ]
  },
  {
    id: 10,
    name: "Pleated Silk-Georgette Maxi Skirt",
    slug: "pleated-silk-georgette-maxi-skirt",
    price: 98,
    originalPrice: 125,
    image: "/images/mxc.jpg",
    images: [
      "/images/mxc.jpg",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Dresses",
    tag: "Limited Edition",
    description: "Fine sunray accordion pleats that cascade effortlessly to floor length. Finished with a flexible elasticated waistband and internal satin slip.",
    details: [
      "Permanent heat-set micro pleating",
      "Comfort stretch grosgrain waistband",
      "Integrated full-length tonal slip",
      "Graceful fluid movement with every step"
    ],
    material: "100% Recycled Polyester Georgette, Silk Touch Lining",
    care: "Hand wash cold, line dry away from direct sunlight.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Glaze", hex: "#2a9d8f" },
      { name: "Champagne Pearl", hex: "#f3e9dc" },
      { name: "Noir", hex: "#141414" }
    ],
    rating: 4.8,
    reviewCount: 29,
    stock: 7,
    reviews: [
      {
        id: "r11",
        author: "Isabella N.",
        rating: 5,
        date: "1 week ago",
        comment: "The movement on this skirt is breathtaking. Received so many compliments at dinner.",
        verified: true
      }
    ]
  },
  {
    id: 11,
    name: "All-Weather Technical Puffer Jacket",
    slug: "all-weather-technical-puffer-jacket",
    price: 155,
    originalPrice: 195,
    image: "/images/pfr.jpg",
    images: [
      "/images/pfr.jpg",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Outerwear",
    tag: "Best Seller",
    description: "Engineered for sub-zero climates with 700-fill power recycled down alternative and a water-repellent ripstop nylon shell.",
    details: [
      "700-fill recycled PrimaLoft insulation",
      "DWR water-repellent micro-ripstop shell",
      "Fleece-lined storm handwarmer pockets",
      "Detachable insulated storm hood with bungee toggles"
    ],
    material: "100% Recycled Ripstop Nylon, PrimaLoft Gold Insulation",
    care: "Machine wash cold delicate. Tumble dry low with dryer balls.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Matte Black", hex: "#1c1c1c" },
      { name: "Alpine Forest", hex: "#1b4332" },
      { name: "Arctic Mist", hex: "#8ecae6" }
    ],
    rating: 4.9,
    reviewCount: 92,
    stock: 12,
    reviews: [
      {
        id: "r12",
        author: "Nathan C.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Kept me completely warm during 15-degree windy weather in Chicago. Impeccable build.",
        verified: true
      }
    ]
  },
  {
    id: 12,
    name: "Tactical Utility Cargo Shorts",
    slug: "tactical-utility-cargo-shorts",
    price: 52,
    originalPrice: 65,
    image: "/images/crg.jpg",
    images: [
      "/images/crg.jpg",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Bottoms",
    tag: "Trending",
    description: "Constructed with durable stretch ripstop cotton, reinforced gusseted crotch, and low-profile magnetic snap cargo pockets.",
    details: [
      "Durable 8.5oz stretch cotton ripstop",
      "Low-profile expandable magnetic cargo bellows",
      "Gusseted crotch for unrestricted mobility",
      "Adjustable webbed nylon cinch belt included"
    ],
    material: "98% Cotton Ripstop, 2% Spandex",
    care: "Machine wash warm with like colors. Tumble dry medium.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Field Olive", hex: "#4b5320" },
      { name: "Charcoal Slate", hex: "#363b42" },
      { name: "Desert Tan", hex: "#c3b091" }
    ],
    rating: 4.7,
    reviewCount: 35,
    stock: 15,
    reviews: [
      {
        id: "r13",
        author: "Brett L.",
        rating: 5,
        date: "1 month ago",
        comment: "The magnetic flaps on the pockets are a game changer. Very comfortable fit.",
        verified: true
      }
    ]
  }
];

export const VALID_COUPONS = [
  { code: "AURA15", discountPercent: 15, description: "15% off your entire order" },
  { code: "WELCOME10", discountPercent: 10, description: "10% welcome discount" },
  { code: "VIP20", discountPercent: 20, description: "20% VIP customer discount", minSpend: 150 }
];

export const CATEGORIES = ["All", "Outerwear", "Tops", "Denim", "Bottoms", "Dresses"] as const;
