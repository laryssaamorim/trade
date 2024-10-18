import React from 'react'
import { Wallet, ArrowLeftRight, CreditCard, PiggyBank, Moon, LogOut } from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <div className="w-[72px] bg-[#230F3E] flex flex-col items-center py-4">
      <div className="mb-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQbPgc7Vfg2hbhYvCMWk5r_ddcJnDJMnAhrFLJB8uHBSVNV-U66s3jfEcFstE52p3Stc&usqp=CAU"
          alt="Arrow Icon"
          className="w-8 h-8 rounded-[6px] object-cover" // Ajuste o tamanho conforme necessário
        />
      </div>
      <nav className="flex-1 flex flex-col space-y-6">
        <button className="text-gray-400 hover:text-white">
          <Wallet size={24} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <ArrowLeftRight size={24} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <CreditCard size={24} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <PiggyBank size={24} />
        </button>
      </nav>
      <div className="mt-auto flex flex-col space-y-4">
        <button className="text-gray-400 hover:text-white">
          <Moon size={24} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  )
}

export default Sidebar

