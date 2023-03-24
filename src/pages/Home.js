// import './App.css';
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen w-full bg-neutral-200">
          <div className="w-[300px] h-[200px] border-2 border-neutral-400 bg-white flex flex-col justify-center items-center rounded-2xl shadow-2xl shadow-black/[55%]">
            <p className='font-bold text-[30px] mb-6'>Sky Angel Game</p>
            <button className='w-[100px] h-[40px] bg-red-500 rounded-md text-white shadow-xl shadow-black/[25%]' onClick={() => navigate('/playground')}>Start Game</button>
          </div>
          
      </div>
  );
}

export default App;
