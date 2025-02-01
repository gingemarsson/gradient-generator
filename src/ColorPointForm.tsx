import React, { useState } from "react";
import "./index.css"; // Import Tailwind CSS
import { ColorPoint } from "./ColorPoint";

type Props = {
  colorPoints: ColorPoint[];
  setColorPoints: React.Dispatch<React.SetStateAction<ColorPoint[]>>;
};

const ColorPointForm: React.FC<Props> = ({ colorPoints, setColorPoints }) => {
  return (
    <div className="m-2 text-white bg-gray-800 p-2 rounded grid grid-cols-3 gap-2">
      {colorPoints.map((colorPoint, index) => (
        <div key={index} className="bg-gray-700 p-2 rounded h-48">
          <h1 className="text-white text-lg font-bold flex">
            <span className="flex-grow-1">Point {colorPoint.id}</span>
            <button
              onClick={() => {
                const newColorPoints = [...colorPoints];
                newColorPoints.splice(index, 1);
                setColorPoints(newColorPoints);
              }}
              className="bg-gray-900 hover:bg-red-800 text-white font-bold py-1 px-2 ml-2 rounded text-sm"
            >
              Delete
            </button>
          </h1>
          <div className="flex flex-row items-start">
            <div className="flex flex-col items-start p-2">
              <label className="text-white text-sm">X:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={colorPoint.x}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].x = parseFloat(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
              <label className="text-white text-sm">Y:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={colorPoint.y}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].y = parseFloat(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
            </div>
            <div className="flex flex-col items-start p-2">
              <label className="text-white text-sm">R:</label>
              <input
                type="range"
                min="0"
                max="255"
                step="1"
                value={colorPoint.r}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].r = parseInt(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
              <label className="text-white text-sm">G:</label>
              <input
                type="range"
                min="0"
                max="255"
                step="1"
                value={colorPoint.g}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].g = parseInt(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
              <label className="text-white text-sm">B:</label>
              <input
                type="range"
                min="0"
                max="255"
                step="1"
                value={colorPoint.b}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].b = parseInt(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
            </div>
            <div className="flex flex-col items-start p-2">
              <label className="text-white text-sm">Strength:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={colorPoint.strength}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].strength = parseFloat(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
              <label className="text-white text-sm">Size:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={colorPoint.size}
                onChange={(e) => {
                  const newColorPoints = [...colorPoints];
                  newColorPoints[index].size = parseFloat(e.target.value);
                  setColorPoints(newColorPoints);
                }}
              />
            </div>
          </div>
        </div>

      ))}
      <button
        onClick={() => setColorPoints([...colorPoints, {
          id: colorPoints.length + 1,
          x: 0.5,
          y: 0.5,
          r: 255,
          g: 255,
          b: 255,
          strength: 1,
          size: 0.1,
        }])}
        className="bg-gray-900 hover:bg-blue-800 text-white font-bold py-1 px-2 ml-2 rounded text-sm h-48"
      >
        Add Point
      </button>
    </div>
  );
};

export default ColorPointForm;