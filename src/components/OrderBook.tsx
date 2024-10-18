import React, { useState, useEffect } from 'react';

const OrderBook: React.FC = () => {
  const [activeTradeTab, setActiveTradeTab] = useState('Market Trades');
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);

  const sellOrders = [
    { price: 50000, quantity: 0.5, total: 25000 },
    { price: 49950, quantity: 0.8, total: 39960 },
    { price: 50000, quantity: 0.5, total: 25000 },
    { price: 49950, quantity: 0.8, total: 39960 },
    { price: 50000, quantity: 0.5, total: 25000 },
    { price: 49950, quantity: 0.8, total: 39960 },
    { price: 50000, quantity: 0.5, total: 25000 },
  ];

  const buyOrders = [
    { price: 49500, quantity: 1.5, total: 74250 },
    { price: 49450, quantity: 0.7, total: 34615 },
    { price: 49500, quantity: 1.5, total: 74250 },
    { price: 49450, quantity: 0.7, total: 34615 },
    { price: 49500, quantity: 1.5, total: 74250 },
    { price: 49450, quantity: 0.7, total: 34615 },
    { price: 49500, quantity: 1.5, total: 74250 },
  ];

  const marketTrades = [
    { price: 49750, quantity: 0.2, time: '14:30:45', type: 'buy' },
    { price: 49800, quantity: 0.1, time: '14:32:10', type: 'buy' },
    { price: 49750, quantity: 0.2, time: '14:30:45', type: 'buy' },
    { price: 49800, quantity: 0.1, time: '14:32:10', type: 'sell' },
    { price: 49750, quantity: 0.2, time: '14:30:45', type: 'buy' },
    { price: 49750, quantity: 0.2, time: '14:30:45', type: 'buy' },
  ];

  const myTrades = [
    { price: 49600, quantity: 0.1, time: '14:25:00', type: 'buy' },
    { price: 49750, quantity: 0.2, time: '14:27:00', type: 'sell' },
    { price: 49600, quantity: 0.1, time: '14:25:00', type: 'buy' },
    { price: 49750, quantity: 0.2, time: '14:27:00', type: 'buy' },
  ];

  const spread = sellOrders[0].price - buyOrders[0].price;

  // Function to simulate blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * (sellOrders.length + buyOrders.length)
      );
      setBlinkIndex(randomIndex);
    }, 1000);

    return () => clearInterval(interval);
  }, [sellOrders.length, buyOrders.length]);

  return (
    <div className="bg-[#230F3E] p-3 rounded-lg flex flex-col h-full">
      <div className="flex-grow mb-4" style={{ height: '55%' }}>
        <div className="grid grid-cols-3 gap-1 font-bold mb-2 text-gray-300 text-xs">
          <div style={{ textAlign: 'left' }}>Price</div>
          <div style={{ textAlign: 'center' }}>Quantity</div>
          <div style={{ textAlign: 'right' }}>Total</div>
        </div>

        {sellOrders.map((order, index) => (
          <div
            key={`sell-${index}`}
            className={`grid grid-cols-3 gap-2 text-xs mb-1 ${
              blinkIndex === index
                ? 'animate-blink blinking-sell-order'
                : 'sell-order'
            }`}
          >
            <div className={`text-left sell-order-text`}>
              {order.price.toLocaleString()}
            </div>
            <div className={`text-center text-gray-300`}>
              {order.quantity.toFixed(4)}
            </div>
            <div className={`text-right text-gray-300`}>
              {order.total.toLocaleString()}
            </div>
          </div>
        ))}

        <div className="my-2 border-t border-gray-700"></div>
        <div className="text-center text-gray-300 text-xs">
          Spread: {spread.toLocaleString()} USD
        </div>
        <div className="my-2 border-t border-gray-700"></div>

        {buyOrders.map((order, index) => (
          <div
            key={`buy-${index}`}
            className={`grid grid-cols-3 gap-2 text-xs mb-1 ${
              blinkIndex === sellOrders.length + index
                ? 'animate-blink blinking-buy-order'
                : 'buy-order'
            }`}
          >
            <div className={`text-left buy-order-text`}>
              {order.price.toLocaleString()}
            </div>
            <div className={`text-center text-gray-300`}>
              {order.quantity.toFixed(4)}
            </div>
            <div className={`text-right text-gray-300`}>
              {order.total.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-4 mt-4">
        <div className="absolute inset-0 rounded-full border-2 border-[#2B2738]"></div>
        <div className="border border-[#35175C] rounded-full p-[2px] bg-[#35175C]">
          <div className="flex relative">
            <div
              className={`absolute left-0 top-0 h-full w-1/2 rounded-full transition-transform duration-300 ease-in-out`}
              style={{
                backgroundColor: '#4D2175',
                transform:
                  activeTradeTab === 'Market Trades'
                    ? 'translateX(0)'
                    : 'translateX(100%)',
              }}
            />
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded-full relative z-10 ${
                activeTradeTab === 'Market Trades'
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
              onClick={() => setActiveTradeTab('Market Trades')}
            >
              Market Trades
            </button>
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded-full relative z-10 ${
                activeTradeTab === 'My Trades' ? 'text-white' : 'text-gray-300'
              }`}
              onClick={() => setActiveTradeTab('My Trades')}
            >
              My Trades
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto" style={{ height: '30%' }}>
        {activeTradeTab === 'Market Trades' ? (
          <div>
            <div className="grid grid-cols-3 gap-2 font-bold mb-1 text-gray-300 text-xs">
              <div style={{ textAlign: 'left' }}>Price</div>
              <div style={{ textAlign: 'center' }}>Quantity</div>
              <div style={{ textAlign: 'right' }}>Time</div>
            </div>
            {marketTrades.map((trade, index) => (
              <div
                key={`market-trade-${index}`}
                className="grid grid-cols-3 gap-2 text-xs mb-1"
              >
                <div
                  style={{
                    color: trade.type === 'buy' ? '#41E88E' : '#FF5500',
                    textAlign: 'left',
                  }}
                >
                  {trade.price.toLocaleString()}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {trade.quantity.toFixed(4)}
                </div>
                <div style={{ textAlign: 'right' }}>{trade.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 gap-2 font-bold mb-1 text-gray-300 text-xs">
              <div style={{ textAlign: 'left' }}>Price</div>
              <div style={{ textAlign: 'center' }}>Quantity</div>
              <div style={{ textAlign: 'right' }}>Time</div>
            </div>
            {myTrades.map((trade, index) => (
              <div
                key={`my-trade-${index}`}
                className="grid grid-cols-3 gap-2 text-xs mb-1"
              >
                <div
                  style={{
                    color: trade.type === 'buy' ? '#41E88E' : '#FF5500',
                    textAlign: 'left',
                  }}
                >
                  {trade.price.toLocaleString()}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {trade.quantity.toFixed(4)}
                </div>
                <div style={{ textAlign: 'right' }}>{trade.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;
