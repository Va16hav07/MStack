import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-white/20 p-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <p className="text-sm text-gray-600">
            © {currentYear} User Management System. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Contact Us
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
