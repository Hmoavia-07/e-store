// components/Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">FashionAura</h3>
            <p className="text-sm">Elevate your style with FashionAura&apos;s curated collection of trendsetting clothing.</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-white transition duration-300">About Us</Link>
              <Link href="/contact" className="hover:text-white transition duration-300">Contact</Link>
              <Link href="/faq" className="hover:text-white transition duration-300">FAQ</Link>
              <Link href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link>
            </nav>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
                <FaInstagram size={24} />
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <FaEnvelope size={20} className="mr-2" />
              <a href="mailto:contact@fashionaura.com" className="hover:text-white transition duration-300">contact@fashionaura.com</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FashionAura Clothing Store by Hmoavia_07. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
