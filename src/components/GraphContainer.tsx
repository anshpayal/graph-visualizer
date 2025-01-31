import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node as FlowNode,
  Edge as FlowEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateNodePosition } from "../redux/slices/graphSlice";

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes: initialNodes, edges: initialEdges } = useSelector(
    (state: RootState) => state.graph
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: FlowNode) => {
      dispatch(
        updateNodePosition({
          id: node.id,
          position: node.position,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphContainer;
