import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './Authentication/login'
import Signup from './Authentication/signup'
import Parentdashboard from './Dashboard/ParentDashboard'
import Admindashboard from './Dashboard/AdminDashboard'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/parent-dashboard" element={<Parentdashboard />} />
          <Route path="/admin-dashboard" element={<Admindashboard />} />
        </Routes>
    </div>
  );
}

export default App;
