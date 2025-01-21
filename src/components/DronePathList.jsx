/* eslint-disable react/prop-types */
const DronePathList = ({ paths, onSelect, onDelete, selectedPathId }) => {
  if (!paths || paths?.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No paths available. Add a new path or upload data.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {paths.map((path) => (
        <div
          key={path.id}
          className={`flex items-center justify-between p-3 rounded-lg border
                     ${selectedPathId === path.id ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: path.color }}
            />
            <span className="font-medium">
              {path.name || `Path ${path.id.slice(0, 4)}`}
            </span>
            <span className="text-sm text-gray-500">
              ({path.coordinates?.length || 0} points)
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onSelect(path.id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Select
            </button>
            <button
              onClick={() => onDelete(path.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DronePathList;
