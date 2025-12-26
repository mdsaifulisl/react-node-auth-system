import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={ <ProtectedRoute> <Login /> </ProtectedRoute> } />

        <Route path="/register" element={ <ProtectedRoute> <Register /> </ProtectedRoute>} />

        <Route path="/forgot-password" element={ <ProtectedRoute> <ForgotPassword /> </ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
