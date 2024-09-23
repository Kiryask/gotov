import { useState } from 'react';
import './App.css'
import {  kastaenergy, apps, friend, wallet} from './images';

const App: React.FC = () => {
  const [isKastaEnergyVisible, setIsKastaEnergyVisible] = useState(false);
  const [isFriendVisible, setIsFriendVisible] = useState(false);
  const [isWalletVisible, setIsWalletVisible] = useState(false);
  const [isAppsVisible, setIsAppsVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMining, setIsMining] = useState(false);

  const startMining = () => {
    setIsMining(true);
    setTimeLeft(12 * 60 * 60); // Это 12 часов в секундах

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1; 
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsMining(false);
      setTimeLeft(0);
    }, 12 * 60 * 60 * 1000); // Через сколько секунд будет появляться кнопка получить, через 12 часов
  };

  const getToken = () => {
    setBalance(prev => prev + 1);
    setIsMining(false); 
    setTimeLeft(null); 
  };

  const handleClose = () => {
    setIsKastaEnergyVisible(false);
    setIsFriendVisible(false);
    setIsWalletVisible(false);
    setIsAppsVisible(false);
  };

  return (
    <div className="background bg-black flex justify-center">
      <div className="w-full text-white h-screen font-bold flex flex-col max-w-xl relative">
        <div className="app">
          {timeLeft !== null && (
            <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 p-3 text-lg px-40 mt-80 py-14">
              {isMining
                ? `${Math.floor(timeLeft / 3600)}:${(Math.floor((timeLeft % 3600) / 60)).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
                : ''}
            </p>
          )}
          
          {!isMining && timeLeft === null && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80"
              onClick={startMining}
            >
              Start
            </button>
          )}
          {isMining && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80 opacity-50 cursor-not-allowed"
              disabled
            >
              Mining...
            </button>
          )}
          {timeLeft === 0 && !isMining && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-lime-500 rounded-lg text-white px-40 mt-80"
              onClick={getToken}
            >
              Claim
            </button>
          )}

          {isKastaEnergyVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#282828] p-10 rounded-lg w-4/5 max-w-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-2xl mb-4">BOOST MENU</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-3 right-3">✖️</span>
                <p className="text-green">Here you can purchase an upgrade for more profit</p>
                
                <button>buy</button>
              </div>
            </div>
          )}

          {isFriendVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#282828] p-10 rounded-lg w-4/5 max-w-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-2xl mb-4">Меню Friends</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-3 right-3">✖️</span>
                <p className="text-white">Текст</p>
              </div>
            </div>
          )}

          {isWalletVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#282828] p-10 rounded-lg w-4/5 max-w-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-2xl mb-4">Меню Wallet</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-3 right-3">✖️</span>
                <p className="text-white">Total mined tokens: {balance} KST</p>
              </div>
            </div>
          )}

          {isAppsVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#282828] p-10 rounded-lg w-4/5 max-w-xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-white text-2xl mb-4">Меню Apps</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-3 right-3">✖️</span>
                <p className="text-white">Текст</p>
              </div>
            </div>
          )}

          <div className="px-44 mt-7">
            <div className="px-21 mt-180">
              <div className="px-1 py-60"></div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
          <div className="text-center m-1 p-2 rounded-2xl" onClick={() => setIsKastaEnergyVisible(true)}>
            <img src={kastaenergy} alt="Mine" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center m-1 p-2 rounded-2xl" onClick={() => setIsFriendVisible(true)}>
            <img src={friend} alt="Friends" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center m-1 p-2 rounded-2xl" onClick={() => setIsWalletVisible(true)}>
            <img src={wallet} alt="Earn" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center text-[#85827d] w-2/8" onClick={() => setIsAppsVisible(true)}>
            <img src={apps} alt="Airdrop" className="w-12 h-12 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;