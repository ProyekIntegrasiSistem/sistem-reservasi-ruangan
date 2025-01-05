import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Ruangan from "./pages/ruangan.jsx";
import Pinjaman from "./pages/pinjaman.jsx";
import Register from "./pages/register.jsx";
import LupaPassword from "./pages/lupaPassword.jsx";
import ReserveSchedule from "./pages/reserveSchedule.jsx";
import { ProtectedRoute } from "./utils/roleMiddleware";


function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman yang dapat diakses semua */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route
          path="/detail"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <detailPeminjaman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Halaman untuk Staff */}
        <Route
          path="/ruangan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Ruangan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pinjaman"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pinjaman />
            </ProtectedRoute>
          }
        />

        {/* Halaman untuk User */}
        <Route
          path="/reservasi"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <ReserveSchedule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
