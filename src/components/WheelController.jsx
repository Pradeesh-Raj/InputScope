import Wheel from "./Wheel"

const WheelController = ({ axes, buttons }) => {

    return (
        <div className='flex flex-col items-center w-[100vh] h-[80vh]'>
            <Wheel axes={axes} />
            <div className="flex flex-row-reverse justify-between items-center w-full p-2">
                <div className='flex gap-6 mt-6 p-8 justify-center items-center'>

                    <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-32 bg-zinc-800 rounded-full overflow-hidden flex flex-col-reverse'>
                            <div
                                className='w-full bg-blue-500 rounded-full transition-none'
                                style={{ height: `${((axes[4] + 1) / 2) * 100}%` }}
                            />
                        </div>
                        <span className='text-xs text-zinc-400'>Clutch</span>
                    </div>

                    <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-32 bg-zinc-800 rounded-full overflow-hidden flex flex-col-reverse'>
                            <div
                                className='w-full bg-red-500 rounded-full transition-none'
                                style={{ height: `${((axes[3] + 1) / 2) * 100}%` }}
                            />
                        </div>
                        <span className='text-xs text-zinc-400'>Brake</span>
                    </div>


                    <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-32 bg-zinc-800 rounded-full overflow-hidden flex flex-col-reverse'>
                            <div
                                className='w-full bg-green-500 rounded-full transition-none'
                                style={{ height: `${((axes[2] + 1) / 2) * 100}%` }}
                            />
                        </div>
                        <span className='text-xs text-zinc-400'>Acc.</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-5 p-3 h-fit border rounded-xl border-white/20 shadow-lg shadow-zinc-800">
                    <h1
                        className="text-2xl font-bold"
                    >
                        Steering Angle
                    </h1>
                    <div className="text-xl font-semibold">
                        {(axes[0] * 180).toFixed(0)}&#176;
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center p-1">
                    <h1 className="text-2xl font-bold">Buttons</h1>
                    <div className="grid grid-cols-5 grid-rows-4 gap-3 justify-between p-8">
                        {buttons.map((button, index) => {
                            return (
                                <div key={index} className={`flex justify-center items-center p-2 w-10 h-10 rounded-full ${button.pressed ? 'bg-green-400' : 'bg-zinc-400'}`}>
                                    B{index + 1}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WheelController