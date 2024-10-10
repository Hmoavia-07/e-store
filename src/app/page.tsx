"use client";
import { products } from './pages/products';
import { Product } from './pages/products';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaStar, FaQuoteLeft, FaEnvelope } from 'react-icons/fa';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-screen flex items-center justify-center" 
           style={{ backgroundImage: "url('/images/jjj.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white z-10 p-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Elevate Your Style</h1>
          <p className="text-lg md:text-xl mb-6">Discover our latest minimalist clothing collection</p>
          <button className="bg-white text-black py-2 px-6 md:py-3 md:px-8 rounded-full text-sm md:text-lg font-semibold hover:bg-gray-200 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>


      <div className="container mx-auto p-4 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
          >
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110" // Added hover effect
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <button
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>



      {/* Testimonials Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ name: "Sarah J.", text: "I love the quality and simplicity of the clothes!" },
              { name: "John D.", text: "Fast shipping and great customer service!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <FaQuoteLeft className="text-3xl md:text-4xl text-gray-300 mb-4" />
                <p className="text-base md:text-lg mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 md:mb-8 text-lg">Sign up for our newsletter and get 10% off your first order!</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 pl-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-300 sm:w-auto w-full"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

