/* eslint-disable react/prop-types */
const TimelineSlider = ({ currentIndex, totalPoints, onChange, disabled }) => {
  return (
    <div className="w-full px-4">
      <input
        type="range"
        min={0}
        max={totalPoints - 1}
        value={currentIndex}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>Start</span>
        <span>
          Time Progress: {Math.round((currentIndex / (totalPoints - 1)) * 100)}%
        </span>
        <span>End</span>
      </div>
    </div>
  );
};

export default TimelineSlider;
