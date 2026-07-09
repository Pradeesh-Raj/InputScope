import React from 'react'
import { useState } from 'react';
import XboxController from './XboxController';
import ControllerInfo from './ControllerInfo';
import BrokenController from '../assets/no-connection.png'
import WheelController from './WheelController';

const Controller = ({ gamePad }) => {
    const [vibrating, setVibrating] = useState({
        left: false,
        right: false,
    });
    
    if (gamePad == null) {
        return (
            <>
                <div className='flex flex-col p-4 justify-center items-center w-full min-h-100 lg:min-h-[70vh] bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800'>
                    <img src={BrokenController} className='w-65 h-65 lg:w-100 lg:h-100'></img>
                    <h3 className='text-sm lg:text-lg font-semibold'>Connect your controller and press any button...</h3>
                </div>
            </>
        )
    }

    const axes = gamePad.axes;
    const buttons = gamePad.buttons;

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-5 p-3 items-stretch'>

            <ControllerInfo gamePad={gamePad} vibrating={vibrating} onVibrate={setVibrating} />

            {/* <div className='w-full h-fit flex items-center justify-center bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800'> */}
            <div className='w-full h-full flex items-center justify-center bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800 overflow-hidden'>
                {
                    gamePad.mapping === 'standard' ? (
                        <XboxController buttons={buttons} axes={axes} vibrating={vibrating} />
                    ) : (
                        <WheelController buttons={buttons} axes={axes} />
                    )
                }
            </div>


        </div>
    )
}

export default Controller;