import React, { useState } from 'react';
import { ChevronDown, Search, ChevronUp, Star } from 'lucide-react';

const tradingPairs = [
  { ticker: 'BTC/USDT', lastPrice: 50000, variation: 2.5 },
  { ticker: 'ETH/USDT', lastPrice: 3000, variation: -1.2 },
  { ticker: 'BNB/USDT', lastPrice: 400, variation: 0.8 },
  { ticker: 'ADA/USDT', lastPrice: 1.5, variation: 3.2 },
  { ticker: 'XRP/USDT', lastPrice: 0.8, variation: -0.5 },
  { ticker: 'SOL/USDT', lastPrice: 25, variation: 1.5 },
  { ticker: 'DOT/USDT', lastPrice: 6.5, variation: 0.3 },
  { ticker: 'LINK/USDT', lastPrice: 15, variation: 4.0 },
  { ticker: 'MATIC/USDT', lastPrice: 1.2, variation: -0.1 },
  { ticker: 'TRX/USDT', lastPrice: 0.06, variation: 2.1 },
  { ticker: 'LTC/USDT', lastPrice: 200, variation: -1.8 },
  { ticker: 'DOGE/USDT', lastPrice: 0.05, variation: 5.0 },
  { ticker: 'SHIB/USDT', lastPrice: 0.00001, variation: 7.2 },
  { ticker: 'AVAX/USDT', lastPrice: 70, variation: 3.0 },
  { ticker: 'FIL/USDT', lastPrice: 8, variation: 2.0 },
  { ticker: 'SAND/USDT', lastPrice: 0.5, variation: -0.5 },
  { ticker: 'BTC/BRL', lastPrice: 250000, variation: 1.5 }, // Novo par BRL
  { ticker: 'ETH/BRL', lastPrice: 13000, variation: -2.0 }, // Novo par BRL
  { ticker: 'BNB/BRL', lastPrice: 2000, variation: 0.5 }, // Novo par BRL
  { ticker: 'ADA/BRL', lastPrice: 8, variation: 3.5 }, // Novo par BRL
];

const QuotationBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'ticker' | 'lastPrice' | 'variation'>(
    'ticker'
  );
  const [favoritePairs, setFavoritePairs] = useState<{
    [key: string]: boolean;
  }>({});

  const handlePairSelect = (pair: (typeof tradingPairs)[0]) => {
    setSelectedPair(pair);
    setIsDropdownOpen(false);
  };

  const toggleFavorite = (ticker: string) => {
    setFavoritePairs((prev) => ({ ...prev, [ticker]: !prev[ticker] }));
  };

  const filteredPairs = tradingPairs
    .filter((pair) => {
      const matchesSearchTerm = pair.ticker
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ||
        pair.ticker.startsWith(selectedCategory) ||
        pair.ticker.endsWith(selectedCategory);

      return matchesSearchTerm && matchesCategory;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'ticker') {
        return a.ticker.localeCompare(b.ticker) * modifier;
      }
      if (sortBy === 'lastPrice') {
        return (a.lastPrice - b.lastPrice) * modifier;
      }
      if (sortBy === 'variation') {
        return (a.variation - b.variation) * modifier;
      }
      return 0;
    });

  const toggleSortOrder = (field: 'ticker' | 'lastPrice' | 'variation') => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-[#] py-2 px-4 flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-2 text-white text-sm font-bold" // Diminuição do texto
          onMouseEnter={() => setIsDropdownOpen(true)}
        >
          <span>{selectedPair.ticker}</span>
          <ChevronDown size={20} />
        </button>
        <span
          className={`text-xs ${
            selectedPair.variation >= 0 ? 'text-[#41E88E]' : 'text-[#FF5500]'
          }`}
        >
          {' '}
          {/* Cores ajustadas */}
          {selectedPair.variation >= 0 ? '+' : ''}
          {selectedPair.variation}%
        </span>
        <span className="text-white text-xs">
          Last: ${selectedPair.lastPrice.toLocaleString()}
        </span>
        <span className="text-gray-400 text-xs">Low: $49,500</span>
        <span className="text-gray-400 text-xs">High: $51,200</span>
        <span className="text-gray-400 text-xs">24h Volume: 1,234.56 BTC</span>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-[500px] h-[600px] bg-[#1A0B2E] border border-gray-700 rounded-lg shadow-lg z-20 overflow-hidden"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search pairs..."
                className="w-full bg-[#230F3E] text-white p-2 pl-10 rounded text-sm" // Diminuição do texto
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex space-x-2 mb-4">
              {['All', 'BTC', 'USDT', 'BRL'].map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedCategory === category
                      ? 'bg-[#FF7FEB] text-black'
                      : 'bg-[#230F3E] text-gray-300 hover:bg-[#2D1751]'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="overflow-y-auto h-[500px]">
              <div className="flex justify-between items-center text-gray-400 font-bold mb-2 text-xs">
                {' '}
                {/* Diminuição do texto */}
                <div
                  className="flex items-center w-1/3 cursor-pointer"
                  onClick={() => toggleSortOrder('ticker')}
                >
                  <span>Pair</span>
                  {sortBy === 'ticker' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
                <div
                  className="w-1/3 flex items-center justify-center cursor-pointer"
                  onClick={() => toggleSortOrder('lastPrice')}
                >
                  <span>Price</span>
                  {sortBy === 'lastPrice' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
                <div
                  className="w-1/3 flex items-center justify-end cursor-pointer"
                  onClick={() => toggleSortOrder('variation')}
                >
                  <span>Variation</span>
                  {sortBy === 'variation' &&
                    (sortOrder === 'asc' ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </div>
              {filteredPairs.map((pair) => (
                <div
                  key={pair.ticker}
                  className="flex justify-between items-center p-2 hover:bg-[#2D1751] cursor-pointer text-xs" // Diminuição do texto
                  onClick={() => handlePairSelect(pair)}
                >
                  <span className="text-white font-medium w-1/3 flex items-center">
                    <Star
                      className={`w-4 h-4 ${
                        favoritePairs[pair.ticker]
                          ? 'fill-[#FF7FEB] stroke-[#FF7FEB]'
                          : 'stroke-white'
                      }`} // Estrela ajustada
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pair.ticker);
                      }}
                      style={{ marginRight: '16px' }} // Espaçamento de 16px
                    />
                    {pair.ticker}
                  </span>
                  <span className="text-white w-1/3 text-center">
                    ${pair.lastPrice.toLocaleString()}
                  </span>
                  <span
                    className={`w-1/3 text-right ${
                      pair.variation >= 0 ? 'text-[#41E88E]' : 'text-[#FF5500]' // Cores ajustadas
                    }`}
                  >
                    {pair.variation >= 0 ? '+' : ''}
                    {pair.variation}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationBar;
