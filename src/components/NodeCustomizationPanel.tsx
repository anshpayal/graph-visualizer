import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateNodeColor,
  updateNodeFontSize,
} from "../redux/slices/graphSlice";

const NodeCustomizationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector(
    (state: RootState) => state.graph.selectedNodeId
  );
  const selectedNode = useSelector((state: RootState) =>
    state.graph.nodes.find((node) => node.id === selectedNodeId)
  );

  if (!selectedNode) {
    return (
      <div className="absolute right-4 top-4 bg-white p-4 rounded-lg shadow-lg">
        <p className="text-gray-500">Select a node to customize</p>
      </div>
    );
  }

  const handleColorChange = (color: string) => {
    if (selectedNodeId) {
      dispatch(
        updateNodeColor({
          id: selectedNodeId,
          color,
        })
      );
    }
  };

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedNodeId) {
      dispatch(
        updateNodeFontSize({
          id: selectedNodeId,
          fontSize,
        })
      );
    }
  };

  return (
    <div className="absolute right-4 top-4 bg-white p-4 rounded-lg shadow-lg min-w-[250px]">
      <h3 className="text-lg font-semibold mb-4">Node Customization</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Node Color</label>
        <input
          type="color"
          value={selectedNode.data.color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Font Size: {selectedNode.data.fontSize}px
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={selectedNode.data.fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm w-12">{selectedNode.data.fontSize}px</span>
        </div>
      </div>
    </div>
  );
};

export default NodeCustomizationPanel;
