// pages/about.tsx
import React from 'react';
import Image from 'next/image';
import { FaLeaf, FaHeart, FaTshirt, FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-teal-500">
            About FashionAura
          </span>
          <div className="absolute w-24 h-1 bg-teal-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <Image 
              src="/images/team.jpg" 
              alt="FashionAura Team" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl"
            />
          
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2023, FashionAura was born from a passion for style and a commitment to sustainability. 
              We believe that fashion should not only make you look good but also feel good about your choices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of dedicated designers and fashion enthusiasts work tirelessly to bring you the latest trends 
              while ensuring our practices are ethical and environmentally friendly.
            </p>
            <div className="mt-6">
              <Link href="/products" className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition duration-300 inline-block">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: FaLeaf, title: "Sustainable", description: "We use eco-friendly materials and processes" },
            { icon: FaHeart, title: "Ethical", description: "Fair labor practices and animal-friendly products" },
            { icon: FaTshirt, title: "Stylish", description: "Cutting-edge designs that keep you trendy" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
              <div className="bg-teal-500 text-white rounded-full p-3 inline-block mb-4">
                <item.icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-inner mb-16">
          <FaQuoteLeft className="text-4xl text-teal-500 mb-4" />
          <blockquote className="text-xl italic text-gray-700 mb-4">
            "FashionAura isn't just about clothes; it's about making a statement while making a difference."
          </blockquote>
          <p className="text-right text-gray-600">- Hmoavia_07, Founder</p>
        </div>

        <div className="text-center bg-teal-500 text-white p-12 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the FashionAura community and help us redefine fashion for a better tomorrow.
          </p>
          <Link href="/signup" className="bg-white text-teal-500 px-10 py-3 rounded-full hover:bg-gray-100 transition duration-300 inline-block font-semibold shadow-md">
            Sign Up Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;
