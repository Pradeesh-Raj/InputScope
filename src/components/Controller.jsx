import React from 'react'
import { useState } from 'react';
import XboxController from './XboxController';
import ControllerInfo from './ControllerInfo';
import BrokenController from '../assets/controller-NoConnection.png'
import WheelController from './WheelController';

const Controller = ({ gamePad }) => {
    if (gamePad == null) {
        return (
            <>
                <div className='flex flex-col justify-center items-center w-[80vh] h-[80vh] bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800'>
                    <img src={BrokenController} className='w-100 h-100'></img>
                    <h3 className='text-lg font-semibold'>Connect your controller and press any button...</h3>
                </div>
            </>
        )
    }

    const [vibrating, setVibrating] = useState(false)
    const axes = gamePad.axes;
    const buttons = gamePad.buttons;

    return (
        <div className='flex justify-center items-center gap-5 p-3'>

            <ControllerInfo gamePad={gamePad} vibrating={vibrating} onVibrate={setVibrating} />

            <div className='flex-1 flex items-center justify-center bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800'>
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