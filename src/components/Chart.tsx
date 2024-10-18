import React, { useEffect } from 'react';

const Chart: React.FC = () => {
  useEffect(() => {
    const fetchTradingViewHTML = async () => {
      try {
        const response = await fetch('/path/to/tradingview.html'); // Altere conforme necessário
        const html = await response.text();

        const container = document.getElementById('tradingview-widget');
        if (container) {
          container.innerHTML = html;

          const script = document.createElement('script');
          script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
          script.async = true;
          script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: 'NASDAQ:AAPL',
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            backgroundColor: 'rgba(53, 28, 117, 1)',
            allow_symbol_change: true,
            calendar: false,
            support_host: 'https://www.tradingview.com',
          });
          container.appendChild(script);
        }
      } catch (error) {
        console.error('Erro ao carregar o HTML do TradingView:', error);
      }
    };

    fetchTradingViewHTML();

    return () => {
      const container = document.getElementById('tradingview-widget');
      if (container) container.innerHTML = ''; // Limpa ao desmontar
    };
  }, []);

  return (
    <div className="bg-[#230F3E] p-4 rounded-lg h-full flex flex-col">
      <div className="flex-grow bg-transparent rounded overflow-hidden">
        <div
          id="tradingview-widget"
          className="h-full w-full rounded"
          style={{ height: 'calc(100% - 2rem)' }} // Aumenta até próximo do título
        ></div>
      </div>
    </div>
  );
};

export default Chart;
