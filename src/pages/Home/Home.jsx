import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { allPandits } from "../../data/pandits"
import PanditCard from "../../components/ui/PanditCard"
import FilterSidebar from "../../components/ui/FilterSidebar"
import {
  MapPin, Phone, ArrowRight, Calendar, Clock,
  ShieldCheck, Star, MessageSquare, UserPlus, CheckCircle,
  Flame, Trophy, TrendingUp, BookOpen, Users, Search, Sparkles, Flower2, Heart,
  Baby, Moon, Star as StarIcon
} from "lucide-react"

import logoImg from "../../assets/img.jpeg"

const categories = [
  { icon: <Heart size={28} className="text-pink-500" />, label: "Vivah Puja" },
  { icon: <BookOpen size={28} className="text-blue-500" />, label: "Griha Pravesh" },
  { icon: <Sparkles size={28} className="text-gray-600" />, label: "Ganesh Puja" },
  { icon: <Flower2 size={28} className="text-pink-400" />, label: "Navratri Puja" },
  { icon: <StarIcon size={28} className="text-orange-500" />, label: "Satyanarayan" },
  { icon: <Flame size={28} className="text-red-500" />, label: "Havan" },
  { icon: <Baby size={28} className="text-yellow-500" />, label: "Namkaran" },
  { icon: <Moon size={28} className="text-indigo-500" />, label: "Shradh Puja" },
]

const stats = [
  { value: "5000+", label: "Verified Pandits", icon: <ShieldCheck size={28} className="text-orange-500" /> },
  { value: "50+", label: "Cities Covered", icon: <MapPin size={28} className="text-orange-500" /> },
  { value: "1 Lakh+", label: "Pujas Completed", icon: <TrendingUp size={28} className="text-orange-500" /> },
  { value: "4.8", label: "Average Rating", icon: <Trophy size={28} className="text-orange-500" /> },
]

const howItWorks = [
  { step: "01", icon: <Search size={26} className="text-orange-500" />, title: "Search by Location", desc: "Enter your city and find verified pandits available near you." },
  { step: "02", icon: <Users size={26} className="text-orange-500" />, title: "Choose a Pandit", desc: "Browse profiles, read reviews, and select the best pandit for your ceremony." },
  { step: "03", icon: <Calendar size={26} className="text-orange-500" />, title: "Book & Confirm", desc: "Pick your date, fill in details, and confirm your booking instantly." },
  { step: "04", icon: <ShieldCheck size={26} className="text-orange-500" />, title: "Puja Done!", desc: "Your pandit arrives on time and performs the ceremony with full devotion." },
]

const testimonials = [
  { name: "Priya Sharma", city: "Delhi", rating: 5, text: "Pt. Ramesh Sharma performed our Griha Pravesh puja beautifully. Very knowledgeable and punctual. Highly recommended!", puja: "Griha Pravesh" },
  { name: "Rahul Gupta", city: "Mumbai", rating: 5, text: "Booked Pt. Mahesh Pandey for our son's Namkaran ceremony. He explained every ritual in detail. Excellent experience!", puja: "Namkaran" },
  { name: "Sunita Devi", city: "Varanasi", rating: 5, text: "Pt. Vijay Dubey conducted Shradh puja with great devotion. Very satisfied with the service. Will book again.", puja: "Shradh Puja" },
  { name: "Amit Verma", city: "Jaipur", rating: 4, text: "Found a great pandit for our Satyanarayan Katha within minutes. The platform is very easy to use.", puja: "Satyanarayan Puja" },
]

const upcomingFestivals = [
  { name: "Ganesh Chaturthi", date: "7 Sep 2025", days: "Coming Soon", color: "bg-yellow-50 border-yellow-200", textColor: "text-yellow-700", icon: <Sparkles size={28} className="text-yellow-600" /> },
  { name: "Navratri", date: "22 Sep 2025", days: "Coming Soon", color: "bg-red-50 border-red-200", textColor: "text-red-600", icon: <Flower2 size={28} className="text-red-500" /> },
  { name: "Diwali Puja", date: "20 Oct 2025", days: "Coming Soon", color: "bg-orange-50 border-orange-200", textColor: "text-orange-600", icon: <Flame size={28} className="text-orange-500" /> },
  { name: "Vivah Muhurat", date: "Nov–Dec 2025", days: "Season Open", color: "bg-pink-50 border-pink-200", textColor: "text-pink-600", icon: <Heart size={24} className="text-pink-500" /> },
]

