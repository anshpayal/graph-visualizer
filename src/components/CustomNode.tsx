import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data: {
    label: string;
    color: string;
    fontSize: number;
  };
  selected: boolean;
}

const CustomNode = ({ data, selected }: CustomNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={`px-4 py-2 rounded shadow-md transition-all duration-200 ${
          selected ? "ring-2 ring-blue-500" : ""
        }`}
        style={{
          backgroundColor: data.color || "#ffffff",
          fontSize: `${data.fontSize || 12}px`,
          border: "1px solid #333",
          color: isLightColor(data.color) ? "#000000" : "#ffffff",
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

// Helper function to determine if text should be black or white based on background color
const isLightColor = (color: string) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

export default memo(CustomNode);
