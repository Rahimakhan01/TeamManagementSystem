import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Student Team Members</h3>
            <p className="text-gray-400 text-sm">Manage your team efficiently</p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Github">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            © {currentYear} Student Team Management. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;