import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './user/login/Login';
import Signup from './user/signup/Signup';
import Profile from './user/profile/Profile';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import { ACCESS_TOKEN } from './constants';
import Home from "./Home";
import CreateTripForm from "./CreateTripForm";
import TripDetail from "./TripDetail";
import TripDetailById from './TripDetailById';
import Explore from './Explore';
import NavBar from "./components/NavBar";
import './App.css';
import WelcomeDashboard from './components/DashBoard';
import { toast } from 'react-toastify';
import { useAuth } from './common/AuthContext';
import PrivateRoute from './common/PrivateRoute';


function App() {
  const {
    authenticated,
    currentUser,
    loading,
    setAuthenticated,
    setCurrentUser,
  } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("You're safely logged out!");
    navigate('/login');
  };

  if (loading) {
    return <LoadingIndicator />;
  };

  console.log('Authenticated:', authenticated);
  console.log('Current User:', currentUser);
  console.log('Loading:', loading);

  return (
      <div className="flex flex-col min-h-screen">
        <NavBar authenticated={authenticated} onLogout={handleLogout} />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-trip" element={<CreateTripForm />} />
            <Route path="/explore" element={<Explore/>} />
            <Route path="/trip" element={<TripDetail />} />
            <Route path="/trip/:id" element={<TripDetailById />} />
            <Route path="/login" element={<Login authenticated={authenticated} />} />
            <Route path="/signup" element={<Signup authenticated={authenticated} />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/profile" element={
              <PrivateRoute authenticated={authenticated}>
                <Profile currentUser={currentUser} />
              </PrivateRoute>} />
            <Route path="/dashboard" element={
              <PrivateRoute authenticated={authenticated}>
                <WelcomeDashboard username={currentUser?.name || 'Guest'} onLogout={handleLogout} />
              </PrivateRoute>} />
            <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
  );
}
export default App;
