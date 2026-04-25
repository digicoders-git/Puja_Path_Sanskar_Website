import { useState } from "react"
import { FiFilter, FiX } from "react-icons/fi"

const cities = [
  "All Cities",
  "Varanasi", "Lucknow", "Prayagraj", "Agra", "Kanpur", "Mathura", "Vrindavan", "Ayodhya", "Meerut", "Noida", "Ghaziabad",
  "Delhi", "New Delhi", "Gurugram", "Faridabad",
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur",
  "Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota", "Bikaner", "Pushkar",
  "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Dwarka",
  "Bhopal", "Indore", "Ujjain", "Gwalior", "Jabalpur",
  "Bangalore", "Mysore", "Hubli", "Mangalore",
  "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli",
  "Kolkata", "Howrah", "Durgapur", "Siliguri",
  "Patna", "Gaya", "Bodh Gaya", "Muzaffarpur",
  "Haridwar", "Rishikesh", "Dehradun", "Nainital",
  "Ranchi", "Jamshedpur", "Dhanbad",
  "Amritsar", "Ludhiana", "Chandigarh", "Jalandhar",
  "Ambala", "Hisar", "Rohtak", "Panipat",
  "Hyderabad", "Visakhapatnam", "Vijayawada", "Tirupati",
  "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur",
  "Bhubaneswar", "Puri", "Cuttack",
  "Raipur", "Bilaspur",
  "Guwahati", "Dibrugarh",
  "Shimla", "Manali", "Dharamshala",
]

const specializations = ["Vivah Puja", "Griha Pravesh", "Satyanarayan Puja", "Ganesh Puja", "Navratri Puja", "Havan", "Namkaran", "Shradh Puja"]

const FilterSidebar = ({ onApply }) => {
  const [city, setCity] = useState("All Cities")
  const [selectedSpecs, setSelectedSpecs] = useState([])
  const [experience, setExperience] = useState("")
  const [rating, setRating] = useState("")

  const toggleSpec = (s) => {
    setSelectedSpecs(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleApply = () => {
    if (onApply) {
      onApply({ city, specializations: selectedSpecs, experience, rating })
    }
  }

  const handleReset = () => {
    setCity("All Cities")
    setSelectedSpecs([])
    setExperience("")
    setRating("")
    if (onApply) {
      onApply({ city: "All Cities", specializations: [], experience: "", rating: "" })
    }
  }

  const hasFilters = city !== "All Cities" || selectedSpecs.length > 0 || experience || rating

  return (
    <aside className="bg-white rounded-xl shadow p-4 sm:p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <FiFilter size={16} className="text-orange-500" /> Filters
        </h2>
        {hasFilters && (
          <button onClick={handleReset} className="text-xs text-orange-500 hover:underline flex items-center gap-1">
            <FiX size={12} /> Reset
          </button>
        )}
      </div>

      {/* Active filter count */}
      {hasFilters && (
        <div className="mb-3 bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5 text-xs text-orange-600 font-medium">
          {[city !== "All Cities", selectedSpecs.length > 0, !!experience, !!rating].filter(Boolean).length} filter(s) active
        </div>
      )}

      {/* Location */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Location</h3>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-orange-400"
        >
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Specialization */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Specialization</h3>
        <div className="space-y-2 text-sm">
          {specializations.map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-orange-500"
                checked={selectedSpecs.includes(s)}
                onChange={() => toggleSpec(s)}
              />
              <span className={`text-gray-600 ${selectedSpecs.includes(s) ? "font-semibold text-orange-600" : ""}`}>{s}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Experience</h3>
        <div className="space-y-2 text-sm">
          {["0-5 years", "5-10 years", "10+ years"].map(e => (
            <label key={e} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="exp"
                className="accent-orange-500"
                checked={experience === e}
                onChange={() => setExperience(e)}
              />
              <span className={`text-gray-600 ${experience === e ? "font-semibold text-orange-600" : ""}`}>{e}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 text-sm mb-2">Minimum Rating</h3>
        <div className="space-y-2 text-sm">
          {[{ label: "4.5+ ⭐", value: "4.5" }, { label: "4.0+ ⭐", value: "4.0" }, { label: "3.5+ ⭐", value: "3.5" }].map(r => (
            <label key={r.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                className="accent-orange-500"
                checked={rating === r.value}
                onChange={() => setRating(r.value)}
              />
              <span className={`text-gray-600 ${rating === r.value ? "font-semibold text-orange-600" : ""}`}>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2"
      >
        <FiFilter size={14} /> Apply Filters
      </button>
    </aside>
  )
}

export default FilterSidebar
