import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from "react"

import {
  Home, Flame, Moon, BookOpen, GraduationCap,
  Star, Mountain, Heart, Sparkles, Sun, Layers, Baby,
  CheckCircle2, ChevronDown, X, ArrowRight, Clock, Users, Filter
} from "lucide-react"

const pujaCategories = [
  {
    category: "Ghar / Daily Puja",
    badge: "bg-orange-100 text-orange-600",
    pujas: [
      { id: 1, icon: <Home size={26} className="text-blue-500" />, name: "Griha Pravesh Puja", duration: "2-3 hours", price: "₹2,100 – ₹5,100", desc: "A housewarming ceremony to purify and bless a new home before moving in, invoking positive energy and prosperity.", includes: ["Ganesh puja", "Vastu shanti", "Havan", "Kalash sthapana", "Aarti"], pandits: 280 },
      { id: 2, icon: <Layers size={26} className="text-orange-500" />, name: "Satyanarayan Katha", duration: "2-3 hours", price: "₹1,100 – ₹3,100", desc: "A popular puja dedicated to Lord Vishnu performed on auspicious occasions for blessings and prosperity.", includes: ["Kalash puja", "Satyanarayan katha", "Panchamrit abhishek", "Prasad distribution", "Aarti"], pandits: 350 },
      { id: 3, icon: <Mountain size={26} className="text-teal-500" />, name: "Vastu Shanti Puja", duration: "3-4 hours", price: "₹2,100 – ₹5,100", desc: "A puja to harmonize the energy of a building or plot according to Vastu Shastra principles for peace and prosperity.", includes: ["Vastu purush puja", "Navagraha puja", "Havan", "Kalash sthapana", "Aarti"], pandits: 165 },
      { id: 4, icon: <Star size={26} className="text-yellow-500 fill-yellow-400" />, name: "Navgrah Puja", duration: "2-3 hours", price: "₹2,100 – ₹4,100", desc: "Worship of the nine planetary deities to reduce malefic effects of planets and enhance positive influences in life.", includes: ["Navagraha sthapana", "Mantra jaap", "Havan", "Graha shanti", "Aarti"], pandits: 200 },
    ]
  },
  {
    category: "Sanskar Puja",
    badge: "bg-blue-100 text-blue-600",
    pujas: [
      { id: 5, icon: <Baby size={26} className="text-yellow-500" />, name: "Naamkaran Sanskar", duration: "1-2 hours", price: "₹1,100 – ₹3,100", desc: "The naming ceremony of a newborn child, one of the 16 samskaras, performed on the 11th day after birth.", includes: ["Ganesh puja", "Jatakarma", "Name announcement", "Navagraha puja", "Aarti"], pandits: 175 },
      { id: 6, icon: <Sparkles size={26} className="text-purple-500" />, name: "Mundan Sanskar", duration: "1-2 hours", price: "₹2,100 – ₹5,100", desc: "The first haircut ceremony of a child, symbolizing the removal of past life impurities and blessings for a healthy life.", includes: ["Ganesh puja", "Mundan ritual", "Navagraha puja", "Havan", "Aarti"], pandits: 140 },
      { id: 7, icon: <GraduationCap size={26} className="text-green-500" />, name: "Janeu (Upanayan)", duration: "3-4 hours", price: "₹5,100 – ₹11,000", desc: "The sacred thread ceremony marking a boy's spiritual birth and initiation into Vedic studies and duties.", includes: ["Ganesh puja", "Havan", "Sacred thread ceremony", "Gayatri mantra initiation", "Aarti"], pandits: 110 },
      { id: 8, icon: <Sun size={26} className="text-pink-400" />, name: "Annaprashan Sanskar", duration: "1-2 hours", price: "₹1,100 – ₹3,100", desc: "The first rice feeding ceremony of an infant, one of the important samskaras performed around 6 months of age.", includes: ["Ganesh puja", "Annaprashan ritual", "Navagraha puja", "Prasad", "Aarti"], pandits: 130 },
    ]
  },
  {
    category: "Vivah Related Puja",
    badge: "bg-pink-100 text-pink-600",
    pujas: [
      { id: 9, icon: <Heart size={26} className="text-pink-500" />, name: "Vivah Puja (Full)", duration: "4-6 hours", price: "₹5,100 – ₹21,000", desc: "A sacred Hindu wedding ceremony performed with Vedic rituals, including Saptapadi, Kanyadaan, and Mangalsutra ceremony.", includes: ["Saptapadi (7 vows)", "Kanyadaan", "Mangalsutra ceremony", "Sindoor daan", "Jai mala"], pandits: 320 },
      { id: 10, icon: <Sparkles size={26} className="text-yellow-400" />, name: "Lagan / Sagai Puja", duration: "1-2 hours", price: "₹2,100 – ₹5,100", desc: "The engagement ceremony with Vedic rituals to formally announce and bless the union of two families.", includes: ["Ganesh puja", "Ring ceremony", "Tilak ritual", "Prasad", "Aarti"], pandits: 210 },
      { id: 11, icon: <Sun size={26} className="text-yellow-500" />, name: "Haldi Ceremony Puja", duration: "1 hour", price: "₹1,100 – ₹3,100", desc: "A pre-wedding ritual where turmeric paste is applied to the bride and groom for purification and auspiciousness.", includes: ["Ganesh puja", "Haldi ritual", "Mantra chanting", "Prasad", "Aarti"], pandits: 180 },
    ]
  },
  {
    category: "Special Puja",
    badge: "bg-purple-100 text-purple-600",
    pujas: [
      { id: 12, icon: <Flame size={26} className="text-red-500" />, name: "Mahamrityunjaya Jaap", duration: "3-4 hours", price: "₹2,100 – ₹7,100", desc: "A powerful Shiva mantra jaap performed for health, longevity, and protection from untimely death and diseases.", includes: ["Shiva puja", "1.25 lakh jaap", "Havan", "Abhishek", "Aarti"], pandits: 160 },
      { id: 13, icon: <Moon size={26} className="text-indigo-500" />, name: "Kaal Sarp Dosh Puja", duration: "4-5 hours", price: "₹5,100 – ₹15,000", desc: "A special puja performed to nullify the malefic effects of Kaal Sarp Dosh in the horoscope.", includes: ["Nag puja", "Rahu-Ketu shanti", "Havan", "Mantra jaap", "Aarti"], pandits: 120 },
      { id: 14, icon: <BookOpen size={26} className="text-purple-500" />, name: "Pitra Dosh Puja", duration: "3-4 hours", price: "₹2,100 – ₹5,100", desc: "Ancestral rites performed to honor deceased ancestors and remove Pitra Dosh from the family horoscope.", includes: ["Tarpan", "Pind daan", "Brahmin bhojan", "Pitru stotram", "Aarti"], pandits: 145 },
      { id: 15, icon: <Mountain size={26} className="text-gray-500" />, name: "Rudrabhishek", duration: "2-3 hours", price: "₹1,100 – ₹3,100", desc: "A sacred abhishek of Lord Shiva with panchamrit, water, and other offerings while chanting Rudra mantras.", includes: ["Shiva sthapana", "Panchamrit abhishek", "Rudra mantra", "Bilva patra", "Aarti"], pandits: 190 },
    ]
  },
  {
    category: "Festival Puja",
    badge: "bg-yellow-100 text-yellow-700",
    pujas: [
      { id: 16, icon: <Sparkles size={26} className="text-yellow-500" />, name: "Diwali Lakshmi Puja", duration: "1-2 hours", price: "₹1,100 – ₹3,100", desc: "Worship of Goddess Lakshmi on Diwali for wealth, prosperity, and blessings for the household.", includes: ["Ganesh puja", "Lakshmi sthapana", "Kuber puja", "Aarti", "Prasad"], pandits: 380 },
      { id: 17, icon: <Sparkles size={26} className="text-orange-400" />, name: "Ganesh Puja", duration: "1-2 hours", price: "₹1,100 – ₹2,100", desc: "Worship of Lord Ganesha, the remover of obstacles, performed before any auspicious event or on Ganesh Chaturthi.", includes: ["Ganesh sthapana", "Shodashopachara puja", "Modak bhog", "Aarti", "Visarjan"], pandits: 410 },
      { id: 18, icon: <Moon size={26} className="text-pink-400" />, name: "Karva Chauth Puja", duration: "1 hour", price: "₹500 – ₹1,500", desc: "A fasting ritual observed by married women for the long life and well-being of their husbands.", includes: ["Karva Chauth katha", "Moon darshan ritual", "Puja thali setup", "Prasad", "Aarti"], pandits: 220 },
      { id: 19, icon: <Sun size={26} className="text-amber-500" />, name: "Akshay Tritiya Puja", duration: "1-2 hours", price: "₹1,100 – ₹2,100", desc: "An auspicious puja performed on Akshay Tritiya for eternal prosperity, new beginnings, and divine blessings.", includes: ["Vishnu puja", "Lakshmi puja", "Havan", "Prasad", "Aarti"], pandits: 170 },
    ]
  },
]

