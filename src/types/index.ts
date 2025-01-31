export interface Node {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface State {
  nodes: Node[];
  edges: Edge[];
}

export interface HistoryAction {
  type: 'NODE_POSITION' | 'NODE_COLOR' | 'NODE_FONT_SIZE';
  nodeId: string;
  before: any;
  after: any;
}

export interface HistoryState {
  past: HistoryAction[];
  future: HistoryAction[];
}