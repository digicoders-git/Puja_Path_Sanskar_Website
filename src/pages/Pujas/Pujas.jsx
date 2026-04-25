import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { FiClock, FiUsers, FiChevronDown, FiChevronUp, FiArrowRight, FiX } from "react-icons/fi"
import { FaCheckCircle } from "react-icons/fa"
import {
  Ring, Home, Flame, Baby, Moon, BookOpen, GraduationCap,
  Star, Mountain, Heart, Sparkles, Sun, Layers
} from "lucide-react"

const pujas = [
  { id: 1, icon: <Heart size={26} className="text-pink-500" />, name: "Vivah Puja", duration: "4-6 hours", price: "₹5,100 onwards", desc: "A sacred Hindu wedding ceremony performed with Vedic rituals, including Saptapadi, Kanyadaan, and Mangalsutra ceremony.", includes: ["Saptapadi (7 vows)", "Kanyadaan", "Mangalsutra ceremony", "Sindoor daan", "Jai mala"], pandits: 320 },
  { id: 2, icon: <Home size={26} className="text-blue-500" />, name: "Griha Pravesh", duration: "2-3 hours", price: "₹2,100 onwards", desc: "A housewarming ceremony to purify and bless a new home before moving in, invoking positive energy and prosperity.", includes: ["Ganesh puja", "Vastu shanti", "Havan", "Kalash sthapana", "Aarti"], pandits: 280 },
  { id: 3, icon: <Sparkles size={26} className="text-yellow-500" />, name: "Ganesh Puja", duration: "1-2 hours", price: "₹1,100 onwards", desc: "Worship of Lord Ganesha, the remover of obstacles, performed before any auspicious event or on Ganesh Chaturthi.", includes: ["Ganesh sthapana", "Shodashopachara puja", "Modak bhog", "Aarti", "Visarjan"], pandits: 410 },
  { id: 4, icon: <Sun size={26} className="text-pink-400" />, name: "Navratri Puja", duration: "9 days", price: "₹3,100 onwards", desc: "Nine-day festival dedicated to Goddess Durga, celebrating her nine forms with daily rituals, fasting, and devotion.", includes: ["Kalash sthapana", "Durga saptashati path", "Kanya puja", "Havan", "Visarjan"], pandits: 190 },
  { id: 5, icon: <Layers size={26} className="text-orange-500" />, name: "Satyanarayan Puja", duration: "2-3 hours", price: "₹1,500 onwards", desc: "A popular puja dedicated to Lord Vishnu (Satyanarayan), performed on auspicious occasions for blessings and prosperity.", includes: ["Kalash puja", "Satyanarayan katha", "Panchamrit abhishek", "Prasad distribution", "Aarti"], pandits: 350 },
  { id: 6, icon: <Flame size={26} className="text-red-500" />, name: "Havan / Yagya", duration: "2-4 hours", price: "₹2,500 onwards", desc: "A sacred fire ritual where offerings are made to the holy fire while chanting Vedic mantras for purification and blessings.", includes: ["Havan kund setup", "Vedic mantra chanting", "Ahuti (offerings)", "Prasad", "Aarti"], pandits: 260 },
  { id: 7, icon: <Baby size={26} className="text-yellow-500" />, name: "Namkaran Sanskar", duration: "1-2 hours", price: "₹1,100 onwards", desc: "The naming ceremony of a newborn child, one of the 16 samskaras in Hinduism, performed on the 11th day after birth.", includes: ["Ganesh puja", "Jatakarma", "Name announcement", "Navagraha puja", "Aarti"], pandits: 175 },
  { id: 8, icon: <Moon size={26} className="text-indigo-500" />, name: "Shradh / Pitru Puja", duration: "3-4 hours", price: "₹2,100 onwards", desc: "Ancestral rites performed to honor and offer prayers to deceased ancestors, especially during Pitru Paksha.", includes: ["Tarpan", "Pind daan", "Brahmin bhojan", "Pitru stotram", "Aarti"], pandits: 145 },
  { id: 9, icon: <BookOpen size={26} className="text-purple-500" />, name: "Katha / Pravachan", duration: "3-7 days", price: "₹5,000 onwards", desc: "Religious discourses and storytelling sessions from sacred texts like Bhagavat, Ramayan, or Shiv Puran.", includes: ["Bhagavat katha", "Ramayan path", "Shiv puran", "Sundarkand", "Akhand path"], pandits: 120 },
  { id: 10, icon: <Star size={26} className="text-yellow-500 fill-yellow-400" />, name: "Navagraha Puja", duration: "2-3 hours", price: "₹1,800 onwards", desc: "Worship of the nine planetary deities to reduce malefic effects of planets and enhance positive influences in one's life.", includes: ["Navagraha sthapana", "Mantra jaap", "Havan", "Graha shanti", "Aarti"], pandits: 200 },
  { id: 11, icon: <GraduationCap size={26} className="text-green-500" />, name: "Vidyarambha Sanskar", duration: "1-2 hours", price: "₹1,100 onwards", desc: "A ceremony marking the beginning of a child's education, invoking blessings of Goddess Saraswati for knowledge and wisdom.", includes: ["Saraswati puja", "Slate writing ritual", "Mantra initiation", "Prasad", "Aarti"], pandits: 95 },
  { id: 12, icon: <Mountain size={26} className="text-teal-500" />, name: "Vastu Shanti Puja", duration: "3-4 hours", price: "₹3,100 onwards", desc: "A puja to harmonize the energy of a building or plot according to Vastu Shastra principles for peace and prosperity.", includes: ["Vastu purush puja", "Navagraha puja", "Havan", "Kalash sthapana", "Aarti"], pandits: 165 },
]

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
          <FiX size={16} />
        </button>

        {booked ? (
          <div className="text-center py-10">
            <FaCheckCircle className="mx-auto text-green-500 mb-3" size={52} />
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
                  <span className="flex items-center gap-1"><FiClock size={10} /> {puja.duration}</span>
                  <span className="flex items-center gap-1"><FiUsers size={10} /> {puja.pandits} Pandits</span>
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
  const [expanded, setExpanded] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
              {puja.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">{puja.name}</h3>
              <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><FiClock size={11} /> {puja.duration}</span>
                <span className="flex items-center gap-1"><FiUsers size={11} /> {puja.pandits} Pandits</span>
                <span className="text-orange-600 font-semibold">{puja.price}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">{puja.desc}</p>

          {expanded && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">What's Included</p>
              <ul className="grid grid-cols-1 gap-1">
                {puja.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <FaCheckCircle size={12} className="text-orange-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-1 border border-orange-400 text-orange-500 hover:bg-orange-50 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1"
            >
              {expanded ? <><FiChevronUp size={14} /> Show Less</> : <><FiChevronDown size={14} /> View Details</>}
            </button>
            <button
              onClick={() => setShowBooking(true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center justify-center gap-1"
            >
              <FiArrowRight size={14} /> Book Now
            </button>
          </div>
        </div>
      </div>

      {showBooking && <PujaBookingModal puja={puja} onClose={() => setShowBooking(false)} />}
    </>
  )
}

const Pujas = () => {
  const navigate = useNavigate()

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Browse All Pujas <span className="text-gray-400 text-sm sm:text-base font-normal">({pujas.length} services)</span></h2>
          <select className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-orange-400">
            <option>All Categories</option>
            <option>Wedding Rituals</option>
            <option>Home Ceremonies</option>
            <option>Festival Pujas</option>
            <option>Ancestral Rites</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pujas.map((puja) => <PujaCard key={puja.id} puja={puja} />)}
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