const pujas = pujaCategories.flatMap(c => c.pujas)

const PujaDetailModal = ({ puja, rect, onClose, onBook }) => (
  <div className="fixed inset-0 z-30" onClick={onClose}>
    <div
      className="absolute bg-white rounded-xl shadow-2xl border border-orange-100 overflow-y-auto"
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 z-10">
        <X size={14} />
      </button>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">{puja.icon}</div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-800 text-sm leading-tight">{puja.name}</h2>
            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">UP, MP, Rajasthan & Delhi NCR</span>
          </div>
        </div>
        <div className="flex gap-3 mb-2 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-gray-500"><Clock size={11} />{puja.duration}</span>
          <span className="flex items-center gap-1 text-[11px] text-gray-500"><Users size={11} />{puja.pandits} Pandits</span>
          <span className="text-[11px] font-bold text-orange-500">{puja.price}</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{puja.desc}</p>
        <div className="bg-orange-50 rounded-lg p-2.5 mb-3 flex-1">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-1.5">What's Included</p>
          <ul className="flex flex-col gap-1">
            {puja.includes.map(item => (
              <li key={item} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                <CheckCircle2 size={11} className="text-orange-400 shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onBook}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1"
        >
          <ArrowRight size={13} /> Book Now
        </button>
      </div>
    </div>
  </div>
)

const PujaBookingModal = ({ puja, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "", date: "", city: "", address: "" })
  const [booked, setBooked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setBooked(true)
    setTimeout(() => { setBooked(false); onClose() }, 2500)
  }

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto mx-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500">
          <X size={16} />
        </button>

        {booked ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto text-green-500 mb-3" size={52} />
            <p className="text-green-600 font-bold text-xl">Booking Confirmed!</p>
            <p className="text-gray-500 text-sm mt-2">{puja.name} has been booked successfully.</p>
            <p className="text-gray-400 text-xs mt-1">Our team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Book Puja</h2>
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-orange-100 shrink-0">
                {puja.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{puja.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1"><Clock size={10} /> {puja.duration}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {puja.pandits} Pandits</span>
                </p>
              </div>
              <p className="text-orange-500 font-bold text-sm shrink-0">{puja.price}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name *</label>
                  <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone *</label>
                  <input required type="tel" placeholder="+91 XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Date *</label>
                  <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 text-gray-600" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">City *</label>
                  <input required type="text" placeholder="Your city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Address *</label>
                <textarea required placeholder="House no, street, locality..." value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" />
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition mt-1">
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const PujaCard = ({ puja }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [cardRect, setCardRect] = useState(null)
  const cardRef = useRef(null)

  const handleViewDetails = () => {
    const rect = cardRef.current.getBoundingClientRect()
    setCardRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setShowDetail(true)
  }

  return (
    <>
      <div ref={cardRef} className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
              {puja.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-sm">{puja.name}</h3>
              <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={11} /> {puja.duration}</span>
                <span className="flex items-center gap-1"><Users size={11} /> {puja.pandits} Pandits</span>
              </div>
              <span className="text-orange-600 font-semibold text-xs mt-1 block">{puja.price}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 leading-relaxed flex-1">{puja.desc}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleViewDetails}
              className="flex-1 border border-orange-400 text-orange-500 hover:bg-orange-50 py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
            >
              <ChevronDown size={14} /> View Details
            </button>
            <button
              onClick={() => setShowBooking(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1"
            >
              <ArrowRight size={14} /> Book Now
            </button>
          </div>
        </div>
      </div>

      {showDetail && cardRect && <PujaDetailModal puja={puja} rect={cardRect} onClose={() => setShowDetail(false)} onBook={() => { setShowDetail(false); setShowBooking(true) }} />}
      {showBooking && <PujaBookingModal puja={puja} onClose={() => setShowBooking(false)} />}
    </>
  )
}

const ALL_CATEGORIES = pujaCategories.map(c => c.category)

const Pujas = () => {
  const navigate = useNavigate()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setFilterOpen(false)
  }

  const filteredCategories = selectedCategories.length === 0
    ? pujaCategories
    : pujaCategories.filter(c => selectedCategories.includes(c.category))

  const filteredPujas = filteredCategories.flatMap(c => c.pujas)

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <section className="bg-orange-500 text-white py-10 px-4 sm:px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">All Puja Services</h1>
          <p className="text-orange-100 text-sm sm:text-base">Explore our complete range of religious ceremonies and rituals</p>
        </div>
      </section>

      <section className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[{ value: "12+", label: "Puja Types" }, { value: "5000+", label: "Pandits Available" }, { value: "1 Lakh+", label: "Pujas Completed" }, { value: "50+", label: "Cities Covered" }].map((s) => (
            <div key={s.label}>
              <p className="text-lg sm:text-xl font-bold text-orange-500">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Browse All Pujas <span className="text-gray-400 text-sm font-normal">({filteredPujas.length} services)</span>
          </h2>

          {/* Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(o => !o)}
              className="flex items-center gap-2 border border-orange-400 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <Filter size={15} />
              Filter by Type
              {selectedCategories.length > 0 && (
                <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedCategories.length}</span>
              )}
              <ChevronDown size={14} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-20 p-3">
                <ul className="flex flex-col gap-2">
                  {ALL_CATEGORIES.map(cat => {
                    const catData = pujaCategories.find(c => c.category === cat)
                    return (
                      <li key={cat}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="accent-orange-500 w-4 h-4"
                          />
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catData.badge}`}>{cat}</span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => { setSelectedCategories([]); setFilterOpen(false) }}
                    className="mt-3 w-full text-xs text-orange-500 border border-orange-300 rounded-lg py-1.5 hover:bg-orange-50 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {filteredPujas.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
        </div>
      </section>

      <section className="bg-orange-50 py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Can't find your Puja?</h2>
          <p className="text-gray-500 mb-6 text-sm">Contact us and we'll connect you with the right pandit for any ceremony.</p>
          <button onClick={() => navigate('/contact')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition shadow text-sm sm:text-base">
            Contact Us
          </button>
        </div>
      </section>

      {/* Price List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Puja Price List</h2>
          <p className="text-gray-500 text-sm mt-1">Estimated prices for UP, MP, Rajasthan & Delhi NCR</p>
          <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">✅ Available in UP, MP, Rajasthan & Delhi NCR only</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[
            { category: "Ghar / Daily Puja", gradient: "from-orange-500 to-amber-400", badge: "bg-orange-100 text-orange-600", items: [{ name: "Grih Pravesh Puja", price: "₹2,100 – ₹5,100" }, { name: "Satyanarayan Katha", price: "₹1,100 – ₹3,100" }, { name: "Vastu Shanti Puja", price: "₹2,100 – ₹5,100" }, { name: "Navgrah Puja", price: "₹2,100 – ₹4,100" }] },
            { category: "Sanskar Puja", gradient: "from-blue-500 to-cyan-400", badge: "bg-blue-100 text-blue-600", items: [{ name: "Naamkaran Sanskar", price: "₹1,100 – ₹3,100" }, { name: "Mundan Sanskar", price: "₹2,100 – ₹5,100" }, { name: "Janeu (Upanayan)", price: "₹5,100 – ₹11,000" }, { name: "Annaprashan Sanskar", price: "₹1,100 – ₹3,100" }] },
            { category: "Vivah Related Puja", gradient: "from-pink-500 to-rose-400", badge: "bg-pink-100 text-pink-600", items: [{ name: "Vivah Puja (Full)", price: "₹5,100 – ₹21,000" }, { name: "Lagan / Sagai Puja", price: "₹2,100 – ₹5,100" }, { name: "Haldi Ceremony Puja", price: "₹1,100 – ₹3,100" }] },
            { category: "Special Puja", gradient: "from-purple-500 to-violet-400", badge: "bg-purple-100 text-purple-600", items: [{ name: "Mahamrityunjaya Jaap", price: "₹2,100 – ₹7,100" }, { name: "Kaal Sarp Dosh Puja", price: "₹5,100 – ₹15,000" }, { name: "Pitra Dosh Puja", price: "₹2,100 – ₹5,100" }, { name: "Rudrabhishek", price: "₹1,100 – ₹3,100" }] },
            { category: "Festival Puja", gradient: "from-yellow-500 to-orange-400", badge: "bg-yellow-100 text-yellow-700", items: [{ name: "Diwali Lakshmi Puja", price: "₹1,100 – ₹3,100" }, { name: "Ganesh Puja", price: "₹1,100 – ₹2,100" }, { name: "Karva Chauth Puja", price: "₹500 – ₹1,500" }, { name: "Akshay Tritiya Puja", price: "₹1,100 – ₹2,100" }] },
          ].map(({ category, gradient, badge, items }) => (
            <div key={category} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`bg-gradient-to-r ${gradient} px-5 py-4`}>
                <h3 className="font-bold text-white text-sm tracking-wide">{category}</h3>
                <p className="text-white/70 text-xs mt-0.5">{items.length} pujas</p>
              </div>
              <ul className="divide-y divide-gray-50 px-1">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition-colors duration-150 rounded-lg mx-1 my-0.5">
                    <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                    <span className="text-sm font-bold text-orange-500 whitespace-nowrap ml-3">{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-gray-50">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badge}`}>{category}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6 bg-gray-100 rounded-xl px-4 py-3">
          📌 Prices may vary slightly based on city, pandit experience, and samagri inclusion.
        </p>
      </section>

      <section className="bg-amber-50 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">How a Puja is Performed</h2>
            <p className="text-gray-500 text-sm mt-1">A typical puja ceremony follows these sacred steps</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { step: "1", title: "Sankalp", desc: "Taking a vow and stating the purpose of the puja" },
              { step: "2", title: "Ganesh Puja", desc: "Invoking Lord Ganesha to remove obstacles" },
              { step: "3", title: "Kalash Sthapana", desc: "Setting up the sacred water pot" },
              { step: "4", title: "Main Puja", desc: "Performing the main deity worship with mantras" },
              { step: "5", title: "Havan", desc: "Sacred fire ritual with offerings" },
              { step: "6", title: "Aarti & Prasad", desc: "Concluding with aarti and distribution of prasad" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-4 text-center shadow-sm border border-amber-100">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">{item.step}</div>
                <p className="font-bold text-gray-800 text-xs mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-black">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Ready to Book a Puja?</h2>
          <p className="text-black text-sm mb-6">Find the perfect pandit for your ceremony and book in minutes.</p>
          <button onClick={() => navigate('/pandits')} className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-500 transition shadow">
            Find a Pandit Now
          </button>
        </div>
      </section>

    </div>
  )
}

export default Pujas
