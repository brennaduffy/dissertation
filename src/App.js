import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/home/*" element = {<Dashboard/>}/>
        <Route path = "forgot-password" element = {<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}
