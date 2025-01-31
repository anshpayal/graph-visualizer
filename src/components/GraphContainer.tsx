import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node as FlowNode,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  updateNodePosition,
  setSelectedNode,
} from "../redux/slices/graphSlice";
import { addToHistory } from "../redux/slices/historySlice";
import CustomNode from "./CustomNode";
import NodeCustomizationPanel from "./NodeCustomizationPanel";
import UndoRedoControls from "./UndoRedoControls";
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

  // Track the initial position of the node being dragged
  const [dragStartPosition, setDragStartPosition] = React.useState<{
    [key: string]: { x: number; y: number };
  }>({});

//The component selects nodes from Redux (reduxNodes) and sets them in the local state using useNodesState([]).
//useEffect updates the local state whenever Redux state changes.
  useEffect(() => { //
    setNodes(
      reduxNodes.map((node) => ({
        ...node,
        type: "custom",
      }))
    );
    setEdges(reduxEdges);
  }, [reduxNodes, reduxEdges]);

  const onNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: FlowNode) => {
      setDragStartPosition({
        [node.id]: { x: node.position.x, y: node.position.y },
      });
    },
    []
  );

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: FlowNode) => {
      const startPosition = dragStartPosition[node.id];

      if (
        startPosition &&
        (startPosition.x !== node.position.x ||
          startPosition.y !== node.position.y)
      ) {
        dispatch(
          addToHistory({
            type: "NODE_POSITION",
            nodeId: node.id,
            before: startPosition,
            after: { x: node.position.x, y: node.position.y },
          })
        );

        dispatch(
          updateNodePosition({
            id: node.id,
            position: { x: node.position.x, y: node.position.y },
          })
        );
      }

      // Clear the start position
      setDragStartPosition({});
    },
    [dispatch, dragStartPosition]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: FlowNode) => {
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
        onNodeDragStart={onNodeDragStart}
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
      <UndoRedoControls />
    </div>
  );
};

export default GraphContainer;
