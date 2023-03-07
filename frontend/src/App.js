import "./App.css";
import Homepage from "./Presentation/Views/Homepage/Homepage";
import Dashboard from "./Presentation/Views/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./Presentation/Views/Account/Account";
import Visualization from "./Presentation/Views/Visualization/Visualization";
import Transactions from "./Presentation/Views/Transactions/Transactions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
