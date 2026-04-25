import { useState } from "react"
import { FiMapPin, FiX } from "react-icons/fi"
import { FaStar, FaGraduationCap, FaCheckCircle } from "react-icons/fa"

const BookingModal = ({ pandit, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "", date: "", puja: "", address: "" })
  const [booked, setBooked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setBooked(true)
    setTimeout(() => { setBooked(false); onClose() }, 2500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[85vh] overflow-y-auto mx-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500">
          <FiX size={16} />
        </button>
        {booked ? (
          <div className="text-center py-10">
            <FaCheckCircle className="mx-auto text-green-500 mb-3" size={52} />
            <p className="text-green-600 font-bold text-xl">Booking Confirmed!</p>
            <p className="text-gray-500 text-sm mt-2">{pandit.name} has been booked successfully.</p>
            <p className="text-gray-400 text-xs mt-1">You will receive a confirmation on your phone.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Book Pandit</h2>
            <div className="flex items-center gap-3 mb-5 bg-orange-50 rounded-xl p-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200 shrink-0">
                <img src={pandit.image} alt={pandit.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{pandit.name}</h3>
                <p className="text-orange-500 text-xs mt-0.5">{pandit.specialization}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5"><FiMapPin size={10} /> {pandit.location}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-bold text-orange-500">₹{pandit.price}</p>
                <p className="text-xs text-gray-400">onwards</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name *</label>
                  <input required type="text" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone *</label>
                  <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Date *</label>
                  <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 text-gray-600" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Puja Type *</label>
                  <select required value={form.puja} onChange={(e) => setForm({ ...form, puja: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 text-gray-600">
                    <option value="">Select Puja</option>
                    {pandit.specialization.split(", ").map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Address *</label>
                <textarea required placeholder="House no, street, city..." value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" />
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-sm transition mt-1">Confirm Booking</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const PanditCard = ({ name, specialization, location, experience, rating, reviews, price, available, image, about }) => {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-100 p-3 sm:p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-orange-200 shrink-0 bg-orange-50">
            <img src={image} alt={name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{name}</h3>
            <p className="text-orange-500 text-xs font-medium truncate">{specialization}</p>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1"><FiMapPin size={10} /> {location}</p>
          </div>
          {available ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium shrink-0">Available</span>
          ) : (
            <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-medium shrink-0">Busy</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
          <span className="flex items-center gap-1"><FaStar size={11} className="text-yellow-400" /> <strong className="text-gray-700">{rating}</strong> ({reviews})</span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1"><FaGraduationCap size={11} /> {experience} yrs</span>
        </div>

        {about && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{about}</p>}

        <div className="flex flex-wrap gap-1">
          {specialization.split(", ").map((tag) => (
            <span key={tag} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-base sm:text-lg font-bold text-gray-800">₹{price}</span>
            <span className="text-xs text-gray-400 ml-1">onwards</span>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            disabled={!available}
            className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg font-medium transition ${available ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {showBooking && (
        <BookingModal pandit={{ name, specialization, location, price, image }} onClose={() => setShowBooking(false)} />
      )}
    </>
  )
}

export default PanditCard
