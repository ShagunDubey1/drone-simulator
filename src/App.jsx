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
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
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
