import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '../../types';

interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
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
}));

const initialEdges: Edge[] = Array.from({ length: 15 }, (_, i) => ({
  id: `edge-${i}`,
  source: `node-${Math.floor(Math.random() * 10)}`,
  target: `node-${Math.floor(Math.random() * 10)}`,
}));

const initialState: GraphState = {
  nodes: initialNodes,
  edges: initialEdges,
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
  },
});

export const { updateNodePosition } = graphSlice.actions;
export default graphSlice.reducer;