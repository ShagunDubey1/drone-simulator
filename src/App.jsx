// import { useState, useEffect } from "react";
// import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
// import Papa from "papaparse";

// const mapContainerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 0,
//   lng: 0,
// };

// const App = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAXIqEbK66J1PJS0ZC9qX_Sa38Cg-Oni0I", // Replace with your Google Maps API key
//   });

//   const [coordinates, setCoordinates] = useState([]);
//   const [isSimulating, setIsSimulating] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleInputChange = (e, index, field) => {
//     const newCoordinates = [...coordinates];
//     newCoordinates[index][field] = parseFloat(e.target.value);
//     setCoordinates(newCoordinates);
//   };

//   const addRow = () => {
//     setCoordinates([...coordinates, { lat: 0, lng: 0 }]);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       Papa.parse(file, {
//         header: true,
//         skipEmptyLines: true,
//         complete: (result) => {
//           const parsedData = result.data.map((row) => ({
//             lat: parseFloat(row.lat),
//             lng: parseFloat(row.lng),
//           }));
//           setCoordinates(parsedData);
//         },
//       });
//     }
//   };

//   const simulatePath = () => {
//     setIsSimulating(true);
//     setCurrentIndex(0);
//   };

//   useEffect(() => {
//     if (isSimulating && currentIndex < coordinates.length) {
//       const timer = setTimeout(() => {
//         setCurrentIndex((prev) => prev + 1);
//       }, 1000); // 1-second interval

//       return () => clearTimeout(timer);
//     } else if (currentIndex >= coordinates.length) {
//       setIsSimulating(false);
//     }
//   }, [isSimulating, currentIndex, coordinates]);

//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <h1 className="text-5xl font-extrabold text-center text-blue-900 tracking-wide">
//           Drone Simulator
//         </h1>
//         <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-200">
//           {/* Controls Section */}
//           <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
//             {/* Upload CSV */}
//             <label className="flex flex-col lg:flex-row items-center gap-4">
//               <span className="font-medium text-lg text-gray-700">Upload CSV:</span>
//               <input
//                 type="file"
//                 accept=".csv"
//                 onChange={handleFileUpload}
//                 className="file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 transition cursor-pointer"
//               />
//             </label>

//             {/* Add Coordinate Button */}
//             <button
//               onClick={addRow}
//               className="px-6 py-3 bg-green-500 text-white font-medium rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-200"
//             >
//               Add New Coordinate
//             </button>

//             {/* Start Simulation Button */}
//             <button
//               onClick={simulatePath}
//               disabled={isSimulating || coordinates.length === 0}
//               className={`px-6 py-3 font-medium rounded-full shadow-lg transition duration-200 ${isSimulating || coordinates.length === 0
//                   ? "bg-gray-400 text-gray-700 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl"
//                 }`}
//             >
//               {isSimulating ? "Simulating..." : "Start Simulation"}
//             </button>
//           </div>

//           {/* Coordinates Table */}
//           <div className="overflow-hidden rounded-lg border border-gray-300">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
//                   <th className="px-6 py-3 font-medium">Latitude</th>
//                   <th className="px-6 py-3 font-medium">Longitude</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {coordinates.map((coord, index) => (
//                   <tr
//                     key={index}
//                     className="hover:bg-blue-50 transition duration-150"
//                   >
//                     <td className="px-6 py-4 border-t border-gray-300">
//                       <input
//                         type="number"
//                         step="0.0001"
//                         value={coord.lat}
//                         onChange={(e) => handleInputChange(e, index, "lat")}
//                         className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
//                       />
//                     </td>
//                     <td className="px-6 py-4 border-t border-gray-300">
//                       <input
//                         type="number"
//                         step="0.0001"
//                         value={coord.lng}
//                         onChange={(e) => handleInputChange(e, index, "lng")}
//                         className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Map Display */}
//         <div className="overflow-hidden rounded-lg shadow-lg">
//           <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={2}>
//             {coordinates.length > 0 && (
//               <>
//                 {/* Entire path */}
//                 <Polyline
//                   path={coordinates}
//                   options={{
//                     strokeColor: "#2563EB",
//                     strokeOpacity: 0.8,
//                     strokeWeight: 4,
//                   }}
//                 />
//                 {/* Drone marker */}
//                 {currentIndex < coordinates.length && (
//                   <Marker position={coordinates[currentIndex]} label="Drone" />
//                 )}
//               </>
//             )}
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import { useState, useEffect, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import DroneMap from './components/DroneMap';
import FileUpload from './components/FileUpload';
import SimulationControls from './components/SimulationControls';
import CoordinatesTable from './components/CoordinatesTable';
import TimelineSlider from './components/TimelineSlider';

const SIMULATION_SPEED = 1000;

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAXIqEbK66J1PJS0ZC9qX_Sa38Cg-Oni0I',
  });

  const [coordinates, setCoordinates] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCoordinateChange = useCallback((index, field, value) => {
    setCoordinates((prev) =>
      prev.map((coord, i) =>
        i === index ? { ...coord, [field]: parseFloat(value) } : coord
      )
    );
  }, []);

  const addCoordinate = useCallback(() => {
    setCoordinates((prev) => [...prev, { lat: 0, lng: 0 }]);
  }, []);

  const handleDataLoaded = useCallback((data) => {
    setCoordinates(data);
    setCurrentIndex(0);
    setIsSimulating(false);
    setIsPaused(false);
  }, []);

  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    setIsPaused(false);
    setCurrentIndex(0);
  }, []);

  const pauseSimulation = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSimulation = useCallback(() => {
    setIsPaused(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsSimulating(false);
    setIsPaused(false);
    setCurrentIndex(0);
  }, []);

  const handleSliderChange = useCallback(
    (index) => {
      setCurrentIndex(index);
      if (!isSimulating) {
        setIsSimulating(true);
        setIsPaused(true);
      }
    },
    [isSimulating]
  );

  useEffect(() => {
    let timer;
    if (isSimulating && !isPaused && currentIndex < coordinates.length) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev >= coordinates.length - 1) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, SIMULATION_SPEED);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, isPaused, currentIndex, coordinates.length]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Drone Flight Simulator
        </h1>

        <div className="space-y-6">
          {/* Controls Panel */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <FileUpload onDataLoaded={handleDataLoaded} />
              <button
                onClick={addCoordinate}
                className="px-6 py-2 bg-green-500 text-white font-medium rounded-full 
                shadow-md hover:bg-green-600 transition"
              >
                Add Coordinate
              </button>
              <SimulationControls
                isSimulating={isSimulating}
                isPaused={isPaused}
                onStart={startSimulation}
                onPause={pauseSimulation}
                onResume={resumeSimulation}
                onReset={resetSimulation}
                disabled={coordinates.length === 0}
              />
            </div>

            {/* Timeline Slider */}
            {coordinates.length > 0 && (
              <TimelineSlider
                currentIndex={currentIndex}
                totalPoints={coordinates.length}
                onChange={handleSliderChange}
                disabled={coordinates.length === 0}
              />
            )}
          </div>

          {/* Map and Table Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <DroneMap coordinates={coordinates} currentIndex={currentIndex} />
            </div>

            {/* Coordinates Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Coordinates</h2>
              <CoordinatesTable
                coordinates={coordinates}
                onCoordinateChange={handleCoordinateChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
