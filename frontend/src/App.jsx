import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Ruangan from "./pages/room/ruangan.jsx";
import Pinjaman from "./pages/reservation/pinjaman.jsx";
import ReserveSchedule from "./pages/reserveSchedule.jsx";
import { ProtectedRoute } from "./utils/roleMiddleware";
import DetailPeminjaman from "./pages/detailPeminjaman.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman yang dapat diakses semua */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/detail"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <DetailPeminjaman />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Halaman untuk Staff */}
        <Route
          path="/admin/ruangan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Ruangan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pinjaman"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Pinjaman />
            </ProtectedRoute>
          }
        />

        {/* Halaman untuk User */}
        <Route
          path="/"
          element={
            <ReserveSchedule />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
