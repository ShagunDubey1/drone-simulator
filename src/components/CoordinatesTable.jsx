/* eslint-disable react/prop-types */
const CoordinatesTable = ({ coordinates, onCoordinateChange }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-sm font-semibold text-gray-900">#</th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-900">
              Latitude
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-900">
              Longitude
            </th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coord, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-3 text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-3">
                <input
                  type="number"
                  step="0.000001"
                  value={coord.lat}
                  onChange={(e) =>
                    onCoordinateChange(index, 'lat', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
              <td className="px-6 py-3">
                <input
                  type="number"
                  step="0.000001"
                  value={coord.lng}
                  onChange={(e) =>
                    onCoordinateChange(index, 'lng', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatesTable;
