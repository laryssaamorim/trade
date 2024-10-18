import React, { useState } from 'react';
import { Check } from 'lucide-react'; // Importar ícone de check

const OrderForm: React.FC = () => {
  const [orderType, setOrderType] = useState('Buy');
  const [orderMode, setOrderMode] = useState('Limit');
  const [postOnly, setPostOnly] = useState(false);
  const [conditionalSell, setConditionalSell] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate total based on the selected percentage of available balance (for demo purposes)
  const availableBalance = 35.66; // BRL
  const totalValue = (availableBalance * percentage) / 100;

  return (
    <div className="bg-[#230F3E] p-3 rounded-lg flex-grow overflow-y-auto">
      <div className="flex mb-3 justify-center">
        <div className="flex flex-1 p-1 border-2 border-[#2B2738] rounded-full gap-2">
          <button
            className={`flex-1 py-1.5 rounded-full text-sm font-semibold ${
              orderType === 'Buy' ? 'bg-[#09654C] text-white' : 'text-white-300'
            }`}
            onClick={() => setOrderType('Buy')}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-1.5 rounded-full text-sm font-semibold ${
              orderType === 'Sell'
                ? 'bg-[#9D1122] text-white'
                : 'text-gray-white'
            }`}
            onClick={() => setOrderType('Sell')}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Available Balance Section */}
      <div className="mb-4 text-gray-300 text-xs text-center">
        <p className="font-medium text-lg">Available Balance</p>
        <p className="flex justify-between mt-1">
          <span className="text-md font-semibold">Real Brasileiro</span>
          <span className="text-md font-semibold">35.66 BRL</span>
        </p>
        <p className="flex justify-between">
          <span className="text-md font-semibold">Bitcoin</span>
          <span className="text-md font-semibold">0.000026 BTC</span>
        </p>
      </div>

      {/* Order Type and Unit Price */}
      <div className="mb-3">
        <label className="block mb-1 text-xs font-medium text-gray-300">
          Order Type
        </label>
        <select
          className="w-full bg-transparent border-2 border-[#83838B] p-1.5 rounded-[8px] text-white text-sm focus:outline-none focus:border-[#FF7FEB]"
          value={orderMode}
          onChange={(e) => setOrderMode(e.target.value)}
        >
          <option>Limit</option>
          <option>Market</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 text-xs font-medium text-gray-300">
          Unit Price (BRL)
        </label>
        <input
          type="number"
          className="w-full bg-transparent border-2 border-[#83838B] p-1.5 rounded-[8px] text-white text-sm focus:outline-none focus:border-[#FF7FEB]"
          placeholder="0.00"
        />
      </div>

      {/* Quantity */}
      <div className="mb-3">
        <label className="block mb-1 text-xs font-medium text-gray-300">
          Quantity (BTC)
        </label>
        <input
          type="number"
          className="w-full bg-transparent border-2 border-[#83838B] p-1.5 rounded-[8px] text-white text-sm focus:outline-none focus:border-[#FF7FEB]"
          placeholder="0.00"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {/* Percentage Slider */}
      <div className="mb-3">
        <label className="block mb-1 text-xs font-medium text-gray-300"></label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onMouseDown={() => setShowTooltip(true)}
            onChange={(e) => setPercentage(e.target.value)}
            onMouseUp={() => setShowTooltip(false)}
            className="w-full h-1 bg-[#351754] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #F864E1 ${percentage}%, #351754 ${percentage}%)`,
            }}
          />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-20 h-8 flex items-center justify-center bg-gray-700 text-white text-xs rounded"
            style={{ display: showTooltip ? 'flex' : 'none' }}
          >
            {percentage}%
          </div>
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #f864e1; /* Cor da bolinha do slider */
              cursor: pointer;
              margin-top: -8px; /* Para centralizar com a barra */
            }

            input[type='range']::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #f864e1; /* Cor da bolinha do slider */
              cursor: pointer;
            }
          `}</style>
        </div>
      </div>

      {/* Total */}
      <div className="mb-3">
        <label className="block mb-1 text-xs font-medium text-gray-300">
          Total (BRL)
        </label>
        <input
          type="number"
          className="w-full bg-transparent border-2 border-[#83838B] p-1.5 rounded-[8px] text-white text-sm focus:outline-none focus:border-[#FF7FEB]"
          placeholder="0.00"
          value={totalValue.toFixed(2)} // Show two decimal places
          readOnly
        />
      </div>

      {/* Fill or Kill Checkbox */}
      <div className="mb-3">
        <label className="flex items-center text-xs text-gray-300">
          <div
            className={`mr-2 w-5 h-5 flex items-center justify-center rounded-md border-2 cursor-pointer ${
              conditionalSell
                ? 'border-[#FF5500] bg-[#FF5500]'
                : 'border-[#FF7FEB]'
            }`}
            onClick={() => setConditionalSell(!conditionalSell)}
          >
            {conditionalSell && <Check className="text-white" size={16} />}
          </div>
          Fill or Kill
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-[#FF7FEB] py-1.5 rounded-full text-sm font-regular text-black hover:bg-[#F864E1] transition-colors">
        {orderType} BTC
      </button>

      {/* Additional Info */}
      <div className="mt-4 text-gray-300 text-xs">
        <p className="flex justify-between">
          <span>Market Position</span>
          <span>121st</span>
        </p>
        <p className="flex justify-between">
          <span>Estimated Fee</span>
          <span>0.000000 BTC</span>
        </p>
        <p className="flex justify-between">
          <span>Total to Receive</span>
          <span>0.000000 BTC</span>
        </p>
      </div>
    </div>
  );
};

export default OrderForm;
