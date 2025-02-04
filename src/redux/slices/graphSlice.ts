import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '../../types';

interface GraphState { //structure of the graph state.
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
}

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({ //initalize the 10 nodes
  id: `node-${i}`,
  position: {
    x: Math.random() * 800,
    y: Math.random() * 600,
  },
  data: {
    label: `Node ${i}`,
    color: '#ffffff',
    fontSize: 12,
  },
  type: 'custom',
}));

const initialEdges: Edge[] = Array.from({ length: 15 }, (_, i) => ({ //initializing the 15 random edges
  id: `edge-${i}`,
  source: `node-${Math.floor(Math.random() * 10)}`,
  target: `node-${Math.floor(Math.random() * 10)}`,
}));

const initialState: GraphState = {
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: { //reducer actions to update the color,set selected node, update node color, font size
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = {
          x: action.payload.position.x,
          y: action.payload.position.y,
        };
      }
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    updateNodeColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.color = action.payload.color;
      }
    },
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.fontSize = action.payload.fontSize;
      }
    },
  },
});

export const {
  updateNodePosition,
  setSelectedNode,
  updateNodeColor,
  updateNodeFontSize,
} = graphSlice.actions;
export default graphSlice.reducer;