import { useState, useEffect } from "react"
import { allPandits } from "../../data/pandits"
import FilterSidebar from "../../components/ui/FilterSidebar"
import PanditCard from "../../components/ui/PanditCard"
import { FaShieldAlt, FaStar, FaUserCheck, FaAward } from "react-icons/fa"
import { FiArrowRight } from "react-icons/fi"
import { useNavigate, useLocation } from "react-router-dom"
import { MapPin, Landmark, Building2, Waves, Flame, Star, Mountain, Sun } from "lucide-react"
import logoImg from "../../assets/img.jpeg"

const ITEMS_PER_PAGE = 12

const topCities = [
  { city: "Varanasi", pandits: 320, icon: <Landmark size={24} className="text-orange-500" /> },
  { city: "Delhi", pandits: 280, icon: <Building2 size={24} className="text-blue-500" /> },
  { city: "Mumbai", pandits: 210, icon: <Waves size={24} className="text-cyan-500" /> },
  { city: "Jaipur", pandits: 190, icon: <Sun size={24} className="text-pink-500" /> },
  { city: "Haridwar", pandits: 175, icon: <Flame size={24} className="text-orange-400" /> },
  { city: "Prayagraj", pandits: 160, icon: <Waves size={24} className="text-blue-400" /> },
  { city: "Mathura", pandits: 145, icon: <Star size={24} className="text-yellow-500 fill-yellow-400" /> },
  { city: "Ujjain", pandits: 130, icon: <Mountain size={24} className="text-purple-500" /> },
]

const whyTrust = [
  { icon: <FaShieldAlt className="text-orange-500" size={24} />, title: "100% Verified", desc: "Every pandit is personally verified with ID proof and background check." },
  { icon: <FaStar className="text-yellow-400" size={24} />, title: "Rated & Reviewed", desc: "Real ratings from real customers after every puja ceremony." },
  { icon: <FaUserCheck className="text-green-500" size={24} />, title: "Experienced Only", desc: "Minimum 3 years of experience required to list on PanditJi." },
  { icon: <FaAward className="text-purple-500" size={24} />, title: "Certified Pandits", desc: "Many pandits hold certifications from reputed Vedic institutions." },
]

