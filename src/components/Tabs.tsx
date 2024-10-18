import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trash2, Check } from 'lucide-react';

interface TabsProps {
  onCollapse: (collapsed: boolean) => void;
}

const Tabs: React.FC<TabsProps> = ({ onCollapse }) => {
  const tabs = ['Open orders (0)', 'Order history'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hideOtherPairs, setHideOtherPairs] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('1 DIA');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };

  useEffect(() => {
    onCollapse(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const openOrders = [
    {
      createdAt: '16/10/2024 13:20',
      pair: 'BTC/BRL',
      side: 'Buy',
      orderType: 'Limit',
      price: '356,990 BRL',
      quantity: '0.000044',
      activationCondition: '0%',
    },
    {
      createdAt: '15/10/2024 12:10',
      pair: 'ETH/USDT',
      side: 'Sell',
      orderType: 'Market',
      price: '1,550 USDT',
      quantity: '0.50',
      activationCondition: '—',
    },
    {
      createdAt: '14/10/2024 14:45',
      pair: 'LTC/USD',
      side: 'Buy',
      orderType: 'Limit',
      price: '67.25 USD',
      quantity: '10',
      activationCondition: '2%',
    },
  ];

  const handleCancelOrder = (orderIndex: number) => {
    console.log(`Order at index ${orderIndex} has been canceled.`);
  };

  const filters = ['1 DIA', '1 SEMANA', '1 MÊS', '3 MESES'];

  return (
    <div
      className={`bg-[#230F3E] rounded-lg flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'h-[40px]' : 'h-full'
      }`}
    >
      <div className="flex border-b border-gray-700 items-center justify-between">
        <button
          className="p-2 text-gray-400 hover:text-white"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {isCollapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div className="flex items-center flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`relative px-3 py-1 text-sm font-medium ${
                activeTab === tab ? 'text-white' : 'text-[#83838B]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5500]" />
              )}
            </button>
          ))}
        </div>
        <div className="ml-4" style={{ marginRight: '32px' }}>
          <label className="flex items-center text-gray-400 text-sm cursor-pointer">
            <div
              className={`mr-2 w-5 h-5 flex items-center justify-center rounded-md border-2 cursor-pointer ${
                hideOtherPairs
                  ? 'border-[#FF5500] bg-[#FF5500]'
                  : 'border-[#FF7FEB]'
              }`}
              onClick={() => setHideOtherPairs(!hideOtherPairs)}
            >
              {hideOtherPairs && <Check className="text-white" size={16} />}
            </div>
            Hide other pairs
          </label>
        </div>
      </div>

      {!isCollapsed && activeTab === tabs[1] && (
        <div className="p-4">
          <div className="flex space-x-2 mb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`h-[28px] px-3 flex items-center text-xs font-medium rounded ${
                  selectedFilter === filter
                    ? 'bg-[#F864E1] text-white'
                    : 'bg-[#351754] text-[#83838B]'
                }`}
              >
                {selectedFilter === filter && (
                  <Check size={16} className="mr-1 text-white" />
                )}
                {filter}
              </button>
            ))}
          </div>
          {/* Placeholder for order history */}
          <div className="text-gray-400">Order history content goes here.</div>
        </div>
      )}

      {!isCollapsed && activeTab === tabs[0] && (
        <div
          className="p-4 flex-grow overflow-y-auto"
          style={{ maxHeight: 'calc(100% - 64px)', marginTop: '-4px' }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-gray-300 text-xs border-b border-gray-700">
                  <th className="py-2 text-left">Created At</th>
                  <th className="py-2 text-left">Pair / Side</th>
                  <th className="py-2 text-left">Order Type</th>
                  <th className="py-2 text-left">Price / Total</th>
                  <th className="py-2 text-left">Qty / Exec.</th>
                  <th className="py-2 text-left">Activation Condition</th>
                  <th className="py-2 text-left">Cancel Order</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs">
                {openOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#2D1751] transition-colors border-b border-gray-700"
                  >
                    <td className="py-2 text-left">{order.createdAt}</td>
                    <td className="py-2 text-left">
                      {order.pair} / {order.side}
                    </td>
                    <td className="py-2 text-left">{order.orderType}</td>
                    <td className="py-2 text-left">{order.price}</td>
                    <td className="py-2 text-left">{order.quantity}</td>
                    <td className="py-2 text-left">
                      {order.activationCondition}
                    </td>
                    <td className="py-2 text-left">
                      <button
                        aria-label="Cancel order"
                        onClick={() => handleCancelOrder(index)}
                      >
                        <Trash2
                          size={16}
                          className="mx-auto text-red-500 hover:text-red-400"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
