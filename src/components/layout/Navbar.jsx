import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiSearch, FiMenu, FiX, FiLogIn, FiUserPlus, FiHome, FiUsers, FiBook, FiPhone, FiEye, FiEyeOff } from "react-icons/fi"
import { FaCheckCircle } from "react-icons/fa"
import logoImg from "../../assets/img.jpeg"

const LoginModal = ({ onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPass, setShowPass] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoggedIn(true)
    setTimeout(() => { setLoggedIn(false); onClose() }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex relative" style={{minHeight: '420px'}}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 z-10">
          <FiX size={16} />
        </button>

        {/* Left Panel */}
        <div className="hidden md:flex w-2/5 bg-orange-500 from-orange-500 to-orange-700 text-white flex-col items-center justify-center p-8 gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src={logoImg} alt="PanditJi" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
          <p className="text-orange-100 text-sm text-center">Login to manage your bookings and access all features of PanditJi.</p>
          <div className="flex flex-col gap-3 w-full mt-2">
            {[
              { icon: <FaCheckCircle size={14} />, text: "View & manage your bookings" },
              { icon: <FaCheckCircle size={14} />, text: "Save favourite pandits" },
              { icon: <FaCheckCircle size={14} />, text: "Get exclusive offers" },
              { icon: <FaCheckCircle size={14} />, text: "Track puja status" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-orange-100">
                <span className="text-green-300">{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-400 mx-auto mb-3 md:hidden">
              <img src={logoImg} alt="logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Login to PanditJi</h2>
            <p className="text-sm text-gray-400 mt-1">Enter your credentials to continue</p>
          </div>

          {loggedIn ? (
            <div className="text-center py-8">
              <FaCheckCircle className="mx-auto text-green-500 mb-3" size={52} />
              <p className="text-green-600 font-bold text-lg">Login Successful!</p>
              <p className="text-gray-400 text-sm mt-1">Welcome back to PanditJi</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email Address</label>
                <input required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Password</label>
                <div className="relative">
                  <input required type={showPass ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <span className="text-orange-500 cursor-pointer hover:underline">Forgot Password?</span>
              </div>

              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
                <FiLogIn size={16} /> Login to Account
              </button>

              <div className="relative flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or login with</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
                  <span className="text-lg">G</span> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
                  <span className="text-lg">📱</span> OTP
                </button>
              </div>

              <p className="text-center text-sm text-gray-400">Don't have an account? <span className="text-orange-500 font-semibold cursor-pointer hover:underline" onClick={onClose}>Register</span></p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const Navbar = ({ navRef }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/pandits?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setMenuOpen(false)
    }
  }

  const navLinks = [
    { to: "/", label: "Home", icon: <FiHome size={14} /> },
    { to: "/pandits", label: "Pandits", icon: <FiUsers size={14} /> },
    { to: "/pujas", label: "Pujas", icon: <FiBook size={14} /> },
    { to: "/contact", label: "Contact", icon: <FiPhone size={14} /> },
  ]

  return (
    <>
      <nav ref={navRef} className="bg-orange-500 text-white shadow-md fixed top-0 left-0 right-0 z-40 w-full" id="main-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-[3px] border-white shadow-md shrink-0">
              <img src={logoImg} alt="PanditJi" className="w-full h-full object-cover" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-wide hidden sm:block whitespace-nowrap">PanditJi</span>
          </Link>

          <div className="hidden md:flex flex-1 min-w-0 ">
            <form onSubmit={handleSearch} className="flex w-full bg-white rounded-full overflow-hidden shadow-sm border border-orange-300">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pandit or puja..."
                className="flex-1 min-w-0 px-3 py-1.5 text-gray-600 text-xs outline-none"
              />
              <button type="submit" className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-white flex items-center shrink-0 transition">
                <FiSearch size={13} />
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium shrink-0">
            {navLinks.map(({ to, label, icon }) => (
              <Link key={to} to={to} className={`flex items-center gap-1 transition hover:text-orange-200 whitespace-nowrap ${isActive(to) ? "text-white font-bold border-b-2 border-white pb-0.5" : "text-orange-100"}`}>
                {icon} {label}
              </Link>
            ))}
            <div className="w-px h-5 bg-orange-400 shrink-0" />
            <button onClick={() => setShowLogin(true)} className="flex items-center gap-1 bg-white text-orange-600 px-3 py-1.5 rounded-xl hover:bg-orange-50 font-semibold transition text-xs whitespace-nowrap shrink-0">
              <FiLogIn size={13} /> Login
            </button>
            <button onClick={() => navigate("/register")} className="flex items-center gap-1 bg-orange-800 hover:bg-orange-900 text-white px-3 py-1.5 rounded-xl font-semibold border border-orange-300 transition text-xs whitespace-nowrap shrink-0">
              <FiUserPlus size={13} /> Register
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-orange-700 px-4 pb-4 flex flex-col gap-3 text-sm">
            <form onSubmit={handleSearch} className="flex bg-white rounded-xl overflow-hidden mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 text-gray-700 text-xs outline-none"
              />
              <button type="submit" className="bg-orange-500 px-3 text-white"><FiSearch size={14} /></button>
            </form>
            {navLinks.map(({ to, label, icon }) => (
              <Link key={to} to={to} className={`flex items-center gap-2 hover:text-orange-200 ${isActive(to) ? "font-bold" : ""}`} onClick={() => setMenuOpen(false)}>
                {icon} {label}
              </Link>
            ))}
            <button onClick={() => { setShowLogin(true); setMenuOpen(false) }} className="flex items-center justify-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-full font-semibold">
              <FiLogIn size={14} /> Login
            </button>
            <button onClick={() => { navigate("/register"); setMenuOpen(false) }} className="flex items-center justify-center gap-2 bg-orange-800 text-white px-4 py-2 rounded-full font-semibold">
              <FiUserPlus size={14} /> Register
            </button>
          </div>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}

export default Navbar
