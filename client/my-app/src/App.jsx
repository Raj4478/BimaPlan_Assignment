import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClaimList from "./pages/Claims";
import Policies from "./pages/Policies";
import CreateClaim from "./pages/CreateClaim";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claims" element={<ClaimList />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/create-claim" element={<CreateClaim />} />
      </Routes>
    </Router>
  );
}

export default App;
