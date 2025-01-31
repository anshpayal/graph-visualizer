import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { undo, redo } from "../redux/slices/historySlice";
import {
  updateNodePosition,
  updateNodeColor,
  updateNodeFontSize,
} from "../redux/slices/graphSlice";

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();
  const { past, future } = useSelector((state: RootState) => state.history);

  const handleUndo = () => {
    if (past.length > 0) {
      const lastAction = past[past.length - 1];

      switch (lastAction.type) {
        case "NODE_POSITION":
          dispatch(
            updateNodePosition({
              id: lastAction.nodeId,
              position: {
                x: lastAction.before.x,
                y: lastAction.before.y,
              },
            })
          );
          break;
        case "NODE_COLOR":
          dispatch(
            updateNodeColor({
              id: lastAction.nodeId,
              color: lastAction.before,
            })
          );
          break;
        case "NODE_FONT_SIZE":
          dispatch(
            updateNodeFontSize({
              id: lastAction.nodeId,
              fontSize: lastAction.before,
            })
          );
          break;
      }

      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const nextAction = future[future.length - 1];

      switch (nextAction.type) {
        case "NODE_POSITION":
          dispatch(
            updateNodePosition({
              id: nextAction.nodeId,
              position: {
                x: nextAction.after.x,
                y: nextAction.after.y,
              },
            })
          );
          break;
        case "NODE_COLOR":
          dispatch(
            updateNodeColor({
              id: nextAction.nodeId,
              color: nextAction.after,
            })
          );
          break;
        case "NODE_FONT_SIZE":
          dispatch(
            updateNodeFontSize({
              id: nextAction.nodeId,
              fontSize: nextAction.after,
            })
          );
          break;
      }

      dispatch(redo());
    }
  };

  return (
    <div className="absolute left-4 top-4 bg-white p-2 rounded-lg shadow-lg flex gap-2 z-10">
      <button
        onClick={handleUndo}
        disabled={past.length === 0}
        className={`px-4 py-2 rounded ${
          past.length === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } transition-colors`}
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={future.length === 0}
        className={`px-4 py-2 rounded ${
          future.length === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } transition-colors`}
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;
