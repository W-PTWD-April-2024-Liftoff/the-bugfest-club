import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreateTripForm from "./CreateTripForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripForm />} />
            <Route
              path="/search"
              element={<div>Search Page (Coming Soon)</div>}
            />
            <Route
              path="/login"
              element={<div>Login Page (Coming Soon)</div>}
            />
            <Route
              path="/about"
              element={<div>About Page (Coming Soon)</div>}
            />
            {/* Add a catch-all route for undefined paths */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
