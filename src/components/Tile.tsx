// import { useState, useRef } from "react";
// import { FaRegHourglass } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
export default function Tile({ image, heading, time }: any) {
  // const [hour, setHour] = useState(0);
  // const [min, setMin] = useState(0);
  // const ref = useRef<HTMLDivElement>(null);
  // const [display, setdisplay] = useState(false);
  // const handleHourDecrement = () => {
  //   setHour((prevQuantity) => Math.max(1, prevQuantity - 1));
  // };
  // const handleMinDecrement = () => {
  //   setMin((prevQuantity) => Math.max(1, prevQuantity - 1));
  // };

  // const handleHourIncrement = () => {
  //   setHour((prevQuantity) => Math.min(24, prevQuantity + 1));
  // };
  // const handleMinIncrement = () => {
  //   setMin((prevQuantity) => Math.min(59, prevQuantity + 1));
  // };

  // const handleHourChange = (e: any) => {
  //   const value = e.target.value;
  //   if (!isNaN(value) && value !== '') {
  //     setHour(Math.max(1, Math.min(24, Number(value))));
  //   } else if (value === '') {
  //     setHour(0);
  //   }
  // };
  // const handleMinChange = (e: any) => {
  //   const value = e.target.value;
  //   if (!isNaN(value) && value !== '') {
  //     setMin(Math.max(1, Math.min(59, Number(value))));
  //   } else if (value === '') {
  //     setMin(0);
  //   }
  // };
  // const closemodel = (e: any) => {
  //   if (ref.current === e.target) {
  //     setdisplay(false);
  //   }
  // }

  // const navigate = useNavigate();
  return (
    <div className="mt-4  gap-4 flex cursor-pointer">
      <div className="flex gap-4 border-r-2 border-purple-300 w-[100%] " 
      // onClick={() => navigate("/heading", 
      //   {
      //   state: {
      //     heading,
      //     image,
      //     time,
      //   }
      // })}
      >
        <img className="h-10 w-10 rounded-xl" src={image} />
        <div className="mr-10">
          <h1 className="text-sm font-bold text-purple-200">{heading}</h1>
          <h2 className="text-xs font-semibold text-purple-300">{time}</h2>
        </div>
      </div>
      {/* <div className="text-sm flex-col place-content-center " > */}
      {/* < FaRegHourglass className="text-lg text-white" /> */}
      {/* </div> */}
      {/* {display && <div onClick={closemodel} ref={ref} className="fixed inset-0 bg-black bg-opacity-30 h-screen  backdrop-blur-sm flex justify-center items-center">
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
            <button className="bg-[#212121] text-white hover:bg-transparent border-2 border-white rounded-lg p-2 outline-none mt-2 w-full" onClick={()=>{
              setTimer(hour*60 + min)
            }}>Save</button>
          </form>

        </div>

      </div>} */}
    </div>
  )
}