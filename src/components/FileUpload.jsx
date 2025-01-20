/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onDataLoaded }) => {
  const handleFileUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data
              .filter((row) => row.lat && row.lng)
              .map((row) => ({
                lat: parseFloat(row.lat),
                lng: parseFloat(row.lng),
              }));
            onDataLoaded(parsedData);
          },
        });
      }
    },
    [onDataLoaded]
  );

  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <span className="font-medium text-gray-700">Upload CSV:</span>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                 file:bg-blue-600 file:text-white file:font-semibold 
                 hover:file:bg-blue-700 transition cursor-pointer"
      />
    </label>
  );
};

export default FileUpload;
