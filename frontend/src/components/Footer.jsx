import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white p-6 border-t border-neutral-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-neutral-600">
            © {currentYear} MStack Management System. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Privacy Policy</a>
          <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Terms of Service</a>
          <a href="#" className="text-sm text-neutral-600 hover:text-primary-600">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