// const pujaPackages = [
//   { name: "Basic Puja", price: "₹1,100", color: "border-gray-200", badge: "", features: ["1 Pandit", "Up to 2 hours", "Basic samagri list", "Aarti & prasad", "Certificate of puja"] },
//   { name: "Standard Puja", price: "₹2,500", color: "border-orange-400", badge: "Most Popular", features: ["1 Pandit", "Up to 4 hours", "Samagri included", "Havan included", "Aarti & prasad", "Certificate of puja"] },
//   { name: "Premium Puja", price: "₹5,100", color: "border-yellow-400", badge: "Best Value", features: ["2 Pandits", "Full day ceremony", "All samagri included", "Havan + Katha", "Decoration setup", "Video recording", "Certificate of puja"] },
// ]

const sacredTexts = [
  { title: "Significance of Griha Pravesh", desc: "Griha Pravesh is performed to purify the new home and invite positive energy. The ritual involves Vastu Shanti, Ganesh Puja, and Havan to bless the household.", extra: "The ceremony is ideally performed on an auspicious muhurat chosen by a pandit. It includes Navagraha Puja, Vastu Devata worship, and lighting of the sacred fire. The ritual ensures the home is free from negative energies and blesses all family members with health, wealth, and harmony.", icon: <BookOpen size={36} className="text-orange-500" /> },
  { title: "Why Satyanarayan Katha?", desc: "Lord Vishnu's Satyanarayan Katha is performed on auspicious occasions to seek blessings for prosperity, health, and happiness in the family.", extra: "The Katha narrates five stories from the Skanda Purana and is typically performed on Purnima (full moon day), during housewarmings, marriages, or business inaugurations. Devotees offer panchamrit, fruits, and tulsi leaves. It is believed that sincere observance fulfills all wishes and removes obstacles from life.", icon: <StarIcon size={36} className="text-orange-500" /> },
  { title: "Importance of Vivah Puja", desc: "The Vivah ceremony is one of the 16 samskaras. The Saptapadi (7 vows) taken around the sacred fire bind two souls together for eternity.", extra: "The Vivah rituals include Ganesh Puja, Var Mala, Kanyadan, Mangalsutra ceremony, and Sindoor Daan. Each ritual holds deep spiritual significance. The sacred fire (Agni) is the divine witness to the union. A qualified pandit ensures all rituals are performed in the correct sequence with proper Vedic mantras.", icon: <Heart size={32} className="text-orange-500" /> },
]

const SacredCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white rounded-xl p-6 shadow border border-amber-100 hover:shadow-xl hover:-translate-y-2 hover:border-orange-300 transition-all duration-300 flex flex-col group" style={{ minHeight: '260px' }}>
      <span className="text-4xl mb-3 block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">{item.icon}</span>
      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-200">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
      {expanded && (
        <p className="text-sm text-gray-500 leading-relaxed mt-3 border-t border-amber-100 pt-3">{item.extra}</p>
      )}
      <button onClick={() => setExpanded(p => !p)} className="mt-auto pt-4 text-orange-500 text-sm font-semibold flex items-center gap-1 hover:underline">
        {expanded ? "Show Less" : "Read More"} <ArrowRight size={13} className={expanded ? "rotate-90" : ""} />
      </button>
    </div>
  )
}

