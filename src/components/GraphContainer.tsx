import React, { useCallback, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateNodePosition,
  setSelectedNode,
} from "../redux/slices/graphSlice";
import CustomNode from "./CustomNode";
import NodeCustomizationPanel from "./NodeCustomizationPanel";
import "@xyflow/react/dist/style.css";


const nodeTypes = {
  custom: CustomNode,
};

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state: RootState) => state.graph
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync Redux state with React Flow state
  useEffect(() => {
    setNodes(
      reduxNodes.map((node) => ({
        ...node,
        type: "custom",
      }))
    );
    setEdges(reduxEdges);
  }, [reduxNodes, reduxEdges]);

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

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: FlowNode) => {
      dispatch(setSelectedNode(node.id));
    },
    [dispatch]
  );

  const onPaneClick = useCallback(() => {
    dispatch(setSelectedNode(null));
  }, [dispatch]);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <NodeCustomizationPanel />
    </div>
  );
};

export default GraphContainer;
