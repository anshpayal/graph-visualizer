import { Provider } from "react-redux";
import { store } from "./redux/store";
import GraphContainer from "./components/GraphContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen w-screen bg-gray-100">
        <GraphContainer />
      </div>
    </Provider>
  );
}

export default App;
