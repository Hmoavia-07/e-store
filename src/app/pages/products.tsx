


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string[];
}
// Add products
export const products: Product[] = [

  {
    id: 2,
    name: "Denim Jacket",
    price: 55,
    image: "/images/hhh.jpg",
    description: "A fashionable denim jacket.",
    size: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: "Graphic T-Shirt",
    price: 25,
    image: "/images/hhh.jpg",
    description: "A trendy graphic t-shirt with a modern design.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: 120,
    image: "/images/hhh.jpg",
    description: "A sleek leather jacket for a stylish look.",
    size: ["M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    name: "Slim Fit Jeans",
    price: 45,
    image: "/images/hhh.jpg",
    description: "Comfortable slim-fit jeans with a modern cut.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Casual Hoodie",
    price: 35,
    image: "/images/hhh.jpg",
    description: "A cozy casual hoodie perfect for everyday wear.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Summer Dress",
    price: 60,
    image: "/images/hhh.jpg",
    description: "A light and breezy summer dress in vibrant colors.",
    size: ["S", "M", "L"]
  },
  {
    id: 8,
    name: "Plaid Shirt",
    price: 40,
    image: "/images/hhh.jpg",
    description: "A classic plaid shirt for a casual look.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Oversized Sweater",
    price: 50,
    image: "/images/hhh.jpg",
    description: "A comfortable oversized sweater for relaxed style.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 10,
    name: "Chino Pants",
    price: 55,
    image: "/images/hhh.jpg",
    description: "Stylish chino pants with a slim-fit design.",
    size: ["M", "L", "XL", "XXL"]
  },
  {
    id: 11,
    name: "Maxi Skirt",
    price: 65,
    image: "/images/hhh.jpg",
    description: "A flowy maxi skirt for a chic, feminine look.",
    size: ["S", "M", "L", "XL"]
  },
  {
    id: 12,
    name: "Puffer Jacket",
    price: 90,
    image: "/images/hhh.jpg",
    description: "A warm puffer jacket perfect for cold weather.",
    size: ["M", "L", "XL", "XXL"]
  },
  {
    id: 13,
    name: "Cargo Shorts",
    price: 35,
    image: "/images/hhh.jpg",
    description: "Durable cargo shorts with multiple pockets.",
    size: ["S", "M", "L", "XL"]
  }
  
];
