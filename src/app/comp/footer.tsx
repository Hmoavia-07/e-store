// components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} FashionAura Clothing Store by Hmoavia_07. All rights reserved.</p>
          <p className="mt-2">Follow us on social media!</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  