import React, { useState } from "react";
import "./index.css"; // Import Tailwind CSS
import { ColorPoint } from "./ColorPoint";
import ColorPointForm from "./ColorPointForm";

const App: React.FC = () => {
  const cols = 80;
  const rows = 45;

  const [colorPoints, setColorPoints] = useState<ColorPoint[]>([
    { id: 1, x: 0, y: 0, r: 255, g: 0, b: 0, strength: 1 },
    { id: 2, x: 1, y: 0, r: 0, g: 0, b: 255, strength: 1 },
    { id: 3, x: 0, y: 1, r: 255, g: 0, b: 255, strength: 1 },
    { id: 4, x: 0.5, y: 0.5, r: 0, g: 255, b: 0, strength: 0.5 },
  ]);

  const [mode, setMode] = useState<'weightedAverage' | 'closestColor'>('weightedAverage');

  const getInfluenceScore = (x: number, y: number, colorPoint: ColorPoint) => {
    const maxDistance = Math.sqrt(2);
    const distance = Math.sqrt((x - colorPoint.x) ** 2 + (y - colorPoint.y) ** 2);

    return (Math.max(0, 1 - distance / maxDistance)) ** (2/colorPoint.strength);
  }

  const getColor = (col: number, row: number, cols: number, rows: number): import("csstype").Property.BackgroundColor => {
    const position = {x: col / cols, y: row / rows};

    const colorsWithDistance = colorPoints.map(colorPoint => ({
        color: colorPoint,
        distance: getInfluenceScore(position.x, position.y, colorPoint),
      }));

    const totalDistance = colorsWithDistance.reduce((acc, { distance }) => acc + distance, 0);

    const weightedAverage = colorsWithDistance.reduce((acc, { color, distance }) => {
      return {
        r: acc.r + color.r * distance/totalDistance,
        g: acc.g + color.g * distance/totalDistance,
        b: acc.b + color.b * distance/totalDistance,
      };
    }, { r: 0, g: 0, b: 0 });

    const closestColor = colorsWithDistance.reduce((acc, { color, distance }) => {
      return acc.distance > distance ? acc : { color, distance };
    }, { color: colorPoints[0], distance: 0 }).color;
    
    return mode == 'weightedAverage' ? `rgb(${weightedAverage.r}, ${weightedAverage.g}, ${weightedAverage.b})` : `rgb(${closestColor.r}, ${closestColor.g}, ${closestColor.b}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-white">Gradient</h1>
      <canvas></canvas>
      <div className="bg-gray-600">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex flex-row">
            {Array.from({ length: cols }).map((_, j) => (
              <div
                key={j}
                style={{
                  backgroundColor: getColor(j, i, cols, rows),
                  fontSize: "0.5rem",
                }}
                className="w-3 h-3 bg-gray-400 text-white"
              ></div>
            ))}
          </div>
        ))}
      </div>
      <ColorPointForm colorPoints={colorPoints} setColorPoints={setColorPoints} />
      <div className="bg-gray-700 text-white">
        <button
          onClick={() => setMode('weightedAverage')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Weighted Average
        </button>
        <button
          onClick={() => setMode('closestColor')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Closest Color
        </button>
        </div>
      <div className="bg-gray-700 text-white">
        
        <p>{getColor(0, 0, rows, cols)}</p>
        <p>{JSON.stringify({...colorPoints[0], influenceScore: getInfluenceScore(0, 0, colorPoints[0])})}</p>
        <p>{JSON.stringify({...colorPoints[1], influenceScore: getInfluenceScore(0, 0, colorPoints[1])})}</p>
        <p>{JSON.stringify({...colorPoints[2], influenceScore: getInfluenceScore(0, 0, colorPoints[2])})}</p>
        <p>{JSON.stringify({...colorPoints[3], influenceScore: getInfluenceScore(0, 0, colorPoints[3])})}</p>
      </div>
    </div>    
);
};

export default App;