const ITEMS_PER_PAGE = 6

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ city: "All Cities", specializations: [], experience: "", rating: "" })
  const [sortBy, setSortBy] = useState("relevance")
  const navigate = useNavigate()

  const filteredPandits = allPandits.filter(p => {
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
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "experience") return b.experience - a.experience
    return 0
  })

  const totalPages = Math.ceil(filteredPandits.length / ITEMS_PER_PAGE)

  const currentPandits = filteredPandits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    document.getElementById("pandit-listing")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    document.getElementById("pandit-listing")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden ">

      {/* Hero */}
      <section className="bg-orange-500 text-white py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[120px] flex items-center justify-center font-bold"><img src={logoImg} alt="" className=" m-100 w-100 rounded-full" /></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 text-orange-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <img className="w-4 inline mr-1"  src={logoImg} /> Trusted by 1 Lakh+ Families Across India
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Find Verified Pandits <br className="hidden md:block" /> for Every Puja & Ceremony
          </h1>
          <p className="text-orange-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Book experienced pandits for Vivah, Griha Pravesh, Havan & more — at your doorstep across 50+ cities in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => document.getElementById("pandit-listing")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition shadow flex items-center justify-center gap-2">
              <Calendar size={18} /> Book a Pandit
            </button>
            <button onClick={() => navigate("/pujas")} className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition flex items-center justify-center gap-2">
              <ArrowRight size={18} /> Browse All Pujas
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-orange-100">
            {["✅ 100% Verified Pandits", "📍 50+ Cities", "🔒 Secure Booking", "⭐ 4.8 Rated"].map(b => (
              <span key={b} className="bg-white/10 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              {s.icon}
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Upcoming Festivals & Muhurat</h2>
            <p className="text-sm text-gray-500 mt-0.5">Book your pandit in advance for these auspicious occasions</p>
          </div>
          <button onClick={() => navigate("/pujas")} className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {upcomingFestivals.map((f) => (
            <div key={f.name} className={`rounded-xl border-2 ${f.color} p-4 flex flex-col gap-2 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden`}>
              <span className="text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">{f.icon}</span>
              <h3 className="font-bold text-gray-800 text-sm">{f.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {f.date}</p>
              <span className={`text-xs font-semibold ${f.textColor} mt-auto`}>{f.days}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-orange-50 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Browse by Puja Type</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <button key={cat.label} onClick={() => navigate("/pujas")} className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow hover:shadow-lg hover:border-orange-400 hover:-translate-y-1 hover:bg-orange-50 border border-transparent transition-all duration-300 cursor-pointer group">
                <span className="flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{cat.icon}</span>
                <span className="text-xs text-gray-600 font-medium text-center leading-tight group-hover:text-orange-500 transition-colors duration-200">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-500 text-sm mt-1">Book a pandit in 4 simple steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, i) => (
            <div key={item.step} className="relative bg-white rounded-xl p-6 shadow text-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-300 group">
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 z-10 text-orange-300 text-xl">→</div>
              )}
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3 border border-orange-100 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:[&>*]:text-white transition-colors duration-300">{item.icon}</span>
              </div>
              <span className="text-xs font-bold text-orange-400 tracking-widest">STEP {item.step}</span>
              <h3 className="font-bold text-gray-800 mt-1 mb-2 group-hover:text-orange-500 transition-colors duration-200">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* Pandit Listing */}
      <section id="pandit-listing" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0"><FilterSidebar onApply={handleFilterApply} /></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Available Pandits <span className="text-gray-400 text-base font-normal">({filteredPandits.length} found — Page {currentPage} of {totalPages})</span>
              </h2>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1) }}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-orange-400"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="rating">Rating: High to Low</option>
                <option value="price">Price: Low to High</option>
                <option value="experience">Experience: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPandits.length === 0 ? (
                <div className="col-span-3 text-center py-16">
                  <div className="text-5xl mb-3">🔍</div>
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

      {/* Sacred Knowledge */}
      <section className="bg-amber-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Sacred Knowledge</h2>
            <p className="text-gray-500 text-sm mt-1">Learn about the significance of Hindu rituals and ceremonies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {sacredTexts.map((item) => (
              <SacredCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">What Our Customers Say</h2>
            <p className="text-gray-500 text-sm mt-1">Real reviews from real families</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-5 shadow border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-300 flex flex-col group">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-200" style={{transitionDelay: `${i*40}ms`}} />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {t.city} · {t.puja}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-orange-50 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Why Choose PanditJi?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck size={32} className="text-orange-500" />, title: "Verified Pandits", desc: "All pandits are background-checked and verified before listing on our platform." },
              { icon: <Calendar size={32} className="text-orange-500" />, title: "Easy Booking", desc: "Book in minutes with flexible scheduling. Cancel up to 24 hours before." },
              { icon: <MessageSquare size={32} className="text-orange-500" />, title: "Real Reviews", desc: "Genuine ratings and reviews from verified customers only." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow text-left border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-orange-300 transition-all duration-300 group cursor-pointer">
                <div className="mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 inline-block">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors duration-200">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-orange-50 py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-black">
          <Flame size={40} className="mx-auto mb-3 text-orange-600" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Are You a Pandit?</h2>
          <p className="text-gray-600 mb-6 text-sm max-w-xl mx-auto">Join PanditJi and reach thousands of devotees looking for experienced pandits in your city. Registration is free!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/register")} className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow">
              <UserPlus size={18} /> Register as Pandit
            </button>
            <button onClick={() => navigate("/contact")} className="border-2 border-orange-400 text-orange-600 font-semibold px-8 py-3 rounded-full hover:bg-orange-200 transition flex items-center justify-center gap-2">
              <Phone size={18} /> Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
