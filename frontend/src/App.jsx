import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Ruangan from './pages/ruangan.jsx'
import Pinjaman from './pages/pinjaman.jsx'
import DetailPeminjaman from './pages/detailPeminjaman.jsx'
import LupaPassword from './pages/lupaPassword.jsx'
import Register from './pages/register.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ruangan" element={<Ruangan />} />
        <Route path="/pinjaman" element={<Pinjaman />} />
        <Route path="/detail" element={<DetailPeminjaman />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
