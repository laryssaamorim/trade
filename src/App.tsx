import React, { useState, useCallback } from 'react'
import OrderForm from './components/OrderForm'
import OrderBook from './components/OrderBook'
import Chart from './components/Chart'
import Tabs from './components/Tabs'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState('Open orders')
  const [isTabsCollapsed, setIsTabsCollapsed] = useState(false)

  const handleTabsCollapse = useCallback((collapsed: boolean) => {
    setIsTabsCollapsed(collapsed);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1D0C32] to-[#030511] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[calc(100vh-10rem)]">
            <div className="lg:col-span-7 flex flex-col space-y-3 transition-all duration-300">
              <div className={`flex-grow transition-all duration-300 ease-in-out ${isTabsCollapsed ? 'h-[calc(100%-40px)]' : 'h-[calc(100%-304px)]'}`}>
                <Chart />
              </div>
              <div className={`transition-all duration-300 ease-in-out ${isTabsCollapsed ? 'h-[40px]' : 'h-[264px]'}`}>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} onCollapse={handleTabsCollapse} />
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <OrderBook />
              </div>
              <div className="flex flex-col">
                <OrderForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App