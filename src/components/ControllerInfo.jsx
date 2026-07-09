import React, { useEffect } from 'react'
import { useState, useRef } from 'react';

const ControllerInfo = ({ gamePad, vibrating, onVibrate }) => {
    const pattern = /^(?<controllerName>.*?)\s*\(.*?Vendor:\s*(?<vendorID>[0-9a-fA-F]+)\s+Product:\s*(?<productID>[0-9a-fA-F]+).*?\)$/;
    const ID = gamePad.id.match(pattern);
    let vendorID, productID, controllerName;
    if (ID) {
        vendorID = ID.groups.vendorID;
        productID = ID.groups.productID;
        controllerName = ID.groups.controllerName;
    }

    function triggerVibration(effectType, effectTrigger) {
        if (!gamePad.vibrationActuator) return

        const rumble = (effectType, trigger) => {
            gamePad.vibrationActuator.playEffect(effectType, {
                startDelay: 0,
                duration: 2000,
                weakMagnitude: 0.5,
                strongMagnitude: 1.0,
                ...trigger
            });
        }

        if (effectType === 'trigger-rumble') {

            if (!effectTrigger) {
                onVibrate({ left: true, right: true })
                rumble(effectType, { leftTrigger: 1.0, rightTrigger: 1.0 })
            }
            else if (effectTrigger === 'left') {
                onVibrate({ ...vibrating, left: true });
                rumble(effectType, { leftTrigger: 1.0, rightTrigger: 0 });
            }
            else {
                onVibrate({ ...vibrating, right: true });
                rumble(effectType, { rightTrigger: 1.0, leftTrigger: 0 });
            }
            setTimeout(() => onVibrate({ left: false, right: false }), 2000)
        }
        else {
            onVibrate({ left: true, right: true })
            rumble(effectType, {});
            setTimeout(() => onVibrate({ left: false, right: false }), 2000)
        }
    }

    return (
        <div className="w-full h-full bg-white/20 shadow-lg shadow-black/10 rounded-xl border border-zinc-800 p-5 flex flex-col gap-5">
            <div className='flex flex-col gap-2'>
                {/* <h1 className='text-2xl font-bold'> {gamePad.id.split("(")[0]}</h1> */}
                <h1 className='text-2xl font-bold'> {controllerName || gamePad.id}</h1>
                {ID && <p className='text-xs'>VENDOR ID: {vendorID} PRODUCT ID: {productID} </p>}
            </div>

            <div className={`flex justify-center items-center gap-2 border-2 rounded-full ${gamePad.connected ? 'border-green-400' : 'border-red-500'}  w-fit pt-2 pb-2 pl-3 pr-3`}>
                <div className={`w-2 h-2 ${gamePad.connected ? 'bg-green-400' : 'bg-red-500'} rounded-full`}></div>
                <p>{gamePad.connected ? "Connected" : "Not connected"}</p>
            </div>
            <p><strong>Number of Buttons:</strong> {gamePad.buttons.length}</p>


            <div className='flex flex-col gap-2 mt-2'>
                <p className='text-xs text-zinc-300 uppercase tracking-widest font-bold'>Axes</p>
                {Array.from(gamePad.axes).map((axis, i) => (
                    <div key={i} className='flex items-center gap-2'>
                        <span className='text-xs text-zinc-300 w-12'>Axis {i}</span>
                        <div className='flex-1 h-1.5 overflow-hidden bg-zinc-800 rounded-full'>
                            <div
                                className='h-1.5 bg-blue-500 rounded-full '
                                style={{ width: `${((axis + 1) / 2) * 100}%` }}
                            />
                        </div>
                        <span className='text-sm text-zinc-300 w-10 text-right'>{axis.toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold'>VIBRATION</h3>
                <div className={`flex justify-center items-center gap-2 border-2 ${gamePad.vibrationActuator ? 'border-green-400' : 'border-red-500'} rounded-full w-fit pt-2 pb-2 pl-3 pr-3`}>
                    <div className={`w-2 h-2 ${gamePad.vibrationActuator ? 'bg-green-400' : 'bg-red-500'} rounded-full`}></div>
                    <p>{gamePad.vibrationActuator ? "Available" : "Not Available"}</p>
                </div>
                {gamePad.vibrationActuator && (
                    <p><strong>Type:</strong> {gamePad.vibrationActuator.effects.map((effect) => {
                        return effect.split('-').join(" ");
                    }).join(', ')}</p>
                )}
            </div>

            {gamePad.vibrationActuator && (
                <>
                    <button
                        onClick={() => triggerVibration(gamePad.vibrationActuator.type, null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${vibrating.left && vibrating.right
                            ? 'bg-blue-500 text-white'
                            : 'bg-zinc-800 border border-green-400 text-zinc-300 hover:bg-zinc-700'
                            } cursor-pointer`}
                    >
                        {(vibrating.left && vibrating.right) ? 'Vibrating...' : 'Test Vibration'}
                    </button>
                    {gamePad.vibrationActuator.type === 'trigger-rumble' && (
                        <div className='flex gap-2'>
                            <button
                                onClick={() => triggerVibration('trigger-rumble', 'left')}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${vibrating.left
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-zinc-800 border border-green-400 text-zinc-300 hover:bg-zinc-700'
                                    } cursor-pointer`}
                            >
                                {vibrating.left ? 'Vibrating...' : 'Left trigger'}
                            </button>
                            <button
                                onClick={() => triggerVibration('trigger-rumble', 'right')}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${vibrating.right
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-zinc-800 border border-green-400 text-zinc-300 hover:bg-zinc-700'
                                    } cursor-pointer`}
                            >
                                {vibrating.right ? 'Vibrating...' : 'Right Trigger'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ControllerInfo
