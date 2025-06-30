import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterStudent from './pages/RegisterStudent';
import RegisterCompany from './pages/RegisterCompany';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Internships from './pages/Internships';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/company" element={<RegisterCompany />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internships" element={<Internships />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;