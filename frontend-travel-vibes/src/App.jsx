import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreateTripForm from "./CreateTripForm";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTripForm />} />
          <Route
            path="/search"
            element={<div>Search Page (Coming Soon)</div>}
          />
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
          <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add a catch-all route for undefined paths */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
