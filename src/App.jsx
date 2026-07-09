import { useState, useEffect, useRef } from 'react';
import Controller from './components/Controller';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import './css/App.css';
import controllerLogo from './assets/game-controller.png';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {

  const SLOTS = [0, 1, 2, 3]
  const [activeIndex, setActiveIndex] = useState(0);
  const [gamepads, setGamepads] = useState([]);
  const frameRef = useRef(null);

  useEffect(() => {
    function handleConnect(e) {
      console.log(e)
      setGamepads((prev) => [...prev, e.gamepad]);
    }

    function handleDisconnect(e) {
      setGamepads((prev) => {
        const updated = prev.filter((gamepad) => gamepad.index !== e.gamepad.index);
        if (e.gamepad.index === activeIndex && updated.length > 0) {
          setActiveIndex(updated[updated.length - 1].index);
        }
        return updated;
      });
    }

    window.addEventListener('gamepadconnected', handleConnect);
    window.addEventListener('gamepaddisconnected', handleDisconnect);

    function poll() {
      const gamepads = Array.from(navigator.getGamepads());
      setGamepads(() => {
        return gamepads.filter((gp) => gp !== null);
      });
      frameRef.current = requestAnimationFrame(poll);
    }
    poll();

    return () => {
      window.removeEventListener('gamepadconnected', handleConnect);
      window.removeEventListener('gamepaddisconnected', handleDisconnect);
      cancelAnimationFrame(frameRef.current);
    }
  }, [])
  return (
    <div className='flex flex-col justify-evenly gap-2.5 p-3 h-full'>
      <nav className='flex p-2 lg:p-3 items-center justify-between w-full border-b border-white/40'>
        <div className='flex items-center gap-3'>
          <img src={controllerLogo} className='w-5 h-5 lg:w-8 lg:h-8'></img>
          <h1 className='text-lg md:text-xl lg:text-3xl font-bold lg:tracking-wide'>Input Scope</h1>
        </div>
        <div>
          <a href='https://github.com/Pradeesh-Raj/InputScope' className='text-sm lg:text-xl hover:text-zinc-500 transition-colors'>
            <FontAwesomeIcon icon={faGithub} className='text-2xl' />
          </a>
        </div>
      </nav>
      <ErrorBoundary>
        <div className='grid grid-cols-2 grid-rows-2 lg:flex lg:justify-center gap-2 m-2'>
          {SLOTS.map((slot) => {
            const gp = gamepads.find((g) => g.index === slot)
            const isActive = activeIndex === slot
            return (
              <div
                key={slot}
                onClick={() => setActiveIndex(slot)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer
          ${isActive
                    ? 'bg-zinc-800 text-white border border-white'
                    : 'bg-zinc-700 text-zinc-200 border border-zinc-800 hover:text-zinc-300 hover:bg-zinc-800'
                  }
          ${!gp ? 'opacity-50 cursor-default' : ''}
        `}
              >
                <div className={`w-2 h-2 rounded-full ${gp ? 'bg-green-400' : 'bg-zinc-300'}`} />
                <span>{gp ? gp.id.split('(')[0].trim() : `Slot ${slot + 1}`}</span>
              </div>
            )
          })}
        </div>
        <div className='lg:flex lg:justify-center'>
          <Controller gamePad={gamepads.find(gp => gp.index === activeIndex) || null} />
        </div>

      </ErrorBoundary>
      <Footer />
    </div>
  )
}

export default App;

