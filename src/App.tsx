import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import "./App.css";
import Planets from "./components/Planets";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Container">
        <Planets />
      </div>
    </QueryClientProvider>
  );
}

export default App;
