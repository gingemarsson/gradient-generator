import React, { useState } from "react";
import "./index.css"; // Import Tailwind CSS
import { ColorPoint } from "./ColorPoint";

type Props = {
  colorPoints: ColorPoint[];
  setColorPoints: React.Dispatch<React.SetStateAction<ColorPoint[]>>;
};

const ColorPointForm: React.FC<Props> = ({colorPoints, setColorPoints}) => {
  return (
      <div className="m-2 text-white">
        {colorPoints.map((colorPoint, index) => (
          <div key={index} className="flex flex-row mb-2">
            Point {colorPoint.id}
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
            &nbsp;&nbsp;&nbsp;
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
            &nbsp;&nbsp;&nbsp;
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
          </div>    
        ))}
      </div>
    );
};

export default ColorPointForm;