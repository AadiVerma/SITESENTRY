import { FaRegHourglass } from "react-icons/fa";
import BarChart from "../components/BarChart";
import { FaAnglesLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef, useState } from "react";
export function AppScreen() {
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [display, setdisplay] = useState(false);
    const handleHourDecrement = () => {
        setHour((prevQuantity) => Math.max(1, prevQuantity - 1));
    };
    const handleMinDecrement = () => {
        setMin((prevQuantity) => Math.max(1, prevQuantity - 1));
    };

    const handleHourIncrement = () => {
        setHour((prevQuantity) => Math.min(24, prevQuantity + 1));
    };
    const handleMinIncrement = () => {
        setMin((prevQuantity) => Math.min(59, prevQuantity + 1));
    };

    const handleHourChange = (e: any) => {
        const value = e.target.value;
        if (!isNaN(value) && value !== '') {
            setHour(Math.max(1, Math.min(24, Number(value))));
        } else if (value === '') {
            setHour(0);
        }
    };
    const handleMinChange = (e: any) => {
        const value = e.target.value;
        if (!isNaN(value) && value !== '') {
            setMin(Math.max(1, Math.min(59, Number(value))));
        } else if (value === '') {
            setMin(0);
        }
    };
    const closemodel = (e: any) => {
        if (ref.current === e.target) {
            setdisplay(false);
        }
    }
    const navigate = useNavigate();
    const { state } = useLocation();
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
            label: 'Weekly Graph',
            data: [0.2, 3.5, 1.27, 3.20, 2.36, 1.35],
            backgroundColor: [
                'rgb(173, 136, 198, 0.6)',
            ],
        }]
    }
    return (
        <div className="p-7 bg-[#121212] min-h-screen">
            <FaAnglesLeft className="text-white text-3xl mt-1 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-2xl font-bold text-purple-200 flex justify-center mt-2  mb-4">{state.heading}</h1>
            <div className="flex justify-center mt-4">
                <img className="h-12 w-12 rounded-xl flex justify-center" src={state.image} />
            </div>
            <h2 className="text-xl font-semibold text-purple-300 flex justify-center mt-4 mb-6">{state.time}</h2>
            <BarChart ChartData={data} />
            <div className="flex justify-between mt-4">
                <MdOutlineKeyboardArrowLeft className="text-2xl cursor-pointer text-purple-200" />
                <h1 className="text-lg font-semibold text-purple-300">Fri, Jul 26</h1>
                <MdOutlineKeyboardArrowRight className=" text-2xl cursor-pointer text-purple-200" />
            </div>
            <div className="flex gap-4 mt-6  w-[100%] cursor-pointer" onClick={() => {
                setdisplay(true);
            }}>
                <div className="flex-col place-content-center justify-center border-r-2 border-purple-300 w-[15%]" >
                    <FaRegHourglass className="text-xl text-white" />
                </div>
                <div className="text-white">
                    <h1 className="font-bold text-purple-300 text-base">App timer</h1>
                    <h2 className="font-bold text-purple-200 text-sm">No limit</h2>
                </div>

            </div>
            {display && <div onClick={closemodel} ref={ref} className="fixed inset-0 bg-black bg-opacity-30 h-screen  backdrop-blur-sm flex justify-center items-center">
                <div className="flex bg-[#121212] border-4 border-[#212121] rounded-2xl p-4 gap-4">
                    <form className="max-w-xs mx-auto " >
                        <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-[#212121] dark:text-white">
                            Hours:
                        </label>
                        <div className="relative flex items-center max-w-[8rem]">
                            <button
                                type="button"
                                id="decrement-button"
                                onClick={handleHourDecrement}
                                className="bg-gray-100 dark:bg-[#212121] dark:hover:bg-[#121212] dark:border-[#212121] hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:bg-[#212121]focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                id="quantity-input"
                                value={hour}
                                onChange={handleHourChange}
                                data-input-counter
                                data-input-counter-min="1"
                                data-input-counter-max="50"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border-x-0 border-[#121212] h-11 text-center text-[#121212] text-sm focus:ring-blue-500 focus:border-[#121212] block w-full py-2.5 dark:bg-[#212121] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                placeholder="999"
                                required
                            />
                            <button
                                type="button"
                                id="increment-button"
                                onClick={handleHourIncrement}
                                className="bg-gray-100 dark:bg-[#212121] dark:hover:bg-[#121212] dark:border-[#212121] hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:bg-[#212121]focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                        <button className="bg-[#212121] text-white hover:bg-transparent border-2 border-white rounded-lg p-2 outline-none mt-2 w-full" onClick={() => { setdisplay(false) }}>Cancel</button>
                    </form>
                    <form className="max-w-xs mx-auto">
                        <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Minutes:
                        </label>
                        <div className="relative flex items-center max-w-[8rem]">
                            <button
                                type="button"
                                id="decrement-button"
                                onClick={handleMinDecrement}
                                className="bg-gray-100 dark:bg-[#212121] dark:hover:bg-[#121212] dark:border-[#212121] hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:bg-[#212121]focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-3 h-3 text-[#212121] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                id="quantity-input"
                                value={min}
                                onChange={handleMinChange}
                                data-input-counter
                                data-input-counter-min="1"
                                data-input-counter-max="50"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border-x-0 border-[#121212] h-11 text-center text-[#121212] text-sm focus:ring-blue-500 focus:border-[#121212] block w-full py-2.5 dark:bg-[#212121] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                placeholder="999"
                                required
                            />
                            <button
                                type="button"
                                id="increment-button"
                                onClick={handleMinIncrement}
                                className="bg-gray-100 dark:bg-[#212121] dark:hover:bg-[#121212] dark:border-[#212121] hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:bg-[#212121]focus:ring-2 focus:outline-none"
                            >
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>

                        </div>
                        <button className="bg-[#212121] text-white hover:bg-transparent border-2 border-white rounded-lg p-2 outline-none mt-2 w-full">Save</button>
                    </form>

                </div>

            </div>}
        </div>
    )
}