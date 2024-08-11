import { useEffect, useRef, useState } from "react";
// import BarChart from "./components/BarChart";
import Tile from "./components/Tile";
import image from '/BN.png';

interface Data {
  [key: string]: {
    timeSpent: number;
    favicon?: string;
  };
}

interface Message {
  type: string;
  data: Data;
}

function App() {
  const ref = useRef<HTMLDivElement>(null); 
  const [data, setData] = useState<Data | null>(null);
  const [timer, setTimer] = useState(0);
console.log(timer);
  const getCurrentDateKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  };

  useEffect(() => {
    const sendDataToBackground = () => {
      chrome.runtime.sendMessage({ type: 'FETCH_DATA_FOR_DATE', date: getCurrentDateKey() }, (response) => {
        if (chrome.runtime.lastError) {
          console.log("Error sending message to background script:", chrome.runtime.lastError);
          return;
        }
        setData(response.data);
      });
    };

    sendDataToBackground();

    const intervalId = setInterval(() => {
      sendDataToBackground();
    }, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      if (message.type === 'RECEIVE_DATA' || message.type === 'RECEIVE_EVERY_DAY_DATA') {
        setData(message.data);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // const datas = {
  //   labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //   datasets: [{
  //     label: 'Weekly Graph',
  //     data: [22, 50, 26, 55, 42, 21, 20],
  //     backgroundColor: [
  //       'rgba(173, 136, 198, 0.6)',
  //     ],
  //   }]
  // };
  const totalTimeSpent = data ? Object.values(data).reduce((total, item) => total + item.timeSpent, 0) : 0;
  const totalHours = Math.floor(totalTimeSpent / 3600);
  const totalMinutes = Math.floor((totalTimeSpent % 3600) / 60);
  const totalSeconds = totalTimeSpent % 60;
  return (
    <div className="p-7 bg-[#121212] min-h-screen w-80">
      <div className="flex gap-2">
        <h1 className="text-xl font-bold text-purple-200 mb-4">Daily Activity Details</h1>
      </div>
      {/* <BarChart ChartData={datas} /> */}
      <div className="w-[100%] ml-10 mr-10"></div>
      <h2 className="text-lg font-bold text-purple-200 mt-3 flex justify-center">{totalHours} hr, {totalMinutes} min,{totalSeconds} sec</h2>
      <h2 className="font-semibold text-purple-300 flex justify-center"></h2>
      <div>
        {data ? Object.entries(data).map(([key, value]) => {
           const hours = Math.floor(value.timeSpent / 3600);
           const minutes = Math.floor((value.timeSpent % 3600) / 60);
          const seconds = value.timeSpent % 60;
          return (
            <Tile
              key={key}
              setTimer={setTimer}
              ref={ref}
              image={value.favicon || image}
              heading={key}
              time={`${hours} hr, ${minutes} min, ${seconds} sec`}
            />
          );
        }) : (
          <Tile setTimer={setTimer} ref={ref} image={image} heading={"Loading..."} time={"Loading..."} />
        )}
      </div>
    </div>
  );
}

export default App;
