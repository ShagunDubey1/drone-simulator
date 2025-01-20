/* eslint-disable react/prop-types */
const SimulationControls = ({
  isSimulating,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  disabled,
}) => {
  return (
    <div className="flex gap-4">
      {!isSimulating ? (
        <button
          onClick={onStart}
          disabled={disabled}
          className={`px-6 py-2 font-medium rounded-full shadow-md transition
                     ${
                       disabled
                         ? 'bg-gray-400 cursor-not-allowed'
                         : 'bg-blue-600 hover:bg-blue-700 text-white'
                     }`}
        >
          Start Simulation
        </button>
      ) : (
        <>
          <button
            onClick={isPaused ? onResume : onPause}
            className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-full 
                     shadow-md hover:bg-yellow-600 transition"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded-full 
                     shadow-md hover:bg-red-600 transition"
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default SimulationControls;
