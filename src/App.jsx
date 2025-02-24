import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardContent from "./components/DashboardContent";
import Balance from "./components/Balance";
import Withdraw from "./components/Withdraw";
import Transaction from "./components/Transaction";
import Investment from "./components/Investment";
import Deposit from "./components/Deposit";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="content" element={<DashboardContent />} />
            <Route path="balance" element={<Balance />} />
            <Route path="investments" element={<Investment />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactions" element={<Transaction />} />
            <Route path="deposit" element={<Deposit />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
