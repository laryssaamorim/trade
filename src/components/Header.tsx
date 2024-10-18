import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import QuotationBar from './QuotationBar';

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trade');

  return (
    <div>
      <header className="h-16 bg-[#230F3E] flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <nav className="flex space-x-2">
            <button
              className={`relative px-3 py-1 text-sm font-medium ${
                activeTab === 'Trade' ? 'text-white' : 'text-[#83838B]'
              }`}
              onClick={() => setActiveTab('Trade')}
            >
              Trade
              {activeTab === 'Trade' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5500]" />
              )}
            </button>
            <button
              className={`relative px-3 py-1 text-sm font-medium ${
                activeTab === 'Markets' ? 'text-white' : 'text-[#83838B]'
              }`}
              onClick={() => setActiveTab('Markets')}
            >
              Markets
              {activeTab === 'Markets' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5500]" />
              )}
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <Bell size={20} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <User size={20} />
          </button>
        </div>
      </header>
      <QuotationBar />
    </div>
  );
};

export default Header;