const Pandits = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ city: "All Cities", specializations: [], experience: "", rating: "" })
  const [activeCity, setActiveCity] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const searchQuery = new URLSearchParams(location.search).get("search") || ""

  useEffect(() => {
    if (searchQuery) setCurrentPage(1)
  }, [searchQuery])

  const filteredPandits = allPandits.filter(p => {
    // Search query filter
    const q = searchQuery.toLowerCase().trim()
    if (q) {
      const fields = [
        p.name, p.specialization, p.location,
        p.about, String(p.experience), String(p.price),
        String(p.rating), p.available ? "available" : "busy"
      ].join(" ").toLowerCase()
      const words = q.split(/\s+/)
      if (!words.every(word => fields.includes(word))) return false
    }

    // City filter
    if (filters.city !== "All Cities") {
      if (!p.location.toLowerCase().includes(filters.city.toLowerCase())) return false
    }

    // Specialization filter — partial match
    if (filters.specializations.length > 0) {
      const panditSpec = p.specialization.toLowerCase()
      const matched = filters.specializations.some(s =>
        panditSpec.includes(s.toLowerCase())
      )
      if (!matched) return false
    }

    // Experience filter
    if (filters.experience) {
      const exp = p.experience
      if (filters.experience === "0-5 years" && exp > 5) return false
      if (filters.experience === "5-10 years" && (exp < 5 || exp > 10)) return false
      if (filters.experience === "10+ years" && exp < 10) return false
    }

    // Rating filter
    if (filters.rating && p.rating < parseFloat(filters.rating)) return false

    return true
  })

  const totalPages = Math.ceil(filteredPandits.length / ITEMS_PER_PAGE)

  const currentPandits = filteredPandits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden ">

      {/* Header */}
      <section className="bg-orange-500 text-white py-10 sm:py-14 px-4 sm:px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-orange-100 text-xs font-semibold px-3 py-1 rounded-full mb-3 text-center"><img src={logoImg} className="w-4 inline mr-1" /> 5000+ Verified Pandits</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Find Verified Pandits Near You</h1>
            <p className="text-orange-100 text-sm sm:text-base mb-5">Browse through our network of experienced and verified pandits across 50+ cities in India. Book instantly for any puja or ceremony.</p>
            <div className="flex flex-wrap gap-3 text-center justify-center">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm"><span className="font-bold">5000+</span> Pandits</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm"><span className="font-bold">50+</span> Cities</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm"><span className="font-bold">4.8★</span> Avg Rating</div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm"><span className="font-bold">1L+</span> Pujas Done</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {whyTrust.map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-2">
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Pandits by City</h2>
          <span className="text-xs text-gray-400">50+ cities covered</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {topCities.map((c) => (
            <button
              key={c.city}
              onClick={() => setActiveCity(activeCity === c.city ? null : c.city)}
              className={`group relative flex flex-col items-center gap-1.5 rounded-xl p-3 border transition-all duration-300 overflow-hidden
                ${
                  activeCity === c.city
                    ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-200 scale-105"
                    : "bg-white border-transparent shadow hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 hover:scale-105"
                }`}
            >
              {/* shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${activeCity === c.city ? "bg-white/20 scale-110" : "bg-orange-50 group-hover:bg-orange-100 group-hover:scale-110"}`}>
                {c.icon}
              </div>
              <span className={`text-xs font-semibold transition-colors duration-300 ${activeCity === c.city ? "text-white" : "text-gray-700"}`}>{c.city}</span>
              <span className={`text-xs font-bold transition-colors duration-300 ${activeCity === c.city ? "text-orange-100" : "text-orange-500"}`}>{c.pandits}+</span>
            </button>
          ))}
        </div>
      </section>

      {/* Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <FilterSidebar onApply={handleFilterApply} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {searchQuery ? (
                  <span>Results for "<span className="text-orange-500">{searchQuery}</span>" <span className="text-gray-400 text-sm font-normal">({filteredPandits.length} found)</span></span>
                ) : (
                  <span>All Pandits <span className="text-gray-400 text-sm sm:text-base font-normal">({filteredPandits.length} found — Page {currentPage} of {totalPages})</span></span>
                )}
              </h2>
              <select className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-orange-400">
                <option>Sort: Relevance</option>
                <option>Rating: High to Low</option>
                <option>Price: Low to High</option>
                <option>Experience: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPandits.length === 0 ? (
                <div className="col-span-3 text-center py-16">
                  <div className="text-5xl mb-3"><Search/></div>
                  <p className="text-gray-500 font-semibold">No pandits found</p>
                  <p className="text-gray-400 text-sm mt-1">Try changing your filters</p>
                </div>
              ) : (
                currentPandits.map((p) => <PanditCard key={p.id} {...p} />)
              )}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-9 h-9 rounded-lg text-sm font-medium border bg-white text-gray-600 border-gray-300 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition">‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => handlePageChange(n)} className={`w-9 h-9 rounded-lg text-sm font-medium border transition ${n === currentPage ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"}`}>{n}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-9 h-9 rounded-lg text-sm font-medium border bg-white text-gray-600 border-gray-300 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className=" py-12 px-4 sm:px-6 bg-amber-50  ">
        <div className="max-w-3xl mx-auto text-center text-black">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Are You a Pandit?</h2>
          <p className="text-black text-sm mb-6 shadow-amber-100">Join our platform and connect with thousands of devotees looking for experienced pandits in your city.</p>
          <button onClick={() => navigate("/register")} className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition shadow flex items-center gap-2 mx-auto">
            Register as Pandit <FiArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  )
}

export default Pandits
