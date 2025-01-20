# Drone Simulator

The Drone Simulator app simulates drone motion on a map (Google Maps or MapBox) based on user-provided time series data of latitude and longitude. The application allows users to input data or upload a file and simulates the drone's movement with the ability to pause or resume the simulation.

## Features

- **World Maps Integration:** Displays a world map using Google Maps as the background. You can utilize npm packages for integrating these maps.
  
- **User Input:** Accepts multiple sets of latitude and longitude in time series format as input from the user. Alternatively, users can upload a file with the entire time series information.

- **Simulate Drone Motion:** Once the user clicks on the 'Simulate' button, a Google Maps marker is used to display the drone on the map. The entire expected path is drawn, and the drone position is updated based on timestamps, showing progress over the map.

- **Pause/Resume Functionality:** The user can pause and resume the simulation at any time.

## Getting Started

### Prerequisites

To run the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShagunDubey1/drone-simulator.git
   ```
2. Install the required npm packages:

   ```bash
   npm install
   ```
3. Set .env file with your google key
   
   ```bash
   GOOGLE_API_KEY="your-api-key"
   ```
   
4. Start the application:

   ```bash
   npm run dev
   ```

## Usage

### Start the application:

To start the development server, run:

```bash
npm run dev
```

### Input Data:

- Enter the latitude and longitude data in a time series format directly in the app.
- Alternatively, upload a CSV file with time series data using the provided file input.

### Simulate:

- Click on the 'Simulate' button to view the drone's motion on the map. The drone position will be updated at regular intervals, and the path will be displayed.

### Pause/Resume:

- You can pause or resume the simulation using the respective buttons.

### CSV File Format

You can upload a CSV file containing latitude and longitude values with timestamps. The file should have the following format:

 | lat      | lng       |
 | -------- | --------- |
 | 19.0760  | 72.8777   |
 | 19.0765  | 72.8780   |

A dummy format of the CSV file has been provided in the `public` directory for reference.

### Built With

- React, Vite, TailwindCSS

